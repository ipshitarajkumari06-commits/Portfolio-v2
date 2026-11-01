import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/layout/Container";
import Display from "@/components/typography/Display";
import Reveal from "@/components/motion/Reveal";
import Kicker from "@/components/typography/Kicker";
import BackPrompt from "@/components/collections/BackPrompt";
import { mcapsStart as c } from "@/lib/collections/mcaps-start";

const BODY = "font-sans text-lg font-light leading-relaxed text-fg/90 md:text-xl";
const LABEL = "font-sans text-[13px] uppercase tracking-[0.14em] text-fg/60";

type Visual = { src: string; alt: string; caption: string; width: number; height: number };

// Concept renders from the proposal deck. Each is captioned as a render, so
// nothing reads as event photography.
function Figure({ v }: { v: Visual }) {
  return (
    <figure>
      <Image
        src={v.src}
        alt={v.alt}
        width={v.width}
        height={v.height}
        sizes="(min-width: 768px) 40vw, 100vw"
        className="h-auto w-full"
      />
      <figcaption className="mt-4 font-sans text-sm font-light leading-relaxed text-fg/70">{v.caption}</figcaption>
    </figure>
  );
}

function Paragraphs({ items, delay = 0.08 }: { items: string[]; delay?: number }) {
  return (
    <>
      {items.map((p, i) => (
        <Reveal key={p} delay={delay + i * 0.08}>
          <p className={`${BODY} mt-6`}>{p}</p>
        </Reveal>
      ))}
    </>
  );
}

export const metadata: Metadata = {
  title: `${c.title} — MCAPS Start FY27`,
  description: c.thesis,
};

// The case runs as three decisions, each with its reasoning and at most one
// render placed where it proves the decision.
export default function McapsStartPage() {
  return (
    <main>
      <header
        className="pb-24 pt-32 sm:pt-40"
        style={{
          background:
            "radial-gradient(ellipse at 85% 75%, rgba(90, 71, 53, 0.55), transparent 60%), linear-gradient(to bottom, #020812 0%, #060f1a 60%, #0d0b09 100%)",
        }}
      >
        <Container>
          <Reveal>
            <Kicker className="text-fg/75">{c.kicker}</Kicker>
            <span className="mt-1 block font-sans text-kicker uppercase text-fg/60">{c.discipline}</span>
          </Reveal>
          <Reveal delay={0.08}>
            <Display as="h1" className="mt-6 max-w-4xl max-sm:!text-[2.5rem] max-sm:leading-[1.05]">
              {c.title}
            </Display>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-16 font-serif text-[clamp(2.5rem,8vw,6rem)] font-light leading-none text-fg md:mt-20">{c.hero}</p>
          </Reveal>
        </Container>
      </header>

      <Container>
        <section className="mx-auto mt-24 max-w-2xl space-y-6">
          <Reveal>
            <p className="font-serif text-2xl font-light leading-snug text-fg md:text-3xl">{c.question}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className={BODY}>{c.answer}</p>
          </Reveal>
        </section>

        <section className="mx-auto mt-24 max-w-2xl">
          <Reveal>
            <p className={LABEL}>{c.brief.label}</p>
          </Reveal>
          <Paragraphs items={c.brief.paragraphs} />
        </section>

        <section className="mx-auto mt-24 max-w-2xl">
          <Reveal>
            <p className={LABEL}>{c.idea.label}</p>
          </Reveal>
          <Paragraphs items={c.idea.paragraphs} />
        </section>

        <section className="mx-auto mt-24 max-w-2xl">
          <Reveal>
            <p className={LABEL}>{c.choice.label}</p>
          </Reveal>
          <Paragraphs items={c.choice.paragraphs} />
        </section>

        <section className="mx-auto mt-24 max-w-3xl">
          <Reveal>
            <Display as="h2" className="font-serif font-light">
              {c.principle}
            </Display>
          </Reveal>
        </section>

        <section className="mx-auto mt-24 max-w-2xl">
          <Reveal>
            <p className={LABEL}>{c.decisionOne.label}</p>
          </Reveal>
          <Paragraphs items={c.decisionOne.paragraphs} />
          <div className="mt-12">
            <Figure v={c.decisionOne.image} />
          </div>
        </section>

        <section className="mx-auto mt-24 max-w-2xl">
          <Reveal>
            <p className={LABEL}>{c.decisionTwo.label}</p>
          </Reveal>
          <Paragraphs items={c.decisionTwo.paragraphs} />
          <Paragraphs items={c.decisionTwo.evidence} delay={0.1} />
          <div className="mt-12">
            <Figure v={c.decisionTwo.image} />
          </div>
        </section>

        <section className="mx-auto mt-24 max-w-2xl">
          <Reveal>
            <p className={LABEL}>{c.decisionThree.label}</p>
          </Reveal>
          <Paragraphs items={c.decisionThree.paragraphs} />
          <div className="mt-12">
            <Figure v={c.decisionThree.image} />
          </div>
        </section>

        <section className="mx-auto mt-24 max-w-2xl">
          <Reveal>
            <p className={LABEL}>{c.tension.label}</p>
          </Reveal>
          <Paragraphs items={c.tension.paragraphs} />
        </section>

        <section className="mx-auto mt-32 max-w-3xl pb-24">
          <Reveal>
            <Display as="h2" className="font-serif font-light">
              {c.thesis}
            </Display>
          </Reveal>
        </section>
      </Container>

      <BackPrompt />
    </main>
  );
}
