"use client";

import Image from "next/image";
import { useScrollBodyFade, useScrollHeadingClip, useScrollImageScale } from "@/hooks/useScrollAnimation";

const stats = [
  { value: "4.8★", label: "GOOGLE RATING" },
  { value: "10,000+", label: "PIES SOLD" },
  { value: "Daily", label: "FRESH BAKES" },
] as const;

export function EditorialWhyBakeTown() {
  const h2Ref = useScrollHeadingClip<HTMLHeadingElement>();
  const statsRef = useScrollBodyFade<HTMLDivElement>();
  const stripRef = useScrollImageScale<HTMLDivElement>();

  return (
    <section
      id="about"
      className="scroll-mt-24 overflow-x-hidden bg-[var(--bg-primary)] py-[var(--section-padding-y)] pl-[var(--page-padding-x)] pr-[var(--page-padding-x)] md:scroll-mt-28"
    >
      <div className="mx-auto max-w-[1600px]">
        <h2
          ref={h2Ref}
          className="font-heading mx-auto mb-16 max-w-[800px] text-center text-[clamp(32px,5vw,72px)] font-extralight leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)]"
        >
          <span className="block">The local bakery that</span>
          <span className="block">actually gives a damn.</span>
        </h2>

        <div
          ref={statsRef}
          className="mx-auto mb-16 grid max-w-3xl grid-cols-1 gap-[clamp(32px,6vw,80px)] text-center md:mb-16 md:grid-cols-3"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-heading text-[clamp(36px,5vw,56px)] font-light text-[var(--text-primary)]">
                {s.value}
              </p>
              <p className="font-heading mt-2 text-[11px] uppercase tracking-[0.15em] text-[var(--text-muted)]">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden">
          <div ref={stripRef} className="relative h-[clamp(280px,35vw,420px)] w-full">
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
