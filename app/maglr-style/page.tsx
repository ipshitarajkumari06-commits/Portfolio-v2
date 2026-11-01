import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Block test",
  robots: { index: false, follow: false },
};

const BLOCKS = [
  { bg: "#EDE6D6", ink: "#1F1F1C", lines: ["Seeing differently.", "Reframing deliberately."] },
  { bg: "#2446B8", ink: "#EDE6D6", lines: ["Every brief arrives with different questions."] },
  { bg: "#D8442A", ink: "#EDE6D6", lines: ["My work begins by finding the right one."] },
  { bg: "#D9A441", ink: "#1F1F1C", lines: ["Everything else is execution."] },
  { bg: "#1F1F1C", ink: "#EDE6D6", lines: ["BMW", "What survives when a brand changes medium?"] },
  { bg: "#EDE6D6", ink: "#1F1F1C", lines: ["International Airports", "When architecture captures attention, what should the experience say next?"] },
  { bg: "#2446B8", ink: "#EDE6D6", lines: ["Tata Motors", "What makes this Tata Motors?"] },
];

export default function MaglrStyle() {
  return (
    <main>
      {BLOCKS.map((b, i) => (
        <section
          key={i}
          className="sticky top-0 flex h-screen items-center px-6 sm:px-12"
          style={{ background: b.bg, color: b.ink, zIndex: i }}
        >
          <div className="mx-auto w-full max-w-[1320px]">
            {b.lines.map((line, j) => (
              <p
                key={j}
                className={
                  j === 0 && b.lines.length > 1
                    ? "font-sans text-sm uppercase tracking-[0.16em] opacity-70"
                    : "font-serif font-light leading-[1.02] text-[clamp(2.5rem,9vw,8rem)]"
                }
              >
                {line}
              </p>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
