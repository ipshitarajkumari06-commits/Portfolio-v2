"use client";

import { useReducedMotion } from "framer-motion";

// The supplier day as one path, read top to bottom. Guests walk it from the branded path
// through the pre-function area, where the product area and the music sit, to the conference.
// Reduced motion keeps the guests still.
const STOPS = [
  { y: 40, label: "Branded path", notes: ["Cubes and LED standees"] },
  { y: 150, label: "Pre-function", notes: ["Digital wall in the product area", "Neer mor and music"] },
  { y: 280, label: "Conference", notes: ["Conclave and suppliers"] },
];

export default function CollinsSupplierPath() {
  const reduce = useReducedMotion();

  return (
    <div className="flex h-full flex-col justify-center">
      <svg
        viewBox="0 0 320 340"
        role="img"
        aria-label="The supplier day path, from the conference through the branded path and product area to the pre-function area"
        className="h-[300px] w-auto"
      >
        <path id="collins-supplier-path" d="M 40 40 L 40 280" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeDasharray="4 6" />

        {!reduce &&
          [0, 2.5].map((offset) => (
            <circle key={offset} r="4.5" fill="#E0334F">
              <animateMotion dur="5s" begin={`${offset}s`} repeatCount="indefinite">
                <mpath href="#collins-supplier-path" />
              </animateMotion>
            </circle>
          ))}

        {STOPS.map((s) => (
          <g key={s.label}>
            <circle cx="40" cy={s.y} r="6" fill="black" stroke="#E0334F" strokeWidth="1.5" />
            <text x="62" y={s.y - 2} className="font-mono text-[11px] uppercase tracking-[0.08em] fill-current text-fg">
              {s.label}
            </text>
            {s.notes.map((note, i) => (
              <text key={note} x="62" y={s.y + 14 + i * 16} className="font-sans text-[12px] font-light fill-current text-fg/70">
                {note}
              </text>
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
}
