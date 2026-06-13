import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme";
import { RocketIcon, ShipIcon, BuildingIcon, ChipIcon } from "../components/icons";

// Recognisable silhouette of Kerala: a narrow coastal sliver running NNW→SSE,
// smooth Arabian-Sea coast on the west, jagged Western-Ghats border on the east,
// widest through the middle (Palakkad/Thrissur), tapering north and south.
// Coordinate space ~ 320 wide × 660 tall; north (Kasaragod) at top.
const KERALA_PATH = `
M 150 14
C 168 30 176 52 184 74
C 196 104 210 128 228 150
C 248 174 268 196 278 226
C 288 256 280 286 268 312
C 256 338 246 360 250 388
C 254 416 268 440 270 468
C 272 496 258 520 244 544
C 232 564 222 588 214 612
C 208 630 198 642 184 640
C 172 638 166 622 160 606
C 150 580 142 556 128 536
C 112 514 96 496 92 468
C 88 438 100 412 104 384
C 108 356 100 330 86 306
C 70 280 54 256 50 226
C 46 196 58 170 72 146
C 86 122 98 98 104 70
C 110 46 124 22 140 16
C 143 14 147 12 150 14 Z`;

type Site = {
  x: number;
  y: number;
  label: string;
  anchors: string[];
  Icon: React.FC<{ size?: number; color?: string; sw?: number }>;
  side: "l" | "r";
  accent?: boolean;
};

// Sites placed at true relative latitudes (Kasaragod north → Vizhinjam south).
const SITES: Site[] = [
  {
    x: 150,
    y: 96,
    label: "Kannur",
    anchors: ["Birthplace of K.P.P. Nambiar"],
    Icon: BuildingIcon,
    side: "r",
    accent: true,
  },
  {
    x: 168,
    y: 372,
    label: "Kochi / Kakkanad",
    anchors: ["V-Guard Innovation Campus", "Kaynes Technology", "Maker Village · NPOL"],
    Icon: ChipIcon,
    side: "l",
  },
  {
    x: 196,
    y: 540,
    label: "Thiruvananthapuram",
    anchors: ["Keltron · VSSC / ISRO", "Technopark · Sree Chitra · ER&DC"],
    Icon: RocketIcon,
    side: "r",
  },
  {
    x: 188,
    y: 612,
    label: "Vizhinjam",
    anchors: ["Deep-water transshipment port"],
    Icon: ShipIcon,
    side: "l",
  },
];

export const KeralaMap: React.FC<{ scale?: number }> = ({ scale = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const draw = interpolate(frame, [6, 56], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fillIn = interpolate(frame, [30, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <svg width={360 * scale} height={680 * scale} viewBox="-30 -10 380 700" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="kmFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(143,216,236,0.22)" />
          <stop offset="100%" stopColor="rgba(79,168,201,0.05)" />
        </linearGradient>
        <clipPath id="kmClip">
          <path d={KERALA_PATH} />
        </clipPath>
        <filter id="kmGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {/* sea shimmer to the west */}
      <g clipPath="url(#kmClip)" opacity={fillIn}>
        <rect x="-30" y="-10" width="380" height="700" fill="url(#kmFill)" />
        {/* contour lines */}
        {new Array(14).fill(0).map((_, i) => (
          <path
            key={i}
            d={`M-30 ${20 + i * 48} C 80 ${0 + i * 48} 200 ${60 + i * 48} 350 ${24 + i * 48}`}
            stroke="rgba(143,216,236,0.30)"
            strokeWidth={0.7}
            fill="none"
          />
        ))}
      </g>

      {/* coastline draw-on */}
      <path
        d={KERALA_PATH}
        fill="none"
        stroke={colors.ice}
        strokeWidth={2.4}
        strokeDasharray={2600}
        strokeDashoffset={2600 * (1 - draw)}
        style={{ filter: "drop-shadow(0 0 6px rgba(143,216,236,0.6))" }}
      />

      {/* "Arabian Sea" + "Western Ghats" hints */}
      <text x="-18" y="330" fontFamily={fonts.sans} fontSize={13} letterSpacing={3} fill={colors.faint} opacity={fillIn * 0.8} transform="rotate(-90 -18 330)">
        ARABIAN SEA
      </text>

      {/* sites */}
      {SITES.map((s, i) => {
        const d = 60 + i * 14;
        const sp = spring({ frame: frame - d, fps, config: { damping: 200 } });
        const pulse = 0.5 + 0.5 * Math.abs(Math.sin((frame - d) / 16));
        const col = s.accent ? colors.goldSoft : colors.gold;
        const Icon = s.Icon;
        const lx = s.side === "r" ? 300 : -8;
        const anchorX = s.side === "r" ? 308 : -16;
        const textAnchor = s.side === "r" ? "start" : "end";
        return (
          <g key={i} opacity={sp}>
            {/* leader line from pin to label rail */}
            <line x1={s.x} y1={s.y} x2={lx} y2={s.y} stroke={colors.line} strokeWidth={1} />
            {/* pin */}
            <circle cx={s.x} cy={s.y} r={12 + pulse * 10} fill="none" stroke={col} strokeWidth={1} opacity={(1 - pulse) * 0.8} />
            <circle cx={s.x} cy={s.y} r={6} fill={col} filter="url(#kmGlow)" />
            <circle cx={s.x} cy={s.y} r={2.6} fill="#fff" />

            {/* label card */}
            <g transform={`translate(${anchorX}, ${s.y})`}>
              <g transform={`translate(${s.side === "r" ? 0 : -34}, -20)`}>
                <Icon size={34} color={s.accent ? colors.goldSoft : colors.iceSoft} sw={1.4} />
              </g>
              <text x={s.side === "r" ? 44 : -44} y={-6} textAnchor={textAnchor} fontFamily={fonts.display} fontWeight={700} fontSize={24} fill={colors.ink}>
                {s.label}
              </text>
              {s.anchors.map((a, j) => (
                <text
                  key={j}
                  x={s.side === "r" ? 44 : -44}
                  y={16 + j * 20}
                  textAnchor={textAnchor}
                  fontFamily={fonts.sans}
                  fontWeight={300}
                  fontSize={15}
                  fill={s.accent ? colors.goldSoft : colors.muted}
                >
                  {a}
                </text>
              ))}
            </g>
          </g>
        );
      })}
    </svg>
  );
};
