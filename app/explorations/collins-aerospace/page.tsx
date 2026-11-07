import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/layout/Container";
import Display from "@/components/typography/Display";
import Kicker from "@/components/typography/Kicker";
import Reveal from "@/components/motion/Reveal";
import BackPrompt from "@/components/collections/BackPrompt";
import CollinsHero from "@/components/collections/CollinsHero";
import CollinsScrollStory from "@/components/collections/CollinsScrollStory";
import CollinsGallery from "@/components/collections/CollinsGallery";
import CollinsRouteMap from "@/components/collections/CollinsRouteMap";
import CollinsProgress from "@/components/collections/CollinsProgress";
import CollinsSupplierPath from "@/components/collections/CollinsSupplierPath";
import { collinsAerospace as c } from "@/lib/collections/collins-aerospace";

const BODY = "font-sans text-justify hyphens-auto text-lg font-light leading-relaxed text-fg/90 md:text-xl";
const LABEL = "font-mono text-[13px] uppercase tracking-[0.12em] text-fg/80";

export const metadata: Metadata = {
  title: `${c.title} — ${c.discipline}`,
  description: c.thesis,
};

// The case as a run of show: a parallax hero, stops that pin to the scroll on
// desktop and stack on phones, a clickable photo grid, and the trade-off as a pull quote.
export default function CollinsAerospacePage() {
  const stops = [
    { n: "01", label: "Arrival", paragraphs: c.decisionOne.paragraphs, diagram: <CollinsRouteMap routes={c.decisionOne.routes} /> },
    { n: "02", label: "The reveal", paragraphs: c.decisionTwo.paragraphs, image: c.decisionTwo.image },
    { n: "03", label: "Supplier conference", paragraphs: c.decisionThree.paragraphs, diagram: <CollinsSupplierPath /> },
  ];

  return (
    <main>
      <header>
        <CollinsHero src="/images/collins-aerospace/cover-render.jpg" alt="A wireframe aircraft render in blue and teal, with the Collins Aerospace logo" />
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
            <p className="font-serif text-2xl font-light leading-snug text-fg md:text-3xl">{c.question}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className={BODY}>{c.answer}</p>
          </Reveal>
        </section>

        <section className="mt-16 max-w-3xl md:mt-20">
          <Reveal>
            <p className={LABEL}>{c.brief.label}</p>
          </Reveal>
          {c.brief.paragraphs.map((p) => (
            <Reveal key={p}>
              <p className={`${BODY} mt-6`}>{p}</p>
            </Reveal>
          ))}
        </section>

        {/* Cockpit readout: three instrument displays with a status light, a tick scale and a live-style label. */}
        <section className="mt-16 md:mt-20">
          <Container>
            <dl className="grid max-w-6xl grid-cols-1 gap-px border border-white/15 bg-white/15 sm:grid-cols-3">
              {c.brief.scale.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.08}>
                  <div className="relative flex min-h-[11rem] flex-col justify-between bg-black p-6 md:p-8">
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-fg/70">
                      <span>{s.label}</span>
                      <span aria-hidden="true" className="h-2 w-2 animate-pulse rounded-full bg-[#E0334F] shadow-[0_0_6px_#E0334F,0_0_14px_#E0334F,0_0_28px_rgba(224,51,79,0.8)] motion-reduce:animate-none" />
                    </div>
                    <dt className="mt-6 font-mono text-2xl font-light leading-none tabular-nums text-fg xl:text-4xl">{s.value}</dt>
                    <span aria-hidden="true" className="mt-6 flex h-3 items-end gap-[3px]">
                      {Array.from({ length: 28 }).map((_, t) => (
                        <span
                          key={t}
                          style={{ animationDelay: `${(t * 137 + i * 310) % 1400}ms`, animationDuration: "1.6s" }}
                          className={`w-px animate-pulse motion-reduce:animate-none ${t % 7 === 0 ? "h-3 bg-fg/60" : "h-1.5 bg-fg/25"}`}
                        />
                      ))}
                    </span>
                  </div>
                </Reveal>
              ))}
            </dl>
          </Container>
        </section>

        <section className="relative mt-24 max-w-4xl overflow-hidden md:mt-32">
          {/* Concentric rings, as faint as the stage backdrop arcs. */}
          <svg aria-hidden="true" viewBox="0 0 600 600" fill="none" stroke="currentColor" strokeWidth="1" className="pointer-events-none absolute -right-40 -top-32 h-[520px] w-[520px] text-white/[0.06] md:-right-56 md:h-[680px] md:w-[680px]">
            <circle cx="300" cy="300" r="120" />
            <circle cx="300" cy="300" r="200" />
            <circle cx="300" cy="300" r="280" />
          </svg>
          <Reveal>
            <p className={LABEL}>{c.choice.label}</p>
          </Reveal>
          {c.choice.blocks.map((b) => (
            <div key={b.value} className="mt-12">
              <Reveal>
                <p className={LABEL}>{b.label}</p>
                <p className="mt-3 font-serif text-4xl font-light leading-tight text-fg md:text-6xl">{b.value}</p>
              </Reveal>
              {b.image && (
                <Reveal>
                  <figure className="mt-12 max-w-2xl">
                    <div className="relative overflow-hidden border border-white/10" style={{ aspectRatio: `${b.image.width} / ${b.image.height}` }}>
                      <Image src={b.image.src} alt={b.image.alt} fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover" />
                    </div>
                    <figcaption className="mt-3 font-sans text-xs font-light text-fg/70">{b.image.caption}</figcaption>
                  </figure>
                </Reveal>
              )}
              {b.paragraphs.map((p) => (
                <Reveal key={p}>
                  <p className="mt-6 max-w-2xl text-justify hyphens-auto font-sans text-lg font-light leading-relaxed text-fg/90 md:text-xl">{p}</p>
                </Reveal>
              ))}
            </div>
          ))}
        </section>

        <section className="mt-24 max-w-6xl md:mt-32">
          <Reveal>
            <p className={LABEL}>The run of show</p>
          </Reveal>
          <div className="mt-10">
            <CollinsScrollStory stops={stops} />
          </div>
        </section>

        <section className="mt-24 max-w-6xl md:mt-32">
          <Reveal>
            <p className={LABEL}>In pictures</p>
          </Reveal>
          <div className="mt-10">
            <CollinsGallery photos={c.decisionTwo.photos} />
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
            <p className={LABEL}>Watch and read</p>
          </Reveal>
          <ul className="mt-6 space-y-3">
            {c.videos.map((v) => (
              <li key={v.url}>
                <Reveal>
                  <a
                    href={v.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-6 border-b border-white/15 pb-3 font-sans text-lg font-light text-fg transition-colors hover:border-[#E0334F]"
                  >
                    <span>{v.label}</span>
                    <span aria-hidden="true" className="font-mono text-base text-fg/60 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#E0334F]">→</span>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-32 max-w-3xl border-t border-white/10 pb-32 pt-16">
          <Reveal>
            <h2 className="font-serif text-4xl font-light leading-tight text-fg md:text-5xl">{c.thesis}</h2>
          </Reveal>
        </section>
      </Container>

      <CollinsProgress />
      <BackPrompt />
    </main>
  );
}
