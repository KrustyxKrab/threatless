/** Points = right answers × XP_PER_CORRECT (best try per lesson + basics quiz). Local only. */
import { XP_PER_CORRECT } from '@/data/game';
import type { Progress } from './storage';

export const pointsOf = (p: Progress): number =>
  (Object.values(p.modules).reduce((sum, m) => sum + m.best, 0) + (p.frameworkQuiz ?? 0)) * XP_PER_CORRECT;
