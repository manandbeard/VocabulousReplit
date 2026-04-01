import { useState } from "react";
import {
  Flame, Target, CheckCircle2, PlayCircle, TrendingUp, Clock,
  BookOpen, Zap, Calendar, Award, ChevronRight, BarChart2
} from "lucide-react";

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const WEEK_ACTIVITY = [12, 8, 20, 5, 18, 24, 14];
const MAX_ACTIVITY = Math.max(...WEEK_ACTIVITY);

const DECKS = [
  { name: "Spanish Vocabulary", subject: "Languages", due: 12, color: "bg-violet-50 border-violet-100", accent: "text-violet-600" },
  { name: "Cell Biology", subject: "Science", due: 5, color: "bg-emerald-50 border-emerald-100", accent: "text-emerald-600" },
  { name: "World History", subject: "History", due: 9, color: "bg-amber-50 border-amber-100", accent: "text-amber-600" },
];

function ShadowCard({ children, className = "", hover = true }: { children: React.ReactNode; className?: string; hover?: boolean }) {
  return (
    <div className={`bg-white rounded-3xl border border-slate-200 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.10)] ${hover ? "hover:shadow-[0_8px_32px_-4px_rgba(15,23,42,0.16)] hover:-translate-y-0.5" : ""} transition-all duration-200 ${className}`}>
      {children}
    </div>
  );
}

export default function StudentDashboardExpanded() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Due Today", "In Progress", "Mastered"];

  return (
    <div className="min-h-screen bg-slate-50 font-['Inter']">
      <div className="max-w-5xl mx-auto p-8 space-y-6">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Student Dashboard</p>
            <h1 className="text-4xl font-light text-slate-900">
              Ready to learn,{" "}
              <span className="font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                Alex?
              </span>
            </h1>
            <p className="mt-2 text-slate-500 font-light">
              You have <span className="font-semibold text-slate-900">26 cards</span> due for review today.
            </p>
          </div>
          <div className="flex gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeFilter === f
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-white border border-slate-200 text-slate-600 hover:border-slate-400"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Row 1 — Hero stats bento */}
        <div className="grid grid-cols-12 gap-4">

          {/* Streak — dark hero */}
          <div className="col-span-3 bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.30)] flex flex-col justify-between relative overflow-hidden">
            <BarChart2 className="absolute right-[-10%] bottom-[-15%] w-28 h-28 text-slate-800 opacity-60" />
            <div className="relative z-10">
              <p className="text-slate-400 text-xs font-semibold mb-3 uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-orange-400" /> Current Streak
              </p>
              <p className="text-6xl font-black tracking-tight">7</p>
              <p className="text-slate-400 text-xs mt-1">days in a row 🔥</p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-800 relative z-10">
              <p className="text-xs text-slate-500">Best: <span className="text-slate-300 font-semibold">14 days</span></p>
            </div>
          </div>

          {/* Today's Progress — spans 5 cols */}
          <ShadowCard className="col-span-5 p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" /> Today's Goal
              </p>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">14 / 26 done</span>
            </div>
            <div>
              <div className="flex items-end gap-1 h-16 mb-3">
                {WEEK_ACTIVITY.map((v, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className={`w-full rounded-t-md transition-all ${i === 6 ? "bg-gradient-to-t from-blue-600 to-purple-500" : "bg-slate-200"}`}
                      style={{ height: `${(v / MAX_ACTIVITY) * 100}%` }}
                    />
                    <span className="text-[9px] text-slate-400 font-medium">{DAYS[i]}</span>
                  </div>
                ))}
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                  style={{ width: "54%" }}
                />
              </div>
              <div className="flex justify-between mt-1.5">
                <span className="text-[10px] text-slate-400">0</span>
                <span className="text-[10px] font-semibold text-slate-600">54% complete</span>
                <span className="text-[10px] text-slate-400">26</span>
              </div>
            </div>
          </ShadowCard>

          {/* Quick stats — 4 cols stacked */}
          <div className="col-span-4 grid grid-rows-2 gap-4">
            <ShadowCard className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Avg Retention</p>
                <p className="text-3xl font-black text-slate-900 tracking-tight">84%</p>
              </div>
            </ShadowCard>
            <ShadowCard className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Cards Mastered</p>
                <p className="text-3xl font-black text-slate-900 tracking-tight">142</p>
              </div>
            </ShadowCard>
          </div>
        </div>

        {/* Row 2 — New cards */}
        <div className="grid grid-cols-12 gap-4">

          {/* Study Time */}
          <ShadowCard className="col-span-3 p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> Study Time
            </p>
            <p className="text-4xl font-black text-slate-900 tracking-tight">2h 14m</p>
            <p className="text-xs text-slate-500 mt-1">this week</p>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-500">Daily avg: <span className="font-semibold text-slate-700">19 min</span></p>
            </div>
          </ShadowCard>

          {/* Next Due — amber accent */}
          <div className="col-span-4 bg-amber-50 rounded-3xl border border-amber-100 shadow-[0_4px_24px_-4px_rgba(217,119,6,0.15)] hover:shadow-[0_8px_32px_-4px_rgba(217,119,6,0.22)] hover:-translate-y-0.5 transition-all duration-200 p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-600 mb-4 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" /> Up Next
            </p>
            <p className="text-lg font-bold text-slate-900">Spanish Vocabulary</p>
            <p className="text-xs text-slate-500 mt-1">12 cards due · Languages</p>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex-1 h-1.5 bg-amber-200 rounded-full overflow-hidden">
                <div className="h-full w-[60%] bg-amber-500 rounded-full" />
              </div>
              <span className="text-[10px] font-semibold text-amber-700">60% through deck</span>
            </div>
            <button className="mt-5 w-full py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2">
              <PlayCircle className="w-4 h-4" /> Start →
            </button>
          </div>

          {/* Recent Achievement */}
          <div className="col-span-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl border border-blue-500 shadow-[0_4px_24px_-4px_rgba(37,99,235,0.30)] hover:shadow-[0_8px_32px_-4px_rgba(37,99,235,0.40)] hover:-translate-y-0.5 transition-all duration-200 p-6 flex flex-col justify-between">
            <Award className="w-8 h-8 text-white/70" />
            <div>
              <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-1">New Achievement</p>
              <p className="text-white font-black text-lg leading-snug">7-Day Scholar 🏅</p>
              <p className="text-white/60 text-xs mt-1">Reviewed cards 7 days straight</p>
            </div>
          </div>

          {/* CTA */}
          <ShadowCard className="col-span-2 p-6 flex flex-col justify-between items-center text-center gap-3">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
              <PlayCircle className="w-6 h-6 text-slate-500" />
            </div>
            <p className="text-sm text-slate-500 font-medium">26 cards due</p>
            <button className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-colors">
              Study All
            </button>
          </ShadowCard>
        </div>

        {/* Row 3 — Deck Cards */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" /> My Decks
          </p>
          <div className="grid grid-cols-3 gap-4">
            {DECKS.map((deck, i) => (
              <ShadowCard key={i} className="overflow-hidden">
                <div className={`${deck.color} border-b p-5`}>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${deck.accent}`}>{deck.subject}</span>
                  <h3 className="text-base font-bold text-slate-900 mt-1">{deck.name}</h3>
                </div>
                <div className="px-5 py-3 flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    <span className="font-bold text-slate-900">{deck.due}</span> due today
                  </span>
                  <button className="flex items-center gap-1 text-sm font-semibold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text hover:opacity-70 transition-opacity">
                    Study <ChevronRight className="w-3.5 h-3.5 text-blue-600" />
                  </button>
                </div>
              </ShadowCard>
            ))}
          </div>
        </div>

        {/* Row 4 — Weekly calendar strip */}
        <ShadowCard className="p-6" hover={false}>
          <div className="flex items-center justify-between mb-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> This Week
            </p>
            <span className="text-xs text-slate-400">Apr 1 – Apr 7, 2026</span>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {DAYS.map((d, i) => {
              const done = WEEK_ACTIVITY[i] >= 10;
              const today = i === 6;
              return (
                <div key={i} className={`flex flex-col items-center gap-2 p-3 rounded-2xl ${today ? "bg-slate-900 text-white" : done ? "bg-slate-50" : "bg-white"}`}>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${today ? "text-slate-300" : "text-slate-400"}`}>{d}</span>
                  <div className={`w-2 h-2 rounded-full ${done ? (today ? "bg-green-400" : "bg-emerald-500") : "bg-slate-200"}`} />
                  <span className={`text-xs font-bold ${today ? "text-white" : "text-slate-700"}`}>{WEEK_ACTIVITY[i]}</span>
                  <span className={`text-[9px] ${today ? "text-slate-400" : "text-slate-400"}`}>cards</span>
                </div>
              );
            })}
          </div>
        </ShadowCard>

      </div>
    </div>
  );
}
