"use client";

import ReadingBeat from "@/components/motion/ReadingBeat";
import { humAiN as c } from "@/lib/collections/hum-ai-n";

export default function BriefSection() {
  return (
    <div className="mx-auto mt-[clamp(3rem,7vh,4.5rem)] max-w-2xl">
      <ReadingBeat quietOpacity={0.7}>
        <p className="max-w-[30ch] font-serif text-base font-light leading-relaxed text-fg/80 md:text-lg">
          {c.brief.line}
        </p>
      </ReadingBeat>
      <ReadingBeat quietOpacity={0.7} className="mt-[clamp(0.75rem,2.5vh,1rem)]">
        <p className="whitespace-nowrap font-serif text-[clamp(1.6rem,5vw,3rem)] font-light italic leading-tight text-fg">
          {c.brief.statement}
        </p>
      </ReadingBeat>
      <ReadingBeat quietOpacity={0.7} className="mt-[clamp(0.75rem,2.5vh,1rem)]">
        <p className="max-w-[30ch] font-serif text-base font-light leading-relaxed text-fg/80 md:text-lg">
          {c.brief.continuation}
        </p>
      </ReadingBeat>
      <ReadingBeat quietOpacity={0.7} className="mt-[clamp(1rem,3vh,1.5rem)]">
        <p className="max-w-[30ch] font-serif text-lg leading-relaxed text-fg/75 md:text-xl">
          {c.brief.enumeration}
        </p>
      </ReadingBeat>
      <ReadingBeat quietOpacity={0.7} className="mt-[clamp(1.25rem,4vh,2rem)]">
        <p className="max-w-[15ch] font-serif text-[clamp(1.75rem,5.5vw,3.25rem)] font-light leading-snug text-fg sm:max-w-[30ch]">
          {c.brief.question}
        </p>
      </ReadingBeat>
    </div>
  );
}
