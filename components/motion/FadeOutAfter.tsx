"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";

type FadeOutAfterProps = {
  children: ReactNode;
  delayMs?: number;
};

// Shows children normally, then fades them out (and collapses their space)
// once, a fixed delay after mount.
export default function FadeOutAfter({ children, delayMs = 2500 }: FadeOutAfterProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(false), delayMs);
    return () => clearTimeout(timeout);
  }, [delayMs]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        maxHeight: visible ? "12rem" : "0px",
        overflow: "hidden",
        transition: "opacity 0.6s ease, max-height 0.6s ease 0.1s",
      }}
    >
      {children}
    </div>
  );
}
