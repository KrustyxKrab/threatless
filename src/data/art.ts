import type { ImageMetadata } from 'astro';
import hero from '@/assets/art/hero.png';
import freddy from '@/assets/art/freddy.png';
import lockedFiles from '@/assets/art/locked-files.png';
import reader from '@/assets/art/reader.png';
import kit from '@/assets/art/kit.png';
import ina from '@/assets/art/ina.png';
import lua from '@/assets/art/lua.png';
import guard from '@/assets/art/guard.png';
import happy from '@/assets/art/happy.png';
import piet from '@/assets/art/piet.png';

/** SPREUWEIZEN character illustrations. Each one has a job: it shows the topic of its screen. */
export interface Art {
  src: ImageMetadata;
  alt: string;
  /** soft tint behind cut-out figures in small thumbnails */
  bg: string;
}

export const ART = {
  hero: { src: hero, alt: 'Two SPREUWEIZEN characters: one holds a newspaper, one looks at a phone', bg: 'transparent' },
  phishing: { src: freddy, alt: 'Freddy checks a note: real or fake?', bg: '#fde4ee' },
  privacy: { src: lockedFiles, alt: 'A character keeps folders locked behind bars', bg: '#dff4f2' },
  sharing: { src: reader, alt: 'A character holds a rolled-up document', bg: '#fff3b8' },
  access: { src: kit, alt: 'Kit unlocks a tablet with a handprint', bg: '#e9e1fb' },
  awareness: { src: ina, alt: 'Ina on a phone screen, surrounded by likes and comments', bg: '#ffe6cf' },
  report: { src: lua, alt: 'Lua looks worried at a laptop', bg: 'transparent' },
  status: { src: guard, alt: 'A guard with sunglasses and crossed arms keeps watch', bg: 'transparent' },
  done: { src: happy, alt: 'A happy character smiling', bg: 'transparent' },
  framework: { src: piet, alt: 'Piet holds a camera', bg: 'transparent' },
} as const satisfies Record<string, Art>;

export type ArtKey = keyof typeof ART;

export const isArtKey = (k: string): k is ArtKey => k in ART;
