import React from "react";
import { interpolate, random, useCurrentFrame } from "remotion";
import { colors } from "../theme";

// A wall of small workshop windows lighting up — thousands of small masters,
// each polishing one facet. Used for the Surat / Mittelstand "many masters" beat.
export const Workshops: React.FC<{ cols?: number; rows?: number; width?: number }> = ({
  cols = 14,
  rows = 7,
  width = 1180,
}) => {
  const frame = useCurrentFrame();
  const cell = width / cols;
  const h = cell * rows;

  return (
    <svg width={width} height={h} viewBox={`0 0 ${width} ${h}`} style={{ overflow: "visible" }}>
      {new Array(rows).fill(0).map((_, r) =>
        new Array(cols).fill(0).map((_, c) => {
          const i = r * cols + c;
          const lightAt = 14 + random(`w${i}`) * 70;
          const on = interpolate(frame, [lightAt, lightAt + 16], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const tw = 0.6 + 0.4 * Math.sin(frame / 12 + i);
          const pad = cell * 0.16;
          const x = c * cell + pad;
          const y = r * cell + pad;
          const s = cell - pad * 2;
          const gold = random(`g${i}`) > 0.78;
          const col = gold ? colors.gold : colors.ice;
          return (
            <g key={i} opacity={0.18 + on * 0.82}>
              <rect x={x} y={y} width={s} height={s} rx={4} fill={`rgba(143,216,236,${0.04 + on * 0.1 * tw})`} stroke={on > 0.3 ? col : colors.line} strokeWidth={1} />
              {/* tiny gem inside */}
              <polygon
                points={`${x + s / 2},${y + s * 0.28} ${x + s * 0.72},${y + s * 0.5} ${x + s / 2},${y + s * 0.72} ${x + s * 0.28},${y + s * 0.5}`}
                fill={col}
                opacity={on * tw}
                style={{ filter: on > 0.5 ? `drop-shadow(0 0 4px ${col})` : "none" }}
              />
            </g>
          );
        }),
      )}
    </svg>
  );
};
