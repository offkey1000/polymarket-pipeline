import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors, fonts } from "../theme";

// A broad river of remittance that narrows toward the future — and a channel
// that diverts the flow into ownership before the window closes.
export const NarrowingRiver: React.FC<{ width?: number }> = ({ width = 1320 }) => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame, [6, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const h = 420;

  // river goes from wide (left, today) to narrow (right, post-2030)
  const topPath = `M0 120 C ${width * 0.4} 120, ${width * 0.6} 170, ${width} 200`;
  const botPath = `M0 300 C ${width * 0.4} 300, ${width * 0.6} 250, ${width} 232`;
  const riverFill = `M0 120 C ${width * 0.4} 120, ${width * 0.6} 170, ${width} 200 L ${width} 232 C ${width * 0.6} 250, ${width * 0.4} 300, 0 300 Z`;

  return (
    <svg width={width} height={h} viewBox={`0 0 ${width} ${h}`} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="riverG" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(143,216,236,0.35)" />
          <stop offset="100%" stopColor="rgba(79,168,201,0.08)" />
        </linearGradient>
      </defs>

      <path d={riverFill} fill="url(#riverG)" opacity={reveal} />
      <path d={topPath} fill="none" stroke={colors.ice} strokeWidth={1.6} opacity={reveal} />
      <path d={botPath} fill="none" stroke={colors.ice} strokeWidth={1.6} opacity={reveal} />

      {/* flow particles */}
      {new Array(28).fill(0).map((_, i) => {
        const t = ((frame / 70 + i / 28) % 1);
        const yBand = 140 + (i % 7) * 22;
        // narrow the band as t→1
        const centerTop = 120 + t * 80;
        const centerBot = 300 - t * 68;
        const yy = interpolate((i % 7) / 6, [0, 1], [centerTop + 8, centerBot - 8]);
        const x = t * width;
        return <circle key={i} cx={x} cy={yy} r={2.4} fill={colors.iceSoft} opacity={(1 - t) * reveal * 0.8} />;
      })}

      {/* diversion channel into ownership */}
      <g opacity={interpolate(frame, [40, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>
        <path d={`M${width * 0.5} 250 C ${width * 0.5} 330, ${width * 0.56} 360, ${width * 0.62} 380`} fill="none" stroke={colors.gold} strokeWidth={2} strokeDasharray="4 5" />
        {[0, 0.5].map((off, j) => {
          const t = ((frame / 40 + off) % 1);
          const x = interpolate(t, [0, 1], [width * 0.5, width * 0.62]);
          const y = interpolate(t, [0, 1], [250, 380]);
          return <circle key={j} cx={x} cy={y} r={3} fill={colors.goldSoft} opacity={1 - t} />;
        })}
        <rect x={width * 0.62 - 130} y={384} width={260} height={34} rx={17} fill="rgba(230,192,104,0.12)" stroke="rgba(230,192,104,0.5)" strokeWidth={1.2} />
        <text x={width * 0.62} y={406} textAnchor="middle" fontFamily={fonts.sans} fontWeight={600} fontSize={16} letterSpacing={1} fill={colors.goldSoft}>
          → KERALA CROWN SHARES
        </text>
      </g>

      {/* end labels */}
      <text x={10} y={96} fontFamily={fonts.sans} fontWeight={600} fontSize={16} fill={colors.ice} opacity={reveal}>
        TODAY · ₹2 lakh cr / yr
      </text>
      <text x={width - 10} y={170} textAnchor="end" fontFamily={fonts.sans} fontWeight={600} fontSize={16} fill={colors.muted} opacity={reveal}>
        AFTER 2030 · declining
      </text>
    </svg>
  );
};
