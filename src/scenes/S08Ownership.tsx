import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme";
import { SceneFrame } from "../components/SceneFrame";
import { Kicker, Heading, Lead, AnimatedNumber } from "../components/ui";

const STATS = [
  { v: 19000, prefix: "≈", suffix: "", label: "shareholders from ~30 countries — CIAL's living investor base" },
  { v: 20, prefix: "", suffix: "+ yrs", label: "of dividends paid year after year — patient capital, repaid in pride" },
  { v: 1, prefix: "No. ", suffix: "", label: "world's first fully solar airport · UN Champions of the Earth", literal: "No. 1" },
];

export const S08Ownership: React.FC<{ index: number; total: number }> = ({ index, total }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const callout = spring({ frame: frame - 70, fps, config: { damping: 200 } });

  return (
    <SceneFrame seed="own" index={index} total={total} label="Who Owns It">
      <Kicker>The CIAL way</Kicker>
      <div style={{ height: 20 }} />
      <Heading size={66} style={{ maxWidth: 1200 }}>
        Who owns it? <span style={{ color: colors.iceSoft, fontStyle: "italic" }}>Everyone.</span>
      </Heading>
      <div style={{ height: 22 }} />
      <Lead style={{ maxWidth: 1180 }}>
        In 1994, Kerala asked its own people — not a conglomerate — to build an airport.
        Nearly 10,000 NRIs from 32 countries answered. We raise capital the same way.
      </Lead>

      <div style={{ flex: 1 }} />

      <div style={{ display: "flex", gap: 34, marginBottom: 28 }}>
        {STATS.map((s, i) => {
          const d = 28 + i * 15;
          const sp = spring({ frame: frame - d, fps, config: { damping: 200 } });
          return (
            <div
              key={i}
              style={{
                flex: 1,
                opacity: sp,
                transform: `translateY(${interpolate(sp, [0, 1], [28, 0])}px)`,
              }}
            >
              <div
                style={{
                  fontFamily: fonts.display,
                  fontWeight: 700,
                  fontSize: 84,
                  lineHeight: 1,
                  background: `linear-gradient(120deg, ${colors.iceSoft}, ${colors.iceDeep})`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {s.literal ? (
                  s.literal
                ) : (
                  <AnimatedNumber to={s.v} delay={d + 4} duration={44} prefix={s.prefix} suffix={s.suffix} />
                )}
              </div>
              <div style={{ height: 1, background: colors.line, margin: "16px 0" }} />
              <div style={{ fontFamily: fonts.sans, fontWeight: 300, fontSize: 21, lineHeight: 1.4, color: colors.muted }}>
                {s.label}
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          opacity: callout,
          transform: `translateY(${interpolate(callout, [0, 1], [16, 0])}px)`,
          padding: "20px 30px",
          borderRadius: 14,
          background: "linear-gradient(100deg, rgba(230,192,104,0.14), transparent)",
          border: `1px solid rgba(230,192,104,0.4)`,
          display: "flex",
          alignItems: "center",
          gap: 18,
        }}
      >
        <span style={{ width: 12, height: 12, transform: "rotate(45deg)", background: colors.gold }} />
        <span style={{ fontFamily: fonts.sans, fontWeight: 600, fontSize: 22, color: colors.goldSoft, letterSpacing: 1 }}>
          KERALA CROWN SHARES
        </span>
        <span style={{ fontFamily: fonts.sans, fontWeight: 300, fontSize: 22, color: colors.muted }}>
          From remittance to ownership — the diaspora starts owning what home builds.
        </span>
      </div>
    </SceneFrame>
  );
};
