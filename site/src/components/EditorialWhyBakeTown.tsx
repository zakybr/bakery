"use client";

import Image from "next/image";
import type { RefObject } from "react";
import { useRef } from "react";
import {
  useScrollBodyFade,
  useScrollH2Fade,
  useScrollImageReveal,
  useStatCountUp,
} from "@/hooks/useScrollAnimation";

const stats = [
  { kind: "rating" as const, label: "GOOGLE RATING", finalText: "4.8★" },
  { kind: "count" as const, label: "PIES SOLD", finalText: "10,000+" },
  { kind: "text" as const, label: "FRESH BAKES", finalText: "Daily" },
] as const;

function StatCell({
  kind,
  label,
  finalText,
}: {
  kind: "rating" | "count" | "text";
  label: string;
  finalText: string;
}) {
  const valueRef = useRef<HTMLParagraphElement>(null);
  useStatCountUp(valueRef as RefObject<HTMLElement | null>, kind, finalText);

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <p
        ref={valueRef}
        className="font-heading text-[clamp(40px,5vw,64px)] font-thin text-stone-800"
      >
        {finalText}
      </p>
      <p className="font-heading text-[11px] uppercase tracking-[0.2em] text-stone-400">
        {label}
      </p>
    </div>
  );
}

export function EditorialWhyBakeTown() {
  const h2Ref = useScrollH2Fade<HTMLHeadingElement>();
  const statsRef = useScrollBodyFade<HTMLDivElement>();
  const stripRef = useScrollImageReveal<HTMLDivElement>();

  return (
    <section
      id="about"
      className="scroll-mt-24 overflow-x-hidden bg-white px-6 py-24 md:scroll-mt-28 md:px-16 md:py-32 lg:px-24"
    >
      <div className="mx-auto max-w-[1600px]">
        <h2
          ref={h2Ref}
          className="font-heading mx-auto mb-20 max-w-4xl text-center text-[clamp(36px,5.5vw,80px)] font-thin leading-tight tracking-tight text-stone-900"
        >
          <span className="block">The local bakery that</span>
          <span className="block">actually gives a damn.</span>
        </h2>

        <div
          ref={statsRef}
          className="mx-auto mb-20 grid max-w-3xl grid-cols-1 gap-16 text-center md:grid-cols-3"
        >
          {stats.map((s) => (
            <StatCell key={s.label} kind={s.kind} label={s.label} finalText={s.finalText} />
          ))}
        </div>

        <div className="relative -mx-6 h-[300px] overflow-hidden md:-mx-16 md:h-[400px] lg:-mx-24">
          <div ref={stripRef} className="absolute inset-0 h-full w-full">
            <Image
              src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=1600&auto=format&fit=crop&q=80"
              alt="Baking at Bake Town Bakery"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
