import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme";

const PHASES = [
  { t: "Prospect", when: "Months 0–9", d: "25–40 founding firms; anchor pact with Keltron, V-Guard & Kaynes.", proof: "3 anchor MoUs signed" },
  { t: "Extract", when: "Years 1–2", d: "Shared factory & test centre live; first 500 apprentices.", proof: "Kochi facility live" },
  { t: "Cut & Polish", when: "Years 3–5", d: "8–15 firms deep per facet; first exports via Vizhinjam.", proof: "₹1,500cr+ revenue" },
  { t: "Crown", when: "Years 5–10", d: "5–10 hidden champions lead their global niche; self-funding.", proof: "Liquidity event" },
];

const STONES = [
  "0,-20 14,-12 18,6 8,18 -10,16 -18,2", // rough
  "0,-22 16,-12 18,8 6,20 -12,16 -18,-4", // octagon-ish
  "0,-24 12,-18 20,-4 18,10 6,22 -8,22 -20,8 -18,-8", // faceted
  "0,-24 10,-18 18,-8 22,4 14,18 0,24 -14,18 -22,4 -18,-8 -10,-18", // brilliant
];

export const CutTimeline: React.FC<{ width?: number }> = ({ width = 1500 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const n = PHASES.length;
  const gap = width / n;
  const x0 = gap / 2;
  const railEnd = x0 + gap * (n - 1);
  const rail = interpolate(frame, [12, 100], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <svg width={width} height={360} viewBox={`0 0 ${width} 360`} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="ctRail" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={colors.iceDeep} />
          <stop offset="100%" stopColor={colors.gold} />
        </linearGradient>
      </defs>

      <line x1={x0} y1={170} x2={railEnd} y2={170} stroke="rgba(255,255,255,0.08)" strokeWidth={3} />
      <line x1={x0} y1={170} x2={x0 + rail * (railEnd - x0)} y2={170} stroke="url(#ctRail)" strokeWidth={3} style={{ filter: "drop-shadow(0 0 6px rgba(230,192,104,0.5))" }} />
      <circle cx={x0 + rail * (railEnd - x0)} cy={170} r={6} fill="#fff" opacity={rail < 1 ? 1 : 0} style={{ filter: "drop-shadow(0 0 10px #fff)" }} />

      {PHASES.map((p, i) => {
        const cx = x0 + i * gap;
        const d = 18 + i * 18;
        const appear = spring({ frame: frame - d, fps, config: { damping: 200 } });
        const shimmer = 0.6 + 0.4 * Math.sin(frame / 13 + i);
        const refined = i / (n - 1);
        return (
          <g key={p.t} opacity={appear}>
            {/* phase eyebrow above */}
            <text x={cx} y={64} textAnchor="middle" fontFamily={fonts.sans} fontWeight={600} fontSize={15} letterSpacing={2} fill={colors.gold}>
              {p.when.toUpperCase()}
            </text>
            {/* gem */}
            <g transform={`translate(${cx},${118})`} style={{ transform: `translate(${cx}px,118px) scale(${0.7 + 0.3 * appear})` }}>
              <polygon
                points={STONES[i]}
                fill={`rgba(${interpolate(refined, [0, 1], [120, 188])},${interpolate(refined, [0, 1], [140, 235])},${interpolate(refined, [0, 1], [160, 246])},0.9)`}
                stroke="rgba(255,255,255,0.6)"
                strokeWidth={0.6 + refined}
              />
              <polygon points="0,-10 5,-2 0,3 -5,-2" fill="#fff" opacity={(0.3 + 0.5 * refined) * shimmer} />
            </g>
            {/* node */}
            <circle cx={cx} cy={170} r={5} fill={colors.gold} />
            {/* title + body */}
            <text x={cx} y={216} textAnchor="middle" fontFamily={fonts.display} fontWeight={700} fontSize={34} fill={colors.ink}>
              {p.t}
            </text>
            <foreignObject x={cx - gap * 0.42} y={232} width={gap * 0.84} height={80}>
              <div style={{ fontFamily: fonts.sans, fontWeight: 300, fontSize: 16, lineHeight: 1.4, color: colors.muted, textAlign: "center" }}>
                {p.d}
              </div>
            </foreignObject>
            {/* proof chip */}
            <g transform={`translate(${cx},322)`}>
              <rect x={-gap * 0.32} y={-16} width={gap * 0.64} height={28} rx={14} fill="rgba(230,192,104,0.10)" stroke="rgba(230,192,104,0.35)" strokeWidth={1} />
              <text x="0" y={3} textAnchor="middle" fontFamily={fonts.sans} fontWeight={500} fontSize={14} fill={colors.goldSoft}>
                {p.proof}
              </text>
            </g>
          </g>
        );
      })}
    </svg>
  );
};
