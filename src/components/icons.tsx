import React from "react";

// Minimal line-icon set drawn on a 24×24 grid. Each accepts a color and
// stroke width so it can sit inside the diamond facets and captions.
type IconProps = { size?: number; color?: string; sw?: number };

const S: React.FC<IconProps & { children: React.ReactNode; vb?: string }> = ({
  size = 40,
  children,
  vb = "0 0 24 24",
}) => (
  <svg width={size} height={size} viewBox={vb} fill="none" style={{ overflow: "visible" }}>
    {children}
  </svg>
);

export const RocketIcon: React.FC<IconProps> = ({ color = "#fff", sw = 1.6, ...p }) => (
  <S {...p}>
    <path d="M12 2c3 1.5 5 5 5 9l-2.2 3.5h-5.6L7 11c0-4 2-7.5 5-9Z" stroke={color} strokeWidth={sw} strokeLinejoin="round" />
    <circle cx="12" cy="9" r="1.8" stroke={color} strokeWidth={sw} />
    <path d="M9.2 15 7 18m8-3 2 3M12 15v4" stroke={color} strokeWidth={sw} strokeLinecap="round" />
  </S>
);

export const SonarIcon: React.FC<IconProps> = ({ color = "#fff", sw = 1.6, ...p }) => (
  <S {...p}>
    <path d="M3 7c2.5 2 6.5 2 9 0s6.5-2 9 0" stroke={color} strokeWidth={sw} strokeLinecap="round" />
    <path d="M3 12c2.5 2 6.5 2 9 0s6.5-2 9 0" stroke={color} strokeWidth={sw} strokeLinecap="round" opacity={0.7} />
    <circle cx="12" cy="18" r="2.4" stroke={color} strokeWidth={sw} />
    <path d="M12 18v.01" stroke={color} strokeWidth={sw} strokeLinecap="round" />
  </S>
);

export const MedicalIcon: React.FC<IconProps> = ({ color = "#fff", sw = 1.6, ...p }) => (
  <S {...p}>
    <path d="M3 12h4l2-5 3 10 2.4-7 1.6 2H21" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
  </S>
);

export const PowerIcon: React.FC<IconProps> = ({ color = "#fff", sw = 1.6, ...p }) => (
  <S {...p}>
    <path d="M13 2 5 13h6l-1 9 8-12h-6l1-8Z" stroke={color} strokeWidth={sw} strokeLinejoin="round" />
  </S>
);

export const RobotIcon: React.FC<IconProps> = ({ color = "#fff", sw = 1.6, ...p }) => (
  <S {...p}>
    <rect x="5" y="8" width="14" height="10" rx="2.5" stroke={color} strokeWidth={sw} />
    <path d="M12 8V4m0 0a1.4 1.4 0 1 0 0-.01" stroke={color} strokeWidth={sw} strokeLinecap="round" />
    <circle cx="9.3" cy="13" r="1.2" fill={color} />
    <circle cx="14.7" cy="13" r="1.2" fill={color} />
    <path d="M5 12H3m18 0h-2" stroke={color} strokeWidth={sw} strokeLinecap="round" />
  </S>
);

export const ChipIcon: React.FC<IconProps> = ({ color = "#fff", sw = 1.6, ...p }) => (
  <S {...p}>
    <rect x="7" y="7" width="10" height="10" rx="1.5" stroke={color} strokeWidth={sw} />
    <rect x="10" y="10" width="4" height="4" rx="0.6" stroke={color} strokeWidth={sw} />
    {[0, 1, 2].map((i) => (
      <React.Fragment key={i}>
        <path d={`M${9 + i * 3} 7V4M${9 + i * 3} 20v-3M7 ${9 + i * 3}H4M20 ${9 + i * 3}h-3`} stroke={color} strokeWidth={sw} strokeLinecap="round" />
      </React.Fragment>
    ))}
  </S>
);

export const GearIcon: React.FC<IconProps> = ({ color = "#fff", sw = 1.6, ...p }) => (
  <S {...p}>
    <circle cx="12" cy="12" r="3.4" stroke={color} strokeWidth={sw} />
    {new Array(8).fill(0).map((_, i) => {
      const a = (i / 8) * Math.PI * 2;
      const x1 = 12 + Math.cos(a) * 6, y1 = 12 + Math.sin(a) * 6;
      const x2 = 12 + Math.cos(a) * 8.6, y2 = 12 + Math.sin(a) * 8.6;
      return <path key={i} d={`M${x1} ${y1}L${x2} ${y2}`} stroke={color} strokeWidth={sw} strokeLinecap="round" />;
    })}
  </S>
);

export const ShipIcon: React.FC<IconProps> = ({ color = "#fff", sw = 1.6, ...p }) => (
  <S {...p}>
    <path d="M4 14h16l-2 5H6l-2-5Z" stroke={color} strokeWidth={sw} strokeLinejoin="round" />
    <path d="M7 14V9h8l3 5M11 9V5h2v4" stroke={color} strokeWidth={sw} strokeLinejoin="round" />
    <path d="M3 21c1.5 0 1.5-1 3-1s1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1" stroke={color} strokeWidth={sw} strokeLinecap="round" opacity={0.7} />
  </S>
);

export const BuildingIcon: React.FC<IconProps> = ({ color = "#fff", sw = 1.6, ...p }) => (
  <S {...p}>
    <rect x="6" y="3" width="12" height="18" rx="1.2" stroke={color} strokeWidth={sw} />
    {[6, 10, 14].map((y) =>
      [9, 12, 15].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="0.9" fill={color} />),
    )}
  </S>
);

export const PersonIcon: React.FC<IconProps> = ({ color = "#fff", sw = 1.6, ...p }) => (
  <S {...p}>
    <circle cx="12" cy="8" r="3.2" stroke={color} strokeWidth={sw} />
    <path d="M5 20c0-3.9 3.1-6.5 7-6.5s7 2.6 7 6.5" stroke={color} strokeWidth={sw} strokeLinecap="round" />
  </S>
);

export const CapIcon: React.FC<IconProps> = ({ color = "#fff", sw = 1.6, ...p }) => (
  <S {...p}>
    <path d="M2 9l10-4 10 4-10 4L2 9Z" stroke={color} strokeWidth={sw} strokeLinejoin="round" />
    <path d="M6 11v4c0 1.5 2.7 3 6 3s6-1.5 6-3v-4M22 9v4" stroke={color} strokeWidth={sw} strokeLinecap="round" />
  </S>
);

export const BankIcon: React.FC<IconProps> = ({ color = "#fff", sw = 1.6, ...p }) => (
  <S {...p}>
    <path d="M3 9l9-5 9 5M5 9v9m4-9v9m6-9v9m4-9v9M3 21h18" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
  </S>
);

export const FlaskIcon: React.FC<IconProps> = ({ color = "#fff", sw = 1.6, ...p }) => (
  <S {...p}>
    <path d="M9 3h6M10 3v6l-5 9c-.6 1.2.2 2 1.5 2h11c1.3 0 2.1-.8 1.5-2l-5-9V3" stroke={color} strokeWidth={sw} strokeLinejoin="round" />
    <path d="M7.5 14h9" stroke={color} strokeWidth={sw} strokeLinecap="round" />
  </S>
);

export const GlobeIcon: React.FC<IconProps> = ({ color = "#fff", sw = 1.6, ...p }) => (
  <S {...p}>
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth={sw} />
    <path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" stroke={color} strokeWidth={sw} />
  </S>
);
