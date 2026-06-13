import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, fonts } from "../theme";
import { Backdrop } from "../components/Backdrop";
import { Stage, TitleBlock } from "../components/Stage";
import { Diamond } from "../components/Diamond";
import { AnimatedNumber, Gold } from "../components/ui";
import {
  BuildingIcon,
  FlaskIcon,
  RocketIcon,
  ChipIcon,
  PersonIcon,
  CapIcon,
} from "../components/icons";
import { KeralaMap } from "../illustrations/KeralaMap";
import { DiamondJourney } from "../illustrations/DiamondJourney";
import { DiasporaGlobe } from "../illustrations/DiasporaGlobe";
import { FacetShowcase } from "../illustrations/FacetShowcase";
import { ConsortiumMachine } from "../illustrations/ConsortiumMachine";
import { BalanceScale } from "../illustrations/BalanceScale";
import { Crown } from "../illustrations/Crown";
import { Workshops } from "../illustrations/Workshops";
import { CutTimeline } from "../illustrations/CutTimeline";
import { DemandStreams } from "../illustrations/DemandStreams";
import { ReturnFlow } from "../illustrations/ReturnFlow";
import { NarrowingRiver } from "../illustrations/NarrowingRiver";

const N = 18;
const P = (i: number) => i / N;

const Center: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", ...style }}>{children}</AbsoluteFill>
);

// A small stat block used across counter scenes.
const Stat: React.FC<{
  to?: number;
  literal?: string;
  prefix?: string;
  suffix?: string;
  label: string;
  delay: number;
  tone?: "gold" | "ice";
}> = ({ to, literal, prefix = "", suffix = "", label, delay, tone = "gold" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  const grad =
    tone === "gold"
      ? `linear-gradient(120deg, ${colors.goldSoft}, ${colors.gold})`
      : `linear-gradient(120deg, ${colors.iceSoft}, ${colors.iceDeep})`;
  return (
    <div style={{ opacity: s, transform: `translateY(${interpolate(s, [0, 1], [26, 0])}px)`, flex: 1 }}>
      <div
        style={{
          fontFamily: fonts.display,
          fontWeight: 700,
          fontSize: 78,
          lineHeight: 1,
          background: grad,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        {literal ?? <AnimatedNumber to={to ?? 0} delay={delay + 4} duration={44} prefix={prefix} suffix={suffix} />}
      </div>
      <div style={{ height: 1, background: colors.line, margin: "14px 0" }} />
      <div style={{ fontFamily: fonts.sans, fontWeight: 300, fontSize: 19, lineHeight: 1.4, color: colors.muted }}>{label}</div>
    </div>
  );
};

/* ───────────────────────── 01 · COLD OPEN ───────────────────────── */
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

/* ───────────────────────── 02 · THE CUT (thesis) ───────────────── */
export const M02: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage seed="thesis" chapter="Why a diamond" progress={P(2)}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start", paddingTop: 110 }}>
        <TitleBlock
          align="center"
          eyebrow="Value comes from the cut"
          title={<>Nine of ten diamonds on Earth<br />are cut in <Gold>India.</Gold></>}
          sub="Not by one giant — by thousands of small family workshops in Surat, each a master of one step. Value doesn't come from the stone. It comes from the cut."
          titleSize={64}
          maxWidth={1200}
        />
      </AbsoluteFill>
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 70, opacity: interpolate(frame, [20, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
        <Workshops width={1240} cols={16} rows={4} />
      </AbsoluteFill>
    </Stage>
  );
};

/* ───────────────────────── 03 · THE JOURNEY ────────────────────── */
export const M03: React.FC = () => (
  <Stage seed="journey" chapter="One journey, two stories" progress={P(3)}>
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start", paddingTop: 96 }}>
      <TitleBlock align="center" eyebrow="The cut, stage by stage" title={<>The diamond's journey — and Kerala's</>} titleSize={56} maxWidth={1100} />
    </AbsoluteFill>
    <Center style={{ marginTop: 70 }}>
      <DiamondJourney width={1560} />
    </Center>
  </Stage>
);

/* ───────────────────────── 04 · MITTELSTAND ────────────────────── */
export const M04: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage seed="mittel" chapter="The model · Germany" progress={P(4)}>
      <AbsoluteFill style={{ padding: "104px 120px 90px", display: "flex", flexDirection: "column" }}>
        <TitleBlock
          eyebrow="Mittelstand"
          title={<>Many small masters, <Gold>one rich nation.</Gold></>}
          sub="Germany's wealth rests on thousands of family firms — each the world's best at one narrow thing. Germans call them hidden champions."
          titleSize={60}
          maxWidth={1180}
        />
        <div style={{ flex: 1 }} />
        <div style={{ opacity: interpolate(frame, [18, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }), marginBottom: 30 }}>
          <Workshops width={1680} cols={20} rows={3} />
        </div>
        <div style={{ display: "flex", gap: 50 }}>
          <Stat literal="≈99%" label="of German companies are Mittelstand firms" delay={40} />
          <Stat literal="6 in 10" label="German jobs are in these small firms" delay={56} />
          <Stat to={1000} suffix="+" label="hidden champions — world leaders in a niche" delay={72} />
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

/* ───────────────────────── 05 · THE MINE (Kerala map) ──────────── */
export const M05: React.FC = () => (
  <Stage seed="mine" chapter="The mine · Kerala" progress={P(5)}>
    <AbsoluteFill style={{ flexDirection: "row", alignItems: "center" }}>
      <div style={{ width: 760, display: "flex", justifyContent: "center", alignItems: "center", paddingLeft: 60 }}>
        <KeralaMap scale={1.05} />
      </div>
      <div style={{ flex: 1, paddingRight: 120 }}>
        <TitleBlock
          eyebrow="The deposits are already proven"
          title={<>A mine looks like ordinary ground —<br />until you <Gold>map the deposits.</Gold></>}
          sub="Near-universal literacy. Fifty years of ISRO space electronics. India's largest hardware incubator. A new deep-water port on the world's main east–west lane. And a diaspora with patient money seeking purpose."
          titleSize={52}
          maxWidth={720}
        />
      </div>
    </AbsoluteFill>
  </Stage>
);

/* ───────────────────────── 06 · SORTING HOUSE ──────────────────── */
const HouseCol: React.FC<{ city: string; tag: string; items: { t: string; d: string }[]; delay: number }> = ({ city, tag, items, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  return (
    <div style={{ flex: 1, opacity: s, transform: `translateY(${interpolate(s, [0, 1], [30, 0])}px)`, padding: "0 24px" }}>
      <div style={{ fontFamily: fonts.sans, fontWeight: 600, letterSpacing: 3, fontSize: 16, color: colors.gold, textTransform: "uppercase" }}>{tag}</div>
      <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 40, color: colors.ink, margin: "6px 0 22px" }}>{city}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {items.map((it, i) => {
          const r = spring({ frame: frame - delay - 8 - i * 6, fps, config: { damping: 200 } });
          return (
            <div key={i} style={{ opacity: r, transform: `translateX(${interpolate(r, [0, 1], [24, 0])}px)`, display: "flex", gap: 16, alignItems: "center", padding: "12px 18px", borderRadius: 12, background: "linear-gradient(100deg, rgba(143,216,236,0.06), transparent)", borderLeft: `2px solid ${colors.iceDeep}` }}>
              <BuildingIcon size={34} color={colors.iceSoft} sw={1.4} />
              <div>
                <div style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 26, color: colors.ink }}>{it.t}</div>
                <div style={{ fontFamily: fonts.sans, fontWeight: 300, fontSize: 17, color: colors.muted }}>{it.d}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export const M06: React.FC = () => (
  <Stage seed="sort" chapter="The sorting house" progress={P(6)}>
    <AbsoluteFill style={{ padding: "100px 120px 80px", display: "flex", flexDirection: "column" }}>
      <TitleBlock align="center" eyebrow="The master houses are open" title={<>Two cities, one jewel house</>} titleSize={54} maxWidth={1100} style={{ alignSelf: "center" }} />
      <div style={{ flex: 1, display: "flex", marginTop: 40 }}>
        <HouseCol
          tag="Kochi — the cutting floor"
          city="Kochi"
          delay={20}
          items={[
            { t: "V-Guard Innovation Campus", d: "11-storey R&D hub, opened Feb 2026" },
            { t: "Kaynes Technology", d: "Top Indian maker's first Kerala plant" },
            { t: "Maker Village + EyeRov", d: "India's first indigenous underwater drone" },
          ]}
        />
        <div style={{ width: 1, background: colors.line }} />
        <HouseCol
          tag="Trivandrum — the master's bench"
          city="Trivandrum"
          delay={34}
          items={[
            { t: "Keltron (est. 1973)", d: "India's first state electronics company" },
            { t: "VSSC / ISRO complex", d: "Half a century of rocket-grade avionics" },
            { t: "SCTIMST (Sree Chitra)", d: "A rare medical-device R&D institute" },
          ]}
        />
      </div>
    </AbsoluteFill>
  </Stage>
);

/* ───────────────────────── 07 · CONSORTIUM MACHINE ─────────────── */
export const M07: React.FC = () => (
  <Stage seed="wheel" chapter="The cutting wheel" progress={P(7)}>
    <AbsoluteFill style={{ flexDirection: "row" }}>
      <div style={{ width: 760, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <ConsortiumMachine />
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", paddingRight: 110 }}>
        <TitleBlock
          eyebrow="Five shared tools"
          title={<>No cutter owns the <Gold>whole workshop.</Gold></>}
          sub="Firms compete on craft; the consortium owns the tools no small firm can afford alone — shared factories, pooled buying, apprenticeships, an R&D bridge into ISRO and DRDO, and one export desk."
          titleSize={54}
          maxWidth={620}
        />
      </div>
    </AbsoluteFill>
  </Stage>
);

/* ───────────────────────── 08 · FIVE FACETS ────────────────────── */
export const M08: React.FC = () => (
  <Stage seed="facets" chapter="The five facets" progress={P(8)}>
    <AbsoluteFill style={{ padding: "84px 0 0 110px" }}>
      <TitleBlock
        eyebrow="Where Kerala cuts deepest"
        title={<>Five facets. <Gold>Maximum fire.</Gold></>}
        sub="A brilliant's fire comes from the precision of each angle, not the size of the stone."
        titleSize={54}
        maxWidth={560}
      />
    </AbsoluteFill>
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "flex-end", paddingRight: 40 }}>
      <FacetShowcase />
    </AbsoluteFill>
  </Stage>
);

/* ───────────────────────── 09 · A DIFFERENT GAME ───────────────── */
export const M09: React.FC = () => {
  const frame = useCurrentFrame();
  const line = interpolate(frame, [96, 120], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Stage seed="game" chapter="A different game" progress={P(9)}>
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 88 }}>
        <TitleBlock align="center" eyebrow="India's electronics map" title={<>We win a different game</>} titleSize={54} maxWidth={1000} />
      </AbsoluteFill>
      <Center style={{ marginTop: 40 }}>
        <BalanceScale />
      </Center>
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 80 }}>
        <div style={{ opacity: line, transform: `translateY(${interpolate(line, [0, 1], [16, 0])}px)`, fontFamily: fonts.display, fontSize: 34, color: colors.ink, textAlign: "center" }}>
          Let Tamil Nadu cut glass by the tonne. <span style={{ color: colors.gold, fontStyle: "italic" }}>Kerala cuts diamonds by the carat.</span>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

/* ───────────────────────── 10 · DEMAND BEFORE SUPPLY ───────────── */
export const M10: React.FC = () => (
  <Stage seed="demand" chapter="Demand before supply" progress={P(10)}>
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 96 }}>
      <TitleBlock
        align="center"
        eyebrow="Phase 0 rule"
        title={<>Three signed orders <Gold>before a single brick.</Gold></>}
        sub="Clusters die when they build first and pray for orders. Supply chases demand here — never the other way around."
        titleSize={52}
        maxWidth={1140}
      />
    </AbsoluteFill>
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 60 }}>
      <DemandStreams width={1360} />
    </AbsoluteFill>
  </Stage>
);

/* ───────────────────────── 11 · WHO OWNS IT (globe) ────────────── */
export const M11: React.FC = () => (
  <Stage seed="own" chapter="Who owns it" progress={P(11)}>
    <AbsoluteFill style={{ flexDirection: "row", alignItems: "center" }}>
      <div style={{ width: 720, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <DiasporaGlobe scale={0.95} />
      </div>
      <div style={{ flex: 1, paddingRight: 110 }}>
        <TitleBlock
          eyebrow="The CIAL way"
          title={<>Owned by <Gold>its own people.</Gold></>}
          sub="In 1994 Kerala asked its diaspora — not a conglomerate — to build an airport. Nearly 10,000 NRIs answered. We raise capital the same way."
          titleSize={54}
          maxWidth={620}
        />
        <div style={{ display: "flex", gap: 40, marginTop: 40 }}>
          <Stat to={19000} prefix="≈" label="shareholders from ~30 countries" delay={40} tone="ice" />
          <Stat to={20} suffix="+ yrs" label="of dividends paid, year after year" delay={54} tone="ice" />
        </div>
      </div>
    </AbsoluteFill>
  </Stage>
);

/* ───────────────────────── 12 · NARROWING RIVER ────────────────── */
export const M12: React.FC = () => (
  <Stage seed="river" chapter="The window is now" progress={P(12)}>
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 92 }}>
      <TitleBlock
        align="center"
        eyebrow="From remittance to ownership"
        title={<>The river is narrowing. <Gold>Invest while it flows.</Gold></>}
        sub="Gulf hiring is localising; inflows are forecast to decline after 2030. The diaspora stops sending money home — and starts owning what home builds."
        titleSize={50}
        maxWidth={1180}
      />
    </AbsoluteFill>
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 50 }}>
      <NarrowingRiver width={1360} />
    </AbsoluteFill>
  </Stage>
);

/* ───────────────────────── 13 · MASTER CUTTERS ─────────────────── */
export const M13: React.FC = () => (
  <Stage seed="return" chapter="Master cutters" progress={P(13)}>
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 92 }}>
      <TitleBlock
        align="center"
        eyebrow="Brain drain, reversed by design"
        title={<>Bring the <Gold>craftsmen home.</Gold></>}
        sub="Returning engineers buy a plot of land and wait. We hand them a workshop instead — a bench, matched equity, and a first order, guaranteed."
        titleSize={52}
        maxWidth={1140}
      />
    </AbsoluteFill>
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 70 }}>
      <ReturnFlow width={1280} />
    </AbsoluteFill>
  </Stage>
);

/* ───────────────────────── 14 · JOBS / CAREERS ─────────────────── */
export const M14: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage seed="jobs" chapter="From carats to careers" progress={P(14)}>
      <AbsoluteFill style={{ padding: "110px 120px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <TitleBlock align="center" eyebrow="The jobs the cut creates" title={<>Not the most jobs — <Gold>the jobs that stay.</Gold></>} titleSize={56} maxWidth={1100} style={{ alignSelf: "center" }} />
        <div style={{ display: "flex", gap: 56, marginTop: 70 }}>
          <Stat to={60000} label="total livelihoods touched by Year 10 (direct + indirect)" delay={30} />
          <Stat to={30} prefix="≈" label="direct jobs per ₹1 crore of public seed" delay={46} tone="ice" />
          <Stat to={2000} suffix="+" label="apprentices trained by Year 5 — the next generation of cutters" delay={62} />
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 14, marginTop: 56, opacity: interpolate(frame, [70, 95], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          {new Array(18).fill(0).map((_, i) => (
            <PersonIcon key={i} size={30} color={i < 12 ? colors.gold : colors.iceDeep} sw={1.5} />
          ))}
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

/* ───────────────────────── 15 · PROVEN ELSEWHERE ───────────────── */
const ProofCard: React.FC<{ place: string; tag: string; body: string; Icon: React.FC<any>; delay: number }> = ({ place, tag, body, Icon, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  return (
    <div style={{ flex: 1, opacity: s, transform: `translateY(${interpolate(s, [0, 1], [30, 0])}px) scale(${interpolate(s, [0, 1], [0.96, 1])})`, padding: "34px 32px", borderRadius: 18, background: "linear-gradient(160deg, rgba(255,255,255,0.045), rgba(255,255,255,0.012))", border: `1px solid ${colors.line}`, display: "flex", flexDirection: "column", gap: 14 }}>
      <Icon size={48} color={colors.iceSoft} sw={1.4} />
      <div>
        <div style={{ fontFamily: fonts.sans, fontWeight: 600, letterSpacing: 2, fontSize: 14, textTransform: "uppercase", color: colors.gold }}>{tag}</div>
        <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 34, color: colors.ink, marginTop: 4 }}>{place}</div>
      </div>
      <div style={{ fontFamily: fonts.sans, fontWeight: 300, fontSize: 19, lineHeight: 1.5, color: colors.muted }}>{body}</div>
    </div>
  );
};
export const M15: React.FC = () => (
  <Stage seed="proof" chapter="Jewels already cut" progress={P(15)}>
    <AbsoluteFill style={{ padding: "100px 110px 90px", display: "flex", flexDirection: "column" }}>
      <TitleBlock align="center" eyebrow="This model works" title={<>Different continents, <Gold>one recipe.</Gold></>} titleSize={54} maxWidth={1100} style={{ alignSelf: "center" }} />
      <div style={{ flex: 1, display: "flex", gap: 30, alignItems: "center" }}>
        <ProofCard tag="The closest twin" place="Penang" Icon={ChipIcon} delay={24} body="Three local firms pooled into the Penang Automation Cluster in 2017 to lift small suppliers — filled to ~88% and expanding." />
        <ProofCard tag="The original" place="Baden-Württemberg" Icon={FlaskIcon} delay={38} body="Mid-sized towns anchored by world-class family firms; Fraunhofer institutes rent science to small companies. The state stays in the background — and grows rich." />
        <ProofCard tag="The Indian proof" place="Surat & Coimbatore" Icon={BuildingIcon} delay={52} body="~90% of the world's diamonds, polished by family workshops; thousands of pump-and-motor makers sharing foundries. Owner-run niche clusters already thrive on Indian soil." />
      </div>
    </AbsoluteFill>
  </Stage>
);

/* ───────────────────────── 16 · TEN-YEAR CUT ───────────────────── */
export const M16: React.FC = () => (
  <Stage seed="time" chapter="A ten-year cut" progress={P(16)}>
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 84 }}>
      <TitleBlock align="center" eyebrow="From prospecting to the crown" title={<>Money follows <Gold>proof.</Gold></>} sub="Every rupee is staged — no gate passed, no funds released." titleSize={52} maxWidth={1000} />
    </AbsoluteFill>
    <Center style={{ marginTop: 90 }}>
      <CutTimeline width={1620} />
    </Center>
  </Stage>
);

/* ───────────────────────── 17 · THE ASK ────────────────────────── */
const ITEMS = [
  { t: "Shared SMT, test & certification centres", cr: 240 },
  { t: "Pooled component purchasing fund", cr: 90 },
  { t: "Master Cutter returnee-founder fund", cr: 70 },
  { t: "Apprenticeship programme (5 yrs)", cr: 60 },
  { t: "R&D bridge + export & bids desk", cr: 40 },
];
export const M17: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Stage seed="ask" chapter="The ask" progress={P(17)}>
      <AbsoluteFill style={{ padding: "96px 120px", display: "flex", flexDirection: "column" }}>
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

/* ───────────────────────── 18 · CLOSE ──────────────────────────── */
export const M18: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const l1 = spring({ frame: frame - 30, fps, config: { damping: 200 } });
  const l2 = spring({ frame: frame - 52, fps, config: { damping: 200 } });
  const tag = spring({ frame: frame - 80, fps, config: { damping: 200 } });
  const out = interpolate(frame, [durationInFrames - 24, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <Backdrop seed="close" />
      <Center style={{ flexDirection: "column" }}>
        <div style={{ marginBottom: 34 }}>
          <Crown scale={1.05} />
        </div>
        <h1 style={{ margin: 0, opacity: l1, transform: `translateY(${interpolate(l1, [0, 1], [24, 0])}px)`, fontFamily: fonts.display, fontWeight: 600, fontSize: 70, color: colors.ink, textAlign: "center" }}>
          Kerala does not need a bigger mine.
        </h1>
        <h1 style={{ margin: "8px 0 0", opacity: l2, transform: `translateY(${interpolate(l2, [0, 1], [24, 0])}px)`, fontFamily: fonts.display, fontWeight: 700, fontSize: 76, fontStyle: "italic", textAlign: "center", background: `linear-gradient(100deg, ${colors.goldSoft}, ${colors.gold})`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
          It needs a finer cut.
        </h1>
        <div style={{ opacity: tag, marginTop: 44, display: "flex", alignItems: "center", gap: 18 }}>
          <span style={{ width: 40, height: 1, background: colors.line }} />
          <span style={{ fontFamily: fonts.sans, fontWeight: 400, fontSize: 22, letterSpacing: 3, color: colors.muted, textTransform: "uppercase" }}>
            The Kerala Electronics Consortium · Many small masters, one crown jewel
          </span>
          <span style={{ width: 40, height: 1, background: colors.line }} />
        </div>
      </Center>
    </AbsoluteFill>
  );
};
