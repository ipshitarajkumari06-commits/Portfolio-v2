import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terrain test",
  robots: { index: false, follow: false },
};

const CHALK = "#EDE6D6";
const GRAPHITE = "#1F1F1C";
const OCHRE = "#D9A441";
const VERMILION = "#D8442A";
const COBALT = "#2446B8";
const MUTED = "#B4B2A8";

function Figure({ x, base }: { x: number; base: number }) {
  return (
    <g transform={`translate(${x} ${base})`}>
      <circle cx="0" cy="-210" r="16" fill={GRAPHITE} />
      <path
        d="M -18 -186 Q 0 -200 18 -186 L 16 -60 L 10 0 L -10 0 L -16 -60 Z"
        fill={GRAPHITE}
      />
    </g>
  );
}

function Step() {
  return (
    <svg viewBox="0 0 800 500" className="block h-auto w-full" role="img" aria-hidden="true">
      <rect width="800" height="500" fill={CHALK} />
      <rect x="560" y="200" width="200" height="130" fill={MUTED} />
      <path d="M0 360 L330 360 L330 330 L800 330 L800 500 L0 500 Z" fill={MUTED} />
      <Figure x={380} base={330} />
    </svg>
  );
}

const STRATA = [
  { y: 300, h: 40, c: OCHRE },
  { y: 340, h: 30, c: MUTED },
  { y: 370, h: 40, c: VERMILION },
  { y: 410, h: 30, c: MUTED },
  { y: 440, h: 60, c: COBALT },
];

function Reframe() {
  return (
    <svg viewBox="0 0 800 500" className="block h-auto w-full" role="img" aria-hidden="true">
      <rect width="800" height="500" fill={CHALK} />
      <rect x="0" y="300" width="420" height="200" fill={MUTED} />
      {STRATA.map((s, i) => (
        <rect key={i} x="420" y={s.y} width="380" height={s.h} fill={s.c} />
      ))}
      <Figure x={380} base={300} />
    </svg>
  );
}

export default function TerrainTest() {
  return (
    <main className="min-h-screen" style={{ background: CHALK }}>
      <div className="mx-auto flex max-w-[1100px] flex-col gap-24 px-6 py-24 sm:px-12">
        <Step />
        <Reframe />
      </div>
    </main>
  );
}
