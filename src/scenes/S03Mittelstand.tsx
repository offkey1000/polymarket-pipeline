import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme";
import { SceneFrame } from "../components/SceneFrame";
import { Kicker, Heading, Lead, AnimatedNumber } from "../components/ui";

const STATS = [
  { value: 99, suffix: "%", label: "of German companies are Mittelstand firms", decimals: 0, prefix: "≈" },
  { value: 6, suffix: " in 10", label: "German jobs are in these small firms", decimals: 0, prefix: "≈" },
  { value: 1000, suffix: "+", label: "'hidden champions' — world leaders in a niche", decimals: 0, prefix: "" },
];

export const S03Mittelstand: React.FC<{ index: number; total: number }> = ({ index, total }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <SceneFrame seed="mittelstand" index={index} total={total} label="The Model">
      <Kicker>The Mittelstand idea</Kicker>
      <div style={{ height: 22 }} />
      <Heading size={70} style={{ maxWidth: 1240 }}>
        Many small masters, one rich nation.
      </Heading>
      <div style={{ height: 24 }} />
      <Lead style={{ maxWidth: 1180 }}>
        Germany's wealth rests on thousands of family firms in small towns, each the world's
        best at one narrow thing — a valve, a laser, a connector. Germans call them{" "}
        <span style={{ color: colors.iceSoft }}>hidden champions.</span>
      </Lead>

      <div style={{ flex: 1 }} />

      <div style={{ display: "flex", gap: 36 }}>
        {STATS.map((s, i) => {
          const d = 30 + i * 16;
          const sp = spring({ frame: frame - d, fps, config: { damping: 200 } });
          return (
            <div
              key={i}
              style={{
                flex: 1,
                opacity: sp,
                transform: `translateY(${interpolate(sp, [0, 1], [30, 0])}px)`,
                padding: "34px 36px",
                borderRadius: 18,
                background: "linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))",
                border: `1px solid ${colors.line}`,
                backdropFilter: "blur(4px)",
              }}
            >
              <div
                style={{
                  fontFamily: fonts.display,
                  fontWeight: 700,
                  fontSize: 92,
                  lineHeight: 1,
                  background: `linear-gradient(120deg, ${colors.goldSoft}, ${colors.gold})`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                <AnimatedNumber to={s.value} delay={d + 4} duration={42} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div
                style={{
                  marginTop: 16,
                  fontFamily: fonts.sans,
                  fontWeight: 300,
                  fontSize: 22,
                  lineHeight: 1.4,
                  color: colors.muted,
                }}
              >
                {s.label}
              </div>
            </div>
          );
        })}
      </div>
    </SceneFrame>
  );
};
