/** Pixel-style 24×24 icon paths (fill-rule: evenodd). */
export const ICONS = {
  home: 'M3 11 12 3l9 8v10h-6v-6H9v6H3z',
  learn: 'M1 8l11-5 11 5-11 5zM5 10.6V16c0 1.7 3.1 3.5 7 3.5s7-1.8 7-3.5v-5.4l-7 3.2zM21 9v7h1.5V9z',
  report: 'M12 2 1 21h22zM11 9h2v6h-2zm0 8h2v2h-2z',
  status: 'M7 1h10v22H7zM12 3.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5zm0 6.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5zm0 6.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5z',
  framework: 'M12 1a11 11 0 1 0 0 22 11 11 0 0 0 0-22zm0 5.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11z',
  close: 'M5 3.5l7 7 7-7L20.5 5l-7 7 7 7-1.5 1.5-7-7-7 7L3.5 19l7-7-7-7z',
  check: 'M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z',
} as const;

export type IconName = keyof typeof ICONS;
