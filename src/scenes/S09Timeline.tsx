import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme";
import { SceneFrame } from "../components/SceneFrame";
import { Kicker, Heading } from "../components/ui";

const PHASES = [
  { t: "Prospect", when: "Months 0–9", d: "Recruit 25–40 founding firms; anchor pact with Keltron, V-Guard & Kaynes; cabinet endorsement." },
  { t: "Extract", when: "Years 1–2", d: "Shared factory & test centre live; pooled buying; first 500 apprentices; first national-scheme win." },
  { t: "Cut & Polish", when: "Years 3–5", d: "8–15 firms deep in each facet; first exports through Vizhinjam; ₹1,500–2,500 cr member revenue." },
  { t: "Crown", when: "Years 5–10", d: "5–10 hidden champions lead their global niche; consortium self-funding; the spin-out flywheel turns." },
];

export const S09Timeline: React.FC<{ index: number; total: number }> = ({ index, total }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lineSp = interpolate(frame, [24, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <SceneFrame seed="time" index={index} total={total} label="The Ten-Year Cut">
      <Kicker>From prospecting to the crown</Kicker>
      <div style={{ height: 20 }} />
      <Heading size={64} style={{ maxWidth: 1180 }}>
        A ten-year cut.
      </Heading>

      <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
        <div style={{ position: "relative", width: "100%" }}>
          {/* baseline */}
          <div
            style={{
              position: "absolute",
              top: 18,
              left: "6%",
              width: "88%",
              height: 2,
              background: colors.line,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 18,
              left: "6%",
              width: `${88 * lineSp}%`,
              height: 2,
              background: `linear-gradient(90deg, ${colors.iceDeep}, ${colors.gold})`,
              boxShadow: `0 0 12px rgba(230,192,104,0.5)`,
            }}
          />

          <div style={{ display: "flex", justifyContent: "space-between", padding: "0 2%" }}>
            {PHASES.map((p, i) => {
              const d = 32 + i * 14;
              const sp = spring({ frame: frame - d, fps, config: { damping: 200 } });
              return (
                <div
                  key={i}
                  style={{
                    width: "22%",
                    opacity: sp,
                    transform: `translateY(${interpolate(sp, [0, 1], [26, 0])}px)`,
                  }}
                >
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      transform: "translateY(8px) rotate(45deg)",
                      background: `linear-gradient(135deg, ${colors.goldSoft}, ${colors.iceDeep})`,
                      boxShadow: `0 0 18px rgba(230,192,104,${0.6 * sp})`,
                      margin: "0 0 40px",
                    }}
                  />
                  <div style={{ fontFamily: fonts.sans, fontWeight: 600, fontSize: 16, letterSpacing: 2, textTransform: "uppercase", color: colors.gold }}>
                    {p.when}
                  </div>
                  <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 40, color: colors.ink, marginTop: 6 }}>
                    {p.t}
                  </div>
                  <div style={{ fontFamily: fonts.sans, fontWeight: 300, fontSize: 19, lineHeight: 1.45, color: colors.muted, marginTop: 12, paddingRight: 18 }}>
                    {p.d}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SceneFrame>
  );
};
