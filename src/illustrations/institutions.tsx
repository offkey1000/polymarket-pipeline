import React from "react";
import { Img, staticFile, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme";
import { GearIcon } from "../components/icons";

/* ── The four-quadrant institutional timeline ──
   Keltron 1973 (mfg) · ER&DC 1980 (R&D) · Technopark 1990 (ecosystem) ·
   KSIEP 2026 (the synthesis). `connect` (0..1) draws the reconnection loop
   and fills the empty fourth quadrant. */
const QUAD = [
  { key: "KELTRON", year: "1973", age: "53 yrs", cap: "Manufacturing & industrial capability", col: 0, row: 1, logo: "img/keltron_mark.png" },
  { key: "ER&DC", year: "1980", age: "46 yrs", cap: "Research & development", col: 1, row: 1, logo: "img/cdac.jpg" },
  { key: "TECHNOPARK", year: "1990", age: "36 yrs", cap: "Innovation & IT ecosystem", col: 0, row: 0, logo: "img/technopark.jpg" },
  { key: "KSIEP", year: "2026", age: "now", cap: "Sovereign electronics platform", col: 1, row: 0, ksiep: true },
];

export const QuadrantTimeline: React.FC<{ connect?: number; width?: number }> = ({ connect = 0, width = 1180 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const W = width;
  const H = 560;
  const cw = W / 2;
  const ch = H / 2;
  const cell = (col: number, row: number) => ({ x: col * cw + cw / 2, y: row * ch + ch / 2 });

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ overflow: "visible" }}>
      {/* axes */}
      <line x1={cw} y1={20} x2={cw} y2={H - 20} stroke={colors.line} strokeWidth={1} />
      <line x1={20} y1={ch} x2={W - 20} y2={ch} stroke={colors.line} strokeWidth={1} />

      {/* reconnection loop R&D → Mfg → Entrepreneurship → Strategic Tech */}
      {(() => {
        const order = [1, 0, 2, 3]; // ER&DC → Keltron → Technopark → KSIEP
        const pts = order.map((i) => cell(QUAD[i].col, QUAD[i].row));
        const labels = ["R&D", "Manufacturing", "Entrepreneurship", "Strategic Tech"];
        return (
          <g>
            {pts.map((p, k) => {
              const n = pts[(k + 1) % pts.length];
              const seg = interpolate(connect, [k / 4, (k + 1) / 4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              const mx = p.x + (n.x - p.x) * seg;
              const my = p.y + (n.y - p.y) * seg;
              return (
                <g key={k}>
                  <line x1={p.x} y1={p.y} x2={mx} y2={my} stroke={colors.gold} strokeWidth={2} opacity={0.8 * connect} style={{ filter: "drop-shadow(0 0 5px rgba(230,192,104,0.6))" }} />
                  {seg > 0.05 && seg < 1 && <circle cx={mx} cy={my} r={4} fill={colors.goldSoft} />}
                  {seg > 0.5 && (
                    <text x={(p.x + n.x) / 2} y={(p.y + n.y) / 2 - 8} textAnchor="middle" fontFamily={fonts.sans} fontWeight={600} fontSize={14} letterSpacing={1} fill={colors.goldSoft} opacity={connect}>
                      {labels[k]}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        );
      })()}

      {QUAD.map((q, i) => {
        const c = cell(q.col, q.row);
        const sp = spring({ frame: frame - (10 + i * 12), fps, config: { damping: 200 } });
        const ksFill = q.ksiep ? connect : 1;
        return (
          <g key={q.key} opacity={sp} style={{ transform: `scale(${interpolate(sp, [0, 1], [0.9, 1])})`, transformOrigin: `${c.x}px ${c.y}px` }}>
            <rect x={c.x - 150} y={c.y - 84} width={300} height={168} rx={16}
              fill={q.ksiep ? `rgba(230,192,104,${0.05 + 0.12 * ksFill})` : "rgba(143,216,236,0.05)"}
              stroke={q.ksiep ? colors.gold : colors.line} strokeWidth={q.ksiep ? 1.6 : 1}
              strokeDasharray={q.ksiep && connect < 0.5 ? "6 6" : "0"} />
            <text x={c.x} y={c.y - 44} textAnchor="middle" fontFamily={fonts.sans} fontWeight={700} fontSize={15} letterSpacing={3} fill={q.ksiep ? colors.goldSoft : colors.gold}>
              {q.year} · {q.age}
            </text>
            <text x={c.x} y={c.y - 4} textAnchor="middle" fontFamily={fonts.display} fontWeight={700} fontSize={40} fill={q.ksiep ? colors.goldSoft : colors.ink} opacity={q.ksiep ? 0.4 + 0.6 * ksFill : 1}>
              {q.key}
            </text>
            <text x={c.x} y={c.y + 36} textAnchor="middle" fontFamily={fonts.sans} fontWeight={300} fontSize={18} fill={colors.muted}>
              {q.cap}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

/* ── Six pillars of the Distinctive Kerala Model ── */
const PILLARS: { logo: string | null; name: string; give: string; inv: boolean; mark?: "keltron" | "gear" }[] = [
  { logo: "img/keltron_logo.jpg", name: "Keltron", give: "Technology & industrial base", inv: true },
  { logo: "img/cdac.jpg", name: "ER&DC", give: "R&D & innovation", inv: true },
  { logo: "img/technopark.jpg", name: "Technopark", give: "Ecosystem architecture", inv: true },
  { logo: "img/cial.jpg", name: "CIAL", give: "Capital & governance", inv: true },
  { logo: "img/kudumbashree.png", name: "Kudumbashree", give: "Distributed woman-led entrepreneurship", inv: true },
  { logo: null, mark: "gear", name: "Mittelstand", give: "Specialized SME industrialization", inv: false },
];
export const SixPillars: React.FC<{ width?: number }> = ({ width = 1560 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const colW = width / 6;
  const baseY = 470;
  const layerIn = spring({ frame: frame - 96, fps, config: { damping: 200 } });
  return (
    <svg width={width} height={560} viewBox={`0 0 ${width} 560`} style={{ overflow: "visible" }}>
      {/* the capability layer slab they hold up */}
      <g opacity={layerIn} transform={`translateY(${interpolate(layerIn, [0, 1], [-20, 0])})`}>
        <rect x={40} y={36} width={width - 80} height={46} rx={8} fill="rgba(230,192,104,0.12)" stroke={colors.gold} strokeWidth={1.4} />
        <text x={width / 2} y={66} textAnchor="middle" fontFamily={fonts.display} fontWeight={600} fontSize={26} fill={colors.goldSoft} letterSpacing={1}>
          THE DURABLE CAPABILITY LAYER
        </text>
      </g>

      {PILLARS.map((p, i) => {
        const cx = colW * (i + 0.5);
        const sp = spring({ frame: frame - (16 + i * 12), fps, config: { damping: 200 } });
        const h = interpolate(sp, [0, 1], [0, baseY - 130]);
        const topY = baseY - h;
        return (
          <g key={i} opacity={sp}>
            {/* pillar shaft */}
            <rect x={cx - 30} y={topY} width={60} height={h} rx={6} fill="rgba(143,216,236,0.06)" stroke={colors.line} strokeWidth={1} />
            <line x1={cx} y1={topY} x2={cx} y2={baseY} stroke={colors.iceDeep} strokeWidth={1} opacity={0.5} />
            {/* capital (logo) */}
            <g transform={`translate(${cx},${topY - 6})`}>
              <circle cx={0} cy={-34} r={40} fill={p.inv ? "#fff" : "rgba(9,14,26,0.9)"} stroke={colors.ice} strokeWidth={1.4} />
              {p.logo ? (
                <image href={staticFile(p.logo)} x={-30} y={-60} width={60} height={52} preserveAspectRatio="xMidYMid meet" />
              ) : (
                <g transform="translate(-22,-56)"><GearIcon size={44} color={colors.iceSoft} sw={1.4} /></g>
              )}
            </g>
            {/* base label */}
            <text x={cx} y={baseY + 28} textAnchor="middle" fontFamily={fonts.display} fontWeight={600} fontSize={22} fill={colors.ink}>{p.name}</text>
            <foreignObject x={cx - colW * 0.46} y={baseY + 40} width={colW * 0.92} height={70}>
              <div style={{ fontFamily: fonts.sans, fontWeight: 300, fontSize: 15, lineHeight: 1.35, color: colors.muted, textAlign: "center" }}>{p.give}</div>
            </foreignObject>
          </g>
        );
      })}
      {/* base plinth */}
      <rect x={40} y={baseY} width={width - 80} height={10} rx={5} fill={colors.iceDeep} opacity={0.4} />
    </svg>
  );
};
