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

export const S11Close: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const line1 = spring({ frame: frame - 16, fps, config: { damping: 200 } });
  const line2 = spring({ frame: frame - 40, fps, config: { damping: 200 } });
  const tag = spring({ frame: frame - 70, fps, config: { damping: 200 } });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 22, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" },
  );

  return (
    <AbsoluteFill style={{ opacity: fadeOut }}>
      <Backdrop seed="close" />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <div style={{ marginBottom: 40, opacity: 0.95 }}>
          <Diamond
            size={220}
            progress={interpolate(frame, [0, 40], [0.2, 1], { extrapolateRight: "clamp" })}
            spin={interpolate(frame, [0, 120], [0, 18])}
          />
        </div>

        <h1
          style={{
            margin: 0,
            opacity: line1,
            transform: `translateY(${interpolate(line1, [0, 1], [26, 0])}px)`,
            fontFamily: fonts.display,
            fontWeight: 600,
            fontSize: 72,
            color: colors.ink,
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          Kerala does not need a bigger mine.
        </h1>
        <h1
          style={{
            margin: "10px 0 0",
            opacity: line2,
            transform: `translateY(${interpolate(line2, [0, 1], [26, 0])}px)`,
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: 76,
            textAlign: "center",
            lineHeight: 1.1,
            background: `linear-gradient(100deg, ${colors.goldSoft}, ${colors.gold})`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            fontStyle: "italic",
          }}
        >
          It needs a finer cut.
        </h1>

        <div
          style={{
            opacity: tag,
            transform: `translateY(${interpolate(tag, [0, 1], [18, 0])}px)`,
            marginTop: 46,
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <span style={{ width: 40, height: 1, background: colors.line }} />
          <span
            style={{
              fontFamily: fonts.sans,
              fontWeight: 400,
              fontSize: 23,
              letterSpacing: 3,
              color: colors.muted,
              textTransform: "uppercase",
            }}
          >
            The Kerala Electronics Consortium · Many small masters, one crown jewel
          </span>
          <span style={{ width: 40, height: 1, background: colors.line }} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
