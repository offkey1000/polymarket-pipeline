import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme";

// A respectful founder medallion: a gold ring with a circuit-trace motif, the
// monogram of K.P.P. Nambiar at the centre, his dates, and radiating ticks that
// light up like a dial. No photograph — an emblem.
export const FounderMedallion: React.FC<{ scale?: number }> = ({ scale = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ring = interpolate(frame, [6, 56], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const mono = spring({ frame: frame - 38, fps, config: { damping: 200 } });
  const glow = 0.5 + 0.5 * Math.sin(frame / 18);
  const R = 150;

  return (
    <svg width={420 * scale} height={420 * scale} viewBox="-210 -210 420 420" style={{ overflow: "visible" }}>
      <defs>
        <radialGradient id="medG" cx="50%" cy="42%" r="65%">
          <stop offset="0%" stopColor="rgba(230,192,104,0.22)" />
          <stop offset="70%" stopColor="rgba(230,192,104,0.04)" />
          <stop offset="100%" stopColor="rgba(11,16,32,0)" />
        </radialGradient>
        <linearGradient id="medRing" x1="0" y1="-1" x2="0" y2="1">
          <stop offset="0%" stopColor={colors.goldSoft} />
          <stop offset="100%" stopColor={colors.gold} />
        </linearGradient>
      </defs>

      <circle cx="0" cy="0" r={R + 26} fill="url(#medG)" opacity={ring} />

      {/* radiating dial ticks */}
      {new Array(60).fill(0).map((_, i) => {
        const a = (i / 60) * Math.PI * 2 - Math.PI / 2;
        const lit = interpolate(frame, [40 + i * 0.6, 46 + i * 0.6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const major = i % 5 === 0;
        const r1 = R + 6;
        const r2 = R + (major ? 18 : 12);
        return (
          <line
            key={i}
            x1={Math.cos(a) * r1}
            y1={Math.sin(a) * r1}
            x2={Math.cos(a) * r2}
            y2={Math.sin(a) * r2}
            stroke={colors.gold}
            strokeWidth={major ? 1.6 : 0.8}
            opacity={0.25 + lit * 0.6}
          />
        );
      })}

      {/* double gold ring */}
      <circle cx="0" cy="0" r={R} fill="rgba(11,16,32,0.55)" stroke="url(#medRing)" strokeWidth={3} strokeDasharray={2 * Math.PI * R} strokeDashoffset={2 * Math.PI * R * (1 - ring)} />
      <circle cx="0" cy="0" r={R - 12} fill="none" stroke={colors.gold} strokeWidth={1} opacity={ring * 0.6} />

      {/* circuit traces around the inner field */}
      <g opacity={ring * 0.5}>
        {new Array(8).fill(0).map((_, i) => {
          const a = (i / 8) * Math.PI * 2;
          const x = Math.cos(a) * (R - 36);
          const y = Math.sin(a) * (R - 36);
          const x2 = Math.cos(a) * (R - 16);
          const y2 = Math.sin(a) * (R - 16);
          return (
            <g key={i}>
              <line x1={x} y1={y} x2={x2} y2={y2} stroke={colors.iceDeep} strokeWidth={1} />
              <circle cx={x} cy={y} r={2.4} fill={colors.ice} />
            </g>
          );
        })}
      </g>

      {/* monogram */}
      <g opacity={mono} style={{ transform: `scale(${0.85 + 0.15 * mono})`, transformOrigin: "0px 0px" }}>
        <text x="0" y="-6" textAnchor="middle" fontFamily={fonts.display} fontWeight={700} fontSize={92} fill={colors.goldSoft} style={{ filter: `drop-shadow(0 0 ${10 * glow}px rgba(230,192,104,0.5))` }}>
          KPP
        </text>
        <text x="0" y="44" textAnchor="middle" fontFamily={fonts.sans} fontWeight={500} fontSize={20} letterSpacing={5} fill={colors.muted}>
          1929 — 2015
        </text>
      </g>

      {/* sweeping highlight */}
      <g style={{ transform: `rotate(${frame * 1.4}deg)`, transformOrigin: "0px 0px" }} opacity={ring * 0.5}>
        <path d={`M0 ${-R} A ${R} ${R} 0 0 1 ${R * 0.7} ${-R * 0.7}`} fill="none" stroke="#fff" strokeWidth={2} opacity={0.4} strokeLinecap="round" />
      </g>
    </svg>
  );
};
