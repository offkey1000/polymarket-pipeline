import React from "react";
import {
  AbsoluteFill, Img, staticFile, interpolate, random, spring,
  useCurrentFrame, useVideoConfig,
} from "remotion";
import { colors, fonts } from "../theme";
import { Backdrop } from "../components/Backdrop";
import { Stage, TitleBlock } from "../components/Stage";
import { Gold, AnimatedNumber } from "../components/ui";
import { RocketIcon, SonarIcon, MedicalIcon, PowerIcon, RobotIcon, GearIcon, PersonIcon, ChipIcon, BuildingIcon } from "../components/icons";
import { KeralaBoard, NODES } from "../illustrations/KeralaBoard";
import { LogoBadge, PortraitFrame, PhotoCard, PhotoPlate } from "../components/Media";
import { QuadrantTimeline, SixPillars } from "../illustrations/institutions";
import { DiasporaGlobe } from "../illustrations/DiasporaGlobe";
import { RoughGem, CutGem, Necklace } from "../illustrations/gems";

const N = 21;
const P = (i: number) => i / N;
const Center: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", ...style }}>{children}</AbsoluteFill>
);

const BoardMarker: React.FC<{ node: { x: number; y: number }; logo: string; label: string; delay: number; r?: number }> = ({ node, logo, label, delay, r = 28 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  const pulse = 0.5 + 0.5 * Math.abs(Math.sin((frame - delay) / 16));
  return (
    <g opacity={s} style={{ transform: `scale(${interpolate(s, [0, 1], [0.6, 1])})`, transformOrigin: `${node.x}px ${node.y}px` }}>
      <circle cx={node.x} cy={node.y} r={r + 8 + pulse * 8} fill="none" stroke={colors.gold} strokeWidth={1} opacity={(1 - pulse) * 0.8} />
      <circle cx={node.x} cy={node.y} r={r} fill="#fff" stroke={colors.gold} strokeWidth={1.6} />
      <image href={staticFile(logo)} x={node.x - r * 0.72} y={node.y - r * 0.72} width={r * 1.44} height={r * 1.44} preserveAspectRatio="xMidYMid meet" />
      {label && <text x={node.x} y={node.y + r + 20} textAnchor="middle" fontFamily={fonts.sans} fontWeight={600} fontSize={16} fill={colors.ink}>{label}</text>}
    </g>
  );
};

/* ─────────── 01 · COLD OPEN ─────────── */
export const M01: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const draw = interpolate(frame, [10, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const zoom = interpolate(frame, [10, 110], [1.5, 1.04], { extrapolateRight: "clamp" });
  const t1 = spring({ frame: frame - 84, fps, config: { damping: 200 } });
  const t2 = spring({ frame: frame - 104, fps, config: { damping: 200 } });
  const t3 = spring({ frame: frame - 124, fps, config: { damping: 200 } });
  const out = interpolate(frame, [durationInFrames - 16, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <Backdrop seed="open" />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", transform: "translateX(-340px)" }}>
        <KeralaBoard width={560} draw={draw} energy={draw} zoom={zoom} />
      </AbsoluteFill>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "flex-start", paddingLeft: 1080, paddingRight: 90 }}>
        <div style={{ opacity: t1, fontFamily: fonts.sans, fontSize: 19, fontWeight: 600, letterSpacing: 8, color: colors.gold, textTransform: "uppercase", marginBottom: 14 }}>
          A Kerala Technology Thesis · 2026
        </div>
        <h1 style={{ margin: 0, opacity: t2, transform: `translateY(${interpolate(t2, [0, 1], [22, 0])}px)`, fontFamily: fonts.display, fontWeight: 700, fontSize: 150, lineHeight: 0.95, color: colors.ink }}>KSIEP</h1>
        <div style={{ opacity: t3, fontFamily: fonts.display, fontSize: 30, color: colors.iceSoft, marginTop: 16, lineHeight: 1.25, maxWidth: 560 }}>
          The <Gold>Kerala Sovereign Infrastructure Electronics Platform</Gold>
        </div>
        <div style={{ opacity: t3, fontFamily: fonts.sans, fontWeight: 300, fontSize: 20, color: colors.muted, marginTop: 16 }}>
          Kerala is not a coastline. It is a circuit — and a mine — waiting for its architect to return.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ─────────── 02 · THE ARCHITECT ─────────── */
const ORBIT = ["Systems", "Institutions", "State", "Country"];
export const M02: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Stage seed="architect" chapter="One man saw it first" progress={P(2)} dim>
      <AbsoluteFill style={{ flexDirection: "row", alignItems: "center" }}>
        <div style={{ width: 760, position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <PortraitFrame src="img/nambiar_bw.jpg" size={360} delay={6} />
          {ORBIT.map((w, i) => {
            const a = (i / ORBIT.length) * Math.PI * 2 - Math.PI / 2;
            const s = spring({ frame: frame - (44 + i * 8), fps, config: { damping: 200 } });
            return (
              <div key={w} style={{ position: "absolute", left: `calc(50% + ${Math.cos(a) * 250}px)`, top: `calc(50% + ${Math.sin(a) * 250}px)`, transform: `translate(-50%,-50%) scale(${s})`, opacity: s, fontFamily: fonts.sans, fontWeight: 600, fontSize: 20, letterSpacing: 2, color: colors.goldSoft, padding: "8px 16px", borderRadius: 20, background: "rgba(230,192,104,0.08)", border: "1px solid rgba(230,192,104,0.4)", whiteSpace: "nowrap" }}>{w}</div>
            );
          })}
        </div>
        <div style={{ flex: 1, paddingRight: 120 }}>
          <TitleBlock eyebrow="K.P.P. Nambiar · 1929–2015" title={<>An <Gold>Institutional Architect.</Gold></>} sub="He never thought in companies — he thought in institutions: systems designed to outlast their founders, and to owe something to a state and a country. He gave Kerala its electronics brand: KELTRON." titleSize={58} maxWidth={640} />
          <div style={{ marginTop: 28, fontFamily: fonts.display, fontStyle: "italic", fontSize: 26, color: colors.iceSoft, opacity: interpolate(frame, [80, 108], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
            "Returning with a Kerala Technology Thesis."
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

/* ─────────── 03 · SYSTEMS, NOT THINGS ─────────── */
const REFRAMES = [
  { logo: "img/keltron_building.jpg", img: true, name: "Keltron", not: "a set of factories", but: "an electronics ecosystem" },
  { logo: "img/cdac.jpg", name: "ER&DC", not: "a laboratory", but: "a tech-capability engine" },
  { logo: "img/technopark_campus.jpg", img: true, name: "Technopark", not: "a real-estate project", but: "a knowledge-economy platform" },
  { logo: "img/kudumbashree.png", name: "Women's co-operatives", not: "an employment scheme", but: "a social architecture for distributed participation" },
];
export const M03: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Stage seed="systems" chapter="He built systems, not things" progress={P(3)}>
      <AbsoluteFill style={{ padding: "92px 90px 80px", display: "flex", flexDirection: "column" }}>
        <TitleBlock align="center" eyebrow="Read the institutions correctly" title={<>Not buildings — <Gold>systems.</Gold></>} titleSize={56} maxWidth={1100} style={{ alignSelf: "center" }} />
        <div style={{ flex: 1, display: "flex", gap: 24, marginTop: 40, alignItems: "stretch" }}>
          {REFRAMES.map((r, i) => {
            const s = spring({ frame: frame - (24 + i * 16), fps, config: { damping: 200 } });
            const flip = interpolate(frame - (40 + i * 16), [0, 24], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div key={i} style={{ flex: 1, opacity: s, transform: `translateY(${interpolate(s, [0, 1], [30, 0])}px)`, display: "flex", flexDirection: "column", alignItems: "center", padding: "26px 22px", borderRadius: 18, background: "linear-gradient(160deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))", border: `1px solid ${colors.line}` }}>
                <div style={{ width: 120, height: 120, borderRadius: r.img ? 14 : "50%", overflow: "hidden", background: r.img ? "#000" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${colors.line}` }}>
                  <Img src={staticFile(r.logo)} style={{ width: r.img ? "100%" : "74%", height: r.img ? "100%" : "74%", objectFit: r.img ? "cover" : "contain" }} />
                </div>
                <div style={{ marginTop: 18, fontFamily: fonts.display, fontWeight: 700, fontSize: 26, color: colors.ink, textAlign: "center" }}>{r.name}</div>
                <div style={{ marginTop: 12, fontFamily: fonts.sans, fontWeight: 300, fontSize: 18, color: colors.faint, textAlign: "center", textDecoration: "line-through" }}>not {r.not}</div>
                <div style={{ marginTop: 10, opacity: flip, transform: `translateY(${interpolate(flip, [0, 1], [10, 0])}px)`, fontFamily: fonts.sans, fontWeight: 500, fontSize: 19, color: colors.goldSoft, textAlign: "center", lineHeight: 1.35 }}>→ {r.but}</div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

/* ─────────── 04 · THE UNFINISHED ARCHITECTURE (build + reconnect) ─────────── */
export const M04: React.FC = () => {
  const frame = useCurrentFrame();
  const connect = interpolate(frame, [150, 300], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const swap = interpolate(frame, [130, 160], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Stage seed="arc" chapter="The unfinished architecture" progress={P(4)}>
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 78 }}>
        <div style={{ position: "relative", height: 130, width: 1200, textAlign: "center" }}>
          <div style={{ position: "absolute", inset: 0, opacity: 1 - swap }}>
            <TitleBlock align="center" eyebrow="53 years · three institutions" title={<>Three capabilities, <Gold>never reconnected.</Gold></>} titleSize={50} maxWidth={1100} />
          </div>
          <div style={{ position: "absolute", inset: 0, opacity: swap }}>
            <TitleBlock align="center" eyebrow="The how · K.P.P. Nambiar 2.0" title={<>KSIEP <Gold>reconnects them.</Gold></>} titleSize={50} maxWidth={1180} />
          </div>
        </div>
      </AbsoluteFill>
      <Center style={{ marginTop: 58 }}>
        <QuadrantTimeline connect={connect} width={1200} />
      </Center>
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 46, flexDirection: "column", gap: 16 }}>
        {/* the 2.0 twist: + CIAL + Kudumbashree */}
        <div style={{ display: "flex", gap: 16, opacity: interpolate(frame, [250, 280], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          {[
            { t: "+ CIAL model", d: "capital structure & governance" },
            { t: "+ Kudumbashree model", d: "participation backbone for KSIEP" },
          ].map((x, i) => (
            <div key={i} style={{ padding: "10px 22px", borderRadius: 12, background: "rgba(230,192,104,0.08)", border: "1px solid rgba(230,192,104,0.35)", display: "flex", gap: 12, alignItems: "baseline" }}>
              <span style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 20, color: colors.goldSoft }}>{x.t}</span>
              <span style={{ fontFamily: fonts.sans, fontWeight: 300, fontSize: 16, color: colors.muted }}>{x.d}</span>
            </div>
          ))}
        </div>
        <div style={{ opacity: interpolate(frame, [285, 312], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }), fontFamily: fonts.display, fontStyle: "italic", fontSize: 24, color: colors.iceSoft }}>
          "There is no better teacher than history in determining the future."
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

/* ─────────── 05 · WHAT KSIEP IS (trimmed — no ingredient list; pillars carry it) ─────────── */
export const M05: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const letters = "KSIEP".split("");
  return (
    <Stage seed="whatis" chapter="What KSIEP is" progress={P(5)}>
      <AbsoluteFill style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "0 120px" }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
          {letters.map((c, i) => {
            const s = spring({ frame: frame - (10 + i * 8), fps, config: { damping: 200 } });
            return <span key={i} style={{ opacity: s, transform: `translateY(${interpolate(s, [0, 1], [30, 0])}px)`, fontFamily: fonts.display, fontWeight: 700, fontSize: 130, color: colors.goldSoft, textShadow: "0 0 30px rgba(230,192,104,0.3)" }}>{c}</span>;
          })}
        </div>
        <div style={{ opacity: interpolate(frame, [50, 74], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }), fontFamily: fonts.display, fontWeight: 600, fontSize: 42, color: colors.ink, textAlign: "center" }}>
          A <Gold>Sovereign Infrastructure Electronics Platform.</Gold>
        </div>
        <div style={{ opacity: interpolate(frame, [62, 84], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }), fontFamily: fonts.sans, fontWeight: 600, letterSpacing: 4, fontSize: 18, textTransform: "uppercase", color: colors.iceSoft, marginTop: 14 }}>
          The Technopark for Electronics
        </div>
        <div style={{ opacity: interpolate(frame, [70, 96], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }), fontFamily: fonts.sans, fontWeight: 300, fontSize: 23, color: colors.muted, textAlign: "center", maxWidth: 980, marginTop: 20, lineHeight: 1.5 }}>
          A durable capability layer for Kerala & India — in tune with India's sovereign electronics mission.
        </div>
        <svg width={760} height={120} viewBox="0 0 760 120" style={{ marginTop: 36, opacity: interpolate(frame, [90, 116], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          {[0, 1, 2].map((k) => (<rect key={k} x={120 + k * 8} y={18 + k * 22} width={520 - k * 16} height={20} rx={4} fill={`rgba(230,192,104,${0.18 - k * 0.04})`} stroke={colors.gold} strokeWidth={1} />))}
          <text x={380} y={106} textAnchor="middle" fontFamily={fonts.sans} fontWeight={600} fontSize={16} letterSpacing={3} fill={colors.goldSoft}>THE DURABLE CAPABILITY LAYER</text>
        </svg>
      </AbsoluteFill>
    </Stage>
  );
};

/* ─────────── 06 · THE DISTINCTIVE KERALA MODEL (six pillars) ─────────── */
export const M06: React.FC = () => (
  <Stage seed="pillars" chapter="The distinctive Kerala model" progress={P(9)}>
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 70 }}>
      <TitleBlock align="center" eyebrow="Six inheritances, one structure" title={<>Kerala already <Gold>invented every piece.</Gold></>} titleSize={50} maxWidth={1100} />
    </AbsoluteFill>
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 36 }}>
      <SixPillars width={1620} />
    </AbsoluteFill>
  </Stage>
);

/* ─────────── 07 · THE MINE (metaphor: all components present) ─────────── */
const DEPOSITS = [
  "Near-universal literacy · dense engineering talent",
  "50 years of ISRO space-grade electronics",
  "India's largest hardware incubator — Maker Village",
  "A deep-water port on the east–west sea lane",
  "₹2 lakh cr / yr of patient diaspora capital",
];
export const M07: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Stage seed="mine" chapter="The mine" progress={P(11)}>
      <AbsoluteFill style={{ flexDirection: "row" }}>
        <div style={{ width: 680, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <KeralaBoard width={400} draw={1} energy={1} zoom={1.02}>
            <BoardMarker node={NODES.trivandrum} logo="img/isro.png" label="" delay={34} r={26} />
            <BoardMarker node={NODES.vizhinjam} logo="img/vizhinjam.png" label="" delay={44} r={24} />
            <BoardMarker node={NODES.kochi} logo="img/vguard.jpg" label="" delay={54} r={26} />
            <BoardMarker node={NODES.kozhikode} logo="img/makervillage.png" label="" delay={64} r={24} />
            {/* raw ore glints scattered on the board */}
            {[[200, 360], [330, 470], [260, 640], [410, 760], [180, 240]].map((p, i) => (
              <g key={i} transform={`translate(${p[0]},${p[1]})`} opacity={interpolate(frame, [70 + i * 6, 90 + i * 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>
                <RoughGem size={26} seed={i} />
              </g>
            ))}
          </KeralaBoard>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingRight: 110 }}>
          <TitleBlock eyebrow="A mine is not the gems" title={<>Every component is <Gold>already here.</Gold></>} sub="A mine is the presence of every ingredient in one place — institutions, a port, manufacturing, talent and capital. Kerala's seams are already proven." titleSize={48} maxWidth={620} />
          <div style={{ display: "flex", gap: 18, marginTop: 28 }}>
            <PhotoCard src="img/isro_launch.jpg" caption="VSSC / ISRO" sub="50 yrs of space-grade electronics" w={196} h={150} delay={42} accent="gold" />
            <PhotoCard src="img/vizhinjam_port.jpg" caption="Vizhinjam" sub="deep-water port, live" w={196} h={150} delay={54} />
            <PhotoCard src="img/smt_line.jpg" caption="SMT base" sub="assembly & test capacity" w={196} h={150} delay={66} />
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

/* ─────────── 08 · CUT & POLISH (the jobs done by the small companies) ─────────── */
const JOBS = [
  "RF & avionics modules",
  "Sonar & underwater arrays",
  "Medical sensor boards",
  "Power & inverter stacks",
  "Test & automation rigs",
];
const TOOLS = ["Shared SMT & test labs", "Pooled component buying", "Apprenticeships", "R&D bridge: ISRO · DRDO"];
export const M08: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Stage seed="cut" chapter="Cut & polish" progress={P(13)}>
      <PhotoPlate src="img/smt_line.jpg" opacity={0.22} reveal={interpolate(frame, [0, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
      <AbsoluteFill style={{ padding: "84px 100px 70px", display: "flex", flexDirection: "column" }}>
        <TitleBlock align="center" eyebrow="Many small masters — each one job" title={<>The cut is <Gold>distributed.</Gold></>} sub="No firm cuts the whole stone. Each small company masters one facet — the Mittelstand way — on shared wheels no single firm could afford." titleSize={50} maxWidth={1160} style={{ alignSelf: "center" }} />
        {/* shared tools strip */}
        <div style={{ display: "flex", justifyContent: "center", gap: 14, marginTop: 26, opacity: interpolate(frame, [20, 44], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          {TOOLS.map((t, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 20, background: "rgba(143,216,236,0.07)", border: `1px solid ${colors.line}`, fontFamily: fonts.sans, fontWeight: 500, fontSize: 16, color: colors.iceSoft }}>
              <GearIcon size={18} color={colors.ice} sw={1.6} /> {t}
            </div>
          ))}
        </div>
        {/* cutting houses */}
        <div style={{ flex: 1, display: "flex", gap: 22, marginTop: 30, alignItems: "center" }}>
          {JOBS.map((j, i) => {
            const s = spring({ frame: frame - (44 + i * 12), fps, config: { damping: 200 } });
            return (
              <div key={i} style={{ flex: 1, opacity: s, transform: `translateY(${interpolate(s, [0, 1], [28, 0])}px)`, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, padding: "24px 14px", borderRadius: 16, background: "linear-gradient(160deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))", border: `1px solid ${colors.line}` }}>
                <svg width={86} height={86} viewBox="-43 -43 86 86" style={{ overflow: "visible" }}>
                  {/* spinning cutting wheel */}
                  <g style={{ transform: `rotate(${frame * 2 + i * 30}deg)`, transformOrigin: "0px 0px" }} opacity={0.5}>
                    {new Array(12).fill(0).map((_, k) => { const a = (k / 12) * Math.PI * 2; return <line key={k} x1={Math.cos(a) * 30} y1={Math.sin(a) * 30} x2={Math.cos(a) * 40} y2={Math.sin(a) * 40} stroke={colors.iceDeep} strokeWidth={1.4} />; })}
                    <circle r={30} fill="none" stroke={colors.iceDeep} strokeWidth={1} />
                  </g>
                  <CutGem size={42} color={["#E6C068", "#8FD8EC", "#E98EA8", "#9BE6B4", "#B9A6F0"][i]} seed={i} />
                </svg>
                <div style={{ fontFamily: fonts.sans, fontWeight: 500, fontSize: 17, color: colors.ink, textAlign: "center", lineHeight: 1.3 }}>{j}</div>
                <div style={{ fontFamily: fonts.sans, fontWeight: 300, fontSize: 13, color: colors.faint }}>one small firm</div>
              </div>
            );
          })}
        </div>
        {/* master cutters note */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 22, opacity: interpolate(frame, [110, 138], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          <PersonIcon size={26} color={colors.goldSoft} sw={1.6} />
          <span style={{ fontFamily: fonts.display, fontStyle: "italic", fontSize: 24, color: colors.iceSoft }}>The master cutters: Gulf-returned engineers, given a bench and a first order.</span>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

/* ─────────── 09 · THE DIAMONDS FROM THE KELTRON MINE (reliability solutions → necklace) ─────────── */
const DIAMONDS = [
  { label: "Telecom synchronization", sub: "networks, synchronized", Icon: GearIcon },
  { label: "AI data-centre reliability", sub: "AI data centres, reliable", Icon: ChipIcon },
  { label: "Grid stability", sub: "smart grids, stable", Icon: PowerIcon },
  { label: "Defence timing & resilience", sub: "defence systems, trustworthy", Icon: RocketIcon },
  { label: "Critical-infra resilience", sub: "critical infrastructure, resilient", Icon: BuildingIcon },
];
export const M09: React.FC = () => {
  const frame = useCurrentFrame();
  const claim = interpolate(frame, [150, 184], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Stage seed="diamonds" chapter="The diamonds from the Keltron mine" progress={P(14)}>
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 78 }}>
        <TitleBlock align="center" eyebrow="The cut stones, set — every job, one finished piece" title={<>The diamonds from the <Gold>Keltron mine.</Gold></>} titleSize={48} maxWidth={1200} />
      </AbsoluteFill>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", paddingTop: 70 }}>
        <Necklace items={DIAMONDS} width={1380} />
      </AbsoluteFill>
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 56 }}>
        <div style={{ opacity: claim, transform: `translateY(${interpolate(claim, [0, 1], [16, 0])}px)`, fontFamily: fonts.display, fontSize: 28, color: colors.ink, textAlign: "center", maxWidth: 1240, lineHeight: 1.3 }}>
          The world's first Reliability Infrastructure Electronics Platform — integrating materials, timing, energy storage & power integrity into <Gold>sovereign solutions.</Gold>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

/* ─────────── 9b · JOBS — the town the mine builds ─────────── */
export const MJobs: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const anchors = ["img/isro.png", "img/vguard.jpg", "img/makervillage.png"];
  return (
    <Stage seed="jobs" chapter="The town the mine builds" progress={P(15)}>
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 74 }}>
        <TitleBlock align="center" eyebrow="The Technopark for Electronics — what KSIEP creates" title={<>A working mine <Gold>builds a town.</Gold></>} titleSize={50} maxWidth={1180} />
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 22, maxWidth: 1180 }}>
          {["Electronics jobs", "Electronic start-ups", "Electronics SMEs", "Electronic product companies", "Manufacturing entrepreneurs", "Infrastructure-technology exports", "Women electronics founders"].map((c, i) => {
            const s = spring({ frame: frame - (16 + i * 7), fps, config: { damping: 200 } });
            return (
              <div key={i} style={{ opacity: s, transform: `translateY(${interpolate(s, [0, 1], [12, 0])}px)`, padding: "9px 18px", borderRadius: 20, background: "rgba(230,192,104,0.08)", border: "1px solid rgba(230,192,104,0.35)", fontFamily: fonts.sans, fontWeight: 500, fontSize: 17, color: colors.goldSoft }}>{c}</div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* cluster bloom: anchors in the centre, SME firm-nodes blooming around them */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", paddingTop: 30 }}>
        <svg width={760} height={460} viewBox="-380 -230 760 460" style={{ overflow: "visible" }}>
          {new Array(34).fill(0).map((_, i) => {
            const a = (i / 34) * Math.PI * 2 + (i % 2) * 0.32;
            const ring = 90 + (i % 3) * 60 + random("jr" + i) * 26;
            const appear = interpolate(frame, [30 + i * 3, 48 + i * 3], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const x = Math.cos(a) * ring * appear;
            const y = Math.sin(a) * ring * 0.74 * appear;
            return (
              <g key={i} opacity={appear}>
                <line x1={0} y1={0} x2={x} y2={y} stroke={colors.line} strokeWidth={0.6} opacity={0.5} />
                <circle cx={x} cy={y} r={4} fill={i % 4 === 0 ? colors.goldSoft : colors.ice} opacity={0.5 + 0.5 * Math.abs(Math.sin(frame / 14 + i))} />
              </g>
            );
          })}
          {/* anchors at centre */}
          {anchors.map((lg, i) => {
            const a = (i / anchors.length) * Math.PI * 2 - Math.PI / 2;
            const x = Math.cos(a) * 34, y = Math.sin(a) * 34;
            const s = spring({ frame: frame - (8 + i * 6), fps, config: { damping: 200 } });
            return (
              <g key={i} opacity={s} style={{ transform: `scale(${s})`, transformOrigin: `${x}px ${y}px` }}>
                <circle cx={x} cy={y} r={26} fill="#fff" stroke={colors.gold} strokeWidth={1.6} />
                <image href={staticFile(lg)} x={x - 18} y={y - 18} width={36} height={36} preserveAspectRatio="xMidYMid meet" />
              </g>
            );
          })}
        </svg>
      </AbsoluteFill>

      {/* stats */}
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 70 }}>
        <div style={{ display: "flex", gap: 90 }}>
          {[
            { to: 60000, suf: "", lab: "livelihoods touched by Year 10 (direct + indirect)" },
            { to: 30, pre: "≈", lab: "direct jobs per ₹1 crore of public seed" },
            { to: 2000, suf: "+", lab: "apprentices trained by Year 5" },
          ].map((s, i) => {
            const d = 50 + i * 14;
            const sp = spring({ frame: frame - d, fps, config: { damping: 200 } });
            return (
              <div key={i} style={{ opacity: sp, textAlign: "center", maxWidth: 320 }}>
                <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 72, lineHeight: 1, background: `linear-gradient(120deg, ${colors.goldSoft}, ${colors.gold})`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                  <AnimatedNumber to={s.to} delay={d + 4} duration={46} prefix={s.pre ?? ""} suffix={s.suf ?? ""} />
                </div>
                <div style={{ fontFamily: fonts.sans, fontWeight: 300, fontSize: 18, color: colors.muted, marginTop: 10, lineHeight: 1.35 }}>{s.lab}</div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

/* ─────────── 10 · CAPITALISE THE MINE (investment & allocation) ─────────── */
const ALLOC = [
  { t: "Shared SMT, test & certification centres", note: "the cutting & polishing houses", cr: 240 },
  { t: "Pooled component purchasing fund", note: "ore procurement, at scale", cr: 90 },
  { t: "Master Cutter returnee-founder fund", note: "bring the cutters home", cr: 70 },
  { t: "Apprenticeship programme (5 yrs)", note: "train the next cutters", cr: 60 },
  { t: "R&D bridge + export & bids desk", note: "assay & the bourse", cr: 40 },
];
const GATES = ["Gate 1 · M9", "Gate 2 · M24", "Gate 3 · Y5", "Gate 4 · Y7"];
export const M10: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Stage seed="invest" chapter="Capitalise the mine" progress={P(16)}>
      <AbsoluteFill style={{ padding: "84px 110px 70px", display: "flex", flexDirection: "column" }}>
        <TitleBlock eyebrow="You don't buy the gems — you fund the mine & the wheels" title={<>The allocation: <Gold>₹500 crore.</Gold></>} titleSize={52} maxWidth={1000} />
        <div style={{ display: "flex", gap: 64, flex: 1, marginTop: 18, alignItems: "center" }}>
          <div style={{ flex: 1.6, display: "flex", flexDirection: "column", gap: 14 }}>
            {ALLOC.map((it, i) => {
              const d = 24 + i * 11;
              const s = spring({ frame: frame - d, fps, config: { damping: 200 } });
              const w = interpolate(frame - (d + 6), [0, 36], [0, it.cr / 240], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              return (
                <div key={i} style={{ opacity: s }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                    <span style={{ fontFamily: fonts.sans, fontWeight: 400, fontSize: 20, color: colors.ink }}>{it.t} <span style={{ color: colors.faint, fontSize: 15 }}>· {it.note}</span></span>
                    <span style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 24, color: colors.goldSoft }}>₹{it.cr} cr</span>
                  </div>
                  <div style={{ height: 11, borderRadius: 6, background: "rgba(255,255,255,0.05)", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${w * 100}%`, borderRadius: 6, background: `linear-gradient(90deg, ${colors.iceDeep}, ${colors.gold})` }} />
                  </div>
                </div>
              );
            })}
            {/* staged gates */}
            <div style={{ display: "flex", gap: 10, marginTop: 14, opacity: interpolate(frame, [90, 116], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
              {GATES.map((g, i) => (
                <div key={i} style={{ flex: 1, textAlign: "center", padding: "8px 6px", borderRadius: 10, background: "rgba(230,192,104,0.08)", border: "1px solid rgba(230,192,104,0.3)", fontFamily: fonts.sans, fontWeight: 600, fontSize: 14, color: colors.goldSoft }}>{g}</div>
              ))}
            </div>
            <div style={{ fontFamily: fonts.sans, fontWeight: 300, fontSize: 16, color: colors.muted, marginTop: 4 }}>Money follows proof — funding releases only as each seam is proven.</div>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 140, lineHeight: 1, background: `linear-gradient(120deg, ${colors.goldSoft}, ${colors.gold})`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>₹<AnimatedNumber to={500} delay={36} duration={50} /></div>
            <div style={{ fontFamily: fonts.sans, fontWeight: 600, fontSize: 20, letterSpacing: 6, textTransform: "uppercase", color: colors.muted, marginTop: 4 }}>crore · staged</div>
            <div style={{ width: 60, height: 1, background: colors.line, margin: "22px 0" }} />
            <div style={{ fontFamily: fonts.display, fontStyle: "italic", fontSize: 23, color: colors.iceSoft, textAlign: "center", maxWidth: 360, lineHeight: 1.4 }}>0.25% of one year's diaspora remittances — raised the CIAL way.</div>
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

/* ─────────── 11 · GOVERNANCE & OWNERSHIP ─────────── */
const SAFE = ["CM-chaired board · professional CEO", "No customer above 30% of shared output", "Subsidy sunsets from Year 3", "Anchored in statute & Vision 2031"];
export const M11: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Stage seed="gov" chapter="Governance & ownership" progress={P(17)}>
      <AbsoluteFill style={{ flexDirection: "row", alignItems: "center" }}>
        <div style={{ width: 640, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <DiasporaGlobe scale={0.8} />
        </div>
        <div style={{ flex: 1, paddingRight: 110 }}>
          <TitleBlock eyebrow="The CIAL way × the Kudumbashree way" title={<>Owned widely. <Gold>Built to endure.</Gold></>} sub="Diaspora-and-public shareholding under professional, politically-continuous governance — with distributed, woman-led participation across the state." titleSize={46} maxWidth={640} />
          <div style={{ display: "flex", gap: 20, marginTop: 26, alignItems: "center" }}>
            <LogoBadge src="img/cial.jpg" size={84} delay={36} tone="ice" invertBg label="CIAL" sub="capital & governance" />
            <LogoBadge src="img/kudumbashree.png" size={84} delay={46} tone="gold" invertBg label="Kudumbashree" sub="participation" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px", marginTop: 26 }}>
            {SAFE.map((s, i) => {
              const sp = spring({ frame: frame - (56 + i * 8), fps, config: { damping: 200 } });
              return (
                <div key={i} style={{ opacity: sp, display: "flex", gap: 10, alignItems: "baseline" }}>
                  <span style={{ width: 7, height: 7, transform: "rotate(45deg)", background: colors.gold, flexShrink: 0 }} />
                  <span style={{ fontFamily: fonts.sans, fontWeight: 300, fontSize: 17, color: colors.muted }}>{s}</span>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 26, opacity: interpolate(frame, [80, 104], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
            <div style={{ fontFamily: fonts.sans, fontWeight: 600, letterSpacing: 3, fontSize: 14, textTransform: "uppercase", color: colors.gold, marginBottom: 10 }}>Strategic anchor investors</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {["Yusuff Ali", "Ravi Pillai", "Siddharth Balachandran", "Faizal Kottikollon"].map((nm, i) => (
                <div key={i} style={{ padding: "8px 16px", borderRadius: 20, background: "rgba(230,192,104,0.08)", border: "1px solid rgba(230,192,104,0.35)", fontFamily: fonts.display, fontWeight: 600, fontSize: 18, color: colors.goldSoft }}>{nm}</div>
              ))}
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
export const M12: React.FC = () => {
  const frame = useCurrentFrame();
  const grow = interpolate(frame, [20, 130], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Stage seed="thesis" chapter="The investment thesis" progress={P(19)}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <svg width={1400} height={760} viewBox="-700 -380 1400 760" style={{ overflow: "visible", opacity: 0.55 }}>
          {new Array(60).fill(0).map((_, i) => {
            const a = random("ta" + i) * Math.PI * 2;
            const maxR = 80 + random("tr" + i) * 560;
            const r = maxR * interpolate(grow, [random("td" + i) * 0.5, random("td" + i) * 0.5 + 0.5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const x = Math.cos(a) * r, y = Math.sin(a) * r * 0.6;
            return (<g key={i}><line x1={0} y1={0} x2={x} y2={y} stroke={colors.line} strokeWidth={0.7} opacity={0.5} /><circle cx={x} cy={y} r={2.6} fill={i % 4 === 0 ? colors.goldSoft : colors.ice} opacity={0.4 + 0.6 * Math.abs(Math.sin(frame / 16 + i))} /></g>);
          })}
          <circle cx={0} cy={0} r={8} fill={colors.gold} style={{ filter: "drop-shadow(0 0 12px rgba(230,192,104,0.9))" }} />
        </svg>
      </AbsoluteFill>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 200px" }}>
        <div style={{ fontFamily: fonts.sans, fontWeight: 600, letterSpacing: 5, fontSize: 18, textTransform: "uppercase", color: colors.gold, marginBottom: 24 }}>The investment thesis</div>
        <div style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 44, color: colors.ink, textAlign: "center", lineHeight: 1.25, maxWidth: 1180 }}>
          You are turning a Sovereign Infrastructure Electronics Platform for India into a <Gold>balance-sheet asset for Kerala.</Gold>
        </div>
        <div style={{ marginTop: 26, fontFamily: fonts.sans, fontWeight: 300, fontSize: 23, color: colors.muted, textAlign: "center", maxWidth: 1080, lineHeight: 1.5, opacity: interpolate(frame, [80, 108], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          Not capital mobilization — an enduring institution that adds economic & social value, and changes the calculus of Kerala's fiscal future.
        </div>
        <div style={{ marginTop: 26, fontFamily: fonts.sans, fontWeight: 300, fontSize: 22, color: colors.iceSoft, opacity: interpolate(frame, [120, 148], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          An old Kerala idea, applied to a far larger ambition — for the next <span style={{ color: colors.goldSoft }}>25 years</span>.
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

/* ─────────── 13 · FINALE — KPP-N 2.0 ─────────── */
export const M13: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const draw = interpolate(frame, [10, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const l1 = spring({ frame: frame - 90, fps, config: { damping: 200 } });
  const l2 = spring({ frame: frame - 120, fps, config: { damping: 200 } });
  const tag = spring({ frame: frame - 200, fps, config: { damping: 200 } });
  const flash = interpolate(frame, [70, 78, 96], [0, 0.7, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const out = interpolate(frame, [durationInFrames - 28, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <Backdrop seed="finale" />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", transform: "translateX(-380px)" }}>
        <KeralaBoard width={520} draw={draw} energy={1} zoom={1.04}>
          <BoardMarker node={NODES.trivandrum} logo="img/isro.png" label="" delay={70} r={20} />
          <BoardMarker node={NODES.kochi} logo="img/vguard.jpg" label="" delay={78} r={20} />
          <BoardMarker node={NODES.kozhikode} logo="img/makervillage.png" label="" delay={86} r={18} />
          <circle cx={NODES.trivandrum.x} cy={NODES.trivandrum.y} r={interpolate(frame, [78, 140], [0, 90], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} fill="none" stroke={colors.gold} strokeWidth={1.4} opacity={interpolate(frame, [78, 140], [0.6, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
        </KeralaBoard>
      </AbsoluteFill>
      <AbsoluteFill style={{ background: "#fff", opacity: flash }} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "flex-start", paddingLeft: 1010, paddingRight: 80 }}>
        <div style={{ opacity: l1, fontFamily: fonts.sans, fontSize: 19, fontWeight: 600, letterSpacing: 8, color: colors.gold, textTransform: "uppercase" }}>K.P.P. Nambiar 2.0</div>
        <h1 style={{ margin: "14px 0 0", opacity: l1, transform: `translateY(${interpolate(l1, [0, 1], [22, 0])}px)`, fontFamily: fonts.display, fontWeight: 700, fontSize: 72, lineHeight: 1.04, color: colors.ink }}>The architect <Gold>returns.</Gold></h1>
        <div style={{ opacity: l2, transform: `translateY(${interpolate(l2, [0, 1], [18, 0])}px)`, marginTop: 20, fontFamily: fonts.display, fontStyle: "italic", fontSize: 30, color: colors.iceSoft, maxWidth: 560, lineHeight: 1.3 }}>A new institutional architecture for Kerala's next 25 years.</div>
        <div style={{ opacity: tag, marginTop: 30, paddingTop: 22, borderTop: `1px solid ${colors.line}`, fontFamily: fonts.sans, fontWeight: 400, fontSize: 20, letterSpacing: 2, color: colors.muted, maxWidth: 560 }}>KSIEP · Kerala Sovereign Infrastructure Electronics Platform</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ─────────── PURPOSE (Enables / Strengthens / Generates / Fosters) ─────────── */
const PURPOSE = [
  { k: "Enables", v: "Inclusive economic development across Kerala" },
  { k: "Strengthens", v: "India's technological sovereignty" },
  { k: "Generates", v: "High-value employment" },
  { k: "Fosters", v: "Entrepreneurship" },
];
export const MPurpose: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Stage seed="purpose" chapter="Purpose" progress={P(7)}>
      <AbsoluteFill style={{ padding: "92px 120px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <TitleBlock align="center" eyebrow="Why build it" title={<>A globally competitive, <Gold>innovation-driven</Gold> ecosystem.</>} titleSize={50} maxWidth={1200} style={{ alignSelf: "center" }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 56, maxWidth: 1180, alignSelf: "center", width: "100%" }}>
          {PURPOSE.map((p, i) => {
            const s = spring({ frame: frame - (24 + i * 12), fps, config: { damping: 200 } });
            return (
              <div key={i} style={{ opacity: s, transform: `translateY(${interpolate(s, [0, 1], [26, 0])}px)`, display: "flex", gap: 20, alignItems: "center", padding: "26px 30px", borderRadius: 16, background: "linear-gradient(160deg, rgba(255,255,255,0.045), rgba(255,255,255,0.012))", border: `1px solid ${colors.line}` }}>
                <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 30, color: colors.gold, minWidth: 200 }}>{p.k}</div>
                <div style={{ fontFamily: fonts.sans, fontWeight: 300, fontSize: 24, color: colors.ink, lineHeight: 1.35 }}>{p.v}</div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

/* ─────────── GOAL — global benchmarks + the layer that doesn't exist yet ─────────── */
const BENCH = [
  { name: "Material & component depth", give: "electroceramics, dielectrics, capacitors, power devices" },
  { name: "Timing & synchronization", give: "oscillators, timing devices, synch reliability" },
  { name: "Infrastructure systems", give: "grid, telecom, defence & data-centre reliability" },
];
export const MGoal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const converge = interpolate(frame, [40, 90], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Stage seed="goal" chapter="The goal" progress={P(8)}>
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 84 }}>
        <TitleBlock align="center" eyebrow="A Sovereign Reliability Infrastructure Electronics Platform" title={<>World-class depth across every layer — <Gold>plus a layer that doesn't exist yet.</Gold></>} titleSize={46} maxWidth={1240} />
      </AbsoluteFill>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", paddingTop: 40 }}>
        <div style={{ display: "flex", gap: 34, alignItems: "stretch" }}>
          {BENCH.map((b, i) => {
            const s = spring({ frame: frame - (20 + i * 12), fps, config: { damping: 200 } });
            return (
              <div key={i} style={{ width: 280, opacity: s, transform: `translateY(${interpolate(s, [0, 1], [28, 0])}px)`, padding: "30px 26px", borderRadius: 16, background: "linear-gradient(160deg, rgba(143,216,236,0.06), transparent)", border: `1px solid ${colors.line}`, textAlign: "center" }}>
                <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 25, color: colors.iceSoft, lineHeight: 1.15, minHeight: 58 }}>{b.name}</div>
                <div style={{ marginTop: 10, fontFamily: fonts.sans, fontWeight: 300, fontSize: 17, color: colors.muted, lineHeight: 1.35 }}>{b.give}</div>
              </div>
            );
          })}
          {/* the unique AI layer */}
          <div style={{ width: 300, opacity: converge, transform: `translateY(${interpolate(converge, [0, 1], [28, 0])}px) scale(${interpolate(converge, [0, 1], [0.94, 1])})`, padding: "30px 28px", borderRadius: 16, background: "linear-gradient(160deg, rgba(230,192,104,0.16), rgba(230,192,104,0.03))", border: `1px solid rgba(230,192,104,0.5)`, boxShadow: "0 0 50px rgba(230,192,104,0.18)", textAlign: "center" }}>
            <div style={{ fontFamily: fonts.sans, fontWeight: 600, letterSpacing: 2, fontSize: 14, textTransform: "uppercase", color: colors.gold }}>+ doesn't exist today</div>
            <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 28, color: colors.goldSoft, marginTop: 8, lineHeight: 1.1 }}>AI Timing & Power-Integrity Intelligence Layer</div>
          </div>
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 76 }}>
        <div style={{ opacity: interpolate(frame, [100, 126], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }), fontFamily: fonts.display, fontStyle: "italic", fontSize: 30, color: colors.ink }}>
          KSIEP is not a company. <Gold>It is an electronics ecosystem platform.</Gold>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

/* ─────────── THE STACK — reliability assured, layer by layer (WA0044) ─────────── */
const TIERS = [
  { n: "AI Intelligence Layer", assurance: "Infrastructure-trust assurance — the IP no one else owns", apex: true },
  { n: "Power Conversion & Control", assurance: "Power-conversion assurance" },
  { n: "Storage & Power Integrity", assurance: "Energy-storage & power-integrity assurance" },
  { n: "Timing Layer", assurance: "Timing & synchronization assurance" },
  { n: "Advanced Materials Layer", assurance: "Availability & quality assurance" },
];
export const MStack: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const last = TIERS.length - 1;
  return (
    <Stage seed="stack" chapter="Reliability assured">
      <AbsoluteFill style={{ padding: "78px 120px 60px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <TitleBlock align="center" eyebrow="The stack, layer by layer — each one assured" title={<>Every layer, <Gold>assured.</Gold></>} titleSize={48} maxWidth={1200} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 12, width: "100%", marginTop: 18, position: "relative" }}>
          {TIERS.map((t, i) => {
            const order = last - i; // build bottom-up
            const s = spring({ frame: frame - (20 + order * 16), fps, config: { damping: 200 } });
            const width = 620 + i * 180; // apex narrowest, base widest
            return (
              <div key={i} style={{ width, maxWidth: "100%", opacity: s, transform: `translateY(${interpolate(s, [0, 1], [20, 0])}px)`, display: "flex", alignItems: "center", gap: 22, padding: "18px 30px", borderRadius: 12, background: t.apex ? "linear-gradient(100deg, rgba(230,192,104,0.20), rgba(230,192,104,0.05))" : `linear-gradient(100deg, rgba(143,216,236,${0.15 - i * 0.02}), rgba(143,216,236,0.03))`, border: `1px solid ${t.apex ? "rgba(230,192,104,0.55)" : colors.line}`, boxShadow: t.apex ? "0 0 40px rgba(230,192,104,0.2)" : "none" }}>
                <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: t.apex ? 27 : 24, color: t.apex ? colors.goldSoft : colors.ice, minWidth: 320 }}>{t.n}</div>
                <div style={{ flex: 1, height: 1, background: colors.line }} />
                <div style={{ fontFamily: fonts.sans, fontWeight: 400, fontSize: 17, color: t.apex ? colors.goldSoft : colors.muted, textAlign: "right", maxWidth: 420 }}>{t.assurance}</div>
              </div>
            );
          })}
          {[0, 0.5].map((off, k) => {
            const t = (frame / 50 + off) % 1;
            return <div key={k} style={{ position: "absolute", left: "50%", bottom: `${t * 100}%`, width: 5, height: 5, borderRadius: "50%", background: colors.goldSoft, opacity: (1 - t) * 0.8, boxShadow: "0 0 8px rgba(240,216,154,0.9)", transform: "translateX(-50%)" }} />;
          })}
        </div>
        <div style={{ fontFamily: fonts.display, fontStyle: "italic", fontSize: 26, color: colors.iceSoft, marginTop: 6, opacity: interpolate(frame, [110, 136], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          The passive electronics stack rests assured.
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

/* ─────────── VISION 2035 ─────────── */
const VISION = [
  { serving: "Serving India", v: "India's leader for Sovereign Infrastructure Electronics" },
  { serving: "Serving the world", v: "A global centre for Reliability Engineering" },
  { serving: "Serving next-generation talent", v: "A leading talent hub for Electronics, AI & digital infrastructure" },
  { serving: "Serving women", v: "A model for women-led electronics technology manufacturing" },
];
export const MVision: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Stage seed="vision" chapter="Vision 2035">
      <AbsoluteFill style={{ padding: "84px 120px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <TitleBlock align="center" eyebrow="By 2035, Kerala will be recognised as" title={<>The state that <Gold>built the layer.</Gold></>} titleSize={50} maxWidth={1100} style={{ alignSelf: "center" }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, marginTop: 46, maxWidth: 1240, alignSelf: "center", width: "100%" }}>
          {VISION.map((v, i) => {
            const s = spring({ frame: frame - (24 + i * 12), fps, config: { damping: 200 } });
            return (
              <div key={i} style={{ opacity: s, transform: `translateY(${interpolate(s, [0, 1], [26, 0])}px)`, padding: "24px 30px", borderRadius: 16, background: "linear-gradient(160deg, rgba(230,192,104,0.08), transparent)", borderLeft: `3px solid ${colors.gold}` }}>
                <div style={{ fontFamily: fonts.sans, fontWeight: 600, letterSpacing: 2, fontSize: 14, textTransform: "uppercase", color: colors.gold }}>{v.serving}</div>
                <div style={{ fontFamily: fonts.sans, fontWeight: 300, fontSize: 23, color: colors.ink, lineHeight: 1.35, marginTop: 6 }}>{v.v}</div>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 36, textAlign: "center", fontFamily: fonts.display, fontStyle: "italic", fontSize: 30, color: colors.iceSoft, opacity: interpolate(frame, [80, 108], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          Building a better tomorrow for Kerala.
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

/* ─────────── THE WHY — geopolitics + the chess framing ─────────── */
const CRITICAL = [
  { t: "Critical infrastructure", Icon: BuildingIcon },
  { t: "AI infrastructure", Icon: ChipIcon },
  { t: "Telecom & data centres", Icon: GearIcon },
  { t: "Defence & aerospace", Icon: RocketIcon },
];
export const MWhy: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Stage seed="why" chapter="The why" progress={P(6)}>
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 84 }}>
        <TitleBlock
          align="center"
          eyebrow="Why own the value chain"
          title={<>Moving the Kerala horse to <Gold>the centre of the Indian chessboard.</Gold></>}
          sub="Geopolitical instability and supply-chain disruption spike the price of the electronics value chain. Owning a significant share of it is critical for India — it sits inside every strategic system."
          titleSize={46}
          maxWidth={1240}
        />
      </AbsoluteFill>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", paddingTop: 70 }}>
        <div style={{ display: "flex", gap: 28 }}>
          {CRITICAL.map((c, i) => {
            const s = spring({ frame: frame - (28 + i * 12), fps, config: { damping: 200 } });
            const Icon = c.Icon;
            return (
              <div key={i} style={{ width: 250, opacity: s, transform: `translateY(${interpolate(s, [0, 1], [28, 0])}px)`, padding: "30px 24px", borderRadius: 16, background: "linear-gradient(160deg, rgba(143,216,236,0.07), transparent)", border: `1px solid ${colors.line}`, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                <Icon size={48} color={colors.iceSoft} sw={1.4} />
                <div style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 24, color: colors.ink, textAlign: "center" }}>{c.t}</div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 76 }}>
        <div style={{ opacity: interpolate(frame, [96, 122], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }), fontFamily: fonts.display, fontStyle: "italic", fontSize: 30, color: colors.goldSoft }}>
          Attack is the best form of defence.
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

/* ─────────── REGIONAL EXPERTISE DISTRIBUTION ─────────── */
const REGIONS: { node: { x: number; y: number }; city: string; role: string }[] = [
  { node: { x: 150, y: 165 }, city: "Kannur", role: "KCL + KCCL · SME cluster" },
  { node: { x: 262, y: 405 }, city: "Malappuram", role: "KECL · SME cluster" },
  { node: { x: 300, y: 470 }, city: "Thrissur", role: "KPDL · SME cluster" },
  { node: { x: 330, y: 560 }, city: "Kochi", role: "SI + AI Intelligence · Infopark cluster" },
  { node: { x: 412, y: 840 }, city: "Trivandrum", role: "ER&DC + ISRO · R&D & space" },
];
export const MRegional: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Stage seed="regional" chapter="Regional expertise distribution" progress={P(12)}>
      <AbsoluteFill style={{ flexDirection: "row" }}>
        <div style={{ width: 640, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <KeralaBoard width={380} draw={1} energy={1} zoom={1.02}>
            {REGIONS.map((r, i) => {
              const s = spring({ frame: frame - (30 + i * 10), fps, config: { damping: 200 } });
              const pulse = 0.5 + 0.5 * Math.abs(Math.sin((frame - i * 8) / 16));
              return (
                <g key={i} opacity={s}>
                  <circle cx={r.node.x} cy={r.node.y} r={10 + pulse * 8} fill="none" stroke={colors.gold} strokeWidth={1} opacity={(1 - pulse) * 0.8} />
                  <circle cx={r.node.x} cy={r.node.y} r={6} fill={colors.goldSoft} />
                  <text x={r.node.x + 16} y={r.node.y + 5} fontFamily={fonts.display} fontWeight={600} fontSize={20} fill={colors.ink}>{r.city}</text>
                </g>
              );
            })}
          </KeralaBoard>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingRight: 110 }}>
          <TitleBlock eyebrow="One state, many specialised regions" title={<>Expertise, <Gold>distributed.</Gold></>} sub="The existing Keltron units across Kerala become the nuclei of regional SME clusters — each region a centre of its own craft." titleSize={48} maxWidth={620} />
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 26 }}>
            {REGIONS.map((r, i) => {
              const s = spring({ frame: frame - (44 + i * 9), fps, config: { damping: 200 } });
              return (
                <div key={i} style={{ opacity: s, transform: `translateX(${interpolate(s, [0, 1], [26, 0])}px)`, display: "flex", gap: 16, alignItems: "baseline", padding: "8px 16px", borderRadius: 10, background: "linear-gradient(100deg, rgba(143,216,236,0.05), transparent)", borderLeft: `2px solid ${colors.iceDeep}` }}>
                  <span style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 22, color: colors.gold, minWidth: 150 }}>{r.city}</span>
                  <span style={{ fontFamily: fonts.sans, fontWeight: 300, fontSize: 19, color: colors.muted }}>{r.role}</span>
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

/* ─────────── THE KERALA POLICY — ABCD ─────────── */
const ABCD = [
  { k: "A", t: "Attract good people", d: "The talent that builds and runs the institution" },
  { k: "B", t: "Build institutions that endure", d: "Designed to outlast governments and generations" },
  { k: "C", t: "Common-good focus, always", d: "Every decision measured against public value" },
  { k: "D", t: "Distributed development", d: "Shared wealth creation across the whole state" },
];
export const MPolicy: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Stage seed="policy" chapter="The Kerala policy" progress={P(18)}>
      <AbsoluteFill style={{ padding: "92px 120px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <TitleBlock align="center" eyebrow="How it will be run" title={<>The Kerala Policy: <Gold>A · B · C · D.</Gold></>} titleSize={50} maxWidth={1100} style={{ alignSelf: "center" }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, marginTop: 52, maxWidth: 1200, alignSelf: "center", width: "100%" }}>
          {ABCD.map((p, i) => {
            const s = spring({ frame: frame - (24 + i * 12), fps, config: { damping: 200 } });
            return (
              <div key={i} style={{ opacity: s, transform: `translateY(${interpolate(s, [0, 1], [26, 0])}px)`, display: "flex", gap: 22, alignItems: "center", padding: "24px 30px", borderRadius: 16, background: "linear-gradient(160deg, rgba(255,255,255,0.045), rgba(255,255,255,0.012))", border: `1px solid ${colors.line}` }}>
                <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 56, color: colors.gold, lineHeight: 1, minWidth: 56 }}>{p.k}</div>
                <div>
                  <div style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 26, color: colors.ink }}>{p.t}</div>
                  <div style={{ fontFamily: fonts.sans, fontWeight: 300, fontSize: 18, color: colors.muted, marginTop: 2 }}>{p.d}</div>
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

/* ─────────── THE OPENING — market size & the import gap ─────────── */
const MARKET = [
  { layer: "Timing integrity", size: "$250–500 M", imp: 90 },
  { layer: "Power-storage integrity", size: "$3.5–4.5 B", imp: 80 },
  { layer: "Power-conversion control", size: "$2.5–3.5 B", imp: 60 },
  { layer: "AI reliability intelligence", size: "$150–400 M", imp: 40 },
];
export const MMarket: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Stage seed="market" chapter="The opening">
      <AbsoluteFill style={{ padding: "84px 130px 70px", display: "flex", flexDirection: "column" }}>
        <TitleBlock eyebrow="India's reliability-electronics market, today" title={<>An <Gold>$8 billion</Gold> import gap.</>} titleSize={52} maxWidth={1000} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 18, marginTop: 10 }}>
          {MARKET.map((m, i) => {
            const d = 24 + i * 12;
            const s = spring({ frame: frame - d, fps, config: { damping: 200 } });
            const w = interpolate(frame - (d + 6), [0, 36], [0, m.imp / 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div key={i} style={{ opacity: s, display: "flex", alignItems: "center", gap: 26 }}>
                <div style={{ width: 360, fontFamily: fonts.display, fontWeight: 600, fontSize: 26, color: colors.ink }}>{m.layer}</div>
                <div style={{ width: 150, fontFamily: fonts.sans, fontWeight: 500, fontSize: 21, color: colors.iceSoft }}>{m.size}</div>
                <div style={{ flex: 1, height: 26, borderRadius: 6, background: "rgba(255,255,255,0.05)", overflow: "hidden", position: "relative" }}>
                  <div style={{ height: "100%", width: `${w * 100}%`, borderRadius: 6, background: `linear-gradient(90deg, ${colors.iceDeep}, ${colors.gold})` }} />
                </div>
                <div style={{ width: 130, fontFamily: fonts.display, fontWeight: 700, fontSize: 24, color: colors.goldSoft, textAlign: "right" }}>{m.imp}% imported</div>
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: 40, marginTop: 18 }}>
          {[
            { v: "$8–12 B", l: "total India market", tone: "ice" },
            { v: "$6–9 B", l: "imported today", tone: "gold" },
            { v: "$2–3 B", l: "domestic value-add", tone: "ice" },
          ].map((t, i) => {
            const s = spring({ frame: frame - (78 + i * 10), fps, config: { damping: 200 } });
            return (
              <div key={i} style={{ flex: 1, opacity: s, padding: "18px 26px", borderRadius: 14, background: t.tone === "gold" ? "linear-gradient(160deg, rgba(230,192,104,0.14), transparent)" : "rgba(255,255,255,0.035)", border: `1px solid ${t.tone === "gold" ? "rgba(230,192,104,0.4)" : colors.line}` }}>
                <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 44, color: t.tone === "gold" ? colors.goldSoft : colors.iceSoft }}>{t.v}</div>
                <div style={{ fontFamily: fonts.sans, fontWeight: 300, fontSize: 18, color: colors.muted, marginTop: 2 }}>{t.l}</div>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 22, fontFamily: fonts.display, fontStyle: "italic", fontSize: 28, color: colors.ink, textAlign: "center", opacity: interpolate(frame, [120, 146], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          The import gap <Gold>is</Gold> the strategic opening.
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

/* ─────────── THE ASSURANCE LAYER — KSIEP's distinctive IP (Goal 2035) ─────────── */
const ASSURANCE = [
  "Timing assurance",
  "Synchronization assurance",
  "Power-integrity assurance",
  "Energy-storage assurance",
  "Infrastructure-trust assurance",
];
export const MAssurance: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const n = ASSURANCE.length;
  return (
    <Stage seed="assurance" chapter="The goal · 2035">
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 80 }}>
        <TitleBlock align="center" eyebrow="KSIEP's most distinctive long-term IP" title={<>A <Gold>Reliability Intelligence Layer</Gold> — assurance across the value chain.</>} titleSize={46} maxWidth={1240} />
      </AbsoluteFill>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", paddingTop: 40 }}>
        <div style={{ display: "flex", flexDirection: "column-reverse", gap: 12, alignItems: "flex-start" }}>
          {ASSURANCE.map((a, i) => {
            const s = spring({ frame: frame - (24 + i * 14), fps, config: { damping: 200 } });
            const apex = i === n - 1;
            return (
              <div key={i} style={{ marginLeft: i * 90, opacity: s, transform: `translateX(${interpolate(s, [0, 1], [-24, 0])}px)`, display: "flex", alignItems: "center", gap: 16, padding: "16px 30px", borderRadius: 12, minWidth: 460, background: apex ? "linear-gradient(100deg, rgba(230,192,104,0.20), rgba(230,192,104,0.05))" : `linear-gradient(100deg, rgba(143,216,236,${0.05 + i * 0.02}), transparent)`, border: `1px solid ${apex ? "rgba(230,192,104,0.55)" : colors.line}`, boxShadow: apex ? "0 0 36px rgba(230,192,104,0.2)" : "none" }}>
                <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 22, color: apex ? colors.goldSoft : colors.gold, minWidth: 34 }}>{`0${i + 1}`}</div>
                <div style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 28, color: apex ? colors.goldSoft : colors.ink }}>{a}</div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 70 }}>
        <div style={{ opacity: interpolate(frame, [110, 136], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }), fontFamily: fonts.sans, fontWeight: 300, fontSize: 22, color: colors.muted, textAlign: "center", maxWidth: 1100 }}>
          The layer no one else owns — turning components into <span style={{ color: colors.iceSoft }}>guaranteed reliability.</span>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
