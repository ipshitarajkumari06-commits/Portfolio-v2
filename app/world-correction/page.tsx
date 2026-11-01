import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "World correction — Figure and ground",
  robots: { index: false, follow: false },
};

const CHALK = "#EDE6D6";
const GRAPHITE = "#1F1F1C";
const GRAPHITE_MUTED = "#B4B2A8";
const COBALT = "#2446B8";
const COBALT_MUTED = "#A9B7E0";
const VERMILION = "#D8442A";
const VERMILION_MUTED = "#EBB8A6";

type Frame = {
  massFill: string;
  cobaltFill: string;
  vermilionFill: string;
  facing: "left" | "front" | "right";
};

const FRAMES: Frame[] = [
  { massFill: GRAPHITE, cobaltFill: COBALT_MUTED, vermilionFill: VERMILION_MUTED, facing: "left" },
  { massFill: GRAPHITE_MUTED, cobaltFill: COBALT_MUTED, vermilionFill: VERMILION_MUTED, facing: "front" },
  { massFill: GRAPHITE_MUTED, cobaltFill: COBALT_MUTED, vermilionFill: VERMILION, facing: "right" },
];

const FIGURE_X = 420;
const FIGURE_BASE = 470;

function figureTransform(facing: Frame["facing"]) {
  if (facing === "left") return `translate(${FIGURE_X} 0)`;
  if (facing === "right") return `translate(${FIGURE_X} 0) scale(-1 1)`;
  return `translate(${FIGURE_X} 0) scale(0.35 1)`;
}

function Scene({ frame }: { frame: Frame }) {
  return (
    <svg viewBox="0 0 800 500" className="block h-auto w-full" role="img" aria-hidden="true">
      <rect width="800" height="500" fill={CHALK} />
      <rect x="70" y="40" width="300" height="430" fill={frame.massFill} />
      <rect x="470" y="60" width="290" height="220" fill={frame.cobaltFill} />
      <rect x="520" y="330" width="180" height="130" fill={frame.vermilionFill} />
      <g transform={figureTransform(frame.facing)}>
        <circle cx="0" cy={FIGURE_BASE - 210} r="16" fill={GRAPHITE} />
        <path
          d={`M -18 ${FIGURE_BASE - 186} Q 0 ${FIGURE_BASE - 200} 18 ${FIGURE_BASE - 186} L 16 ${FIGURE_BASE - 60} L 10 ${FIGURE_BASE} L -10 ${FIGURE_BASE} L -16 ${FIGURE_BASE - 60} Z`}
          fill={GRAPHITE}
        />
        <path
          d={`M 12 ${FIGURE_BASE - 176} L 34 ${FIGURE_BASE - 190} L 16 ${FIGURE_BASE - 168} Z`}
          fill={GRAPHITE}
        />
      </g>
    </svg>
  );
}

export default function WorldCorrection() {
  return (
    <main className="min-h-screen" style={{ background: CHALK }}>
      <div className="mx-auto flex max-w-[1100px] flex-col gap-24 px-6 py-24 sm:px-12">
        {FRAMES.map((frame, i) => (
          <Scene key={i} frame={frame} />
        ))}
      </div>
    </main>
  );
}
