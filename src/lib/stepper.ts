/**
 * Generic step-by-step player for lessons and quizzes.
 *
 * Markup contract (inside `root`):
 *  - `[data-step]`               one per screen; the last one is the result screen
 *  - `[data-quiz]`               marks a step as a question
 *  - `[data-option]`             answer buttons; the right one has `data-correct`
 *  - `[data-feedback]`           hidden until answered; gets `is-right` / `is-wrong`
 *  - `[data-prev]`, `[data-next]`, `[data-restart]`
 *  - optional `[data-stepper-bar]`, `[data-stepper-count]`, `[data-score]`
 */
export interface StepperResult {
  correct: number;
  total: number;
}

export function initStepper(root: HTMLElement, onFinish: (r: StepperResult) => void): void {
  const steps = [...root.querySelectorAll<HTMLElement>('[data-step]')];
  const quizzes = root.querySelectorAll<HTMLElement>('[data-quiz]');
  const bar = root.querySelector<HTMLElement>('[data-stepper-bar]');
  const count = root.querySelector<HTMLElement>('[data-stepper-count]');
  const last = steps.length - 1;
  let index = 0;
  let correct = 0;

  function show(n: number) {
    index = Math.max(0, Math.min(n, last));
    steps.forEach((s, i) => (s.hidden = i !== index));
    bar?.style.setProperty('--value', `${Math.min(100, ((index + 1) / last) * 100)}%`);
    if (count) count.textContent = index === last ? 'Done' : `${index + 1} / ${last}`;
    if (root.getBoundingClientRect().top < 0) root.scrollIntoView({ behavior: 'smooth', block: 'start' });
    steps[index].querySelector<HTMLElement>('[data-step-title]')?.focus({ preventScroll: true });
  }

  function answer(option: HTMLButtonElement) {
    const quiz = option.closest<HTMLElement>('[data-quiz]');
    if (!quiz || quiz.dataset.answered) return;
    quiz.dataset.answered = 'true';
    const isRight = option.hasAttribute('data-correct');
    if (isRight) correct += 1;
    quiz.dataset.result = isRight ? 'right' : 'wrong';

    quiz.querySelectorAll<HTMLButtonElement>('[data-option]').forEach((b) => {
      b.disabled = true;
      if (b.hasAttribute('data-correct')) b.classList.add('is-correct');
      else if (b === option) b.classList.add('is-wrong');
      else b.classList.add('is-dim');
    });

    const feedback = quiz.querySelector<HTMLElement>('[data-feedback]');
    if (feedback) {
      feedback.classList.add(isRight ? 'is-right' : 'is-wrong');
      const heading = feedback.querySelector<HTMLElement>('[data-feedback-heading]');
      if (heading) {
        heading.textContent = isRight
          ? '✓ Correct!'
          : 'Not quite – that’s what practice is for.';
      }
      feedback.hidden = false;
      feedback.querySelector<HTMLElement>('[data-next]')?.focus({ preventScroll: true });
    }
  }

  function next() {
    const target = index + 1;
    if (target === last) {
      const result = { correct, total: quizzes.length };
      const score = root.querySelector('[data-score]');
      if (score) score.textContent = `${correct} / ${quizzes.length}`;
      onFinish(result);
    }
    show(Math.min(target, last));
  }

  function prev() {
    if (index > 0) show(index - 1);
  }

  function restart() {
    correct = 0;
    quizzes.forEach((q) => {
      delete q.dataset.answered;
      delete q.dataset.result;
      q.querySelectorAll<HTMLButtonElement>('[data-option]').forEach((b) => {
        b.disabled = false;
        b.classList.remove('is-correct', 'is-wrong', 'is-dim');
      });
      const feedback = q.querySelector<HTMLElement>('[data-feedback]');
      if (feedback) {
        feedback.hidden = true;
        feedback.classList.remove('is-right', 'is-wrong');
      }
    });
    show(0);
  }

  root.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement).closest<HTMLElement>('[data-option], [data-next], [data-prev], [data-restart]');
    if (!target) return;
    if (target.matches('[data-option]')) answer(target as HTMLButtonElement);
    else if (target.matches('[data-next]')) next();
    else if (target.matches('[data-prev]')) prev();
    else restart();
  });

  show(0);
}
