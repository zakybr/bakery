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
    <div className="flex flex-col gap-3 text-center">
      <p
        ref={valueRef}
        className="font-heading text-[clamp(36px,5vw,56px)] font-light text-[var(--text-primary)]"
      >
        {finalText}
      </p>
      <p className="font-heading text-[11px] uppercase tracking-[0.15em] text-[var(--text-muted)]">
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
      className="scroll-mt-24 overflow-x-hidden bg-[var(--bg-primary)] py-[var(--section-gap)] pl-[var(--page-padding-x)] pr-[var(--page-padding-x)] md:scroll-mt-28"
    >
      <div className="mx-auto max-w-[1600px]">
        <h2
          ref={h2Ref}
          className="font-heading mx-auto mb-[clamp(48px,6vw,80px)] max-w-[820px] text-center text-[clamp(32px,5vw,72px)] font-extralight leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)]"
        >
          <span className="block">The local bakery that</span>
          <span className="block">actually gives a damn.</span>
        </h2>

        <div
          ref={statsRef}
          className="mx-auto mb-[clamp(64px,8vw,100px)] grid max-w-3xl grid-cols-1 gap-[clamp(32px,6vw,80px)] text-center md:grid-cols-3"
        >
          {stats.map((s) => (
            <StatCell key={s.label} kind={s.kind} label={s.label} finalText={s.finalText} />
          ))}
        </div>

        <div
          className="overflow-hidden"
          style={{
            marginLeft: "calc(-1 * var(--page-padding-x))",
            marginRight: "calc(-1 * var(--page-padding-x))",
            width: "calc(100% + (2 * var(--page-padding-x)))",
          }}
        >
          <div ref={stripRef} className="relative h-[clamp(240px,30vw,420px)] w-full">
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
