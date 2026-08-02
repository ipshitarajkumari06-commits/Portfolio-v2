import type { ReactNode } from "react";

type SpreadProps = {
  children: ReactNode;
  number: string;
  className?: string;
  // Some spreads carry more evidence than a single viewport can hold at a
  // readable size. Rather than force-fit or clip, `tall` lets the section
  // grow with its content while staying a snap-aligned "page." Defaults to
  // false so existing spreads are unaffected.
  tall?: boolean;
  ariaLabel?: string;
};

// A full-viewport section for scroll-snapped, spread-based pacing.
// BMW's page scrolls continuously; this Collection's editorial rhythm
// calls for one idea landing per viewport instead, so this exists as its
// own primitive rather than stretching Section to do both jobs.
export default function Spread({ children, number, className = "", tall = false, ariaLabel }: SpreadProps) {
  return (
    <section
      aria-label={ariaLabel}
      className={`relative flex w-full snap-start items-start ${tall ? "min-h-screen" : "h-screen"} ${className}`}
    >
      {children}
      <span className="absolute bottom-6 right-6 font-sans text-[11px] uppercase tracking-[0.14em] text-muted/30 sm:bottom-10 sm:right-12">
        {number}
      </span>
    </section>
  );
}
