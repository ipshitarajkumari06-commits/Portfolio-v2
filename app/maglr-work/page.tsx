import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work block test",
  robots: { index: false, follow: false },
};

const BLOCKS = [
  {
    bg: "#1F1F1C",
    ink: "#EDE6D6",
    client: "BMW",
    title: "What survives when a brand changes medium?",
    image: "/images/bmw/lounge-interior.jpg",
  },
  {
    bg: "#EDE6D6",
    ink: "#1F1F1C",
    client: "International Airports",
    title: "When architecture captures attention, what should the experience say next?",
    image: "/images/airports/ghy-ceiling.png",
  },
  {
    bg: "#2446B8",
    ink: "#EDE6D6",
    client: "Tata Motors",
    title: "What makes this Tata Motors?",
    image: null,
  },
];

export default function MaglrWork() {
  return (
    <main>
      {BLOCKS.map((b, i) => (
        <section
          key={i}
          className="sticky top-0 flex h-screen items-end overflow-hidden"
          style={{ background: b.bg, color: b.ink, zIndex: i }}
        >
          {b.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={b.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
          )}
          <div className="relative z-10 w-full px-6 pb-16 sm:px-12">
            <p className="font-sans text-sm uppercase tracking-[0.16em] opacity-80">{b.client}</p>
            <p className="mt-4 max-w-4xl font-serif font-light leading-[1.02] text-[clamp(2.5rem,7vw,6.5rem)]">
              {b.title}
            </p>
          </div>
        </section>
      ))}
    </main>
  );
}
