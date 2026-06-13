import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { colors, fonts } from "../theme";
import { Backdrop } from "./Backdrop";

// Wraps every content scene: animated backdrop, consistent margins, and a
// persistent footer (brand mark + scene index + progress hairline).
export const SceneFrame: React.FC<{
  seed?: string;
  index: number;
  total: number;
  label: string;
  children: React.ReactNode;
}> = ({ seed, index, total, label, children }) => {
  const frame = useCurrentFrame();
  const intro = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <Backdrop seed={seed} />
      <AbsoluteFill
        style={{
          padding: "96px 120px 90px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ flex: 1, display: "flex", flexDirection: "column", opacity: intro }}>
          {children}
        </div>

        {/* footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: fonts.sans,
            color: colors.faint,
            fontSize: 17,
            letterSpacing: 2,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                width: 9,
                height: 9,
                transform: "rotate(45deg)",
                background: colors.gold,
                display: "inline-block",
              }}
            />
            <span style={{ color: colors.muted, textTransform: "uppercase" }}>
              Kerala Electronics Consortium
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <span style={{ textTransform: "uppercase" }}>{label}</span>
            <span style={{ color: colors.gold }}>
              {String(index).padStart(2, "0")}
              <span style={{ color: colors.faint }}> / {String(total).padStart(2, "0")}</span>
            </span>
          </div>
        </div>
        {/* progress hairline */}
        <div style={{ marginTop: 14, height: 2, background: colors.line, borderRadius: 2 }}>
          <div
            style={{
              height: "100%",
              width: `${(index / total) * 100}%`,
              background: `linear-gradient(90deg, ${colors.iceDeep}, ${colors.gold})`,
              borderRadius: 2,
            }}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
