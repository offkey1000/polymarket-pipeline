import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme";
import { SceneFrame } from "../components/SceneFrame";
import { Diamond } from "../components/Diamond";
import { Kicker, Heading } from "../components/ui";

const FACETS = [
  { t: "Space & defence", d: "Avionics & RF for the private space age — beside ISRO's labs" },
  { t: "Marine & underwater", d: "Drones, sonar, port tech — an almost uncontested niche" },
  { t: "Medical electronics", d: "Devices designed beside Sree Chitra, proven in Kerala's hospitals" },
  { t: "Power & energy", d: "Inverters, EV chargers, smart meters — V-Guard's home ground" },
  { t: "Test & automation", d: "The Penang playbook: machines that test everyone else's" },
];

export const S06Facets: React.FC<{ index: number; total: number }> = ({ index, total }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <SceneFrame seed="facets" index={index} total={total} label="The Five Facets">
      <Kicker>Where Kerala cuts deepest</Kicker>
      <div style={{ height: 20 }} />
      <Heading size={64} style={{ maxWidth: 1120 }}>
        A brilliant diamond has 57 facets. Kerala polishes <span style={{ color: colors.iceSoft, fontStyle: "italic" }}>five.</span>
      </Heading>

      <div style={{ display: "flex", flex: 1, alignItems: "center", marginTop: 6 }}>
        {/* diamond */}
        <div
          style={{
            width: 520,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Diamond
            size={400}
            progress={interpolate(frame, [4, 46], [0, 1], { extrapolateRight: "clamp" })}
            spin={interpolate(frame, [0, 200], [0, 14])}
          />
        </div>

        {/* facet list */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
          {FACETS.map((f, i) => {
            const sp = spring({ frame: frame - (34 + i * 11), fps, config: { damping: 200 } });
            return (
              <div
                key={i}
                style={{
                  opacity: sp,
                  transform: `translateX(${interpolate(sp, [0, 1], [40, 0])}px)`,
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  padding: "14px 22px",
                  borderRadius: 14,
                  background: "linear-gradient(100deg, rgba(143,216,236,0.08), transparent)",
                  borderLeft: `2px solid ${colors.ice}`,
                }}
              >
                <div
                  style={{
                    fontFamily: fonts.display,
                    fontWeight: 700,
                    fontSize: 30,
                    color: colors.gold,
                    minWidth: 44,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <div style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 32, color: colors.ink }}>
                    {f.t}
                  </div>
                  <div style={{ fontFamily: fonts.sans, fontWeight: 300, fontSize: 20, color: colors.muted, marginTop: 2 }}>
                    {f.d}
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
