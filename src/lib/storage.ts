/**
 * Cookie-Session + Browser Progress Store (no server, no database).
 * Maintains a first-party session cookie (`kq_session` + compact `kq_state` cookie)
 * alongside full structured state in `localStorage` (`kq:v2`).
 * Reads are defensive so corrupt or blocked storage never breaks the UI.
 * Every write broadcasts a `kq:progress` event so all islands update live.
 */
import type { Level } from '@/data/levels';
import type { Role } from '@/data/game';

const STORAGE_KEY = 'kq:v2';
const SESSION_COOKIE = 'kq_session';
const STATE_COOKIE = 'kq_state';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export interface ModuleResult {
  best: number;
  total: number;
}

export interface Report {
  id: string;
  type: string;
  at: number;
  done: number[];
  note: string;
}

export interface Progress {
  sessionId: string;
  role: Role | null;
  modules: Record<string, ModuleResult>;
  frameworkQuiz: number | null;
  check: Record<string, number>;
  level: Level;
  reports: Report[];
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, maxAge = COOKIE_MAX_AGE): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function ensureSessionId(): string {
  const existing = getCookie(SESSION_COOKIE);
  if (existing) return existing;
  const generated = `sw-${Math.random().toString(36).slice(2, 8)}-${Date.now().toString(36).slice(-4)}`;
  setCookie(SESSION_COOKIE, generated);
  return generated;
}

const empty = (): Progress => ({
  sessionId: ensureSessionId(),
  role: null,
  modules: {},
  frameworkQuiz: null,
  check: {},
  level: 'green',
  reports: [],
});

/** Sync compact state into a cookie so session progress persists even if localStorage is cleared. */
function syncStateCookie(p: Progress): void {
  const compact = {
    s: p.sessionId,
    r: p.role,
    l: p.level,
    m: p.modules,
    fq: p.frameworkQuiz,
    c: p.check,
  };
  setCookie(STATE_COOKIE, JSON.stringify(compact));
}

function restoreFromStateCookie(): Partial<Progress> | null {
  try {
    const raw = getCookie(STATE_COOKIE);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return {
      sessionId: parsed.s || ensureSessionId(),
      role: parsed.r ?? null,
      level: parsed.l ?? 'green',
      modules: parsed.m ?? {},
      frameworkQuiz: parsed.fq ?? null,
      check: parsed.c ?? {},
    };
  } catch {
    return null;
  }
}

export function load(): Progress {
  const base = empty();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<Progress>;
      const merged: Progress = {
        ...base,
        ...parsed,
        sessionId: parsed.sessionId || base.sessionId,
      };
      syncStateCookie(merged);
      return merged;
    }
    const fromCookie = restoreFromStateCookie();
    if (fromCookie) {
      const restored = { ...base, ...fromCookie };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(restored));
      return restored;
    }
    syncStateCookie(base);
    return base;
  } catch {
    return { ...base, ...(restoreFromStateCookie() ?? {}) };
  }
}

const emit = (p: Progress) => {
  if (typeof document !== 'undefined') {
    document.dispatchEvent(new CustomEvent<Progress>('kq:progress', { detail: p }));
  }
};

export function update(mutate: (p: Progress) => void): Progress {
  const next = load();
  mutate(next);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* storage full or disabled – state lives in cookie and memory */
  }
  syncStateCookie(next);
  emit(next);
  return next;
}

export function reset(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
  setCookie(SESSION_COOKIE, '', 0);
  setCookie(STATE_COOKIE, '', 0);
  const fresh = empty();
  syncStateCookie(fresh);
  emit(fresh);
}

/** Subscribe to progress changes; immediately invoked with the current state. */
export function watch(render: (p: Progress) => void): void {
  render(load());
  document.addEventListener('kq:progress', (e) => render((e as CustomEvent<Progress>).detail));
}
