import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme";
import { SceneFrame } from "../components/SceneFrame";
import { Kicker, Heading, AnimatedNumber } from "../components/ui";

const ITEMS = [
  { t: "Shared SMT, test & certification centres", note: "two cities", cr: 240 },
  { t: "Pooled component purchasing fund", note: "", cr: 90 },
  { t: "Master Cutter returnee-founder fund", note: "", cr: 70 },
  { t: "Apprenticeship programme", note: "5 years", cr: 60 },
  { t: "R&D bridge + export & bids desk", note: "", cr: 40 },
];
const MAX = 240;
const TOTAL = ITEMS.reduce((a, b) => a + b.cr, 0);

export const S10Ask: React.FC<{ index: number; total: number }> = ({ index, total }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <SceneFrame seed="ask" index={index} total={total} label="The Ask">
      <Kicker>A modest stake in a generational stone</Kicker>
      <div style={{ height: 20 }} />
      <Heading size={62} style={{ maxWidth: 1100 }}>
        The ask: <span style={{ color: colors.gold }}>₹500 crore.</span>
      </Heading>

      <div style={{ display: "flex", gap: 70, flex: 1, marginTop: 20, alignItems: "center" }}>
        {/* bars */}
        <div style={{ flex: 1.5, display: "flex", flexDirection: "column", gap: 18 }}>
          {ITEMS.map((it, i) => {
            const d = 28 + i * 12;
            const sp = spring({ frame: frame - d, fps, config: { damping: 200 } });
            const w = interpolate(frame - (d + 6), [0, 36], [0, it.cr / MAX], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <div key={i} style={{ opacity: sp }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                  <span style={{ fontFamily: fonts.sans, fontWeight: 400, fontSize: 21, color: colors.ink }}>
                    {it.t}
                    {it.note && <span style={{ color: colors.faint, fontSize: 17 }}> · {it.note}</span>}
                  </span>
                  <span style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 26, color: colors.goldSoft }}>
                    ₹{it.cr} cr
                  </span>
                </div>
                <div style={{ height: 12, borderRadius: 6, background: "rgba(255,255,255,0.05)", overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${w * 100}%`,
                      borderRadius: 6,
                      background: `linear-gradient(90deg, ${colors.iceDeep}, ${colors.gold})`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* total dial */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div
            style={{
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: 150,
              lineHeight: 1,
              background: `linear-gradient(120deg, ${colors.goldSoft}, ${colors.gold})`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            ₹<AnimatedNumber to={TOTAL} delay={40} duration={50} />
          </div>
          <div style={{ fontFamily: fonts.sans, fontWeight: 600, fontSize: 24, letterSpacing: 6, textTransform: "uppercase", color: colors.muted, marginTop: 4 }}>
            crore · total
          </div>
          <div style={{ width: 60, height: 1, background: colors.line, margin: "26px 0" }} />
          <div style={{ fontFamily: fonts.display, fontStyle: "italic", fontSize: 26, color: colors.iceSoft, textAlign: "center", maxWidth: 380, lineHeight: 1.4 }}>
            The price of a few kilometres of elevated highway — and more jobs per rupee than any fab.
          </div>
        </div>
      </div>
    </SceneFrame>
  );
};
