import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors } from "../theme";

type Facet = { points: string; base: string; lightOffset: number };

// A stylised round-brilliant diamond built from flat facets. The crown is a
// ring of triangles around a central table; each facet catches the light at a
// slightly different phase so the whole stone shimmers.
const FACETS: Facet[] = [
  // central table (octagon)
  { points: "0,-34 24,-24 34,0 24,24 0,34 -24,24 -34,0 -24,-24", base: colors.iceSoft, lightOffset: 0 },
];

// outer crown facets (kite + star pattern around the table)
const OUTER: Facet[] = [];
const R1 = 34; // table radius
const R2 = 92; // girdle radius
const N = 8;
for (let i = 0; i < N; i++) {
  const a0 = (i / N) * Math.PI * 2 - Math.PI / 2;
  const a1 = ((i + 1) / N) * Math.PI * 2 - Math.PI / 2;
  const amid = (a0 + a1) / 2;
  const tx0 = Math.cos(a0) * R1, ty0 = Math.sin(a0) * R1;
  const tx1 = Math.cos(a1) * R1, ty1 = Math.sin(a1) * R1;
  const gx = Math.cos(amid) * R2, gy = Math.sin(amid) * R2;
  const gx0 = Math.cos(a0) * R2, gy0 = Math.sin(a0) * R2;
  // kite facet
  OUTER.push({
    points: `${tx0},${ty0} ${gx},${gy} ${tx1},${ty1} 0,0`,
    base: i % 2 === 0 ? colors.ice : colors.iceDeep,
    lightOffset: i * 0.7,
  });
  // star facet along the girdle edge
  OUTER.push({
    points: `${tx0},${ty0} ${gx0},${gy0} ${gx},${gy}`,
    base: i % 2 === 0 ? colors.iceDeep : colors.ice,
    lightOffset: i * 0.7 + 0.35,
  });
}

export const Diamond: React.FC<{
  size?: number;
  progress?: number; // 0..1 assembly progress
  spin?: number; // additional rotation in degrees
}> = ({ size = 360, progress = 1, spin = 0 }) => {
  const frame = useCurrentFrame();
  const all = [...OUTER, ...FACETS];

  return (
    <svg
      width={size}
      height={size}
      viewBox="-120 -120 240 240"
      style={{ overflow: "visible", transform: `rotate(${spin}deg)` }}
    >
      <defs>
        <radialGradient id="dGlow" cx="50%" cy="42%" r="62%">
          <stop offset="0%" stopColor={colors.iceSoft} stopOpacity="0.95" />
          <stop offset="55%" stopColor={colors.ice} stopOpacity="0.35" />
          <stop offset="100%" stopColor={colors.iceDeep} stopOpacity="0" />
        </radialGradient>
        <filter id="dBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* aura */}
      <circle
        cx="0"
        cy="0"
        r={92}
        fill="url(#dGlow)"
        opacity={0.5 * progress}
        filter="url(#dBlur)"
      />

      {all.map((f, i) => {
        const appear = interpolate(
          progress,
          [i / all.length * 0.7, i / all.length * 0.7 + 0.32],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        const shimmer = interpolate(
          Math.sin(frame / 22 + f.lightOffset),
          [-1, 1],
          [0.45, 1],
        );
        return (
          <polygon
            key={i}
            points={f.points}
            fill={f.base}
            opacity={appear * shimmer}
            stroke="rgba(255,255,255,0.55)"
            strokeWidth={0.6}
            strokeOpacity={appear * 0.7}
            style={{
              transform: `scale(${0.82 + 0.18 * appear})`,
              transformOrigin: "center",
            }}
          />
        );
      })}

      {/* bright table highlight */}
      <polygon
        points="0,-30 14,-12 0,2 -14,-12"
        fill="#FFFFFF"
        opacity={interpolate(Math.sin(frame / 16), [-1, 1], [0.25, 0.7]) * progress}
      />
      {/* crown rim */}
      <circle
        cx="0"
        cy="0"
        r={R2}
        fill="none"
        stroke={colors.goldSoft}
        strokeWidth={1.1}
        strokeOpacity={0.5 * progress}
      />
    </svg>
  );
};
