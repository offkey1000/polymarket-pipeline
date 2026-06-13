import React from "react";
import { Img, staticFile, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme";

// A logo dropped into a glowing circular socket with a draw-on ring and label.
export const LogoBadge: React.FC<{
  src: string;
  label?: string;
  sub?: string;
  size?: number;
  delay?: number;
  tone?: "gold" | "ice";
  invertBg?: boolean; // put a light chip behind dark-on-transparent logos
  contain?: boolean;
}> = ({ src, label, sub, size = 150, delay = 0, tone = "ice", invertBg = false, contain = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  const ringCol = tone === "gold" ? colors.gold : colors.ice;
  const ringLen = Math.PI * (size + 14);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", opacity: s, transform: `translateY(${interpolate(s, [0, 1], [24, 0])}px) scale(${interpolate(s, [0, 1], [0.9, 1])})` }}>
      <div style={{ position: "relative", width: size, height: size }}>
        {/* glow */}
        <div style={{ position: "absolute", inset: -10, borderRadius: "50%", background: `radial-gradient(circle, ${tone === "gold" ? "rgba(230,192,104,0.30)" : "rgba(143,216,236,0.28)"}, transparent 70%)` }} />
        {/* draw-on ring */}
        <svg style={{ position: "absolute", inset: -7 }} width={size + 14} height={size + 14}>
          <circle cx={(size + 14) / 2} cy={(size + 14) / 2} r={(size + 14) / 2 - 2} fill="none" stroke={ringCol} strokeWidth={2} strokeDasharray={ringLen} strokeDashoffset={ringLen * (1 - s)} transform={`rotate(-90 ${(size + 14) / 2} ${(size + 14) / 2})`} style={{ filter: `drop-shadow(0 0 6px ${ringCol})` }} />
        </svg>
        {/* logo chip */}
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", overflow: "hidden", background: invertBg ? "#fff" : "rgba(255,255,255,0.04)", border: `1px solid ${colors.line}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile(src)} style={{ width: contain ? "72%" : "100%", height: contain ? "72%" : "100%", objectFit: contain ? "contain" : "cover" }} />
        </div>
      </div>
      {label && <div style={{ marginTop: 16, fontFamily: fonts.display, fontWeight: 600, fontSize: 25, color: colors.ink, textAlign: "center" }}>{label}</div>}
      {sub && <div style={{ marginTop: 2, fontFamily: fonts.sans, fontWeight: 300, fontSize: 16, color: colors.muted, textAlign: "center", maxWidth: size + 90 }}>{sub}</div>}
    </div>
  );
};

// A treated, framed evidence photo with a caption — fits the dark navy look.
export const PhotoCard: React.FC<{ src: string; caption: string; sub?: string; w?: number; h?: number; delay?: number; accent?: "gold" | "ice" }> = ({ src, caption, sub, w = 300, h = 180, delay = 0, accent = "ice" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  const col = accent === "gold" ? colors.gold : colors.ice;
  return (
    <div style={{ opacity: s, transform: `translateY(${interpolate(s, [0, 1], [22, 0])}px)`, width: w }}>
      <div style={{ position: "relative", width: w, height: h, borderRadius: 12, overflow: "hidden", border: `1px solid ${col}`, boxShadow: `0 0 24px rgba(0,0,0,0.4)` }}>
        <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "saturate(0.85) contrast(1.05) brightness(0.92)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(7,10,18,0.10), rgba(7,10,18,0.55))" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(160deg, rgba(143,216,236,0.10), transparent)`, mixBlendMode: "overlay" }} />
      </div>
      <div style={{ marginTop: 10, fontFamily: fonts.display, fontWeight: 600, fontSize: 20, color: colors.ink }}>{caption}</div>
      {sub && <div style={{ fontFamily: fonts.sans, fontWeight: 300, fontSize: 15, color: colors.muted, marginTop: 1 }}>{sub}</div>}
    </div>
  );
};

// A full-bleed treated photo used as a dim background plate behind a scene.
export const PhotoPlate: React.FC<{ src: string; opacity?: number; reveal?: number }> = ({ src, opacity = 0.2, reveal = 1 }) => (
  <AbsoluteFillPlate>
    <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: opacity * reveal, filter: "saturate(0.7) brightness(0.6) contrast(1.05)" }} />
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 120% at 50% 50%, transparent 30%, rgba(7,10,18,0.75) 100%)" }} />
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(11,16,32,0.5), rgba(7,10,18,0.7))" }} />
  </AbsoluteFillPlate>
);

const AbsoluteFillPlate: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>{children}</div>
);

// A portrait treated as a duotone framed in a gold ring — for K.P.P. Nambiar.
export const PortraitFrame: React.FC<{ src: string; size?: number; delay?: number }> = ({ src, size = 360, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  const ringLen = Math.PI * (size + 22);
  const glow = 0.5 + 0.5 * Math.sin(frame / 22);
  return (
    <div style={{ position: "relative", width: size, height: size, opacity: s, transform: `scale(${interpolate(s, [0, 1], [0.92, 1])})` }}>
      <div style={{ position: "absolute", inset: -24, borderRadius: "50%", background: `radial-gradient(circle, rgba(230,192,104,${0.28 * glow}), transparent 68%)` }} />
      <svg style={{ position: "absolute", inset: -11 }} width={size + 22} height={size + 22}>
        {/* dial ticks */}
        {new Array(60).fill(0).map((_, i) => {
          const a = (i / 60) * Math.PI * 2 - Math.PI / 2;
          const r1 = (size + 22) / 2 - 1;
          const r2 = r1 - (i % 5 === 0 ? 9 : 5);
          const c = (size + 22) / 2;
          const lit = interpolate(frame - delay, [20 + i * 0.5, 26 + i * 0.5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return <line key={i} x1={c + Math.cos(a) * r1} y1={c + Math.sin(a) * r1} x2={c + Math.cos(a) * r2} y2={c + Math.sin(a) * r2} stroke={colors.gold} strokeWidth={i % 5 === 0 ? 1.4 : 0.7} opacity={0.2 + lit * 0.6} />;
        })}
        <circle cx={(size + 22) / 2} cy={(size + 22) / 2} r={(size + 22) / 2 - 16} fill="none" stroke={colors.gold} strokeWidth={2.4} strokeDasharray={ringLen} strokeDashoffset={ringLen * (1 - s)} transform={`rotate(-90 ${(size + 22) / 2} ${(size + 22) / 2})`} style={{ filter: "drop-shadow(0 0 6px rgba(230,192,104,0.6))" }} />
      </svg>
      <div style={{ position: "absolute", inset: 14, borderRadius: "50%", overflow: "hidden", border: `1px solid rgba(230,192,104,0.5)` }}>
        <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(0.4) contrast(1.05) sepia(0.25) saturate(0.85) brightness(1.02)" }} />
        {/* ice/gold duotone wash */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(143,216,236,0.12), rgba(11,16,32,0.35))", mixBlendMode: "overlay" }} />
        <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 -40px 60px rgba(7,10,18,0.7)" }} />
      </div>
    </div>
  );
};
