"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const TARGET = "/#selected-work";

// A chat at the end of a case study. The page asks whether to go back to the
// selected work. The reader can tap a reply, or type "yes" in the composer.
// The plain link stays for anyone who would rather not answer.
export default function BackPrompt() {
  const router = useRouter();
  const [sent, setSent] = useState(false);
  const [declined, setDeclined] = useState(false);

  function answer() {
    setSent(true);
    window.setTimeout(() => router.push(TARGET), 2600);
  }

  const open = !sent && !declined;

  return (
    <div className="relative mx-auto flex max-w-2xl flex-col gap-4">
      <style
        dangerouslySetInnerHTML={{
          __html:
            "@keyframes orb-blink { 0%, 90%, 100% { transform: scaleY(1); } 94% { transform: scaleY(0.1); } } @keyframes orb-breathe { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } } @keyframes orb-look { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-3px); } 75% { transform: translateX(3px); } } @keyframes orb-excite { 0%, 100% { transform: scale(1) translateY(0); } 30% { transform: scale(1.14) translateY(-5px); } 60% { transform: scale(1.06) translateY(0); } }",
        }}
      />

      {/* The page's message, beside a wine-and-cream orb with eyes */}
      <div className="relative flex items-end gap-4">
        <span
          aria-hidden="true"
          className={`relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#2a0e15,#000_72%)] shadow-[inset_0_0_16px_rgba(142,43,64,0.6),0_0_28px_rgba(107,30,46,0.45)] ring-1 ring-[#8E2B40]/60 ${
            sent ? "motion-safe:animate-[orb-excite_0.8s_ease-in-out_infinite]" : "motion-safe:animate-[orb-breathe_4s_ease-in-out_infinite]"
          }`}
        >
          <span className="relative flex h-7 w-11 items-center justify-center gap-2 rounded-[8px] bg-[linear-gradient(90deg,#6B1E2E,#8E2B40,#6B1E2E)] shadow-[0_0_16px_rgba(142,43,64,0.7)] motion-safe:animate-pulse">
            <span className="flex items-center gap-2 motion-safe:animate-[orb-look_6s_ease-in-out_infinite]">
              <span className="block h-3 w-1 rounded-full bg-[#F3EDE0] motion-safe:animate-[orb-blink_4s_ease-in-out_infinite]" />
              <span className="block h-3 w-1 rounded-full bg-[#F3EDE0] motion-safe:animate-[orb-blink_4s_ease-in-out_infinite]" />
            </span>
          </span>
        </span>
        <div className="max-w-[82%] rounded-2xl rounded-bl-sm border border-[#8E2B40] bg-[#141414] px-5 py-3">
          <p className="font-sans text-lg font-light leading-relaxed text-fg/90">Back to the selected work section?</p>
        </div>
      </div>

      {/* Tappable replies */}
      {open ? (
        <div className="flex flex-wrap gap-3 pl-20">
          <button
            type="button"
            onClick={answer}
            className="rounded-full bg-[#8E2B40] px-6 py-3 font-sans text-[15px] text-fg transition-opacity hover:opacity-85"
          >
            Yes, take me back
          </button>
          <button
            type="button"
            onClick={() => setDeclined(true)}
            className="rounded-full border border-fg/25 px-6 py-3 font-sans text-[15px] text-fg/80 transition-colors hover:border-fg hover:text-fg"
          >
            Not now
          </button>
        </div>
      ) : null}

      {/* The reader's reply */}
      {sent ? (
        <>
          <div className="max-w-[60%] self-end rounded-2xl rounded-br-sm bg-fg px-5 py-3">
            <p className="font-sans text-lg font-light text-bg">yes</p>
          </div>
          <div className="max-w-[82%] self-start rounded-2xl rounded-bl-sm border border-[#8E2B40] bg-[#141414] px-5 py-3">
            <p className="font-sans text-lg font-light text-fg/90">Taking you back.</p>
          </div>
        </>
      ) : null}

      {declined ? (
        <div className="max-w-[82%] self-start rounded-2xl rounded-bl-sm border border-[#8E2B40] bg-[#141414] px-5 py-3">
          <p className="font-sans text-lg font-light text-fg/90">No problem. Keep reading.</p>
        </div>
      ) : null}
    </div>
  );
}
