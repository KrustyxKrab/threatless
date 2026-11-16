import type { IconName } from '@/components/ui/icons';

/** Global app metadata and navigation. Single source of truth for SEO + menus. */
export const SITE = {
  name: 'Krise-Quartett',
  org: 'SPREUWEIZEN',
  tagline: 'Cybersecurity learning & emergency response',
  description:
    'Krise-Quartett: short, gamified cybersecurity training for nonprofit teams – with a traffic-light alert system and one-click incident reporting.',
  ogImage: '/og-image.jpg',
  /** Recipient for incident reports. Leave empty to let the user choose in their mail app. */
  reportEmail: '',
} as const;

export interface NavItem {
  href: string;
  label: string;
  icon: IconName;
  accent?: boolean;
}

export const NAV: readonly NavItem[] = [
  { href: '/', label: 'Home', icon: 'home' },
  { href: '/learn/', label: 'Learn', icon: 'learn' },
  { href: '/report/', label: 'Get help', icon: 'report', accent: true },
  { href: '/status/', label: 'Alert', icon: 'status' },
  { href: '/framework/', label: 'Basics', icon: 'framework' },
];
