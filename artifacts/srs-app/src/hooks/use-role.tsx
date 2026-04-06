import { useUser } from "@clerk/react";

export type Role = "teacher" | "student";

export interface RoleState {
  role: Role | null;
  setRole: (role: Role) => Promise<void>;
  userId: string | null;
  isLoaded: boolean;
}

export function useRole(): RoleState {
  const { user, isLoaded } = useUser();

  const role = isLoaded
    ? ((user?.unsafeMetadata?.role as Role | undefined) ?? null)
    : null;

  const userId = user?.id ?? null;

  const setRole = async (newRole: Role) => {
    if (!user) throw new Error("No authenticated user");
    await user.update({ unsafeMetadata: { role: newRole } });
  };

  return { role, setRole, userId, isLoaded };
}
