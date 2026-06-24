import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../theme";

// A crown whose central jewel descends and is "set", then blazes — the closing
// image: the finished stone placed in the crown.
export const Crown: React.FC<{ scale?: number }> = ({ scale = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const draw = interpolate(frame, [6, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const drop = spring({ frame: frame - 40, fps, config: { damping: 200 } });
  const jewelY = interpolate(drop, [0, 1], [-160, -34]);
  const blaze = interpolate(frame, [70, 100], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sparkle = 0.5 + 0.5 * Math.sin(frame / 8);

  return (
    <svg width={460 * scale} height={360 * scale} viewBox="-230 -200 460 360" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="crownG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={colors.goldSoft} />
          <stop offset="100%" stopColor={colors.gold} />
        </linearGradient>
      </defs>

      {/* crown band + points */}
      <path
        d="M-150 40 L-150 -10 L-90 35 L-45 -55 L0 30 L45 -55 L90 35 L150 -10 L150 40 Z"
        fill="rgba(230,192,104,0.10)"
        stroke="url(#crownG)"
        strokeWidth={3}
        strokeDasharray={900}
        strokeDashoffset={900 * (1 - draw)}
        strokeLinejoin="round"
      />
      <rect x="-150" y="40" width="300" height="34" rx="6" fill="rgba(230,192,104,0.10)" stroke="url(#crownG)" strokeWidth={3} opacity={draw} />
      {/* point jewels */}
      {[-90, 0, 90].map((x, i) => (
        <circle key={i} cx={x} cy={x === 0 ? -55 : 35} r={5} fill={colors.ice} opacity={draw} style={{ filter: "drop-shadow(0 0 5px rgba(143,216,236,0.8))" }} />
      ))}
      {[-150, 150].map((x, i) => (
        <circle key={i} cx={x} cy={-10} r={4} fill={colors.ice} opacity={draw} />
      ))}
      {/* band studs */}
      {[-110, -55, 55, 110].map((x, i) => (
        <circle key={i} cx={x} cy={57} r={4} fill={colors.goldSoft} opacity={draw} />
      ))}

      {/* descending central brilliant */}
      <g transform={`translate(0,${jewelY})`} opacity={drop}>
        {blaze > 0 && <circle cx="0" cy="0" r={36 + blaze * 18} fill="rgba(143,216,236,0.25)" opacity={blaze * sparkle} />}
        {new Array(8).fill(0).map((_, i) => {
          const a0 = (i / 8) * Math.PI * 2 - Math.PI / 2;
          const a1 = ((i + 1) / 8) * Math.PI * 2 - Math.PI / 2;
          const amid = (a0 + a1) / 2;
          const r1 = 14;
          return (
            <polygon
              key={i}
              points={`${Math.cos(a0) * r1},${Math.sin(a0) * r1} ${Math.cos(amid) * 32},${Math.sin(amid) * 32} ${Math.cos(a1) * r1},${Math.sin(a1) * r1} 0,0`}
              fill={i % 2 ? colors.iceDeep : colors.ice}
              stroke="rgba(255,255,255,0.65)"
              strokeWidth={0.7}
              opacity={0.6 + 0.4 * Math.sin(frame / 12 + i)}
            />
          );
        })}
        <polygon points="0,-9 5,-2 0,3 -5,-2" fill="#fff" opacity={0.5 + 0.5 * sparkle} />
      </g>

      {/* sparkle rays on set */}
      {blaze > 0.3 &&
        new Array(6).fill(0).map((_, i) => {
          const a = (i / 6) * Math.PI * 2 + frame / 40;
          const len = 30 + blaze * 30 * sparkle;
          return (
            <line
              key={i}
              x1={Math.cos(a) * 30}
              y1={-34 + Math.sin(a) * 30}
              x2={Math.cos(a) * (30 + len)}
              y2={-34 + Math.sin(a) * (30 + len)}
              stroke={colors.goldSoft}
              strokeWidth={1}
              opacity={blaze * (1 - sparkle) * 0.8}
              strokeLinecap="round"
            />
          );
        })}
    </svg>
  );
};
