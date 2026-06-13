import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme";

// Sector accent palette (kept close to the ice/gold system, with two accents).
export const SECTOR_COLORS = ["#E6C068", "#8FD8EC", "#E98EA8", "#9BE6B4", "#B9A6F0"];

// A rough, uncut stone — dull, translucent, faintly glinting. "The ore."
export const RoughGem: React.FC<{ size?: number; seed?: number; lit?: number }> = ({ size = 60, seed = 0, lit = 1 }) => {
  const frame = useCurrentFrame();
  const r = size / 2;
  const pts = new Array(7).fill(0).map((_, i) => {
    const a = (i / 7) * Math.PI * 2 + seed;
    const rr = r * (0.7 + ((Math.sin(seed * 9 + i * 3) + 1) / 2) * 0.3);
    return `${Math.cos(a) * rr},${Math.sin(a) * rr}`;
  }).join(" ");
  const glint = 0.3 + 0.3 * Math.sin(frame / 16 + seed);
  return (
    <svg width={size} height={size} viewBox={`${-r} ${-r} ${size} ${size}`} style={{ overflow: "visible" }}>
      <polygon points={pts} fill="rgba(120,140,160,0.35)" stroke="rgba(170,190,210,0.6)" strokeWidth={1} opacity={lit} />
      <polygon points={pts} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth={0.5} transform="scale(0.6)" opacity={lit} />
      <circle cx={-r * 0.25} cy={-r * 0.25} r={2} fill="#fff" opacity={glint * lit} />
    </svg>
  );
};

// A cut & polished brilliant — faceted, shimmering, coloured.
export const CutGem: React.FC<{ size?: number; color?: string; seed?: number; sparkle?: number }> = ({ size = 60, color = colors.ice, seed = 0, sparkle = 1 }) => {
  const frame = useCurrentFrame();
  const r = size / 2;
  const facets = 8;
  const tableR = r * 0.34;
  return (
    <svg width={size} height={size} viewBox={`${-r} ${-r} ${size} ${size}`} style={{ overflow: "visible" }}>
      {new Array(facets).fill(0).map((_, i) => {
        const a0 = (i / facets) * Math.PI * 2 - Math.PI / 2;
        const a1 = ((i + 1) / facets) * Math.PI * 2 - Math.PI / 2;
        const amid = (a0 + a1) / 2;
        const sh = 0.45 + 0.55 * Math.abs(Math.sin(frame / 13 + i + seed));
        return (
          <polygon
            key={i}
            points={`${Math.cos(a0) * tableR},${Math.sin(a0) * tableR} ${Math.cos(amid) * r},${Math.sin(amid) * r} ${Math.cos(a1) * tableR},${Math.sin(a1) * tableR} 0,0`}
            fill={color}
            opacity={(0.45 + 0.5 * sh) * sparkle}
            stroke="rgba(255,255,255,0.6)"
            strokeWidth={0.5}
          />
        );
      })}
      <polygon points={`0,${-tableR} ${tableR * 0.7},0 0,${tableR} ${-tableR * 0.7},0`} fill="#fff" opacity={(0.3 + 0.5 * Math.abs(Math.sin(frame / 11 + seed))) * sparkle} />
    </svg>
  );
};

// The necklace: a strand carrying one pendant per industry — the finished piece.
export const Necklace: React.FC<{
  items: { label: string; sub?: string; Icon: React.FC<{ size?: number; color?: string; sw?: number }> }[];
  width?: number;
}> = ({ items, width = 1280 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const W = width;
  const H = 460;
  const cx = W / 2;
  const topY = 70;
  // strand: a gentle catenary arc
  const span = W * 0.74;
  const left = cx - span / 2;
  const dip = 150;
  const strandY = (x: number) => topY + dip * Math.sin((Math.PI * (x - left)) / span);
  const strandPath = `M ${left} ${topY} Q ${cx} ${topY + dip * 1.5} ${left + span} ${topY}`;
  const draw = interpolate(frame, [6, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const n = items.length;
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ overflow: "visible" }}>
      {/* clasp anchors */}
      <circle cx={left} cy={topY} r={6} fill={colors.gold} opacity={draw} />
      <circle cx={left + span} cy={topY} r={6} fill={colors.gold} opacity={draw} />
      {/* strand */}
      <path d={strandPath} fill="none" stroke={colors.gold} strokeWidth={2} strokeDasharray={1600} strokeDashoffset={1600 * (1 - draw)} opacity={0.8} style={{ filter: "drop-shadow(0 0 4px rgba(230,192,104,0.5))" }} />

      {items.map((it, i) => {
        const t = (i + 1) / (n + 1);
        const x = left + t * span;
        const y = strandY(x) + 40 + Math.sin(t * Math.PI) * 70; // pendants dip with the strand
        const yStrand = topY + (Math.sin(t * Math.PI) * dip * 1.5);
        const sp = spring({ frame: frame - (40 + i * 12), fps, config: { damping: 200 } });
        const col = SECTOR_COLORS[i % SECTOR_COLORS.length];
        const Icon = it.Icon;
        const gemY = yStrand + 56;
        return (
          <g key={i} opacity={sp} style={{ transform: `translateY(${interpolate(sp, [0, 1], [-18, 0])}px)` }}>
            {/* bail/thread */}
            <line x1={x} y1={yStrand} x2={x} y2={gemY - 26} stroke={colors.gold} strokeWidth={1.2} opacity={0.7} />
            {/* gem */}
            <g transform={`translate(${x},${gemY})`}>
              <circle r={34} fill="rgba(255,255,255,0.04)" stroke={col} strokeWidth={1.2} />
              <g transform="translate(-26,-26)">
                {/* cut gem behind icon */}
              </g>
              <g transform={`translate(0,0)`}>
                <CutGemInline color={col} size={54} seed={i} frame={frame} />
              </g>
              <g transform="translate(-15,-15)">
                <Icon size={30} color="#0b1020" sw={1.8} />
              </g>
            </g>
            <text x={x} y={gemY + 64} textAnchor="middle" fontFamily={fonts.display} fontWeight={600} fontSize={21} fill={colors.ink}>{it.label}</text>
            {it.sub && <text x={x} y={gemY + 86} textAnchor="middle" fontFamily={fonts.sans} fontWeight={300} fontSize={14} fill={colors.muted}>{it.sub}</text>}
          </g>
        );
      })}
    </svg>
  );
};

// inline cut gem (so the icon can sit on top within the same svg group)
const CutGemInline: React.FC<{ color: string; size: number; seed: number; frame: number }> = ({ color, size, seed, frame }) => {
  const r = size / 2;
  const facets = 8;
  const tableR = r * 0.34;
  return (
    <g>
      {new Array(facets).fill(0).map((_, i) => {
        const a0 = (i / facets) * Math.PI * 2 - Math.PI / 2;
        const a1 = ((i + 1) / facets) * Math.PI * 2 - Math.PI / 2;
        const amid = (a0 + a1) / 2;
        const sh = 0.45 + 0.55 * Math.abs(Math.sin(frame / 13 + i + seed));
        return (
          <polygon key={i} points={`${Math.cos(a0) * tableR},${Math.sin(a0) * tableR} ${Math.cos(amid) * r},${Math.sin(amid) * r} ${Math.cos(a1) * tableR},${Math.sin(a1) * tableR} 0,0`} fill={color} opacity={0.4 + 0.45 * sh} stroke="rgba(255,255,255,0.5)" strokeWidth={0.5} />
        );
      })}
    </g>
  );
};
