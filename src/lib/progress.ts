/**
 * Derived progress helpers shared by dashboard and learn page.
 */
import type { Progress } from './storage';

/** Element carries `data-required="employee volunteer"`. Without a role, defaults to volunteer. */
export const isRequired = (el: HTMLElement, p: Progress): boolean => {
  const activeRole = p.role ?? 'volunteer';
  return (el.dataset.required ?? '').split(' ').includes(activeRole);
};

/** Update a status badge for a module row (`data-module`, `data-required`, child `[data-chip]`). */
export function paintModuleChip(el: HTMLElement, p: Progress, isNext = false): void {
  const chip = el.querySelector<HTMLElement>('[data-chip]');
  const cta = el.querySelector<HTMLElement>('[data-module-cta]');
  if (!chip) return;
  const result = p.modules[el.dataset.module ?? ''];
  const required = isRequired(el, p);
  el.classList.toggle('is-next', isNext);
  chip.className = 'kq-badge';
  if (result) {
    chip.classList.add('kq-badge--done');
    chip.textContent = `Done · ${result.best}/${result.total} right`;
    if (cta) cta.textContent = 'Practise again';
  } else if (isNext) {
    chip.classList.add('kq-badge--next');
    chip.textContent = 'Next for you';
    if (cta) cta.textContent = 'Start →';
  } else {
    chip.textContent = required ? 'For your role' : 'Optional';
    if (cta) cta.textContent = 'Start →';
  }
}
