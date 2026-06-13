import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme";

// Stylised silhouette of Kerala (narrow south-west coastal state). Approximate,
// motion-graphic shorthand — the west coast wavy, the east a hilly border.
const KERALA_PATH =
  "M120 8 C150 30 140 70 165 95 C195 125 185 165 205 200 C230 245 215 300 235 345 C250 380 235 430 250 470 C258 495 245 530 235 560 C228 582 205 590 188 575 C170 558 175 520 160 498 C140 468 150 430 132 400 C112 366 122 322 100 292 C78 262 90 222 70 192 C52 165 62 122 48 95 C36 72 50 40 72 28 C88 18 104 -2 120 8 Z";

type Pin = { x: number; y: number; label: string; sub: string; side: "l" | "r" };
const PINS: Pin[] = [
  { x: 132, y: 120, label: "Vizhinjam Port", sub: "deep-water gateway", side: "r" },
  { x: 96, y: 250, label: "Technopark, Trivandrum", sub: "design & chip talent", side: "l" },
  { x: 150, y: 300, label: "VSSC · ISRO", sub: "space-grade electronics", side: "r" },
  { x: 120, y: 400, label: "Maker Village, Kochi", sub: "India's largest hw incubator", side: "l" },
  { x: 165, y: 470, label: "Diaspora capital", sub: "Gulf & global remittance", side: "r" },
];

export const KeralaMap: React.FC<{ scale?: number }> = ({ scale = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const draw = interpolate(frame, [6, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const scanY = interpolate(frame, [20, 80], [0, 600], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const scanOpacity = interpolate(frame, [20, 30, 78, 90], [0, 1, 1, 0]);

  return (
    <svg width={520 * scale} height={640 * scale} viewBox="-40 -20 360 640" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="kmFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(143,216,236,0.20)" />
          <stop offset="100%" stopColor="rgba(79,168,201,0.05)" />
        </linearGradient>
        <clipPath id="kmClip">
          <path d={KERALA_PATH} />
        </clipPath>
        <filter id="kmGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {/* fill */}
      <path d={KERALA_PATH} fill="url(#kmFill)" opacity={draw} />
      {/* contour map lines inside */}
      <g clipPath="url(#kmClip)" opacity={0.4 * draw}>
        {new Array(12).fill(0).map((_, i) => (
          <path
            key={i}
            d={`M-40 ${30 + i * 50} C60 ${10 + i * 50} 180 ${60 + i * 50} 320 ${20 + i * 50}`}
            stroke="rgba(143,216,236,0.35)"
            strokeWidth={0.8}
            fill="none"
          />
        ))}
      </g>
      {/* animated coastline draw-on */}
      <path
        d={KERALA_PATH}
        fill="none"
        stroke={colors.ice}
        strokeWidth={2.2}
        strokeDasharray={2400}
        strokeDashoffset={2400 * (1 - draw)}
        style={{ filter: "drop-shadow(0 0 6px rgba(143,216,236,0.6))" }}
      />

      {/* scan sweep */}
      <g clipPath="url(#kmClip)">
        <rect x="-40" y={scanY - 30} width="360" height="34" fill="rgba(230,192,104,0.25)" opacity={scanOpacity} />
        <rect x="-40" y={scanY} width="360" height="2" fill={colors.goldSoft} opacity={scanOpacity} />
      </g>

      {/* pins */}
      {PINS.map((p, i) => {
        const d = 64 + i * 12;
        const s = spring({ frame: frame - d, fps, config: { damping: 200 } });
        const pulse = 0.5 + 0.5 * Math.abs(Math.sin((frame - d) / 18));
        const labelX = p.side === "r" ? p.x + 26 : p.x - 26;
        return (
          <g key={i} opacity={s}>
            {/* halo */}
            <circle cx={p.x} cy={p.y} r={10 + pulse * 8} fill="none" stroke={colors.gold} strokeWidth={1} opacity={(1 - pulse) * 0.8 * s} />
            <circle cx={p.x} cy={p.y} r={5} fill={colors.goldSoft} filter="url(#kmGlow)" />
            <circle cx={p.x} cy={p.y} r={2.6} fill="#fff" />
            {/* connector */}
            <line
              x1={p.x}
              y1={p.y}
              x2={labelX}
              y2={p.y}
              stroke={colors.line}
              strokeWidth={1}
            />
            <text
              x={p.side === "r" ? labelX + 6 : labelX - 6}
              y={p.y - 3}
              textAnchor={p.side === "r" ? "start" : "end"}
              fontFamily={fonts.display}
              fontWeight={600}
              fontSize={20}
              fill={colors.ink}
            >
              {p.label}
            </text>
            <text
              x={p.side === "r" ? labelX + 6 : labelX - 6}
              y={p.y + 16}
              textAnchor={p.side === "r" ? "start" : "end"}
              fontFamily={fonts.sans}
              fontWeight={300}
              fontSize={14}
              fill={colors.muted}
            >
              {p.sub}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
