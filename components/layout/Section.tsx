import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  fullBleed?: boolean;
};

export default function Section({ children, id, className = "", fullBleed = false }: SectionProps) {
  return (
    <section id={id} className={`py-section ${className}`}>
      {fullBleed ? children : <div className="mx-auto w-full max-w-container px-gutter">{children}</div>}
    </section>
  );
}
