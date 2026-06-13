import React from "react";
import { interpolate, useCurrentFrame, random } from "remotion";
import { colors, fonts } from "../theme";

// A jeweller's balance: a heap of glass on the left, one brilliant on the right.
// The single diamond outweighs the pile — value per carat over value per tonne.
export const BalanceScale: React.FC = () => {
  const frame = useCurrentFrame();
  const intro = interpolate(frame, [4, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // tilt: diamond side (right) sinks
  const tilt = interpolate(frame, [40, 90], [0, 9], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const settle = Math.sin(Math.max(0, frame - 90) / 10) * Math.max(0, 1 - (frame - 90) / 40) * 1.5;
  const angle = tilt + settle;

  const armLen = 230;
  const lx = -armLen, ly = Math.sin((angle * Math.PI) / 180) * armLen;
  const rx = armLen, ry = -Math.sin((angle * Math.PI) / 180) * armLen;

  return (
    <svg width={760} height={620} viewBox="-380 -340 760 620" style={{ overflow: "visible" }}>
      {/* stand */}
      <line x1="0" y1="-250" x2="0" y2="210" stroke={colors.muted} strokeWidth={4} opacity={intro} />
      <path d="M-90 210 L90 210 L60 240 L-60 240 Z" fill="rgba(255,255,255,0.05)" stroke={colors.muted} strokeWidth={2} opacity={intro} />
      <circle cx="0" cy="-250" r={8} fill={colors.gold} opacity={intro} />

      {/* beam */}
      <g style={{ transform: `rotate(${angle}deg)`, transformOrigin: "0px -250px" }} opacity={intro}>
        <line x1={-armLen} y1="-250" x2={armLen} y2="-250" stroke={colors.goldSoft} strokeWidth={4} strokeLinecap="round" />
        <circle cx={-armLen} cy="-250" r={5} fill={colors.gold} />
        <circle cx={armLen} cy="-250" r={5} fill={colors.gold} />
      </g>

      {/* left pan: glass pile */}
      <g style={{ transform: `translate(${lx}px, ${-250 + Math.abs(ly) * 0 + ly + 250 + 110}px)` }} opacity={intro}>
        <PanLines y={-110} />
        {new Array(22).fill(0).map((_, i) => {
          const gx = (random(`gx${i}`) - 0.5) * 150;
          const gy = -random(`gy${i}`) * 60;
          const s = 10 + random(`gs${i}`) * 16;
          return (
            <polygon
              key={i}
              points={`${gx},${gy - s} ${gx + s * 0.5},${gy} ${gx},${gy + s * 0.4} ${gx - s * 0.5},${gy}`}
              fill="rgba(150,170,190,0.25)"
              stroke="rgba(190,210,230,0.4)"
              strokeWidth={0.6}
            />
          );
        })}
        <text x="0" y={48} textAnchor="middle" fontFamily={fonts.display} fontWeight={600} fontSize={22} fill={colors.muted}>
          Glass by the tonne
        </text>
        <text x="0" y={74} textAnchor="middle" fontFamily={fonts.sans} fontWeight={300} fontSize={15} fill={colors.faint}>
          value per acre
        </text>
      </g>

      {/* right pan: single brilliant */}
      <g style={{ transform: `translate(${rx}px, ${ry + 110}px)` }} opacity={intro}>
        <PanLines y={-110} />
        <g transform="translate(0,-30)">
          <circle cx="0" cy="0" r={34} fill="rgba(143,216,236,0.2)" />
          {new Array(8).fill(0).map((_, i) => {
            const a0 = (i / 8) * Math.PI * 2 - Math.PI / 2;
            const a1 = ((i + 1) / 8) * Math.PI * 2 - Math.PI / 2;
            const amid = (a0 + a1) / 2;
            const r1 = 12;
            return (
              <polygon
                key={i}
                points={`${Math.cos(a0) * r1},${Math.sin(a0) * r1} ${Math.cos(amid) * 28},${Math.sin(amid) * 28} ${Math.cos(a1) * r1},${Math.sin(a1) * r1} 0,0`}
                fill={i % 2 ? colors.iceDeep : colors.ice}
                stroke="rgba(255,255,255,0.6)"
                strokeWidth={0.6}
                opacity={0.6 + 0.4 * Math.sin(frame / 14 + i)}
              />
            );
          })}
          <polygon points="0,-8 4,-2 0,2 -4,-2" fill="#fff" opacity={0.7} />
        </g>
        <text x="0" y={48} textAnchor="middle" fontFamily={fonts.display} fontWeight={600} fontSize={22} fill={colors.goldSoft}>
          Diamonds by the carat
        </text>
        <text x="0" y={74} textAnchor="middle" fontFamily={fonts.sans} fontWeight={300} fontSize={15} fill={colors.iceSoft}>
          value per worker
        </text>
      </g>
    </svg>
  );
};

const PanLines: React.FC<{ y: number }> = ({ y }) => (
  <g>
    <path d={`M-110 ${y} L110 ${y} L80 ${y + 56} L-80 ${y + 56} Z`} fill="rgba(255,255,255,0.04)" stroke={colors.line} strokeWidth={1.5} />
    <line x1={-110} y1={y} x2={0} y2={y - 90} stroke={colors.line} strokeWidth={1} />
    <line x1={110} y1={y} x2={0} y2={y - 90} stroke={colors.line} strokeWidth={1} />
  </g>
);
