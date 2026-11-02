"use client";

import { useState } from "react";

type Mechanic = { label: string; text: string };

// Decision three's mechanics as a disclosure list: one row open at a time,
// so the reader picks the mechanic they want instead of scrolling five paragraphs.
export default function McapsMechanics({ items }: { items: Mechanic[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="mt-6 border-t border-white/10">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.label} className="border-b border-white/10">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`mechanic-${i}`}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-6 py-5 text-left"
            >
              <span className="font-sans text-sm uppercase tracking-[0.14em] text-fg/75">{item.label}</span>
              <span aria-hidden="true" className="font-sans text-lg text-amber-200">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <p
              id={`mechanic-${i}`}
              hidden={!isOpen}
              className="pb-6 font-sans text-left sm:text-justify text-lg font-light leading-relaxed text-fg/90 md:text-xl"
            >
              {item.text}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
