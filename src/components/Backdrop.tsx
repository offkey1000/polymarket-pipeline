import React, { useMemo } from "react";
import { AbsoluteFill, random, useCurrentFrame, interpolate } from "remotion";
import { colors } from "../theme";

// A slow, premium animated background: layered radial glows over deep navy,
// a faint rotating facet sheen, and a field of drifting sparkles.
export const Backdrop: React.FC<{ seed?: string; vignette?: boolean }> = ({
  seed = "kerala",
  vignette = true,
}) => {
  const frame = useCurrentFrame();

  const sparkles = useMemo(
    () =>
      new Array(46).fill(0).map((_, i) => ({
        x: random(`${seed}-x-${i}`) * 100,
        y: random(`${seed}-y-${i}`) * 100,
        size: 1 + random(`${seed}-s-${i}`) * 2.6,
        phase: random(`${seed}-p-${i}`) * Math.PI * 2,
        speed: 0.6 + random(`${seed}-v-${i}`) * 1.6,
      })),
    [seed],
  );

  const drift = Math.sin(frame / 90) * 4;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg0 }}>
      {/* base gradient */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(160deg, ${colors.bg2} 0%, ${colors.bg1} 45%, ${colors.bg0} 100%)`,
        }}
      />
      {/* warm gold glow, top-left */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(1100px 760px at ${18 + drift}% ${22 + drift * 0.6}%, rgba(230,192,104,0.16), transparent 62%)`,
        }}
      />
      {/* ice glow, bottom-right */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(1200px 820px at ${84 - drift}% ${82 - drift * 0.5}%, rgba(79,168,201,0.18), transparent 60%)`,
        }}
      />
      {/* faint rotating facet sheen */}
      <AbsoluteFill
        style={{
          opacity: 0.05,
          background: `conic-gradient(from ${frame * 0.4}deg at 50% 50%, transparent 0deg, rgba(255,255,255,0.9) 40deg, transparent 90deg, transparent 220deg, rgba(143,216,236,0.7) 260deg, transparent 320deg)`,
          mixBlendMode: "screen",
        }}
      />
      {/* sparkles */}
      <AbsoluteFill>
        {sparkles.map((s, i) => {
          const tw =
            0.25 + 0.75 * Math.abs(Math.sin(frame / (18 * s.speed) + s.phase));
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: s.size,
                height: s.size,
                borderRadius: "50%",
                background: i % 3 === 0 ? colors.goldSoft : colors.iceSoft,
                opacity: tw * 0.6,
                boxShadow: `0 0 ${6 * tw}px ${i % 3 === 0 ? "rgba(240,216,154,0.8)" : "rgba(188,235,246,0.8)"}`,
              }}
            />
          );
        })}
      </AbsoluteFill>
      {vignette && (
        <AbsoluteFill
          style={{
            background:
              "radial-gradient(120% 120% at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%)",
          }}
        />
      )}
      {/* subtle grain via opacity-modulated overlay */}
      <AbsoluteFill
        style={{
          opacity: interpolate(Math.sin(frame / 7), [-1, 1], [0.015, 0.04]),
          background:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.4) 0px, transparent 1px, transparent 2px)",
          mixBlendMode: "overlay",
        }}
      />
    </AbsoluteFill>
  );
};
