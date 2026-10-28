"use client";

import { useRef } from "react";
import Image from "next/image";

// A thumbnail that enlarges on hover and opens at full size on click. It sits
// inside a details summary, so the click stops there and the episode stays as
// it was. The enlarged image opens in a native dialog, which closes on Escape.
export default function Enlargeable({ src, alt }: { src: string; alt: string }) {
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        aria-label={`Enlarge: ${alt}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          dialog.current?.showModal();
        }}
        className="group relative block aspect-video w-full shrink-0 cursor-zoom-in md:w-56 overflow-hidden rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg"
      >
        <Image
          src={src}
          alt=""
          fill
          sizes="(min-width: 768px) 224px, 100vw"
          className="object-cover transition-transform duration-500 motion-reduce:transition-none group-hover:scale-110 motion-reduce:group-hover:scale-100"
        />
        <span className="absolute bottom-2 right-2 rounded-full bg-black/70 px-3 py-1 font-sans text-[12px] text-fg">Enlarge</span>
      </button>
      <dialog
        ref={dialog}
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current?.close();
        }}
        className="m-auto max-h-[92vh] max-w-[94vw] bg-black p-0 backdrop:bg-black/90"
      >
        <img src={src} alt={alt} className="block max-h-[88vh] max-w-[94vw] object-contain" />
        <button
          type="button"
          onClick={() => dialog.current?.close()}
          className="absolute right-3 top-3 rounded-full bg-black/70 px-4 py-2 font-sans text-[13px] text-fg"
        >
          Close
        </button>
      </dialog>
    </>
  );
}
