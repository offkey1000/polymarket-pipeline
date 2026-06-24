import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme";

// Five stations along a light-rail; a stone refines from rough rock (the mine)
// to a set brilliant (the crown). The spine metaphor of the whole film.
const STAGES = [
  { k: "The Mine", v: "Raw talent & institutions" },
  { k: "The Sort", v: "Find the gem-grade stones" },
  { k: "The Cut", v: "Precision shaping, shared wheels" },
  { k: "The Polish", v: "Mastery of one facet" },
  { k: "The Setting", v: "Placed in the crown" },
];

// Polygon for each refinement step (rough → brilliant).
const STONES = [
  "0,-26 18,-18 26,4 14,24 -10,26 -24,8 -22,-14", // rough rock
  "0,-28 20,-16 24,6 10,26 -12,24 -24,4 -18,-18", // cobbed
  "0,-30 16,-20 28,0 16,22 0,30 -16,22 -28,0 -16,-20", // octagon table
  "0,-30 14,-22 24,-8 28,8 14,24 0,30 -14,24 -28,8 -24,-8 -14,-22", // many facets
  "0,-30 12,-22 22,-12 28,2 20,18 8,28 -8,28 -20,18 -28,2 -22,-12 -12,-22", // brilliant
];

const Gem: React.FC<{ step: number; appear: number; frame: number; bright: number }> = ({
  step,
  appear,
  frame,
  bright,
}) => {
  const shimmer = 0.6 + 0.4 * Math.sin(frame / 14 + step);
  const refined = step / (STONES.length - 1);
  return (
    <g style={{ transform: `scale(${0.6 + 0.4 * appear})`, transformOrigin: "center" }} opacity={appear}>
      {bright > 0.01 && (
        <circle cx="0" cy="0" r={40} fill="rgba(143,216,236,0.25)" opacity={bright * shimmer} />
      )}
      <polygon
        points={STONES[step]}
        fill={`rgba(${interpolate(refined, [0, 1], [120, 188])},${interpolate(refined, [0, 1], [130, 235])},${interpolate(refined, [0, 1], [150, 246])},${interpolate(refined, [0, 1], [0.5, 0.95])})`}
        stroke="rgba(255,255,255,0.7)"
        strokeWidth={refined * 1.2 + 0.4}
        strokeOpacity={appear * (0.4 + 0.6 * refined)}
      />
      {/* facet lines grow with refinement */}
      {refined > 0.3 && (
        <g opacity={appear * refined}>
          <line x1="0" y1="-30" x2="0" y2="30" stroke="rgba(255,255,255,0.4)" strokeWidth={0.6} />
          <line x1="-28" y1="0" x2="28" y2="0" stroke="rgba(255,255,255,0.4)" strokeWidth={0.6} />
          <line x1="-20" y1="-20" x2="20" y2="20" stroke="rgba(255,255,255,0.3)" strokeWidth={0.5} />
          <line x1="20" y1="-20" x2="-20" y2="20" stroke="rgba(255,255,255,0.3)" strokeWidth={0.5} />
        </g>
      )}
      {/* highlight glint */}
      <polygon points="0,-16 7,-6 0,2 -7,-6" fill="#fff" opacity={appear * (0.2 + 0.6 * refined) * shimmer} />
    </g>
  );
};

export const DiamondJourney: React.FC<{ width?: number }> = ({ width = 1500 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const n = STAGES.length;
  const gap = width / n;
  const x0 = gap / 2;

  // overall rail energy progress
  const rail = interpolate(frame, [10, 95], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // a glint travelling the rail
  const glintX = x0 + rail * (gap * (n - 1));

  return (
    <svg width={width} height={300} viewBox={`0 0 ${width} 300`} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="railG" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={colors.iceDeep} />
          <stop offset="100%" stopColor={colors.gold} />
        </linearGradient>
      </defs>

      {/* base rail */}
      <line x1={x0} y1={150} x2={x0 + gap * (n - 1)} y2={150} stroke="rgba(255,255,255,0.08)" strokeWidth={3} />
      {/* energized rail */}
      <line
        x1={x0}
        y1={150}
        x2={x0 + rail * gap * (n - 1)}
        y2={150}
        stroke="url(#railG)"
        strokeWidth={3}
        style={{ filter: "drop-shadow(0 0 6px rgba(230,192,104,0.5))" }}
      />
      {/* travelling glint */}
      <circle cx={glintX} cy={150} r={6} fill="#fff" opacity={rail < 1 ? 1 : 0} style={{ filter: "drop-shadow(0 0 10px #fff)" }} />

      {STAGES.map((st, i) => {
        const cx = x0 + i * gap;
        const d = 16 + i * 16;
        const appear = spring({ frame: frame - d, fps, config: { damping: 200 } });
        const bright = interpolate(frame - d, [0, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <g key={st.k}>
            {/* node tick */}
            <circle cx={cx} cy={150} r={4} fill={colors.gold} opacity={appear} />
            {/* gem */}
            <g transform={`translate(${cx},${88})`}>
              <Gem step={i} appear={appear} frame={frame} bright={bright} />
            </g>
            {/* labels */}
            <text x={cx} y={210} textAnchor="middle" fontFamily={fonts.display} fontWeight={600} fontSize={26} fill={colors.ink} opacity={appear}>
              {st.k}
            </text>
            <text x={cx} y={236} textAnchor="middle" fontFamily={fonts.sans} fontWeight={300} fontSize={16} fill={colors.muted} opacity={appear}>
              {st.v}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
