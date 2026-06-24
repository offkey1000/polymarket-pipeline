import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme";

// A globe with diaspora nodes beaming streams of capital home to Kerala.
// Arcs carry travelling particles; the home node pulses as value arrives.
const R = 210;
const HOME = { x: R * 0.32, y: R * 0.42, label: "Kerala" }; // south-west-ish
const NODES = [
  { x: R * 0.55, y: R * 0.18, label: "Gulf" },
  { x: -R * 0.5, y: -R * 0.35, label: "USA" },
  { x: -R * 0.05, y: -R * 0.55, label: "UK" },
  { x: R * 0.7, y: -R * 0.2, label: "SE Asia" },
];

function arc(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  // bow the control point outward from globe centre
  const nx = mx * 1.5;
  const ny = my * 1.5;
  return { d: `M${x1} ${y1} Q${nx} ${ny} ${x2} ${y2}`, cx: nx, cy: ny };
}

export const DiasporaGlobe: React.FC<{ scale?: number }> = ({ scale = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const reveal = interpolate(frame, [4, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const homePulse = 0.5 + 0.5 * Math.sin(frame / 12);

  // quadratic point sampler
  const qpoint = (x1: number, y1: number, cx: number, cy: number, x2: number, y2: number, t: number) => {
    const mt = 1 - t;
    return {
      x: mt * mt * x1 + 2 * mt * t * cx + t * t * x2,
      y: mt * mt * y1 + 2 * mt * t * cy + t * t * y2,
    };
  };

  return (
    <svg width={560 * scale} height={560 * scale} viewBox="-280 -280 560 560" style={{ overflow: "visible" }}>
      <defs>
        <radialGradient id="globeFill" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="rgba(143,216,236,0.18)" />
          <stop offset="70%" stopColor="rgba(20,32,56,0.5)" />
          <stop offset="100%" stopColor="rgba(8,12,22,0.7)" />
        </radialGradient>
      </defs>

      {/* globe */}
      <circle cx="0" cy="0" r={R} fill="url(#globeFill)" stroke="rgba(143,216,236,0.35)" strokeWidth={1.4} opacity={reveal} />
      {/* longitudes */}
      {[0.3, 0.6, 1].map((k, i) => (
        <ellipse key={`lo${i}`} cx="0" cy="0" rx={R * k} ry={R} fill="none" stroke="rgba(143,216,236,0.18)" strokeWidth={0.8} opacity={reveal} />
      ))}
      {/* latitudes */}
      {[-0.6, -0.3, 0, 0.3, 0.6].map((k, i) => (
        <ellipse key={`la${i}`} cx="0" cy={R * k} rx={R * Math.cos(Math.asin(k))} ry={R * 0.12} fill="none" stroke="rgba(143,216,236,0.18)" strokeWidth={0.8} opacity={reveal} />
      ))}

      {/* arcs + particles */}
      {NODES.map((n, i) => {
        const a = arc(n.x, n.y, HOME.x, HOME.y);
        const ar = spring({ frame: frame - (44 + i * 8), fps, config: { damping: 200 } });
        return (
          <g key={i} opacity={ar}>
            <path d={a.d} fill="none" stroke="rgba(230,192,104,0.45)" strokeWidth={1.4} strokeDasharray="4 5" />
            {/* travelling particles */}
            {[0, 0.33, 0.66].map((off, j) => {
              const t = ((frame / 60 + off) % 1);
              const pt = qpoint(n.x, n.y, a.cx, a.cy, HOME.x, HOME.y, t);
              return (
                <circle key={j} cx={pt.x} cy={pt.y} r={3} fill={colors.goldSoft} opacity={(1 - t) * ar} style={{ filter: "drop-shadow(0 0 5px rgba(240,216,154,0.9))" }} />
              );
            })}
            {/* source node */}
            <circle cx={n.x} cy={n.y} r={5} fill={colors.ice} style={{ filter: "drop-shadow(0 0 6px rgba(143,216,236,0.8))" }} />
            <text x={n.x} y={n.y - 12} textAnchor="middle" fontFamily={fonts.sans} fontWeight={500} fontSize={15} fill={colors.muted}>
              {n.label}
            </text>
          </g>
        );
      })}

      {/* home node */}
      <g opacity={reveal}>
        <circle cx={HOME.x} cy={HOME.y} r={10 + homePulse * 7} fill="none" stroke={colors.gold} strokeWidth={1} opacity={1 - homePulse} />
        <circle cx={HOME.x} cy={HOME.y} r={7} fill={colors.gold} style={{ filter: "drop-shadow(0 0 10px rgba(230,192,104,0.9))" }} />
        <text x={HOME.x} y={HOME.y + 26} textAnchor="middle" fontFamily={fonts.display} fontWeight={600} fontSize={20} fill={colors.goldSoft}>
          {HOME.label}
        </text>
      </g>
    </svg>
  );
};
