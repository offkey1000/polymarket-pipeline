import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme";

// A central gear (the consortium) meshed with five satellite gears (the shared
// tools). They turn together; small firm-sparks orbit and get "served".
const Gear: React.FC<{
  r: number;
  teeth: number;
  rot: number;
  color: string;
  fill?: string;
  sw?: number;
}> = ({ r, teeth, rot, color, fill = "none", sw = 2 }) => {
  const inner = r * 0.62;
  const toothLen = r * 0.18;
  return (
    <g style={{ transform: `rotate(${rot}deg)`, transformOrigin: "0px 0px" }}>
      <circle cx="0" cy="0" r={r} fill={fill} stroke={color} strokeWidth={sw} />
      {new Array(teeth).fill(0).map((_, i) => {
        const a = (i / teeth) * Math.PI * 2;
        const x1 = Math.cos(a) * r, y1 = Math.sin(a) * r;
        const x2 = Math.cos(a) * (r + toothLen), y2 = Math.sin(a) * (r + toothLen);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={sw + 1} strokeLinecap="round" />;
      })}
      <circle cx="0" cy="0" r={inner} fill="none" stroke={color} strokeWidth={sw * 0.6} opacity={0.5} />
    </g>
  );
};

const TOOLS = ["Shared factories", "Pooled buying", "Apprenticeships", "R&D bridge", "Exports desk"];

export const ConsortiumMachine: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const intro = interpolate(frame, [4, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const baseRot = frame * 0.6;
  const bigR = 130;
  const smallR = 64;
  const orbit = bigR + smallR + 6;

  return (
    <svg width={820} height={760} viewBox="-410 -380 820 760" style={{ overflow: "visible" }}>
      <defs>
        <radialGradient id="hubG" cx="50%" cy="42%" r="60%">
          <stop offset="0%" stopColor="rgba(230,192,104,0.35)" />
          <stop offset="100%" stopColor="rgba(11,16,32,0.0)" />
        </radialGradient>
      </defs>

      {/* small firm sparks orbiting */}
      {new Array(18).fill(0).map((_, i) => {
        const a = (i / 18) * Math.PI * 2 + frame / 90;
        const rr = orbit + 70 + (i % 3) * 24;
        const x = Math.cos(a) * rr, y = Math.sin(a) * rr;
        const tw = 0.4 + 0.6 * Math.abs(Math.sin(frame / 14 + i));
        return <circle key={i} cx={x} cy={y} r={3} fill={colors.ice} opacity={intro * tw * 0.8} />;
      })}

      {/* satellite gears */}
      {TOOLS.map((t, i) => {
        const a = (i / TOOLS.length) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(a) * orbit, y = Math.sin(a) * orbit;
        const appear = spring({ frame: frame - (30 + i * 8), fps, config: { damping: 200 } });
        return (
          <g key={i} opacity={appear} style={{ transform: `scale(${appear})`, transformOrigin: `${x}px ${y}px` }}>
            <g transform={`translate(${x},${y})`}>
              {/* counter-rotate so teeth mesh visually */}
              <Gear r={smallR} teeth={11} rot={-baseRot * (bigR / smallR)} color={colors.ice} fill="rgba(143,216,236,0.06)" sw={1.6} />
              <text x="0" y={smallR + 32} textAnchor="middle" fontFamily={fonts.sans} fontWeight={500} fontSize={17} fill={colors.muted}>
                {t}
              </text>
            </g>
          </g>
        );
      })}

      {/* central hub gear */}
      <circle cx="0" cy="0" r={bigR + 60} fill="url(#hubG)" opacity={intro} />
      <g opacity={intro}>
        <Gear r={bigR} teeth={18} rot={baseRot} color={colors.gold} fill="rgba(230,192,104,0.08)" sw={2.4} />
        <text x="0" y={-10} textAnchor="middle" fontFamily={fonts.display} fontWeight={700} fontSize={26} fill={colors.goldSoft}>
          KERALA
        </text>
        <text x="0" y={18} textAnchor="middle" fontFamily={fonts.display} fontWeight={700} fontSize={26} fill={colors.goldSoft}>
          CONSORTIUM
        </text>
      </g>
    </svg>
  );
};
