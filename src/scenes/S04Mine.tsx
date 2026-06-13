import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme";
import { SceneFrame } from "../components/SceneFrame";
import { Kicker, Heading } from "../components/ui";

const DEPOSITS = [
  { t: "Human capital", d: "Near-universal literacy; a dense engineering & polytechnic network" },
  { t: "The ISRO lode", d: "50 years of space-grade electronics at VSSC, Thiruvananthapuram" },
  { t: "Maker Village", d: "India's largest electronics hardware incubator, in Kochi" },
  { t: "Vizhinjam port", d: "A new deep-water port on the world's main east–west sea lane" },
  { t: "Diaspora capital", d: "Gulf & global remittances — patient money seeking purpose" },
  { t: "Design services", d: "Embedded & chip-design talent in Technopark, Trivandrum" },
];

export const S04Mine: React.FC<{ index: number; total: number }> = ({ index, total }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <SceneFrame seed="mine" index={index} total={total} label="The Mine">
      <Kicker>Kerala's deposits are already proven</Kicker>
      <div style={{ height: 22 }} />
      <Heading size={66} style={{ maxWidth: 1240 }}>
        A diamond mine looks like ordinary ground — until you map the deposits.
      </Heading>

      <div style={{ flex: 1 }} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 26,
        }}
      >
        {DEPOSITS.map((c, i) => {
          const d = 26 + i * 9;
          const sp = spring({ frame: frame - d, fps, config: { damping: 200 } });
          return (
            <div
              key={i}
              style={{
                opacity: sp,
                transform: `translateY(${interpolate(sp, [0, 1], [26, 0])}px)`,
                padding: "28px 30px",
                borderRadius: 16,
                background: "linear-gradient(160deg, rgba(255,255,255,0.045), rgba(255,255,255,0.012))",
                border: `1px solid ${colors.line}`,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span
                  style={{
                    width: 11,
                    height: 11,
                    transform: "rotate(45deg)",
                    background: colors.gold,
                    boxShadow: `0 0 12px rgba(230,192,104,${0.6 * sp})`,
                  }}
                />
                <span
                  style={{
                    fontFamily: fonts.display,
                    fontWeight: 600,
                    fontSize: 30,
                    color: colors.ink,
                  }}
                >
                  {c.t}
                </span>
              </div>
              <div
                style={{
                  fontFamily: fonts.sans,
                  fontWeight: 300,
                  fontSize: 20,
                  lineHeight: 1.45,
                  color: colors.muted,
                }}
              >
                {c.d}
              </div>
            </div>
          );
        })}
      </div>
    </SceneFrame>
  );
};
