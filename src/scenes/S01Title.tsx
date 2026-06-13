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
import { Diamond } from "../components/Diamond";

export const S01Title: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const assemble = interpolate(frame, [10, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleS = spring({ frame: frame - 38, fps, config: { damping: 200 } });
  const subS = spring({ frame: frame - 58, fps, config: { damping: 200 } });
  const footS = spring({ frame: frame - 74, fps, config: { damping: 200 } });
  const diamondLift = interpolate(frame, [10, 70], [40, 0], {
    extrapolateRight: "clamp",
  });
  const outro = interpolate(
    frame,
    [durationInFrames - 16, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" },
  );

  return (
    <AbsoluteFill style={{ opacity: outro }}>
      <Backdrop seed="title" />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div style={{ transform: `translateY(${diamondLift - 18}px)`, marginBottom: 26 }}>
          <Diamond size={300} progress={assemble} spin={interpolate(frame, [0, 90], [-12, 0])} />
        </div>

        <div
          style={{
            opacity: titleS,
            transform: `translateY(${interpolate(titleS, [0, 1], [24, 0])}px)`,
            fontFamily: fonts.sans,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: 12,
            color: colors.gold,
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          June 2026 · A Briefing for Heads of State
        </div>

        <h1
          style={{
            margin: 0,
            opacity: titleS,
            transform: `translateY(${interpolate(titleS, [0, 1], [30, 0])}px)`,
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: 138,
            lineHeight: 1,
            letterSpacing: -1,
            color: colors.ink,
            textAlign: "center",
          }}
        >
          The Kerala Cut
        </h1>

        <div
          style={{
            opacity: subS,
            transform: `translateY(${interpolate(subS, [0, 1], [22, 0])}px)`,
            fontFamily: fonts.display,
            fontStyle: "italic",
            fontSize: 38,
            color: colors.iceSoft,
            marginTop: 18,
            textAlign: "center",
          }}
        >
          From rough stone to crown jewel
        </div>

        <div
          style={{
            opacity: footS,
            marginTop: 40,
            fontFamily: fonts.sans,
            fontWeight: 300,
            fontSize: 24,
            color: colors.muted,
            textAlign: "center",
            letterSpacing: 1,
          }}
        >
          A Mittelstand for electronics in Kerala
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
