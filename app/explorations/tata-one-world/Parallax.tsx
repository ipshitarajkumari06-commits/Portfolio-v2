"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Moves its content a little slower or faster than the page as it crosses the screen,
// which gives the artwork depth. It only runs on wide screens and when motion is allowed,
// so phones and reduced-motion visitors see the content at rest.
export default function Parallax({
  speed = 0.08,
  className = "",
  children,
}: {
  speed?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const wide = window.matchMedia("(min-width: 768px)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      if (!wide.matches || still.matches) {
        el.style.transform = "";
        return;
      }
      // Measure the parent, which is not transformed, so the offset does not feed back on itself.
      const box = (el.parentElement ?? el).getBoundingClientRect();
      // Clamp to one screen either way, so content far off screen does not drift into view.
      const raw = box.top + box.height / 2 - window.innerHeight / 2;
      const offset = Math.max(-window.innerHeight, Math.min(window.innerHeight, raw));
      el.style.transform = `translate3d(0, ${(-offset * speed).toFixed(1)}px, 0)`;
    };
    const onChange = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onChange, { passive: true });
    window.addEventListener("resize", onChange);
    return () => {
      window.removeEventListener("scroll", onChange);
      window.removeEventListener("resize", onChange);
      cancelAnimationFrame(frame);
    };
  }, [speed]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
