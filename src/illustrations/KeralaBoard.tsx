import React, { useMemo } from "react";
import { interpolate, random, useCurrentFrame } from "remotion";
import { colors } from "../theme";
import { KERALA_PATH, KERALA_W, KERALA_H } from "./keralaPath";

// Institution / anchor node anchor points, in the traced path's coordinate
// space (584 × 940; north at top, south at bottom).
export const NODES = {
  kannur: { x: 150, y: 165 },
  kozhikode: { x: 220, y: 320 },
  thrissur: { x: 300, y: 470 },
  kochi: { x: 330, y: 560 },
  trivandrum: { x: 412, y: 840 },
  vizhinjam: { x: 436, y: 888 },
  centre: { x: 300, y: 470 },
} as const;

type Pt = { x: number; y: number };
type Trace = { pts: Pt[]; len: number; segs: number[]; flow: boolean; phase: number };

// Build an orthogonal PCB trace as a random right-angle walk.
function buildTrace(seed: string): Trace {
  const pts: Pt[] = [];
  let x = 60 + random(seed + "x") * 460;
  let y = 40 + random(seed + "y") * 840;
  pts.push({ x, y });
  const steps = 3 + Math.floor(random(seed + "n") * 5);
  let horiz = random(seed + "h") > 0.5;
  for (let i = 0; i < steps; i++) {
    const dist = 30 + random(seed + "d" + i) * 130;
    const dir = random(seed + "s" + i) > 0.5 ? 1 : -1;
    if (horiz) x += dist * dir;
    else y += dist * dir;
    pts.push({ x, y });
    horiz = !horiz;
  }
  const segs: number[] = [];
  let len = 0;
  for (let i = 1; i < pts.length; i++) {
    const l = Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
    segs.push(l);
    len += l;
  }
  return { pts, len, segs, flow: random(seed + "f") > 0.45, phase: random(seed + "p") };
}

function pointAt(tr: Trace, t: number): Pt {
  let d = t * tr.len;
  for (let i = 0; i < tr.segs.length; i++) {
    if (d <= tr.segs[i]) {
      const f = tr.segs[i] === 0 ? 0 : d / tr.segs[i];
      return {
        x: tr.pts[i].x + (tr.pts[i + 1].x - tr.pts[i].x) * f,
        y: tr.pts[i].y + (tr.pts[i + 1].y - tr.pts[i].y) * f,
      };
    }
    d -= tr.segs[i];
  }
  return tr.pts[tr.pts.length - 1];
}

// The recurring hero: Kerala as a glowing printed-circuit board. Supports a
// simple "camera" (focus point + zoom) for the flythrough, a coastline draw-on,
// flowing data along the traces, and children rendered in board-space.
export const KeralaBoard: React.FC<{
  width?: number;
  draw?: number; // 0..1 coastline + fill reveal
  energy?: number; // 0..1 how lit the traces are
  focus?: Pt; // board-space point to centre on
  zoom?: number; // 1 = whole board
  traceCount?: number;
  children?: React.ReactNode; // rendered inside the same SVG (board-space)
  dimFill?: boolean;
}> = ({ width = 560, draw = 1, energy = 1, focus, zoom = 1, traceCount = 46, children, dimFill }) => {
  const frame = useCurrentFrame();
  const traces = useMemo(
    () => new Array(traceCount).fill(0).map((_, i) => buildTrace("t" + i)),
    [traceCount],
  );

  const aspect = KERALA_H / KERALA_W;
  const height = width * aspect;

  // camera transform inside the viewBox
  const cx = focus?.x ?? KERALA_W / 2;
  const cy = focus?.y ?? KERALA_H / 2;
  const camT = `translate(${KERALA_W / 2} ${KERALA_H / 2}) scale(${zoom}) translate(${-cx} ${-cy})`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${KERALA_W} ${KERALA_H}`} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="kbFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(40,120,140,0.30)" />
          <stop offset="100%" stopColor="rgba(20,50,80,0.10)" />
        </linearGradient>
        <clipPath id="kbClip">
          <path d={KERALA_PATH} />
        </clipPath>
        <filter id="kbGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.4" />
        </filter>
        <radialGradient id="kbVign" cx="50%" cy="45%" r="70%">
          <stop offset="0%" stopColor="rgba(143,216,236,0.16)" />
          <stop offset="100%" stopColor="rgba(143,216,236,0)" />
        </radialGradient>
      </defs>

      <g transform={camT}>
        {/* fill */}
        <path d={KERALA_PATH} fill={dimFill ? "rgba(20,40,64,0.5)" : "url(#kbFill)"} opacity={draw} />
        <path d={KERALA_PATH} fill="url(#kbVign)" opacity={draw} />

        {/* traces clipped to silhouette */}
        <g clipPath="url(#kbClip)">
          {traces.map((tr, i) => {
            const dpath = "M " + tr.pts.map((p) => `${p.x} ${p.y}`).join(" L ");
            const litAt = (i / traces.length) * 30;
            const lit = interpolate(frame - litAt, [0, 24], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) * energy;
            return (
              <g key={i}>
                <path d={dpath} fill="none" stroke={colors.iceDeep} strokeWidth={1.3} opacity={0.18 + 0.22 * lit} strokeLinecap="square" strokeLinejoin="miter" />
                {/* pads */}
                {tr.pts.map((p, j) => (
                  <circle key={j} cx={p.x} cy={p.y} r={j === 0 || j === tr.pts.length - 1 ? 3.4 : 2} fill={colors.iceDeep} opacity={0.3 + 0.4 * lit} />
                ))}
                {/* flowing data */}
                {tr.flow && energy > 0.05 &&
                  [0, 0.5].map((off, k) => {
                    const t = (frame / 70 + tr.phase + off) % 1;
                    const p = pointAt(tr, t);
                    return <circle key={k} cx={p.x} cy={p.y} r={2.6} fill={colors.iceSoft} opacity={lit * (0.5 + 0.5 * Math.sin(t * Math.PI))} style={{ filter: "drop-shadow(0 0 4px rgba(188,235,246,0.9))" }} />;
                  })}
              </g>
            );
          })}
        </g>

        {/* coastline draw-on */}
        <path
          d={KERALA_PATH}
          fill="none"
          stroke={colors.ice}
          strokeWidth={2.6}
          strokeDasharray={5200}
          strokeDashoffset={5200 * (1 - draw)}
          style={{ filter: "drop-shadow(0 0 6px rgba(143,216,236,0.7))" }}
        />

        {children}
      </g>
    </svg>
  );
};
