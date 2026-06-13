import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme";
import { RocketIcon, SonarIcon, MedicalIcon, PowerIcon, RobotIcon } from "../components/icons";

// A central brilliant whose five crown facets each "fire" in turn, throwing a
// beam out to an industry node. The five facets Kerala polishes.
const FACETS = [
  { t: "Space & defence", d: "Avionics & RF beside ISRO's labs", Icon: RocketIcon },
  { t: "Marine & underwater", d: "Drones, sonar, port tech", Icon: SonarIcon },
  { t: "Medical electronics", d: "Devices designed beside Sree Chitra", Icon: MedicalIcon },
  { t: "Power & energy", d: "Inverters, EV chargers, smart meters", Icon: PowerIcon },
  { t: "Test & automation", d: "Machines that test everyone else's", Icon: RobotIcon },
];

export const FacetShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cx = 0, cy = 0;
  const coreR = 96;
  const nodeR = 300;
  const intro = interpolate(frame, [4, 36], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const spin = interpolate(frame, [0, 300], [0, 12]);

  // which facet is "firing" — cycles
  const cycle = 46; // frames per facet
  const active = Math.floor(((frame - 40) / cycle)) % FACETS.length;

  return (
    <svg width={820} height={760} viewBox="-410 -380 820 760" style={{ overflow: "visible" }}>
      <defs>
        <radialGradient id="coreG" cx="50%" cy="42%" r="60%">
          <stop offset="0%" stopColor={colors.iceSoft} stopOpacity="0.95" />
          <stop offset="60%" stopColor={colors.ice} stopOpacity="0.3" />
          <stop offset="100%" stopColor={colors.iceDeep} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* aura */}
      <circle cx={cx} cy={cy} r={coreR + 30} fill="url(#coreG)" opacity={intro * 0.7} />

      {/* the brilliant core */}
      <g style={{ transform: `rotate(${spin}deg)`, transformOrigin: "0px 0px" }} opacity={intro}>
        {new Array(8).fill(0).map((_, i) => {
          const a0 = (i / 8) * Math.PI * 2 - Math.PI / 2;
          const a1 = ((i + 1) / 8) * Math.PI * 2 - Math.PI / 2;
          const r1 = coreR * 0.42;
          const tx0 = Math.cos(a0) * r1, ty0 = Math.sin(a0) * r1;
          const tx1 = Math.cos(a1) * r1, ty1 = Math.sin(a1) * r1;
          const amid = (a0 + a1) / 2;
          const gx = Math.cos(amid) * coreR, gy = Math.sin(amid) * coreR;
          const sh = 0.5 + 0.5 * Math.sin(frame / 16 + i);
          return (
            <polygon
              key={i}
              points={`${tx0},${ty0} ${gx},${gy} ${tx1},${ty1} 0,0`}
              fill={i % 2 === 0 ? colors.ice : colors.iceDeep}
              opacity={0.5 + 0.5 * sh}
              stroke="rgba(255,255,255,0.5)"
              strokeWidth={0.6}
            />
          );
        })}
        <circle cx="0" cy="0" r={coreR} fill="none" stroke={colors.goldSoft} strokeWidth={1} opacity={0.5} />
      </g>

      {FACETS.map((f, i) => {
        const a = (i / FACETS.length) * Math.PI * 2 - Math.PI / 2;
        const nx = Math.cos(a) * nodeR;
        const ny = Math.sin(a) * nodeR;
        const bx = Math.cos(a) * coreR;
        const by = Math.sin(a) * coreR;
        const appear = spring({ frame: frame - (40 + i * 9), fps, config: { damping: 200 } });
        const isActive = active === i && frame > 40;
        const beam = isActive ? 0.5 + 0.5 * Math.sin(frame / 6) : 0.12;
        const { Icon } = f;
        return (
          <g key={i} opacity={appear}>
            {/* beam */}
            <line x1={bx} y1={by} x2={nx} y2={ny} stroke={colors.gold} strokeWidth={isActive ? 2.4 : 1} opacity={beam} style={{ filter: isActive ? "drop-shadow(0 0 6px rgba(230,192,104,0.8))" : "none" }} />
            {/* node */}
            <circle cx={nx} cy={ny} r={isActive ? 46 : 40} fill={isActive ? "rgba(230,192,104,0.16)" : "rgba(255,255,255,0.04)"} stroke={isActive ? colors.gold : colors.line} strokeWidth={1.4} />
            <g transform={`translate(${nx - 22},${ny - 22})`}>
              <Icon size={44} color={isActive ? colors.goldSoft : colors.muted} sw={1.5} />
            </g>
            {/* labels: place outside the node radially */}
            <text
              x={nx * 1.32}
              y={ny * 1.32 - 4}
              textAnchor="middle"
              fontFamily={fonts.display}
              fontWeight={600}
              fontSize={22}
              fill={isActive ? colors.ink : colors.muted}
            >
              {f.t}
            </text>
            <text
              x={nx * 1.32}
              y={ny * 1.32 + 18}
              textAnchor="middle"
              fontFamily={fonts.sans}
              fontWeight={300}
              fontSize={14}
              fill={colors.faint}
            >
              {f.d}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
