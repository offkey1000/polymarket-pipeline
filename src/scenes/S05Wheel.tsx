import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme";
import { SceneFrame } from "../components/SceneFrame";
import { Kicker, Heading } from "../components/ui";

const TOOLS = [
  { t: "Shared factories", d: "Common SMT lines, test & certification labs" },
  { t: "Pooled buying", d: "One purchasing arm — big-firm prices for all" },
  { t: "Apprenticeships", d: "German-style dual training with polytechnics & ITIs" },
  { t: "R&D bridge", d: "One door into ISRO, DRDO & medical research labs" },
  { t: "Finance & exports", d: "Patient diaspora capital + one professional desk" },
];

export const S05Wheel: React.FC<{ index: number; total: number }> = ({ index, total }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cx = 470;
  const cy = 250;
  const R = 200;

  return (
    <SceneFrame seed="wheel" index={index} total={total} label="The Cutting Wheel">
      <Kicker>Five shared tools</Kicker>
      <div style={{ height: 20 }} />
      <Heading size={62} style={{ maxWidth: 1180 }}>
        No cutter owns the whole workshop.
      </Heading>

      <div style={{ position: "relative", flex: 1, marginTop: 8 }}>
        {/* connecting lines + hub live in an absolute layer on the left */}
        <div style={{ position: "absolute", left: 0, top: 0, width: 940, height: 540 }}>
          <svg width="940" height="540" style={{ position: "absolute", inset: 0 }}>
            {TOOLS.map((_, i) => {
              const a = (i / TOOLS.length) * Math.PI * 2 - Math.PI / 2;
              const x = cx + Math.cos(a) * R;
              const y = cy + Math.sin(a) * R;
              const sp = spring({ frame: frame - (34 + i * 8), fps, config: { damping: 200 } });
              return (
                <line
                  key={i}
                  x1={cx}
                  y1={cy}
                  x2={interpolate(sp, [0, 1], [cx, x])}
                  y2={interpolate(sp, [0, 1], [cy, y])}
                  stroke={colors.line}
                  strokeWidth={1.5}
                  opacity={sp}
                />
              );
            })}
          </svg>

          {/* hub */}
          {(() => {
            const sp = spring({ frame: frame - 14, fps, config: { damping: 200 } });
            return (
              <div
                style={{
                  position: "absolute",
                  left: cx,
                  top: cy,
                  transform: `translate(-50%, -50%) scale(${sp})`,
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  background: `radial-gradient(circle at 40% 35%, rgba(230,192,104,0.35), rgba(11,16,32,0.9) 70%)`,
                  border: `1.5px solid ${colors.gold}`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  boxShadow: "0 0 60px rgba(230,192,104,0.25)",
                }}
              >
                <div
                  style={{
                    fontFamily: fonts.display,
                    fontWeight: 700,
                    fontSize: 27,
                    color: colors.goldSoft,
                    lineHeight: 1.1,
                    letterSpacing: 1,
                  }}
                >
                  KERALA
                  <br />
                  ELECTRONICS
                  <br />
                  CONSORTIUM
                </div>
              </div>
            );
          })()}

          {/* nodes */}
          {TOOLS.map((tool, i) => {
            const a = (i / TOOLS.length) * Math.PI * 2 - Math.PI / 2;
            const x = cx + Math.cos(a) * R;
            const y = cy + Math.sin(a) * R;
            const sp = spring({ frame: frame - (38 + i * 8), fps, config: { damping: 200 } });
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: x,
                  top: y,
                  transform: `translate(-50%, -50%) scale(${sp})`,
                  opacity: sp,
                }}
              >
                <div
                  style={{
                    width: 18,
                    height: 18,
                    transform: "rotate(45deg)",
                    background: colors.ice,
                    boxShadow: `0 0 16px ${colors.ice}`,
                    margin: "0 auto",
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* legend, right column */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 30,
            width: 540,
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          {TOOLS.map((tool, i) => {
            const sp = spring({ frame: frame - (44 + i * 8), fps, config: { damping: 200 } });
            return (
              <div
                key={i}
                style={{
                  opacity: sp,
                  transform: `translateX(${interpolate(sp, [0, 1], [30, 0])}px)`,
                  display: "flex",
                  gap: 16,
                  alignItems: "baseline",
                }}
              >
                <span
                  style={{
                    fontFamily: fonts.sans,
                    fontWeight: 600,
                    fontSize: 18,
                    color: colors.gold,
                    minWidth: 26,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <div style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 28, color: colors.ink }}>
                    {tool.t}
                  </div>
                  <div style={{ fontFamily: fonts.sans, fontWeight: 300, fontSize: 19, color: colors.muted, marginTop: 2 }}>
                    {tool.d}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SceneFrame>
  );
};
