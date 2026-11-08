import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/layout/Container";
import Display from "@/components/typography/Display";
import Kicker from "@/components/typography/Kicker";
import Reveal from "@/components/motion/Reveal";
import BackPrompt from "@/components/collections/BackPrompt";
import { tataAigCanada as c } from "@/lib/collections/tata-aig-canada";

const BODY = "font-sans text-left sm:text-justify hyphens-auto text-lg font-light leading-relaxed text-fg/90 md:text-xl";
const LABEL = "font-mono text-[13px] uppercase tracking-[0.12em] text-fg/80";

export const metadata: Metadata = {
  title: `${c.title} — ${c.discipline}`,
  description: c.answer,
};

function Figure({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure>
      <div className="relative aspect-[4/3] w-full overflow-hidden border border-white/10">
        <Image src={src} alt={alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
      </div>
      <figcaption className="mt-3 font-sans text-xs font-light text-fg/70">{caption}</figcaption>
    </figure>
  );
}

export default function TataAigCanadaPage() {
  return (
    <main>
      <header>
        <div className="relative h-[360px] w-full overflow-hidden bg-black sm:h-[90vh] sm:min-h-[560px]">
          <Image src={c.heroImage.src} alt={c.heroImage.alt} fill priority sizes="100vw" className="object-contain" />
        </div>
        <div className="mt-16 sm:mt-20">
          <Container>
            <Reveal>
              <Kicker className="text-fg/75">{c.kicker}</Kicker>
              <span className="mt-1 block font-sans text-kicker uppercase text-fg/60">{c.discipline}</span>
            </Reveal>
            <Reveal delay={0.08}>
              <Display as="h1" className="mt-6 max-w-4xl !font-sans font-extrabold uppercase tracking-tight max-sm:!text-[2.5rem] max-sm:leading-[1.05]">
                {c.title}
              </Display>
            </Reveal>
          </Container>
        </div>
      </header>

      <Container>
        <section className="mt-16 max-w-3xl space-y-6 md:mt-20">
          <Reveal>
            <p className="font-serif text-2xl font-light leading-snug text-fg md:text-3xl">{c.answer}</p>
          </Reveal>
        </section>

        <section className="mt-16 max-w-3xl md:mt-20">
          <Reveal>
            <p className={LABEL}>The brief</p>
          </Reveal>
          {c.brief.map((p) => (
            <Reveal key={p}>
              <p className={`${BODY} mt-6`}>{p}</p>
            </Reveal>
          ))}
        </section>

        <section className="mt-16 max-w-3xl md:mt-20">
          <Reveal>
            <p className={LABEL}>Arrival</p>
          </Reveal>
          {c.arrival.map((p) => (
            <Reveal key={p}>
              <p className={`${BODY} mt-6`}>{p}</p>
            </Reveal>
          ))}
        </section>

        <section className="mt-16 max-w-5xl md:mt-20">
          <Reveal>
            <p className={LABEL}>The programme</p>
          </Reveal>
          {c.programme.map((p) => (
            <Reveal key={p}>
              <p className={`${BODY} mt-6 max-w-3xl`}>{p}</p>
            </Reveal>
          ))}
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {c.programmeImages.map((img) => (
              <Reveal key={img.src}>
                <Figure {...img} />
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mt-16 max-w-3xl md:mt-20">
          <Reveal>
            <p className={LABEL}>The game-a-thon</p>
          </Reveal>
          {c.gameathon.map((p) => (
            <Reveal key={p}>
              <p className={`${BODY} mt-6`}>{p}</p>
            </Reveal>
          ))}
        </section>

        <section className="mt-16 max-w-5xl md:mt-20">
          <Reveal>
            <p className={LABEL}>Eight days, three cities</p>
          </Reveal>
          {c.eightDays.map((p) => (
            <Reveal key={p}>
              <p className={`${BODY} mt-6 max-w-3xl`}>{p}</p>
            </Reveal>
          ))}
          <div className="mt-10 max-w-3xl">
            <Reveal>
              <Figure {...c.vancouverImage} />
            </Reveal>
          </div>
        </section>

        <section className="mt-24 max-w-3xl md:mt-32">
          <Reveal>
            <div className="relative border-l-2 border-[#E0334F]/70 pl-6 md:pl-10">
              <p className="font-mono text-base leading-relaxed text-fg md:text-lg">{c.tradeOff}</p>
            </div>
          </Reveal>
        </section>

        <section className="mt-24 max-w-3xl md:mt-32">
          <Reveal>
            <p className={LABEL}>The role</p>
          </Reveal>
          {c.role.map((p) => (
            <Reveal key={p}>
              <p className={`${BODY} mt-6`}>{p}</p>
            </Reveal>
          ))}
        </section>

        <section className="mt-32 max-w-3xl border-t border-white/10 pb-32 pt-16">
          <Reveal>
            <h2 className="font-serif text-4xl font-light leading-tight text-fg md:text-5xl">{c.thesis}</h2>
          </Reveal>
        </section>
      </Container>

      <BackPrompt />
    </main>
  );
}
