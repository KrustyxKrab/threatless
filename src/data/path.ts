/** The learning path: five lessons, then the big picture (framework quiz). Order = recommended order. */
import { MODULES } from './modules';
import { CSF_QUIZ } from './csf';
import type { ArtKey } from './art';
import type { Role } from './game';

export interface PathStep {
  id: string;
  title: string;
  minutes: number;
  href: string;
  art: ArtKey;
  badge: string;
  questions: number;
  requiredFor: Role[];
}

import { BASICS_ID } from '@/lib/path-state';

export const PATH: readonly PathStep[] = [
  ...MODULES.map((m) => ({
    id: m.id,
    title: m.title,
    minutes: m.minutes,
    href: `/learn/${m.id}/`,
    art: m.id as ArtKey,
    badge: m.badge,
    questions: m.quiz.length,
    requiredFor: m.requiredFor,
  })),
  {
    id: BASICS_ID,
    title: 'The big picture',
    minutes: 2,
    href: '/framework/#quiz',
    art: 'framework',
    badge: 'Big Picture',
    questions: CSF_QUIZ.length,
    requiredFor: ['employee', 'volunteer'],
  },
];
