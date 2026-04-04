import { Router, type IRouter } from "express";
import { eq, and, lte, or, isNull, sql } from "drizzle-orm";
import { db, reviewsTable, cardStatesTable, cardsTable } from "@workspace/db";
import { checkAndIssueStudentAchievements } from "../lib/check-achievements";
import {
  SubmitReviewBody,
  GetDueCardsParams,
  GetDueCardsQueryParams,
  GetDueCardsResponse,
  ListStudentReviewsParams,
  ListStudentReviewsQueryParams,
  ListStudentReviewsResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

// ──────────────────────────────────────────────────────────────────────────────
// FSRS-6 Scheduling Algorithm
// Based on the DSR (Difficulty–Stability–Retrievability) memory model described
// in docs/meta-srs-research.md. Uses the FSRS-5 default parameter set as
// starting weights (w0–w18) before per-user optimization is available.
//
// Reference formulas:
//   R(t,S) = (1 + FACTOR·t/S)^(-1/FACTOR)         — power-law forgetting curve
//   S'(success) = S·(e^w8·(11-D)·S^(-w9)·(e^(w10·(1-R))-1)·wGrade + 1)
//   S'(lapse)   = w11·D^(-w12)·((S+1)^w13 - 1)·e^(w14·(1-R))
//   D'          = w5·D_0(4) + (1-w5)·(D + (-w6·(G-3))·(10-D)/9)
// ──────────────────────────────────────────────────────────────────────────────

// FSRS-5 default parameter vector (21 values, w0–w20)
const W = [
  0.40255, // w0  initial stability for grade 1 (Again)
  1.18385, // w1  initial stability for grade 2 (Hard)
  3.1262,  // w2  initial stability for grade 3 (Good)
  15.4722, // w3  initial stability for grade 4 (Easy)
  7.2102,  // w4  initial difficulty weight
  0.5316,  // w5  difficulty mean-reversion weight
  1.0651,  // w6  difficulty delta multiplier
  0.06418, // w7  (unused placeholder for FSRS-6 extension)
  1.4949,  // w8  success stability exponent
  0.1597,  // w9  stability power in success formula
  1.0267,  // w10 retrievability factor in success formula
  1.9395,  // w11 lapse stability initializer
  0.11,    // w12 lapse difficulty exponent
  1.2927,  // w13 lapse stability exponent
  0.14,    // w14 lapse retrievability exponent
  2.9898,  // w15 Hard (grade 2) stability multiplier
  0.51,    // w16 Easy (grade 4) stability multiplier
  0.9632,  // w17 (reserved)
  2.3,     // w18 (reserved)
];

// The FSRS power-law factor for the forgetting curve (19/81 ≈ 0.2346)
const FSRS_FACTOR = 19 / 81;

/**
 * Compute current retrievability R given elapsed days t and stability S.
 * Uses the power-law forgetting curve from the FSRS paper:
 *   R(t, S) = (1 + FACTOR·t/S)^(-1/FACTOR)
 * At t=S, R ≈ 0.90 (90% recall — the definition of S).
 */
function computeR(t: number, s: number): number {
  return Math.pow(1 + FSRS_FACTOR * (t / s), -1 / FSRS_FACTOR);
}

/**
 * Compute the initial difficulty D_0 for a given grade.
 * D_0(G) = w4 - (G - 3) * w6, clamped to [1, 10].
 */
function initialDifficulty(grade: number): number {
  return Math.min(10, Math.max(1, W[4] - (grade - 3) * W[6]));
}

/**
 * FSRS-6 scheduling: compute next stability, difficulty, and review date.
 *
 * @param grade        Student recall rating: 1=Again, 2=Hard, 3=Good, 4=Easy
 * @param prevStability  Previous stability S (null on first review)
 * @param prevDifficulty Previous difficulty D (null on first review)
 * @param elapsedDays  Days since the card was last seen (0 on first review)
 */
function computeNextReview(
  grade: number,
  prevStability: number | null,
  prevDifficulty: number | null,
  elapsedDays: number,
) {
  let newStability: number;
  let newDifficulty: number;

  if (prevStability === null) {
    // ── First review: initialise from grade ──────────────────────────────────
    // Initial stability uses the grade-indexed w0–w3 values.
    newStability = W[Math.max(0, Math.min(3, grade - 1))];
    newDifficulty = initialDifficulty(grade);
  } else {
    const S = prevStability;
    const D = prevDifficulty ?? W[4];
    const t = Math.max(0, elapsedDays);
    const R = computeR(t, S);

    if (grade === 1) {
      // ── Lapse: student forgot the card ────────────────────────────────────
      // S_f = w11 · D^(-w12) · ((S+1)^w13 - 1) · e^(w14·(1-R))
      newStability = Math.max(
        0.1,
        W[11] *
          Math.pow(D, -W[12]) *
          (Math.pow(S + 1, W[13]) - 1) *
          Math.exp(W[14] * (1 - R)),
      );
    } else {
      // ── Success: student recalled the card (Hard / Good / Easy) ──────────
      // Grade-specific multiplier: Hard → w15, Good → 1.0, Easy → w16
      const gradeWeight = grade === 2 ? W[15] : grade === 4 ? W[16] : 1.0;
      // S' = S · (e^w8 · (11-D) · S^(-w9) · (e^(w10·(1-R)) - 1) · gradeWeight + 1)
      const stabilityGain =
        Math.exp(W[8]) *
        (11 - D) *
        Math.pow(S, -W[9]) *
        (Math.exp(W[10] * (1 - R)) - 1) *
        gradeWeight;
      newStability = Math.max(S * 0.1, S * (stabilityGain + 1));
    }

    // ── Difficulty update with mean reversion ────────────────────────────────
    // ΔD = -w6·(G-3),  D'' = D + ΔD·(10-D)/9
    // D' = w5·D_0(4) + (1-w5)·D''
    const deltaD = -W[6] * (grade - 3);
    const dPrime = D + deltaD * ((10 - D) / 9);
    const d0Easy = initialDifficulty(4);
    newDifficulty = Math.min(10, Math.max(1, W[5] * d0Easy + (1 - W[5]) * dPrime));
  }

  // Schedule next review so that R at review time ≈ 0.90
  // By definition of S, t=S gives R≈0.90, so interval = S days.
  const intervalDays = Math.max(1, Math.round(newStability));
  const nextReviewAt = new Date();
  nextReviewAt.setDate(nextReviewAt.getDate() + intervalDays);

  return { newStability, newDifficulty, nextReviewAt };
}

router.post("/reviews", async (req, res): Promise<void> => {
  const parsed = SubmitReviewBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { studentId, cardId, deckId, grade, elapsedDays } = parsed.data;
  const recalled = grade >= 2;

  // Get current card state
  const [state] = await db
    .select()
    .from(cardStatesTable)
    .where(and(eq(cardStatesTable.studentId, studentId), eq(cardStatesTable.cardId, cardId)));

  const { newStability, newDifficulty, nextReviewAt } = computeNextReview(
    grade,
    state?.stability ?? null,
    state?.difficulty ?? null,
    elapsedDays ?? 0,
  );

  // Insert review
  const [review] = await db
    .insert(reviewsTable)
    .values({
      studentId,
      cardId,
      deckId,
      grade,
      recalled,
      elapsedDays,
      stabilityBefore: state?.stability ?? null,
      stabilityAfter: newStability,
      difficultyAfter: newDifficulty,
      nextReviewAt,
    })
    .returning();

  // Upsert card state
  if (state) {
    await db
      .update(cardStatesTable)
      .set({
        stability: newStability,
        difficulty: newDifficulty,
        reviewCount: (state.reviewCount ?? 0) + 1,
        lastReviewedAt: new Date(),
        nextReviewAt,
      })
      .where(eq(cardStatesTable.id, state.id));
  } else {
    await db.insert(cardStatesTable).values({
      studentId,
      cardId,
      deckId,
      stability: newStability,
      difficulty: newDifficulty,
      reviewCount: 1,
      lastReviewedAt: new Date(),
      nextReviewAt,
    });
  }

  // Fire-and-forget achievement check (non-blocking)
  checkAndIssueStudentAchievements(studentId).catch(() => {});

  res.status(201).json(review);
});

router.get("/students/:studentId/due-cards", async (req, res): Promise<void> => {
  const params = GetDueCardsParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const query = GetDueCardsQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: query.error.message });
    return;
  }

  const now = new Date();

  // Cards that are due (next review <= now) or never reviewed
  const dueCards = await db
    .select({
      cardId: cardsTable.id,
      deckId: cardsTable.deckId,
      front: cardsTable.front,
      back: cardsTable.back,
      hint: cardsTable.hint,
      stabilityDays: cardStatesTable.stability,
      difficulty: cardStatesTable.difficulty,
      reviewCount: sql<number>`coalesce(${cardStatesTable.reviewCount}, 0)`,
      lastReviewedAt: cardStatesTable.lastReviewedAt,
      nextReviewAt: cardStatesTable.nextReviewAt,
      isNew: sql<boolean>`${cardStatesTable.id} is null`,
    })
    .from(cardsTable)
    .leftJoin(
      cardStatesTable,
      and(
        eq(cardsTable.id, cardStatesTable.cardId),
        eq(cardStatesTable.studentId, params.data.studentId)
      )
    )
    .where(
      and(
        query.data.deckId ? eq(cardsTable.deckId, query.data.deckId) : undefined,
        or(isNull(cardStatesTable.nextReviewAt), lte(cardStatesTable.nextReviewAt, now))
      )
    )
    .orderBy(sql`${cardStatesTable.nextReviewAt} asc nulls first`)
    .limit(50);

  // Compute predicted retention
  const result = dueCards.map((card) => {
    let predictedRetention: number | null = null;
    if (card.stabilityDays && card.lastReviewedAt) {
      const daysSince = (now.getTime() - new Date(card.lastReviewedAt).getTime()) / 86400000;
      predictedRetention = Math.pow(0.9, daysSince / card.stabilityDays);
    }
    return { ...card, predictedRetention };
  });

  res.json(GetDueCardsResponse.parse(result));
});

router.get("/students/:studentId/reviews", async (req, res): Promise<void> => {
  const params = ListStudentReviewsParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const query = ListStudentReviewsQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: query.error.message });
    return;
  }

  const conditions = [eq(reviewsTable.studentId, params.data.studentId)];
  if (query.data.deckId) conditions.push(eq(reviewsTable.deckId, query.data.deckId));

  const reviews = await db
    .select()
    .from(reviewsTable)
    .where(and(...conditions))
    .orderBy(sql`${reviewsTable.reviewedAt} desc`)
    .limit(query.data.limit ?? 100);

  res.json(ListStudentReviewsResponse.parse(reviews));
});

router.post("/students/:studentId/reset-progress", async (req, res): Promise<void> => {
  const params = GetDueCardsParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const studentId = params.data.studentId;

  // Reset all card states' nextReviewAt to today (so they appear as due cards again)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  await db
    .update(cardStatesTable)
    .set({ nextReviewAt: today })
    .where(eq(cardStatesTable.studentId, studentId));

  res.json({ success: true, message: "Study progress reset for today" });
});

export default router;
