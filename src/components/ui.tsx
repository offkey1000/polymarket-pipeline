import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, fonts } from "../theme";

// Spring-driven rise + fade, the workhorse entrance for text and cards.
export const Rise: React.FC<{
  delay?: number;
  y?: number;
  children: React.ReactNode;
  damping?: number;
  style?: React.CSSProperties;
}> = ({ delay = 0, y = 28, children, damping = 200, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping } });
  return (
    <div
      style={{
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [y, 0])}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// Small uppercase eyebrow with a gold tick.
export const Kicker: React.FC<{ children: React.ReactNode; delay?: number }> = ({
  children,
  delay = 0,
}) => (
  <Rise delay={delay} y={16}>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        fontFamily: fonts.sans,
        fontSize: 21,
        fontWeight: 600,
        letterSpacing: 6,
        textTransform: "uppercase",
        color: colors.gold,
      }}
    >
      <span
        style={{
          width: 34,
          height: 2,
          background: `linear-gradient(90deg, ${colors.gold}, transparent)`,
        }}
      />
      {children}
    </div>
  </Rise>
);

export const Heading: React.FC<{
  children: React.ReactNode;
  delay?: number;
  size?: number;
  style?: React.CSSProperties;
}> = ({ children, delay = 4, size = 78, style }) => (
  <Rise delay={delay} y={32}>
    <h1
      style={{
        margin: 0,
        fontFamily: fonts.display,
        fontWeight: 600,
        fontSize: size,
        lineHeight: 1.04,
        color: colors.ink,
        letterSpacing: -0.5,
        ...style,
      }}
    >
      {children}
    </h1>
  </Rise>
);

export const Lead: React.FC<{
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}> = ({ children, delay = 10, style }) => (
  <Rise delay={delay} y={22}>
    <p
      style={{
        margin: 0,
        fontFamily: fonts.sans,
        fontWeight: 300,
        fontSize: 27,
        lineHeight: 1.5,
        color: colors.muted,
        maxWidth: 1040,
        ...style,
      }}
    >
      {children}
    </p>
  </Rise>
);

// Gold gradient text accent.
export const Gold: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span
    style={{
      background: `linear-gradient(95deg, ${colors.goldSoft}, ${colors.gold})`,
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent",
      fontStyle: "italic",
    }}
  >
    {children}
  </span>
);

// A counting number that eases to its target value.
export const AnimatedNumber: React.FC<{
  to: number;
  delay?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  style?: React.CSSProperties;
}> = ({ to, delay = 0, duration = 40, decimals = 0, prefix = "", suffix = "", style }) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame - delay, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const eased = 1 - Math.pow(1 - t, 3);
  const value = (eased * to).toFixed(decimals);
  return (
    <span style={style}>
      {prefix}
      {Number(value).toLocaleString("en-IN", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
};

// Thin hairline divider.
export const Hairline: React.FC<{ width?: number | string; delay?: number }> = ({
  width = "100%",
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const w = interpolate(frame - delay, [0, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        width,
        height: 1,
        transform: `scaleX(${w})`,
        transformOrigin: "left",
        background: colors.line,
      }}
    />
  );
};
