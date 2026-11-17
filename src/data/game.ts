/**
 * Gamification rules and roles.
 * Kept separate from lesson content so client scripts that import these stay tiny.
 */
export type Role = 'employee' | 'volunteer';

export const ROLES: readonly { id: Role; label: string; hint: string }[] = [
  { id: 'employee', label: 'Employee', hint: 'You work with internal tools, partner contacts and shared files.' },
  { id: 'volunteer', label: 'Volunteer', hint: 'You support workshops and events and use selected tools.' },
];

export const XP_PER_CORRECT = 10;

export const RANKS = [
  { min: 0, label: 'Beginner' },
  { min: 60, label: 'Spotter' },
  { min: 140, label: 'Guardian' },
  { min: 220, label: 'Scam Expert' },
] as const;

export const rankFor = (xp: number) => [...RANKS].reverse().find((r) => xp >= r.min)!;

/** Next rank and how many points are missing, or null at the top. */
export const nextRank = (xp: number) => {
  const next = RANKS.find((r) => r.min > xp);
  return next ? { label: next.label, missing: next.min - xp } : null;
};
