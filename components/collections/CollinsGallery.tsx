"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type Visual = { src: string; alt: string; caption: string; width: number; height: number };

// A photo grid. Each tile lifts and zooms on hover, and opens full size in a
// native dialog on click. Escape closes it.
export default function CollinsGallery({ photos }: { photos: Visual[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const reduce = useReducedMotion();
  const current = useRef<Visual | null>(null);
  const shown = useRef<HTMLImageElement>(null);
  const caption = useRef<HTMLParagraphElement>(null);

  function open(p: Visual) {
    current.current = p;
    if (shown.current) {
      shown.current.src = p.src;
      shown.current.alt = p.alt;
    }
    if (caption.current) caption.current.textContent = p.caption;
    dialog.current?.showModal();
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {photos.map((p, i) => (
          <motion.button
            key={p.src}
            type="button"
            onClick={() => open(p)}
            aria-label={`Enlarge: ${p.alt}`}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className={`group block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg ${i === 0 ? "sm:col-span-2" : ""}`}
          >
            <span
              className="relative block cursor-zoom-in overflow-hidden border border-white/10"
              style={{ aspectRatio: `${p.width} / ${p.height}` }}
            >
              <Image
                src={p.src}
                alt=""
                fill
                sizes="(min-width: 640px) 45vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out motion-reduce:transition-none group-hover:scale-105"
              />
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-4 pb-4 pt-12 font-sans text-xs font-light leading-relaxed text-fg/90 opacity-100 transition-opacity duration-500 md:opacity-80 md:group-hover:opacity-100"
              >
                {p.caption}
              </span>
            </span>
          </motion.button>
        ))}
      </div>

      <dialog
        ref={dialog}
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current?.close();
        }}
        className="m-auto max-h-[90vh] max-w-[92vw] bg-transparent p-0 backdrop:bg-black/85"
      >
        <div className="flex flex-col items-center gap-4 p-4">
          <img ref={shown} alt="" className="max-h-[78vh] w-auto object-contain" />
          <p ref={caption} className="font-sans text-xs font-light text-fg/75" />
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            className="font-sans text-xs uppercase tracking-[0.14em] text-fg/75 underline underline-offset-4 hover:text-fg"
          >
            Close
          </button>
        </div>
      </dialog>
    </>
  );
}
