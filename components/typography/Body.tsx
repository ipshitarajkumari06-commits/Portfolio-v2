import type { ReactNode } from "react";

export default function Body({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`font-sans text-[17px] leading-[1.7] text-fg/80 md:text-[19px] ${className}`}>
      {children}
    </p>
  );
}
