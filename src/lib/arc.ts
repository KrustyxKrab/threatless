/** SVG arc helpers for the CSF wheel. Angles in degrees, 0° = 12 o'clock, clockwise. */
const rad = (deg: number) => (deg * Math.PI) / 180;
const r2 = (n: number) => Math.round(n * 100) / 100;

export const polar = (cx: number, cy: number, r: number, deg: number) => ({
  x: r2(cx + r * Math.sin(rad(deg))),
  y: r2(cy - r * Math.cos(rad(deg))),
});

/** Closed ring segment between radii rIn..rOut and angles a0..a1. */
export function ringSegment(cx: number, cy: number, rIn: number, rOut: number, a0: number, a1: number): string {
  const large = a1 - a0 > 180 ? 1 : 0;
  const o0 = polar(cx, cy, rOut, a0);
  const o1 = polar(cx, cy, rOut, a1);
  const i1 = polar(cx, cy, rIn, a1);
  const i0 = polar(cx, cy, rIn, a0);
  return `M${o0.x} ${o0.y}A${rOut} ${rOut} 0 ${large} 1 ${o1.x} ${o1.y}L${i1.x} ${i1.y}A${rIn} ${rIn} 0 ${large} 0 ${i0.x} ${i0.y}Z`;
}

/**
 * Open arc for text along the ring. On the lower half the arc runs counter-clockwise
 * so the label stays readable (like the NIST CSF figure).
 */
export function textArc(cx: number, cy: number, r: number, a0: number, a1: number): string {
  const mid = (a0 + a1) / 2;
  const flip = mid > 90 && mid < 270;
  const [from, to] = flip ? [a1, a0] : [a0, a1];
  const p0 = polar(cx, cy, r, from);
  const p1 = polar(cx, cy, r, to);
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
  return `M${p0.x} ${p0.y}A${r} ${r} 0 ${large} ${flip ? 0 : 1} ${p1.x} ${p1.y}`;
}
