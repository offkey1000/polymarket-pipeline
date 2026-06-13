import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme";
import { SceneFrame } from "../components/SceneFrame";
import { Kicker, Heading } from "../components/ui";

const COLUMNS = [
  {
    tag: "The volume game",
    who: "Tamil Nadu · UP · Andhra",
    body: "Phone assembly and EMS megafactories — won with thousands of acres and decade-long subsidies.",
    verdict: "Kerala cannot win this.",
    highlight: false,
  },
  {
    tag: "The design game",
    who: "Karnataka / Bengaluru",
    body: "Chip design and global capability centres — won with the deepest talent pool in Asia.",
    verdict: "Kerala participates, but cannot lead.",
    highlight: false,
  },
  {
    tag: "The niche game",
    who: "KERALA",
    body: "Five facets where value per worker beats value per acre: space, marine, medical, power, test.",
    verdict: "Won the Mittelstand way.",
    highlight: true,
  },
];

export const S07Game: React.FC<{ index: number; total: number }> = ({ index, total }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lineSp = spring({ frame: frame - 78, fps, config: { damping: 200 } });

  return (
    <SceneFrame seed="game" index={index} total={total} label="A Different Game">
      <Kicker>India's electronics map</Kicker>
      <div style={{ height: 20 }} />
      <Heading size={64} style={{ maxWidth: 1200 }}>
        We win a different game.
      </Heading>

      <div style={{ flex: 1 }} />

      <div style={{ display: "flex", gap: 28 }}>
        {COLUMNS.map((c, i) => {
          const sp = spring({ frame: frame - (28 + i * 14), fps, config: { damping: 200 } });
          return (
            <div
              key={i}
              style={{
                flex: 1,
                opacity: sp,
                transform: `translateY(${interpolate(sp, [0, 1], [34, 0])}px) scale(${interpolate(sp, [0, 1], [0.96, 1])})`,
                padding: "30px 32px",
                borderRadius: 18,
                background: c.highlight
                  ? "linear-gradient(165deg, rgba(230,192,104,0.16), rgba(230,192,104,0.03))"
                  : "linear-gradient(165deg, rgba(255,255,255,0.035), rgba(255,255,255,0.01))",
                border: `1px solid ${c.highlight ? "rgba(230,192,104,0.5)" : colors.line}`,
                boxShadow: c.highlight ? "0 0 50px rgba(230,192,104,0.18)" : "none",
                display: "flex",
                flexDirection: "column",
                minHeight: 280,
              }}
            >
              <div
                style={{
                  fontFamily: fonts.sans,
                  fontWeight: 600,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  fontSize: 16,
                  color: c.highlight ? colors.gold : colors.faint,
                }}
              >
                {c.tag}
              </div>
              <div
                style={{
                  fontFamily: fonts.display,
                  fontWeight: 700,
                  fontSize: c.highlight ? 46 : 34,
                  color: c.highlight ? colors.goldSoft : colors.ink,
                  marginTop: 10,
                }}
              >
                {c.who}
              </div>
              <div
                style={{
                  fontFamily: fonts.sans,
                  fontWeight: 300,
                  fontSize: 20,
                  lineHeight: 1.5,
                  color: colors.muted,
                  marginTop: 16,
                  flex: 1,
                }}
              >
                {c.body}
              </div>
              <div
                style={{
                  marginTop: 18,
                  paddingTop: 16,
                  borderTop: `1px solid ${colors.line}`,
                  fontFamily: fonts.display,
                  fontStyle: "italic",
                  fontSize: 23,
                  color: c.highlight ? colors.iceSoft : colors.muted,
                }}
              >
                {c.verdict}
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 30,
          opacity: lineSp,
          transform: `translateY(${interpolate(lineSp, [0, 1], [16, 0])}px)`,
          textAlign: "center",
          fontFamily: fonts.display,
          fontSize: 34,
          color: colors.ink,
        }}
      >
        Let Tamil Nadu cut glass by the tonne.{" "}
        <span style={{ color: colors.gold, fontStyle: "italic" }}>
          Kerala cuts diamonds by the carat.
        </span>
      </div>
    </SceneFrame>
  );
};
