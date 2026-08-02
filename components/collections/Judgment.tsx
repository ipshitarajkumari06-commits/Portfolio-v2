import Reveal from "@/components/motion/Reveal";

type JudgmentProps = {
  children: string;
  delay?: number;
  className?: string;
};

// No label, no heading, nothing that announces itself as a feature. It
// enters the way any other paragraph on this site does, via Reveal, and
// leaves the way any other paragraph does, by being scrolled past. There is
// no separate system here, only a quieter register of the same one.
export default function Judgment({ children, delay = 0.15, className = "" }: JudgmentProps) {
  return (
    <Reveal delay={delay}>
      <p
        className={`max-w-md border-l border-line py-1 pl-4 font-sans text-[15px] leading-relaxed text-muted ${className}`}
      >
        {children}
      </p>
    </Reveal>
  );
}
