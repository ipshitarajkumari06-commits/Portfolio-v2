import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "World draft — Repetition and Difference",
  robots: { index: false, follow: false },
};

type Plank = { x: number; h: number; c: string };

const CHALK = "#E9E2D0";
const GRAPHITE = "#262624";
const ULTRAMARINE = "#2B3FA3";
const CORAL = "#E0654A";
const PLUM = "#5B2A4A";
const BASE = "18%";

function evenRow(count: number, start: number, step: number, h: number): Plank[] {
  return Array.from({ length: count }, (_, i) => ({ x: start + i * step, h, c: GRAPHITE }));
}

const establishment = evenRow(14, 6, 6.2, 38);
const repetition = evenRow(28, 4, 3.6, 38);
const impasse = evenRow(40, 2, 2.45, 38);

const DIFF_INDEX = 16;
const differenceX = 4 + DIFF_INDEX * 3.6;
const difference: Plank[] = repetition.map((p, i) =>
  i === DIFF_INDEX ? { ...p, h: 70, c: CORAL } : p,
);

const reframe: Plank[] = repetition.map((p) => {
  const distance = Math.abs(p.x - differenceX);
  return p.x === differenceX
    ? { ...p, h: 70, c: CORAL }
    : { ...p, h: Math.max(12, 66 - distance * 1.1), c: GRAPHITE };
});

function Field({
  planks,
  figure,
}: {
  planks: Plank[];
  figure?: { x: number; h: number };
}) {
  return (
    <div className="relative h-[56vh] min-h-[340px] w-full overflow-hidden" style={{ background: CHALK }}>
      <div className="absolute inset-x-0 h-px" style={{ bottom: BASE, background: GRAPHITE }} />
      {planks.map((p, i) => (
        <div
          key={i}
          className="absolute w-[10px] -translate-x-1/2"
          style={{ left: `${p.x}%`, bottom: BASE, height: `${p.h}%`, background: p.c }}
        />
      ))}
      {figure && (
        <div
          className="absolute w-[14px] -translate-x-1/2 rounded-t-full"
          style={{ left: `${figure.x}%`, bottom: BASE, height: `${figure.h}%`, background: PLUM }}
        />
      )}
    </div>
  );
}

const STATES = [
  { id: "A", name: "Establishment", planks: establishment },
  { id: "B", name: "Repetition", planks: repetition, figure: { x: 2, h: 52 } },
  { id: "C", name: "Impasse", planks: impasse, figure: { x: 2, h: 52 } },
  { id: "D", name: "Difference", planks: difference, figure: { x: 2, h: 52 } },
  { id: "E", name: "Reframe", planks: reframe, figure: { x: differenceX, h: 52 } },
];

export default function WorldDraft() {
  return (
    <main className="min-h-screen" style={{ background: CHALK, color: GRAPHITE }}>
      <div className="mx-auto max-w-[1320px] px-6 py-16 sm:px-12">
        {STATES.map((s) => (
          <section key={s.id} className="mb-24">
            <p className="mb-4 font-sans text-[11px] uppercase tracking-[0.16em]">
              {s.id} — {s.name}
            </p>
            <Field planks={s.planks} figure={s.figure} />
          </section>
        ))}
      </div>
    </main>
  );
}
