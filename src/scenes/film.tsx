import React from "react";
import {
  AbsoluteFill, Img, staticFile, interpolate, random, spring,
  useCurrentFrame, useVideoConfig,
} from "remotion";
import { colors, fonts } from "../theme";
import { Backdrop } from "../components/Backdrop";
import { Stage, TitleBlock } from "../components/Stage";
import { Gold } from "../components/ui";
import { RocketIcon, SonarIcon, MedicalIcon, PowerIcon, RobotIcon } from "../components/icons";
import { KeralaBoard, NODES } from "../illustrations/KeralaBoard";
import { LogoBadge, PortraitFrame } from "../components/Media";
import { QuadrantTimeline, SixPillars } from "../illustrations/institutions";
import { DiasporaGlobe } from "../illustrations/DiasporaGlobe";

const N = 12;
const P = (i: number) => i / N;
const Center: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", ...style }}>{children}</AbsoluteFill>
);

// A logo marker rendered inside the KeralaBoard SVG (board-space).
const BoardMarker: React.FC<{ node: { x: number; y: number }; logo: string; label: string; delay: number; r?: number }> = ({ node, logo, label, delay, r = 30 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  const pulse = 0.5 + 0.5 * Math.abs(Math.sin((frame - delay) / 16));
  return (
    <g opacity={s} style={{ transform: `scale(${interpolate(s, [0, 1], [0.6, 1])})`, transformOrigin: `${node.x}px ${node.y}px` }}>
      <circle cx={node.x} cy={node.y} r={r + 8 + pulse * 8} fill="none" stroke={colors.gold} strokeWidth={1} opacity={(1 - pulse) * 0.8} />
      <circle cx={node.x} cy={node.y} r={r} fill="#fff" stroke={colors.gold} strokeWidth={1.6} />
      <image href={staticFile(logo)} x={node.x - r * 0.72} y={node.y - r * 0.72} width={r * 1.44} height={r * 1.44} preserveAspectRatio="xMidYMid meet" />
      <text x={node.x} y={node.y + r + 20} textAnchor="middle" fontFamily={fonts.sans} fontWeight={600} fontSize={17} fill={colors.ink}>{label}</text>
    </g>
  );
};

/* ─────────── 01 · COLD OPEN — the circuit becomes Kerala ─────────── */
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
        <h1 style={{ margin: 0, opacity: t2, transform: `translateY(${interpolate(t2, [0, 1], [22, 0])}px)`, fontFamily: fonts.display, fontWeight: 700, fontSize: 150, lineHeight: 0.95, color: colors.ink }}>
          KSIEP
        </h1>
        <div style={{ opacity: t3, fontFamily: fonts.display, fontSize: 30, color: colors.iceSoft, marginTop: 16, lineHeight: 1.25, maxWidth: 560 }}>
          The <Gold>Kerala Sovereign Infrastructure Electronics Platform</Gold>
        </div>
        <div style={{ opacity: t3, fontFamily: fonts.sans, fontWeight: 300, fontSize: 20, color: colors.muted, marginTop: 16 }}>
          Kerala is not a coastline. It is a circuit — waiting for its architect to return.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ─────────── 02 · THE ARCHITECT — KPP Nambiar ─────────── */
const ORBIT = ["Systems", "Institutions", "State", "Country"];
export const M02: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Stage seed="architect" chapter="One man saw it first" progress={P(2)} dim>
      <AbsoluteFill style={{ flexDirection: "row", alignItems: "center" }}>
        <div style={{ width: 760, position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <PortraitFrame src="img/nambiar.jpg" size={360} delay={6} />
          {ORBIT.map((w, i) => {
            const a = (i / ORBIT.length) * Math.PI * 2 - Math.PI / 2;
            const s = spring({ frame: frame - (44 + i * 8), fps, config: { damping: 200 } });
            return (
              <div key={w} style={{ position: "absolute", left: `calc(50% + ${Math.cos(a) * 250}px)`, top: `calc(50% + ${Math.sin(a) * 250}px)`, transform: `translate(-50%,-50%) scale(${s})`, opacity: s, fontFamily: fonts.sans, fontWeight: 600, fontSize: 20, letterSpacing: 2, color: colors.goldSoft, padding: "8px 16px", borderRadius: 20, background: "rgba(230,192,104,0.08)", border: "1px solid rgba(230,192,104,0.4)", whiteSpace: "nowrap" }}>
                {w}
              </div>
            );
          })}
        </div>
        <div style={{ flex: 1, paddingRight: 120 }}>
          <TitleBlock
            eyebrow="K.P.P. Nambiar · 1929–2015"
            title={<>An <Gold>Institutional Architect.</Gold></>}
            sub="He never thought in factories. He thought in systems, institutions, and what they owe a state — and a country. He gave Kerala its electronics brand: KELTRON."
            titleSize={58}
            maxWidth={640}
          />
          <div style={{ marginTop: 28, fontFamily: fonts.display, fontStyle: "italic", fontSize: 26, color: colors.iceSoft, opacity: interpolate(frame, [80, 108], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
            "Returning with a Kerala Technology Thesis."
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

/* ─────────── 03 · HE BUILT SYSTEMS, NOT THINGS ─────────── */
const REFRAMES = [
  { logo: "img/keltron_building.jpg", img: true, name: "Keltron", not: "a set of factories", but: "an electronics ecosystem" },
  { logo: "img/cdac.jpg", name: "ER&DC", not: "a laboratory", but: "a tech-capability engine" },
  { logo: "img/technopark.jpg", name: "Technopark", not: "a real-estate project", but: "a knowledge-economy platform" },
  { logo: "img/kudumbashree.png", name: "Women's co-operatives", not: "an employment scheme", but: "a social architecture for distributed industrial participation" },
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

/* ─────────── 04 · 53 YEARS, THREE INSTITUTIONS ─────────── */
export const M04: React.FC = () => (
  <Stage seed="quad" chapter="The unfinished architecture" progress={P(4)}>
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 80 }}>
      <TitleBlock align="center" eyebrow="53 years · three institutions" title={<>Three capabilities, <Gold>never reconnected.</Gold></>} titleSize={52} maxWidth={1100} />
    </AbsoluteFill>
    <Center style={{ marginTop: 70 }}>
      <QuadrantTimeline connect={0} width={1200} />
    </Center>
  </Stage>
);

/* ─────────── 05 · THE MISSING LINK ─────────── */
export const M05: React.FC = () => {
  const frame = useCurrentFrame();
  const connect = interpolate(frame, [30, 150], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Stage seed="reconnect" chapter="The missing link" progress={P(5)}>
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 80 }}>
        <TitleBlock align="center" eyebrow="R&D → Manufacturing → Entrepreneurship → Strategic Tech" title={<>KSIEP <Gold>reconnects them.</Gold></>} titleSize={52} maxWidth={1180} />
      </AbsoluteFill>
      <Center style={{ marginTop: 70 }}>
        <QuadrantTimeline connect={connect} width={1200} />
      </Center>
    </Stage>
  );
};

/* ─────────── 06 · WHAT KSIEP IS ─────────── */
export const M06: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const letters = "KSIEP".split("");
  return (
    <Stage seed="whatis" chapter="What KSIEP is" progress={P(6)}>
      <AbsoluteFill style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "0 120px" }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 26 }}>
          {letters.map((c, i) => {
            const s = spring({ frame: frame - (10 + i * 8), fps, config: { damping: 200 } });
            return <span key={i} style={{ opacity: s, transform: `translateY(${interpolate(s, [0, 1], [30, 0])}px)`, fontFamily: fonts.display, fontWeight: 700, fontSize: 130, color: colors.goldSoft, textShadow: "0 0 30px rgba(230,192,104,0.3)" }}>{c}</span>;
          })}
        </div>
        <div style={{ opacity: interpolate(frame, [50, 74], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }), fontFamily: fonts.display, fontWeight: 600, fontSize: 40, color: colors.ink, textAlign: "center" }}>
          A <Gold>Sovereign Infrastructure Electronics Platform.</Gold>
        </div>
        <div style={{ opacity: interpolate(frame, [70, 96], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }), fontFamily: fonts.sans, fontWeight: 300, fontSize: 23, color: colors.muted, textAlign: "center", maxWidth: 1100, marginTop: 22, lineHeight: 1.5 }}>
          Built on Keltron's technology heritage, CIAL's governance & capital, Kudumbashree's social participation, Technopark's ecosystem philosophy, and Germany's Mittelstand specialization.
        </div>
        {/* capability layer slab */}
        <svg width={760} height={120} viewBox="0 0 760 120" style={{ marginTop: 40, opacity: interpolate(frame, [96, 120], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          {[0, 1, 2].map((k) => (
            <rect key={k} x={120 + k * 8} y={20 + k * 22} width={520 - k * 16} height={20} rx={4} fill={`rgba(230,192,104,${0.18 - k * 0.04})`} stroke={colors.gold} strokeWidth={1} />
          ))}
          <text x={380} y={108} textAnchor="middle" fontFamily={fonts.sans} fontWeight={600} fontSize={16} letterSpacing={3} fill={colors.goldSoft}>A DURABLE CAPABILITY LAYER</text>
        </svg>
      </AbsoluteFill>
    </Stage>
  );
};

/* ─────────── 07 · THE DISTINCTIVE KERALA MODEL ─────────── */
export const M07: React.FC = () => (
  <Stage seed="pillars" chapter="The distinctive Kerala model" progress={P(7)}>
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 70 }}>
      <TitleBlock align="center" eyebrow="Six inheritances, one structure" title={<>Kerala already <Gold>invented every piece.</Gold></>} titleSize={50} maxWidth={1100} />
    </AbsoluteFill>
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 36 }}>
      <SixPillars width={1620} />
    </AbsoluteFill>
  </Stage>
);

/* ─────────── 08 · THE CAPABILITY LAYER, LIVE ─────────── */
const SECTORS = [
  { t: "Space & defence", Icon: RocketIcon },
  { t: "Marine & underwater", Icon: SonarIcon },
  { t: "Medical electronics", Icon: MedicalIcon },
  { t: "Power & energy", Icon: PowerIcon },
  { t: "Test & automation", Icon: RobotIcon },
];
export const M08: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Stage seed="live" chapter="The capability layer, live" progress={P(8)}>
      <AbsoluteFill style={{ flexDirection: "row" }}>
        <div style={{ width: 700, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <KeralaBoard width={420} draw={1} energy={1} zoom={1.02}>
            <BoardMarker node={NODES.trivandrum} logo="img/isro.png" label="VSSC / ISRO" delay={30} r={28} />
            <BoardMarker node={NODES.vizhinjam} logo="img/vizhinjam.png" label="Vizhinjam" delay={42} r={26} />
            <BoardMarker node={NODES.kochi} logo="img/vguard.jpg" label="V-Guard · Kakkanad" delay={54} r={28} />
            <BoardMarker node={NODES.kozhikode} logo="img/makervillage.png" label="Maker Village" delay={66} r={26} />
          </KeralaBoard>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingRight: 110 }}>
          <TitleBlock eyebrow="What the layer powers" title={<>Real anchors. <Gold>Five facets.</Gold></>} sub="A durable capability layer for Kerala & India in the infrastructure-electronics arena." titleSize={50} maxWidth={620} />
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 30 }}>
            {SECTORS.map((s, i) => {
              const sp = spring({ frame: frame - (40 + i * 12), fps, config: { damping: 200 } });
              const Icon = s.Icon;
              return (
                <div key={i} style={{ opacity: sp, transform: `translateX(${interpolate(sp, [0, 1], [30, 0])}px)`, display: "flex", alignItems: "center", gap: 18, padding: "10px 20px", borderRadius: 12, background: "linear-gradient(100deg, rgba(143,216,236,0.07), transparent)", borderLeft: `2px solid ${colors.ice}` }}>
                  <Icon size={36} color={colors.iceSoft} sw={1.5} />
                  <span style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 28, color: colors.ink }}>{s.t}</span>
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

/* ─────────── 09 · SOVEREIGN ELECTRONICS — Kerala into India ─────────── */
export const M09: React.FC = () => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame, [20, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Stage seed="sovereign" chapter="India's sovereign electronics" progress={P(9)}>
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 84 }}>
        <TitleBlock align="center" eyebrow="In tune with India's sovereign electronics mission" title={<>Kerala's layer plugs into <Gold>the nation.</Gold></>} titleSize={50} maxWidth={1200} />
      </AbsoluteFill>
      <Center style={{ marginTop: 40 }}>
        <svg width={1200} height={560} viewBox="0 0 1200 560" style={{ overflow: "visible" }}>
          {/* national reliability lattice */}
          {new Array(40).fill(0).map((_, i) => {
            const x = 120 + random("nx" + i) * 960;
            const y = 40 + random("ny" + i) * 420;
            const lit = interpolate(frame, [40 + i * 2, 60 + i * 2], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return <circle key={i} cx={x} cy={y} r={3} fill={colors.ice} opacity={lit * (0.4 + 0.6 * Math.abs(Math.sin(frame / 14 + i)))} />;
          })}
          {/* links from Kerala source (bottom-left) outward */}
          {new Array(14).fill(0).map((_, i) => {
            const tx = 200 + random("lx" + i) * 880;
            const ty = 60 + random("ly" + i) * 360;
            const t = (frame / 60 + i / 14) % 1;
            const px = 180 + (tx - 180) * t;
            const py = 460 + (ty - 460) * t;
            const seg = interpolate(frame, [50, 110], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <g key={i} opacity={seg}>
                <line x1={180} y1={460} x2={tx} y2={ty} stroke={colors.line} strokeWidth={0.8} />
                <circle cx={px} cy={py} r={2.6} fill={colors.goldSoft} opacity={(1 - t) * seg} />
              </g>
            );
          })}
          {/* Kerala source node */}
          <g opacity={reveal}>
            <circle cx={180} cy={460} r={30} fill="rgba(230,192,104,0.14)" stroke={colors.gold} strokeWidth={1.6} />
            <text x={180} y={465} textAnchor="middle" fontFamily={fonts.display} fontWeight={700} fontSize={18} fill={colors.goldSoft}>KSIEP</text>
            <text x={180} y={510} textAnchor="middle" fontFamily={fonts.sans} fontWeight={500} fontSize={15} fill={colors.muted}>Kerala</text>
          </g>
          <text x={680} y={300} textAnchor="middle" fontFamily={fonts.display} fontWeight={700} fontSize={56} fill={colors.ink} opacity={reveal * 0.25} letterSpacing={6}>INDIA</text>
        </svg>
      </Center>
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 70 }}>
        <div style={{ opacity: interpolate(frame, [110, 134], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }), fontFamily: fonts.display, fontStyle: "italic", fontSize: 28, color: colors.iceSoft, textAlign: "center", maxWidth: 1100 }}>
          A sovereign Reliability Infrastructure Electronics Layer — for Kerala, and for India.
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

/* ─────────── 10 · GOVERNANCE & CAPITAL ─────────── */
export const M10: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Stage seed="gov" chapter="Governance & capital" progress={P(10)}>
      <AbsoluteFill style={{ flexDirection: "row", alignItems: "center" }}>
        <div style={{ width: 680, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <DiasporaGlobe scale={0.86} />
        </div>
        <div style={{ flex: 1, paddingRight: 110 }}>
          <TitleBlock
            eyebrow="The CIAL way × the Kudumbashree way"
            title={<>Owned widely. <Gold>Governed to endure.</Gold></>}
            sub="CIAL's structure — a diaspora-and-public shareholding under professional, politically-continuous governance. Kudumbashree's model — distributed, woman-led participation across the whole state."
            titleSize={48}
            maxWidth={640}
          />
          <div style={{ display: "flex", gap: 24, marginTop: 34, alignItems: "center" }}>
            <LogoBadge src="img/cial.jpg" size={96} delay={40} tone="ice" invertBg label="CIAL" sub="capital & governance" />
            <LogoBadge src="img/kudumbashree.png" size={96} delay={52} tone="gold" invertBg label="Kudumbashree" sub="social participation" />
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

/* ─────────── 11 · THE THESIS ─────────── */
export const M11: React.FC = () => {
  const frame = useCurrentFrame();
  const grow = interpolate(frame, [20, 130], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Stage seed="thesis" chapter="The investment thesis" progress={P(11)}>
      {/* growing lattice from a seed */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <svg width={1400} height={760} viewBox="-700 -380 1400 760" style={{ overflow: "visible", opacity: 0.6 }}>
          {new Array(60).fill(0).map((_, i) => {
            const a = random("ta" + i) * Math.PI * 2;
            const maxR = 80 + random("tr" + i) * 560;
            const r = maxR * interpolate(grow, [random("td" + i) * 0.5, random("td" + i) * 0.5 + 0.5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const x = Math.cos(a) * r, y = Math.sin(a) * r * 0.6;
            return (
              <g key={i}>
                <line x1={0} y1={0} x2={x} y2={y} stroke={colors.line} strokeWidth={0.7} opacity={0.5} />
                <circle cx={x} cy={y} r={2.6} fill={i % 4 === 0 ? colors.goldSoft : colors.ice} opacity={0.4 + 0.6 * Math.abs(Math.sin(frame / 16 + i))} />
              </g>
            );
          })}
          <circle cx={0} cy={0} r={8} fill={colors.gold} style={{ filter: "drop-shadow(0 0 12px rgba(230,192,104,0.9))" }} />
        </svg>
      </AbsoluteFill>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 200px" }}>
        <div style={{ fontFamily: fonts.sans, fontWeight: 600, letterSpacing: 5, fontSize: 18, textTransform: "uppercase", color: colors.gold, marginBottom: 24 }}>
          This is not capital mobilization
        </div>
        <div style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 46, color: colors.ink, textAlign: "center", lineHeight: 1.25, maxWidth: 1180 }}>
          You are investing in a long-term enduring institution that adds <Gold>economic & social value</Gold> to Kerala — and builds India's sovereign electronics layer.
        </div>
        <div style={{ marginTop: 34, fontFamily: fonts.sans, fontWeight: 300, fontSize: 22, color: colors.muted, opacity: interpolate(frame, [110, 140], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          A new institutional architecture for Kerala's next <span style={{ color: colors.iceSoft }}>25 years</span> of industrial development.
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

/* ─────────── 12 · FINALE — KPP-N 2.0 ─────────── */
export const M12: React.FC = () => {
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
          {/* KSIEP blaze at Trivandrum cluster */}
          <circle cx={NODES.trivandrum.x} cy={NODES.trivandrum.y} r={interpolate(frame, [78, 140], [0, 90], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} fill="none" stroke={colors.gold} strokeWidth={1.4} opacity={interpolate(frame, [78, 140], [0.6, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
        </KeralaBoard>
      </AbsoluteFill>
      <AbsoluteFill style={{ background: "#fff", opacity: flash }} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "flex-start", paddingLeft: 1010, paddingRight: 80 }}>
        <div style={{ opacity: l1, fontFamily: fonts.sans, fontSize: 19, fontWeight: 600, letterSpacing: 8, color: colors.gold, textTransform: "uppercase" }}>KPP-N 2.0</div>
        <h1 style={{ margin: "14px 0 0", opacity: l1, transform: `translateY(${interpolate(l1, [0, 1], [22, 0])}px)`, fontFamily: fonts.display, fontWeight: 700, fontSize: 72, lineHeight: 1.04, color: colors.ink }}>
          The architect <Gold>returns.</Gold>
        </h1>
        <div style={{ opacity: l2, transform: `translateY(${interpolate(l2, [0, 1], [18, 0])}px)`, marginTop: 20, fontFamily: fonts.display, fontStyle: "italic", fontSize: 30, color: colors.iceSoft, maxWidth: 560, lineHeight: 1.3 }}>
          A new institutional architecture for Kerala's next 25 years.
        </div>
        <div style={{ opacity: tag, marginTop: 30, paddingTop: 22, borderTop: `1px solid ${colors.line}`, fontFamily: fonts.sans, fontWeight: 400, fontSize: 20, letterSpacing: 2, color: colors.muted, maxWidth: 560 }}>
          KSIEP · Kerala Sovereign Infrastructure Electronics Platform
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
