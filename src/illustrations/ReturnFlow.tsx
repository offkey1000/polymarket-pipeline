import React from "react";
import { interpolate, spring, random, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme";
import { PersonIcon, BuildingIcon } from "../components/icons";

// Engineers stream home from the Gulf and become workshops — brain-drain
// reversed by design. Left: the diaspora pool. Right: returnee-founded firms.
export const ReturnFlow: React.FC<{ width?: number }> = ({ width = 1240 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const leftX = width * 0.16;
  const rightX = width * 0.84;
  const midY = 230;

  const poolIn = spring({ frame: frame - 10, fps, config: { damping: 200 } });
  const homeIn = spring({ frame: frame - 30, fps, config: { damping: 200 } });

  return (
    <svg width={width} height={460} viewBox={`0 0 ${width} 460`} style={{ overflow: "visible" }}>
      {/* path */}
      <path d={`M${leftX + 60} ${midY} C ${width * 0.4} ${midY - 120}, ${width * 0.6} ${midY + 120}, ${rightX - 60} ${midY}`} fill="none" stroke={colors.line} strokeWidth={1.5} strokeDasharray="5 6" />

      {/* travelling engineers */}
      {new Array(7).fill(0).map((_, i) => {
        const off = i / 7;
        const t = ((frame / 90 + off) % 1);
        // sample cubic bezier
        const p0 = { x: leftX + 60, y: midY };
        const p1 = { x: width * 0.4, y: midY - 120 };
        const p2 = { x: width * 0.6, y: midY + 120 };
        const p3 = { x: rightX - 60, y: midY };
        const mt = 1 - t;
        const x = mt ** 3 * p0.x + 3 * mt ** 2 * t * p1.x + 3 * mt * t ** 2 * p2.x + t ** 3 * p3.x;
        const y = mt ** 3 * p0.y + 3 * mt ** 2 * t * p1.y + 3 * mt * t ** 2 * p2.y + t ** 3 * p3.y;
        return (
          <g key={i} transform={`translate(${x - 11},${y - 11})`} opacity={(0.4 + 0.6 * Math.sin(t * Math.PI)) * homeIn}>
            <PersonIcon size={22} color={colors.goldSoft} sw={1.6} />
          </g>
        );
      })}

      {/* left: diaspora pool */}
      <g opacity={poolIn}>
        <circle cx={leftX} cy={midY} r={70} fill="rgba(143,216,236,0.07)" stroke={colors.ice} strokeWidth={1.4} />
        {new Array(12).fill(0).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          const rr = 26 + random(`r${i}`) * 30;
          return <PersonIconAt key={i} x={leftX + Math.cos(a) * rr} y={midY + Math.sin(a) * rr} />;
        })}
        <text x={leftX} y={midY + 102} textAnchor="middle" fontFamily={fonts.display} fontWeight={600} fontSize={22} fill={colors.ink}>
          3.5M in the Gulf
        </text>
        <text x={leftX} y={midY + 126} textAnchor="middle" fontFamily={fonts.sans} fontWeight={300} fontSize={15} fill={colors.muted}>
          the world's largest pool of homesick engineers
        </text>
      </g>

      {/* right: returnee firms */}
      <g opacity={homeIn}>
        <circle cx={rightX} cy={midY} r={70} fill="rgba(230,192,104,0.08)" stroke={colors.gold} strokeWidth={1.4} />
        {new Array(6).fill(0).map((_, i) => {
          const reveal = interpolate(frame, [50 + i * 8, 64 + i * 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
          const rr = 34;
          return (
            <g key={i} transform={`translate(${rightX + Math.cos(a) * rr - 12},${midY + Math.sin(a) * rr - 12})`} opacity={reveal}>
              <BuildingIcon size={24} color={colors.goldSoft} sw={1.5} />
            </g>
          );
        })}
        <text x={rightX} y={midY + 102} textAnchor="middle" fontFamily={fonts.display} fontWeight={600} fontSize={22} fill={colors.goldSoft}>
          100 niche firms
        </text>
        <text x={rightX} y={midY + 126} textAnchor="middle" fontFamily={fonts.sans} fontWeight={300} fontSize={15} fill={colors.muted}>
          returnee-founded, targeted by Year 7
        </text>
      </g>
    </svg>
  );
};

const PersonIconAt: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x - 9},${y - 9})`} opacity={0.8}>
    <PersonIcon size={18} color={colors.iceSoft} sw={1.6} />
  </g>
);
