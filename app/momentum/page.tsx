import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Momentum test",
  robots: { index: false, follow: false },
};

const BLOCKS = [
  {
    bg: "#1F1F1C",
    ink: "#EDE6D6",
    kicker: "BMW — Brand Strategy",
    title: "What survives when a brand changes medium?",
    evidence: ["A showroom is built for comparison.", "An art fair is built for interpretation."],
    href: "/explorations/bmw-art-fair",
    image: "/images/bmw/lounge-interior.jpg",
  },
  {
    bg: "#EDE6D6",
    ink: "#1F1F1C",
    kicker: "International Airports — Experience Strategy",
    title: "When architecture captures attention, what should the experience say next?",
    evidence: ["Nothing repeated. That was the discipline."],
    href: "/explorations/airports",
    image: "/images/airports/ghy-ceiling.png",
  },
  {
    bg: "#2446B8",
    ink: "#EDE6D6",
    kicker: "Tata Motors — Narrative Strategy",
    title: "What makes this Tata Motors?",
    evidence: ["The brief was one line.", "Create a YouTube series.", "Nothing else followed."],
    href: "/explorations/hum-ai-n",
    image: null,
  },
];

export default function Momentum() {
  return (
    <main>
      {BLOCKS.map((b, i) => (
        <section
          key={i}
          className="sticky top-0 h-screen overflow-hidden"
          style={{ background: b.bg, color: b.ink, zIndex: i }}
        >
          {b.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={b.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-80" />
          )}
          <div className="relative z-10 flex h-full flex-col justify-between px-6 py-16 sm:px-12">
            <p className="font-sans text-xs uppercase tracking-[0.18em] opacity-80">{b.kicker}</p>
            <div>
              <p className="max-w-5xl font-serif font-light leading-[1.02] text-[clamp(2.25rem,6vw,6rem)]">
                {b.title}
              </p>
              <div className="mt-8 flex max-w-3xl flex-col gap-2 font-serif text-xl font-light opacity-90 md:text-2xl">
                {b.evidence.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              <Link href={b.href} className="mt-10 inline-block font-sans text-sm uppercase tracking-[0.16em] underline underline-offset-8">
                Read the case study
              </Link>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}
