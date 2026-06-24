import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, fonts, sceneProgress } from "../theme";
import { Backdrop } from "./Backdrop";

// Full-bleed cinematic stage: the animation owns the frame; chrome is minimal
// (a faint chapter marker and a thin bottom progress line). Progress is derived
// from the scene's seed via SCENE_ORDER, so reordering never needs renumbering.
export const Stage: React.FC<{
  seed?: string;
  chapter?: string;
  progress?: number; // optional override; normally derived from seed
  children: React.ReactNode;
  dim?: boolean;
}> = ({ seed, chapter, progress, children, dim }) => {
  const prog = sceneProgress(seed) || progress || 0;
  const frame = useCurrentFrame();
  const intro = interpolate(frame, [0, 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill>
      <Backdrop seed={seed} />
      {dim && <AbsoluteFill style={{ background: "rgba(4,7,14,0.35)" }} />}
      <AbsoluteFill style={{ opacity: intro }}>{children}</AbsoluteFill>

      {chapter && (
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 72,
            opacity: intro * 0.9,
            fontFamily: fonts.sans,
            fontSize: 16,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: colors.faint,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span style={{ width: 8, height: 8, transform: "rotate(45deg)", background: colors.gold }} />
          {chapter}
        </div>
      )}

      {/* thin film progress line */}
      <div style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: 3, background: "rgba(255,255,255,0.05)" }}>
        <div
          style={{
            height: "100%",
            width: `${prog * 100}%`,
            background: `linear-gradient(90deg, ${colors.iceDeep}, ${colors.gold})`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

// Cinematic eyebrow + headline + sub, animated, positioned anywhere.
export const TitleBlock: React.FC<{
  eyebrow?: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  align?: "left" | "center";
  delay?: number;
  titleSize?: number;
  maxWidth?: number;
  style?: React.CSSProperties;
}> = ({ eyebrow, title, sub, align = "left", delay = 0, titleSize = 64, maxWidth = 900, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const a = (d: number) => spring({ frame: frame - delay - d, fps, config: { damping: 200 } });
  const e = a(0), t = a(6), s = a(14);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: align === "center" ? "center" : "flex-start",
        textAlign: align,
        maxWidth,
        ...style,
      }}
    >
      {eyebrow && (
        <div
          style={{
            opacity: e,
            transform: `translateY(${interpolate(e, [0, 1], [12, 0])}px)`,
            fontFamily: fonts.sans,
            fontSize: 18,
            fontWeight: 600,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: colors.gold,
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          {align === "left" && (
            <span style={{ width: 28, height: 2, background: `linear-gradient(90deg, ${colors.gold}, transparent)` }} />
          )}
          {eyebrow}
        </div>
      )}
      <h1
        style={{
          margin: 0,
          opacity: t,
          transform: `translateY(${interpolate(t, [0, 1], [22, 0])}px)`,
          fontFamily: fonts.display,
          fontWeight: 600,
          fontSize: titleSize,
          lineHeight: 1.05,
          letterSpacing: -0.5,
          color: colors.ink,
        }}
      >
        {title}
      </h1>
      {sub && (
        <p
          style={{
            margin: "18px 0 0",
            opacity: s,
            transform: `translateY(${interpolate(s, [0, 1], [16, 0])}px)`,
            fontFamily: fonts.sans,
            fontWeight: 300,
            fontSize: 23,
            lineHeight: 1.5,
            color: colors.muted,
            maxWidth: 720,
          }}
        >
          {sub}
        </p>
      )}
    </div>
  );
};
