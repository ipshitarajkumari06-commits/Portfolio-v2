import type { ReactNode } from "react";

export default function Kicker({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`block font-sans text-kicker uppercase text-muted ${className}`}>
      {children}
    </span>
  );
}
