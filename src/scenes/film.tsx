import React from "react";
import {
  AbsoluteFill,
  interpolate,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, fonts } from "../theme";
import { Backdrop } from "../components/Backdrop";
import { Stage, TitleBlock } from "../components/Stage";
import { Diamond } from "../components/Diamond";
import { AnimatedNumber, Gold } from "../components/ui";
import { BuildingIcon, PersonIcon, FlaskIcon, CapIcon, GearIcon, ChipIcon } from "../components/icons";
import { KeralaMap } from "../illustrations/KeralaMap";
import { DiasporaGlobe } from "../illustrations/DiasporaGlobe";
import { FacetShowcase } from "../illustrations/FacetShowcase";
import { ConsortiumMachine } from "../illustrations/ConsortiumMachine";
import { BalanceScale } from "../illustrations/BalanceScale";
import { Crown } from "../illustrations/Crown";
import { Workshops } from "../illustrations/Workshops";
import { CutTimeline } from "../illustrations/CutTimeline";
import { DemandStreams } from "../illustrations/DemandStreams";
import { ReturnFlow } from "../illustrations/ReturnFlow";
import { FounderMedallion } from "../illustrations/FounderMedallion";

const N = 14;
const P = (i: number) => i / N;

const Center: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", ...style }}>{children}</AbsoluteFill>
);

const Stat: React.FC<{
  to?: number;
  literal?: string;
  prefix?: string;
  suffix?: string;
  label: string;
  delay: number;
  tone?: "gold" | "ice";
  size?: number;
}> = ({ to, literal, prefix = "", suffix = "", label, delay, tone = "gold", size = 76 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  const grad = tone === "gold" ? `linear-gradient(120deg, ${colors.goldSoft}, ${colors.gold})` : `linear-gradient(120deg, ${colors.iceSoft}, ${colors.iceDeep})`;
  return (
    <div style={{ opacity: s, transform: `translateY(${interpolate(s, [0, 1], [26, 0])}px)`, flex: 1 }}>
      <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: size, lineHeight: 1, background: grad, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
        {literal ?? <AnimatedNumber to={to ?? 0} delay={delay + 4} duration={44} prefix={prefix} suffix={suffix} />}
      </div>
      <div style={{ height: 1, background: colors.line, margin: "14px 0" }} />
      <div style={{ fontFamily: fonts.sans, fontWeight: 300, fontSize: 19, lineHeight: 1.4, color: colors.muted }}>{label}</div>
    </div>
  );
};

/* ───────────── 01 · COLD OPEN ───────────── */
export const M01: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const assemble = interpolate(frame, [8, 64], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const t1 = spring({ frame: frame - 40, fps, config: { damping: 200 } });
  const t2 = spring({ frame: frame - 60, fps, config: { damping: 200 } });
  const t3 = spring({ frame: frame - 78, fps, config: { damping: 200 } });
  const out = interpolate(frame, [durationInFrames - 16, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <Backdrop seed="open" />
      <Center style={{ flexDirection: "column" }}>
        <div style={{ marginBottom: 24, transform: `translateY(${interpolate(assemble, [0, 1], [30, 0])}px)` }}>
          <Diamond size={300} progress={assemble} spin={interpolate(frame, [0, 120], [-14, 0])} />
        </div>
        <div style={{ opacity: t1, fontFamily: fonts.sans, fontSize: 20, fontWeight: 600, letterSpacing: 12, color: colors.gold, textTransform: "uppercase", marginBottom: 14 }}>
          A Briefing for Heads of State · June 2026
        </div>
        <h1 style={{ margin: 0, opacity: t2, transform: `translateY(${interpolate(t2, [0, 1], [26, 0])}px)`, fontFamily: fonts.display, fontWeight: 700, fontSize: 142, lineHeight: 1, color: colors.ink }}>
          The Kerala Cut
        </h1>
        <div style={{ opacity: t3, fontFamily: fonts.display, fontStyle: "italic", fontSize: 38, color: colors.iceSoft, marginTop: 14 }}>
          From rough stone to crown jewel
        </div>
      </Center>
    </AbsoluteFill>
  );
};

/* ───────────── 02 · MANY SMALL MASTERS (cut + Surat + Mittelstand) ───────────── */
export const M02: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage seed="masters" chapter="The idea" progress={P(2)}>
      <AbsoluteFill style={{ padding: "92px 120px 80px", display: "flex", flexDirection: "column" }}>
        <TitleBlock
          align="center"
          eyebrow="Value comes from the cut, not the stone"
          title={<>Many small masters, <Gold>one rich nation.</Gold></>}
          sub="Nine of ten diamonds on Earth are cut in India — by thousands of small family workshops. Germany built its wealth the same way: family firms, each the world's best at one narrow thing."
          titleSize={62}
          maxWidth={1240}
          style={{ alignSelf: "center" }}
        />
        <div style={{ flex: 1 }} />
        <div style={{ opacity: interpolate(frame, [18, 42], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }), marginBottom: 30 }}>
          <Workshops width={1680} cols={20} rows={3} />
        </div>
        <div style={{ display: "flex", gap: 50 }}>
          <Stat literal="≈99%" label="of German firms are Mittelstand — small, family-owned" delay={40} />
          <Stat literal="6 in 10" label="German jobs sit inside these small firms" delay={54} />
          <Stat to={1000} suffix="+" label="hidden champions — each a world leader in its niche" delay={68} />
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

/* ───────────── 03 · THE VISIONARY (KPP Nambiar) ───────────── */
const LegacyItem: React.FC<{ year: string; t: string; d: string; delay: number }> = ({ year, t, d, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  return (
    <div style={{ opacity: s, transform: `translateX(${interpolate(s, [0, 1], [30, 0])}px)`, display: "flex", gap: 22, alignItems: "baseline" }}>
      <div style={{ fontFamily: fonts.sans, fontWeight: 700, fontSize: 22, color: colors.gold, minWidth: 110, letterSpacing: 1 }}>{year}</div>
      <div>
        <div style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 28, color: colors.ink }}>{t}</div>
        <div style={{ fontFamily: fonts.sans, fontWeight: 300, fontSize: 18, color: colors.muted, marginTop: 2 }}>{d}</div>
      </div>
    </div>
  );
};
export const M03: React.FC = () => {
  const frame = useCurrentFrame();
  const close = interpolate(frame, [150, 178], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Stage seed="founder" chapter="One man saw it first" progress={P(3)} dim>
      <AbsoluteFill style={{ flexDirection: "row", alignItems: "center" }}>
        <div style={{ width: 720, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <FounderMedallion scale={1.02} />
        </div>
        <div style={{ flex: 1, paddingRight: 120 }}>
          <TitleBlock
            eyebrow="Before the consortium, a visionary"
            title={<>K.P.P. <Gold>Nambiar.</Gold></>}
            sub="A son of Kannur who believed electronics could lift a state. He gave the company its name — KELTRON — and a model the whole country copied."
            titleSize={58}
            maxWidth={640}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 36 }}>
            <LegacyItem year="1973" t="Founded Keltron" d="India's first state-run electronics venture — and its first autonomous state corporation" delay={36} />
            <LegacyItem year="1980" t="Built ER&DC, Trivandrum" d="An R&D centre to anchor indigenous manufacturing" delay={50} />
            <LegacyItem year="Villages" t="Women's electronics co-operatives" d="He took the assembly line to Kerala's villages" delay={64} />
            <LegacyItem year="2006" t="Padma Bhushan" d="The technocrat who seeded Technopark, India's first IT park" delay={78} />
          </div>
          <div style={{ opacity: close, marginTop: 30, fontFamily: fonts.display, fontStyle: "italic", fontSize: 26, color: colors.iceSoft }}>
            The ambition was right. The architecture was early.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

/* ───────────── 04 · THE ARCHITECTURE CHANGED ───────────── */
const ArchCol: React.FC<{ year: string; head: string; points: string[]; delay: number; mode: "mono" | "many" }> = ({ year, head, points, delay, mode }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  return (
    <div style={{ flex: 1, opacity: s, transform: `translateY(${interpolate(s, [0, 1], [30, 0])}px)`, padding: "30px 36px", borderRadius: 18, background: mode === "many" ? "linear-gradient(160deg, rgba(230,192,104,0.12), rgba(230,192,104,0.02))" : "linear-gradient(160deg, rgba(255,255,255,0.03), rgba(255,255,255,0.008))", border: `1px solid ${mode === "many" ? "rgba(230,192,104,0.4)" : colors.line}` }}>
      <div style={{ height: 130, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
        {mode === "mono" ? (
          <div style={{ position: "relative" }}>
            <BuildingIcon size={104} color={colors.muted} sw={1.3} />
            {/* crack */}
            <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "center" }}>
              <svg width={104} height={104} viewBox="0 0 24 24"><path d="M12 3 L10 9 L13 11 L9 21" stroke={colors.bg0} strokeWidth={1} fill="none" /></svg>
            </div>
          </div>
        ) : (
          <svg width={220} height={120} viewBox="-110 -60 220 120">
            <circle cx="0" cy="0" r={16} fill="rgba(230,192,104,0.15)" stroke={colors.gold} strokeWidth={1.2} />
            {new Array(7).fill(0).map((_, i) => {
              const a = (i / 7) * Math.PI * 2;
              const x = Math.cos(a) * 78, y = Math.sin(a) * 42;
              const r = spring({ frame: frame - delay - 6 - i * 3, fps, config: { damping: 200 } });
              return (
                <g key={i} opacity={r}>
                  <line x1="0" y1="0" x2={x} y2={y} stroke={colors.line} strokeWidth={1} />
                  <g transform={`translate(${x - 11},${y - 11})`}><BuildingIcon size={22} color={colors.iceSoft} sw={1.5} /></g>
                </g>
              );
            })}
          </svg>
        )}
      </div>
      <div style={{ fontFamily: fonts.sans, fontWeight: 600, letterSpacing: 3, fontSize: 15, textTransform: "uppercase", color: mode === "many" ? colors.gold : colors.faint }}>{year}</div>
      <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 32, color: colors.ink, margin: "4px 0 16px" }}>{head}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {points.map((p, i) => (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
            <span style={{ width: 7, height: 7, transform: "rotate(45deg)", background: mode === "many" ? colors.gold : colors.faint, flexShrink: 0 }} />
            <span style={{ fontFamily: fonts.sans, fontWeight: 300, fontSize: 19, lineHeight: 1.4, color: colors.muted }}>{p}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export const M04: React.FC = () => (
  <Stage seed="arch" chapter="Why not Keltron 2.0?" progress={P(4)}>
    <AbsoluteFill style={{ padding: "92px 120px 84px", display: "flex", flexDirection: "column" }}>
      <TitleBlock align="center" eyebrow="We changed the architecture" title={<>Keep the ambition. <Gold>Change the architecture.</Gold></>} titleSize={56} maxWidth={1180} style={{ alignSelf: "center" }} />
      <div style={{ flex: 1, display: "flex", gap: 40, alignItems: "center", marginTop: 30 }}>
        <ArchCol mode="mono" year="1973 — the state as producer" head="One company carried the dream" delay={22} points={["Capital and prices set by politics, not markets", "Private firms were competitors, not partners", "When the company stalled, the sector stalled"]} />
        <div style={{ fontFamily: fonts.display, fontSize: 40, color: colors.gold }}>→</div>
        <ArchCol mode="many" year="2026 — the state as enabler" head="Many private owners, together" delay={36} points={["Capital from shareholders; prices from the market", "The state builds shared tools, then steps back", "Keltron reborn as anchor customer & defence channel"]} />
      </div>
    </AbsoluteFill>
  </Stage>
);

/* ───────────── 05 · THE MINE (Kerala map + anchors) ───────────── */
export const M05: React.FC = () => (
  <Stage seed="mine" chapter="The mine · Kerala" progress={P(5)}>
    <AbsoluteFill style={{ padding: "84px 0 70px 120px" }}>
      <TitleBlock
        eyebrow="The anchors are already in place"
        title={<>The deposits are <Gold>already proven.</Gold></>}
        sub="The map isn't a wish-list — these anchors opened their doors in 2026. The consortium grows the suppliers around them."
        titleSize={50}
        maxWidth={560}
      />
    </AbsoluteFill>
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", paddingLeft: 560 }}>
      <KeralaMap scale={0.92} />
    </AbsoluteFill>
  </Stage>
);

/* ───────────── 06 · THE CUTTING WHEEL ───────────── */
export const M06: React.FC = () => (
  <Stage seed="wheel" chapter="The cutting wheel" progress={P(6)}>
    <AbsoluteFill style={{ flexDirection: "row" }}>
      <div style={{ width: 760, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <ConsortiumMachine />
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", paddingRight: 110 }}>
        <TitleBlock
          eyebrow="Five shared tools — the Penang playbook"
          title={<>No cutter owns the <Gold>whole workshop.</Gold></>}
          sub="Firms compete on craft; the consortium owns the tools no small firm can afford alone — shared factories, pooled buying, apprenticeships, an R&D bridge into ISRO and DRDO, and one export desk."
          titleSize={54}
          maxWidth={620}
        />
      </div>
    </AbsoluteFill>
  </Stage>
);

/* ───────────── 07 · THE FIVE FACETS ───────────── */
export const M07: React.FC = () => (
  <Stage seed="facets" chapter="The five facets" progress={P(7)}>
    <AbsoluteFill style={{ padding: "84px 0 0 110px" }}>
      <TitleBlock eyebrow="Where Kerala cuts deepest" title={<>Five facets. <Gold>Maximum fire.</Gold></>} sub="A brilliant's fire comes from the precision of each angle, not the size of the stone." titleSize={54} maxWidth={560} />
    </AbsoluteFill>
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "flex-end", paddingRight: 40 }}>
      <FacetShowcase />
    </AbsoluteFill>
  </Stage>
);

/* ───────────── 08 · A DIFFERENT GAME ───────────── */
export const M08: React.FC = () => {
  const frame = useCurrentFrame();
  const line = interpolate(frame, [96, 120], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Stage seed="game" chapter="A different game" progress={P(8)}>
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 84 }}>
        <TitleBlock align="center" eyebrow="₹41,863 cr of component projects went to eight states — none to Kerala" title={<>So we win a <Gold>different game.</Gold></>} titleSize={52} maxWidth={1200} />
      </AbsoluteFill>
      <Center style={{ marginTop: 44 }}>
        <BalanceScale />
      </Center>
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 78 }}>
        <div style={{ opacity: line, transform: `translateY(${interpolate(line, [0, 1], [16, 0])}px)`, fontFamily: fonts.display, fontSize: 34, color: colors.ink, textAlign: "center" }}>
          Let Tamil Nadu cut glass by the tonne. <span style={{ color: colors.gold, fontStyle: "italic" }}>Kerala cuts diamonds by the carat.</span>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

/* ───────────── 09 · DEMAND BEFORE SUPPLY ───────────── */
export const M09: React.FC = () => (
  <Stage seed="demand" chapter="Demand before supply" progress={P(9)}>
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 92 }}>
      <TitleBlock
        align="center"
        eyebrow="Phase 0 rule · three signed anchor MoUs first"
        title={<>Orders <Gold>before</Gold> a single brick.</>}
        sub="Keltron, V-Guard and Kaynes commit first purchases to graduate firms. Supply chases demand here — never the other way around."
        titleSize={52}
        maxWidth={1160}
      />
    </AbsoluteFill>
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 58 }}>
      <DemandStreams width={1360} />
    </AbsoluteFill>
  </Stage>
);

/* ───────────── 10 · WHO OWNS IT (CIAL + Crown Shares + window) ───────────── */
export const M10: React.FC = () => {
  const frame = useCurrentFrame();
  const note = interpolate(frame, [80, 104], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Stage seed="own" chapter="Who owns it" progress={P(10)}>
      <AbsoluteFill style={{ flexDirection: "row", alignItems: "center" }}>
        <div style={{ width: 720, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <DiasporaGlobe scale={0.92} />
        </div>
        <div style={{ flex: 1, paddingRight: 110 }}>
          <TitleBlock
            eyebrow="The CIAL way — owned by its own people"
            title={<>From remittance <Gold>to ownership.</Gold></>}
            sub="Kerala once asked its diaspora — not a conglomerate — to build an airport. 19,000 NRIs answered, and have drawn dividends ever since. Crown Shares repeat the gesture."
            titleSize={50}
            maxWidth={620}
          />
          <div style={{ display: "flex", gap: 40, marginTop: 36 }}>
            <Stat to={19000} prefix="≈" label="diaspora shareholders, ~30 countries" delay={40} tone="ice" size={68} />
            <Stat literal="0.25%" label="of one year's remittances = the entire ₹500 cr ask" delay={54} size={68} />
          </div>
          <div style={{ opacity: note, marginTop: 26, fontFamily: fonts.display, fontStyle: "italic", fontSize: 24, color: colors.iceSoft }}>
            Gulf inflows decline after 2030 — the window to convert is now.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

/* ───────────── 11 · MASTER CUTTERS ───────────── */
export const M11: React.FC = () => (
  <Stage seed="return" chapter="Master cutters" progress={P(11)}>
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 92 }}>
      <TitleBlock
        align="center"
        eyebrow="Brain drain, reversed by design"
        title={<>Bring the <Gold>craftsmen home.</Gold></>}
        sub="Returnees buy a plot of land and wait. We hand them a workshop instead — a bench, matched equity, and a first order, guaranteed. The next hidden champion."
        titleSize={52}
        maxWidth={1140}
      />
    </AbsoluteFill>
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 70 }}>
      <ReturnFlow width={1280} />
    </AbsoluteFill>
  </Stage>
);

/* ───────────── 12 · THE TEN-YEAR CUT ───────────── */
export const M12: React.FC = () => (
  <Stage seed="time" chapter="A ten-year cut" progress={P(12)}>
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 80 }}>
      <TitleBlock align="center" eyebrow="From prospecting to the crown" title={<>Money follows <Gold>proof.</Gold></>} sub="Every rupee is staged — no gate passed, no funds released." titleSize={52} maxWidth={1000} />
    </AbsoluteFill>
    <Center style={{ marginTop: 86 }}>
      <CutTimeline width={1620} />
    </Center>
  </Stage>
);

/* ───────────── 13 · THE ASK ───────────── */
const ITEMS = [
  { t: "Shared SMT, test & certification centres", cr: 240 },
  { t: "Pooled component purchasing fund", cr: 90 },
  { t: "Master Cutter returnee-founder fund", cr: 70 },
  { t: "Apprenticeship programme (5 yrs)", cr: 60 },
  { t: "R&D bridge + export & bids desk", cr: 40 },
];
export const M13: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Stage seed="ask" chapter="The ask" progress={P(13)}>
      <AbsoluteFill style={{ padding: "92px 120px", display: "flex", flexDirection: "column" }}>
        <TitleBlock eyebrow="A modest stake in a generational stone" title={<>The ask: <Gold>₹500 crore.</Gold></>} titleSize={58} maxWidth={900} />
        <div style={{ display: "flex", gap: 70, flex: 1, marginTop: 24, alignItems: "center" }}>
          <div style={{ flex: 1.5, display: "flex", flexDirection: "column", gap: 18 }}>
            {ITEMS.map((it, i) => {
              const d = 26 + i * 12;
              const s = spring({ frame: frame - d, fps, config: { damping: 200 } });
              const w = interpolate(frame - (d + 6), [0, 36], [0, it.cr / 240], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              return (
                <div key={i} style={{ opacity: s }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                    <span style={{ fontFamily: fonts.sans, fontWeight: 400, fontSize: 21, color: colors.ink }}>{it.t}</span>
                    <span style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 26, color: colors.goldSoft }}>₹{it.cr} cr</span>
                  </div>
                  <div style={{ height: 12, borderRadius: 6, background: "rgba(255,255,255,0.05)", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${w * 100}%`, borderRadius: 6, background: `linear-gradient(90deg, ${colors.iceDeep}, ${colors.gold})` }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 150, lineHeight: 1, background: `linear-gradient(120deg, ${colors.goldSoft}, ${colors.gold})`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              ₹<AnimatedNumber to={500} delay={40} duration={50} />
            </div>
            <div style={{ fontFamily: fonts.sans, fontWeight: 600, fontSize: 22, letterSpacing: 6, textTransform: "uppercase", color: colors.muted, marginTop: 4 }}>crore · total</div>
            <div style={{ width: 60, height: 1, background: colors.line, margin: "24px 0" }} />
            <div style={{ fontFamily: fonts.display, fontStyle: "italic", fontSize: 25, color: colors.iceSoft, textAlign: "center", maxWidth: 380, lineHeight: 1.4 }}>
              The price of a few kilometres of elevated highway — and more jobs per rupee than any fab.
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

/* ───────────── 14 · FINALE ───────────── */
export const M14: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Beats
  const flash = interpolate(frame, [86, 92, 110], [0, 0.9, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const rings = frame - 92;
  const l1 = spring({ frame: frame - 120, fps, config: { damping: 200 } });
  const l2 = spring({ frame: frame - 150, fps, config: { damping: 200 } });
  const callback = spring({ frame: frame - 220, fps, config: { damping: 200 } });
  const tag = spring({ frame: frame - 300, fps, config: { damping: 200 } });
  const out = interpolate(frame, [durationInFrames - 30, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

  // converging firm-sparks into the crown jewel (before the set)
  const sparks = new Array(28).fill(0).map((_, i) => {
    const a = random(`fa${i}`) * Math.PI * 2;
    const start = 60 + random(`fr${i}`) * 520;
    const t = interpolate(frame, [20, 86], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const r = interpolate(t, [0, 1], [start, 0]);
    return { x: Math.cos(a) * r, y: Math.sin(a) * r - 30, o: (1 - t) * 0.9, gold: random(`fg${i}`) > 0.4 };
  });

  return (
    <AbsoluteFill style={{ opacity: out }}>
      <Backdrop seed="finale" />
      {/* converging sparks */}
      <Center>
        <svg width={1200} height={760} viewBox="-600 -380 1200 760" style={{ overflow: "visible", position: "absolute" }}>
          {sparks.map((s, i) => (
            <circle key={i} cx={s.x} cy={s.y} r={3.4} fill={s.gold ? colors.goldSoft : colors.iceSoft} opacity={s.o} style={{ filter: "drop-shadow(0 0 6px rgba(240,216,154,0.8))" }} />
          ))}
          {/* expanding light rings on set */}
          {rings > 0 &&
            [0, 1, 2].map((k) => {
              const rr = interpolate(rings - k * 12, [0, 60], [0, 360], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              const op = interpolate(rings - k * 12, [0, 60], [0.5, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              return <circle key={k} cx={0} cy={-30} r={rr} fill="none" stroke={colors.gold} strokeWidth={1.5} opacity={op} />;
            })}
        </svg>
      </Center>

      {/* the crown being set */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", transform: "translateY(-90px)" }}>
        <Crown scale={1.15} />
      </AbsoluteFill>

      {/* white flash */}
      <AbsoluteFill style={{ background: "#fff", opacity: flash }} />

      {/* text beats */}
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 96 }}>
        <h1 style={{ margin: 0, opacity: l1, transform: `translateY(${interpolate(l1, [0, 1], [24, 0])}px)`, fontFamily: fonts.display, fontWeight: 600, fontSize: 66, color: colors.ink, textAlign: "center" }}>
          Kerala does not need a bigger mine.
        </h1>
        <h1 style={{ margin: "6px 0 0", opacity: l2, transform: `translateY(${interpolate(l2, [0, 1], [24, 0])}px) scale(${interpolate(l2, [0, 1], [0.94, 1])})`, fontFamily: fonts.display, fontWeight: 700, fontSize: 80, fontStyle: "italic", textAlign: "center", background: `linear-gradient(100deg, ${colors.goldSoft}, ${colors.gold})`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
          It needs a finer cut.
        </h1>
        <div style={{ opacity: callback, transform: `translateY(${interpolate(callback, [0, 1], [16, 0])}px)`, marginTop: 28, fontFamily: fonts.display, fontStyle: "italic", fontSize: 27, color: colors.iceSoft }}>
          The ambition was Nambiar's. The cut is ours.
        </div>
        <div style={{ opacity: tag, marginTop: 26, display: "flex", alignItems: "center", gap: 18 }}>
          <span style={{ width: 40, height: 1, background: colors.line }} />
          <span style={{ fontFamily: fonts.sans, fontWeight: 400, fontSize: 21, letterSpacing: 3, color: colors.muted, textTransform: "uppercase" }}>
            The Kerala Electronics Consortium · Many small masters, one crown jewel
          </span>
          <span style={{ width: 40, height: 1, background: colors.line }} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
