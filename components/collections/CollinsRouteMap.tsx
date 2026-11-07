"use client";

import { useState, type PointerEvent } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

type Route = { label: string; door: string };

// A ground plane seen at an angle. Four routes run from the entrances to the B2 Building,
// and people walk each route on a loop. Hover or tap a route to light it up.
// Moving the pointer tilts the plane. Reduced motion keeps the plane flat and the people still.
const PATHS = [
  "M 40 360 Q 134 360 134 266",
  "M 40 40 Q 134 40 134 134",
  "M 360 40 Q 266 40 266 134",
  "M 360 360 Q 266 360 266 266",
];
const ENTRANCES = [
  { x: 40, y: 360, labelY: 392 },
  { x: 40, y: 40, labelY: 22 },
  { x: 360, y: 40, labelY: 22 },
  { x: 360, y: 360, labelY: 392 },
];
// Stacked slabs give the B2 Building its height. The top slab carries the label.
const SLABS = [0, 1, 2, 3, 4, 5];
// The steps before the door. They are shared by every route, so they sit in a strip, not on the plane.
const STEPS = ["RSVP and QR code", "Name badge with access details"];

export default function CollinsRouteMap({ routes }: { routes: Route[] }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const tiltX = useSpring(useTransform(my, [0, 1], [60, 40]), { stiffness: 120, damping: 22 });
  const tiltZ = useSpring(useTransform(mx, [0, 1], [-16, 16]), { stiffness: 120, damping: 22 });
  const current = routes[active];

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }

  function onPointerLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <div className="flex h-full flex-col">
      <div
        className="relative h-[300px] w-full md:h-[300px]"
        style={{ perspective: 900 }}
        onPointerMove={reduce ? undefined : onPointerMove}
        onPointerLeave={reduce ? undefined : onPointerLeave}
      >
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            rotateX: reduce ? 50 : tiltX,
            rotateZ: reduce ? 0 : tiltZ,
            transformStyle: "preserve-3d",
          }}
        >
          <div className="relative h-[320px] w-[320px]" style={{ transformStyle: "preserve-3d" }}>
            <svg
              viewBox="0 0 400 400"
              role="img"
              aria-label="Schematic of four entrance routes converging on the B2 Building, with people walking each route"
              className="absolute inset-0 h-full w-full"
            >
              <defs>
                <filter id="collins-route-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <circle cx="200" cy="200" r="120" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
              <circle cx="200" cy="200" r="175" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

              {PATHS.map((d, i) => (
                <path
                  key={d}
                  id={`collins-route-${i}`}
                  d={d}
                  fill="none"
                  stroke="rgba(255,255,255,0.22)"
                  strokeWidth="1.25"
                  strokeDasharray="4 6"
                />
              ))}

              <motion.path
                key={active}
                d={PATHS[active]}
                fill="none"
                stroke="#E0334F"
                strokeWidth="3"
                filter="url(#collins-route-glow)"
                initial={reduce ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />

              {!reduce &&
                PATHS.flatMap((_, i) =>
                  [0, 2.2].map((offset) => (
                    <circle
                      key={`${i}-${offset}`}
                      r={i === active ? 4.5 : 3}
                      fill={i === active ? "#E0334F" : "rgba(255,255,255,0.7)"}
                    >
                      <animateMotion dur="4.4s" begin={`${i * 1.1 + offset}s`} repeatCount="indefinite">
                        <mpath href={`#collins-route-${i}`} />
                      </animateMotion>
                    </circle>
                  )),
                )}

              {ENTRANCES.map((e, i) => (
                <g key={i} onClick={() => setActive(i)} className="cursor-pointer">
                  <circle cx={e.x} cy={e.y} r="18" fill="transparent" />
                  <circle cx={e.x} cy={e.y} r={i === active ? 7 : 5} fill={i === active ? "#E0334F" : "rgba(255,255,255,0.6)"} />
                  <text x={e.x} y={e.labelY} textAnchor="middle" className="font-mono text-[12px] fill-current text-fg/60">
                    {String(i + 1).padStart(2, "0")}
                  </text>
                </g>
              ))}
            </svg>

            {SLABS.map((k) => {
              const top = k === SLABS.length - 1;
              return (
                <div
                  key={k}
                  className={`absolute left-1/2 top-1/2 flex h-[104px] w-[104px] items-center justify-center border ${
                    top ? "border-[#E0334F]/70 bg-black font-mono text-sm text-fg" : "border-white/15 bg-black/80"
                  }`}
                  style={{ transform: `translate(-50%, -50%) translateZ(${k * 6}px)` }}
                >
                  {top && "B2"}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <ol aria-label="Arrival steps" className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.12em] text-fg/90 md:text-xs">
        {STEPS.map((s, i) => (
          <li key={s} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true" className="text-[#E0334F]">→</span>}
            <span>{s}</span>
          </li>
        ))}
      </ol>

      <div role="group" aria-label="Entrance routes" className="mt-4 grid grid-cols-2 gap-2">
        {routes.map((r, i) => (
          <button
            key={r.label}
            type="button"
            aria-pressed={i === active}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            className={`border px-3 py-2 text-left font-mono text-[11px] uppercase tracking-[0.12em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg ${
              i === active ? "border-[#E0334F] text-fg" : "border-white/15 text-fg/70 hover:text-fg"
            }`}
          >
            <span className="text-fg/50">{String(i + 1).padStart(2, "0")}</span> {r.label}
          </button>
        ))}
      </div>

      <div className="mt-4 min-h-[2.5rem]" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.p
            key={active}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="font-serif text-2xl font-light text-fg"
          >
            {current.door}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
