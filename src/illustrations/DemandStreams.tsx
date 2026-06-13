import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme";
import { RocketIcon, SonarIcon, MedicalIcon, PowerIcon } from "../components/icons";

// Four demand markets pour signed orders down into the member firms — supply
// chasing demand, never the other way around.
const SOURCES = [
  { t: "Space order book", s: "ISRO / IN-SPACe", Icon: RocketIcon },
  { t: "Defence channel", s: "Keltron JV · sonar, avionics", Icon: SonarIcon },
  { t: "Health market", s: "Hospitals · Gulf & EU", Icon: MedicalIcon },
  { t: "Energy transition", s: "Smart meters · EV · solar", Icon: PowerIcon },
];

export const DemandStreams: React.FC<{ width?: number }> = ({ width = 1300 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const colW = width / SOURCES.length;
  const topY = 70;
  const firmY = 430;

  return (
    <svg width={width} height={500} viewBox={`0 0 ${width} 500`} style={{ overflow: "visible" }}>
      {/* firm bar */}
      <rect x={width * 0.12} y={firmY} width={width * 0.76} height={52} rx={10} fill="rgba(230,192,104,0.10)" stroke="rgba(230,192,104,0.4)" strokeWidth={1.5} opacity={interpolate(frame, [10, 30], [0, 1], { extrapolateRight: "clamp" })} />
      <text x={width / 2} y={firmY + 34} textAnchor="middle" fontFamily={fonts.display} fontWeight={600} fontSize={26} fill={colors.goldSoft} opacity={interpolate(frame, [16, 36], [0, 1], { extrapolateRight: "clamp" })}>
        50–150 member firms — qualified, ready, waiting for the order
      </text>

      {SOURCES.map((s, i) => {
        const cx = colW * (i + 0.5);
        const appear = spring({ frame: frame - (20 + i * 10), fps, config: { damping: 200 } });
        const { Icon } = s;
        return (
          <g key={i} opacity={appear}>
            {/* source pod */}
            <circle cx={cx} cy={topY} r={42} fill="rgba(143,216,236,0.08)" stroke={colors.ice} strokeWidth={1.4} />
            <g transform={`translate(${cx - 22},${topY - 22})`}>
              <Icon size={44} color={colors.iceSoft} sw={1.5} />
            </g>
            <text x={cx} y={topY + 70} textAnchor="middle" fontFamily={fonts.display} fontWeight={600} fontSize={21} fill={colors.ink}>
              {s.t}
            </text>
            <text x={cx} y={topY + 92} textAnchor="middle" fontFamily={fonts.sans} fontWeight={300} fontSize={14} fill={colors.muted}>
              {s.s}
            </text>

            {/* stream down to firm bar */}
            <line x1={cx} y1={topY + 102} x2={cx} y2={firmY} stroke={colors.line} strokeWidth={1.4} />
            {[0, 0.5].map((off, j) => {
              const t = ((frame / 50 + off + i * 0.12) % 1);
              const y = topY + 102 + t * (firmY - topY - 102);
              return <circle key={j} cx={cx} cy={y} r={4} fill={colors.goldSoft} opacity={(1 - t * 0.6) * appear} style={{ filter: "drop-shadow(0 0 5px rgba(240,216,154,0.9))" }} />;
            })}
          </g>
        );
      })}
    </svg>
  );
};
