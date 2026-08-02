import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import Container from "@/components/layout/Container";
import Kicker from "@/components/typography/Kicker";
import Notebook from "@/components/collections/Notebook";
import Realisation from "@/components/collections/Realisation";
import Transformation from "@/components/collections/Transformation";
import { humAiN as c } from "@/lib/collections/hum-ai-n";

export const metadata: Metadata = {
  title: "HUM.AI.N — Tata Motors, Ipshita Rajkumari",
  description: c.brief.statement,
};

// One continuous editorial essay, not a sequence of screens. Spacing
// between beats is content-driven (clamp-based margins), never a fixed
// viewport height — the reader should never scroll through empty space
// to reach the next idea. Only the Notebook, Realisation, and
// Transformation carry real motion; everything else is a single
// scroll-triggered Reveal, same as BMW.
export default function HumAiNPage() {
  return (
    <Container className="py-[clamp(4rem,10vh,7rem)]">
      {/* Header — intentionally withholds the strategic question. Tata
          Motors is built around discovery: the notebook sequence earns
          "What makes this Tata Motors?" as a realization. Stating it in
          the hero would spoil that behavioural language, so this project
          is the deliberate exception to the portfolio's information
          hierarchy (project → discipline → question). */}
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <Kicker className="mb-2">{c.kicker}</Kicker>
          <span className="block font-sans text-kicker uppercase text-muted/60">{c.discipline}</span>
        </Reveal>
      </div>

      {/* The Brief */}
      <div className="mx-auto mt-[clamp(3rem,7vh,4.5rem)] max-w-2xl">
        <Reveal>
          <p className="max-w-[30ch] font-serif text-sm font-light leading-relaxed text-muted md:text-base">
            {c.brief.line}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-[clamp(0.75rem,2.5vh,1rem)] whitespace-nowrap font-serif text-[clamp(1.6rem,5vw,3rem)] font-light italic leading-tight text-fg">
            {c.brief.statement}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-[clamp(0.75rem,2.5vh,1rem)] max-w-[30ch] font-serif text-sm font-light leading-relaxed text-muted md:text-base">
            {c.brief.continuation}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-[clamp(1rem,3vh,1.5rem)] max-w-[30ch] font-serif text-lg leading-relaxed text-fg/75 md:text-xl">
            {c.brief.enumeration}
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-[clamp(1.25rem,4vh,2rem)] max-w-[15ch] font-serif text-[clamp(1.75rem,5.5vw,3.25rem)] font-light leading-snug text-fg sm:max-w-[30ch]">
            {c.brief.question}
          </p>
        </Reveal>
      </div>

      {/* First Instinct — continues the question directly, same train of thought */}
      <div className="mx-auto mt-[clamp(1.5rem,4vh,2.5rem)] flex max-w-2xl flex-col">
        {c.firstInstinct.lines.map((line, i) => (
          <Reveal key={i} delay={i * 0.08} className={i === 0 ? "" : "mt-3"}>
            <p className="font-serif text-xl leading-snug text-fg/70 md:text-2xl">{line}</p>
          </Reveal>
        ))}
        <Reveal delay={0.4} className="mt-8">
          <p className="font-serif text-lg text-muted md:text-xl">{c.firstInstinct.displayLead}</p>
        </Reveal>
        <Reveal delay={0.5} className="mt-1">
          <p className="font-serif text-[clamp(1.75rem,5.5vw,3.25rem)] font-light leading-snug text-fg">
            {c.firstInstinct.display}
          </p>
        </Reveal>
      </div>

      {/* Research */}
      <div className="mx-auto mt-[clamp(3rem,7vh,4.5rem)] max-w-2xl">
        <Reveal>
          <p className="font-serif text-xl leading-snug text-fg/70 md:text-2xl">{c.research.opening}</p>
        </Reveal>
        <div className="mt-4 flex flex-col">
          {c.research.list.map((item, i) => (
            <Reveal key={item} delay={i * 0.05} className={i === 0 ? "" : "mt-1"}>
              <p className="font-serif text-lg text-muted md:text-xl">{item}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-4">
          {c.research.reflection.map((line, i) => (
            <Reveal key={line} delay={i * 0.08} className={i === 0 ? "" : "mt-1"}>
              <p className="font-serif text-lg leading-relaxed text-fg/75 md:text-xl">{line}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15} className="mt-4">
          <p className="font-serif text-2xl font-light text-fg md:text-3xl">{c.research.closing}</p>
        </Reveal>
      </div>

      {/* The Test */}
      <div className="mt-[clamp(3rem,7vh,4.5rem)]">
        <Notebook />
      </div>

      {/* Realisation */}
      <div className="mt-[clamp(3rem,7vh,4.5rem)]">
        <Realisation />
      </div>

      {/* The Idea */}
      <Reveal className="mx-auto mt-[clamp(3rem,7vh,4.5rem)] max-w-2xl">
        <p className="font-serif text-[clamp(1.75rem,5.5vw,3.25rem)] font-light leading-snug text-fg">{c.idea}</p>
      </Reveal>

      {/* Transformation */}
      <div className="mt-[clamp(3rem,7vh,4.5rem)]">
        <Transformation />
      </div>

      {/* Ending */}
      <Reveal className="mx-auto mt-[clamp(3rem,7vh,4.5rem)] max-w-2xl">
        <p className="font-serif text-lg text-muted md:text-xl">{c.ending.line}</p>
        <p className="mt-1 font-serif text-lg text-muted md:text-xl">{c.ending.principle}</p>
        <p className="mt-1 font-serif text-lg text-muted md:text-xl">{c.ending.stories}</p>
      </Reveal>
    </Container>
  );
}
