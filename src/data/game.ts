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

const RANKS = [
  { min: 0, label: 'Rookie' },
  { min: 60, label: 'Spotter' },
  { min: 140, label: 'Guardian' },
] as const;

export const rankFor = (xp: number): string => [...RANKS].reverse().find((r) => xp >= r.min)!.label;
