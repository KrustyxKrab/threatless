/** Which path steps are done, and which one is next. Shared by home and learn page. */
import type { Progress } from './storage';

export const BASICS_ID = 'basics';

export const isStepDone = (id: string, p: Progress): boolean =>
  id === BASICS_ID ? p.frameworkQuiz !== null : Boolean(p.modules[id]);

export const nextStepIndex = (ids: string[], p: Progress): number => ids.findIndex((id) => !isStepDone(id, p));
