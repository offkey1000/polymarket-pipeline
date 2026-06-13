import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme";
import { SceneFrame } from "../components/SceneFrame";
import { Diamond } from "../components/Diamond";
import { Kicker, Heading, Lead, Gold } from "../components/ui";

const STAGES = [
  { k: "The Mine", v: "Raw talent & institutions" },
  { k: "The Sort", v: "Find the gem-grade stones" },
  { k: "The Cut", v: "Precision shaping, shared wheels" },
  { k: "The Polish", v: "Mastery of one facet" },
  { k: "The Setting", v: "Placed in the crown" },
];

export const S02Thesis: React.FC<{ index: number; total: number }> = ({ index, total }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <SceneFrame seed="thesis" index={index} total={total} label="The Thesis">
      <Kicker>Why a diamond?</Kicker>
      <div style={{ height: 22 }} />
      <Heading size={72} style={{ maxWidth: 1180 }}>
        Value doesn't come from the stone.
        <br />
        It comes from the <Gold>cut.</Gold>
      </Heading>
      <div style={{ height: 24 }} />
      <Lead style={{ maxWidth: 1160 }}>
        Nine of every ten diamonds on Earth are polished in Surat, India — not by one giant
        company, but by thousands of small family workshops, each a master of one step.
      </Lead>

      <div style={{ flex: 1 }} />

      {/* journey row */}
      <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 18 }}>
        {STAGES.map((s, i) => {
          const d = 30 + i * 12;
          const sp = spring({ frame: frame - d, fps, config: { damping: 200 } });
          return (
            <React.Fragment key={s.k}>
              <div
                style={{
                  flex: 1,
                  opacity: sp,
                  transform: `translateY(${interpolate(sp, [0, 1], [20, 0])}px)`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                  <div
                    style={{
                      width: 14,
                      height: 14,
                      transform: "rotate(45deg)",
                      background: `linear-gradient(135deg, ${colors.goldSoft}, ${colors.iceDeep})`,
                      boxShadow: `0 0 14px rgba(230,192,104,${0.5 * sp})`,
                    }}
                  />
                  <div
                    style={{
                      fontFamily: fonts.display,
                      fontSize: 30,
                      fontWeight: 600,
                      color: colors.ink,
                    }}
                  >
                    {s.k}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: fonts.sans,
                    fontWeight: 300,
                    fontSize: 19,
                    color: colors.muted,
                    paddingRight: 24,
                    lineHeight: 1.35,
                  }}
                >
                  {s.v}
                </div>
              </div>
              {i < STAGES.length - 1 && (
                <div
                  style={{
                    width: 36,
                    height: 1,
                    background: colors.line,
                    opacity: sp,
                    marginBottom: 24,
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* floating diamond top-right */}
      <div style={{ position: "absolute", right: 130, top: 120, opacity: 0.9 }}>
        <Diamond size={180} progress={interpolate(frame, [6, 50], [0, 1], { extrapolateRight: "clamp" })} />
      </div>
    </SceneFrame>
  );
};
