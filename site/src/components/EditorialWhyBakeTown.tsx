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
    <section id="about" className="scroll-mt-24 bg-[var(--bg-primary)] px-6 py-20 md:scroll-mt-28 md:px-10 md:py-[120px]">
      <div className="mx-auto max-w-[1600px]">
        <h2
          ref={h2Ref}
          className="font-heading mx-auto mb-20 max-w-4xl text-center text-[clamp(28px,6vw,72px)] font-extralight leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)] md:mb-24"
        >
          <span className="block">The local bakery that</span>
          <span className="block">actually gives a damn.</span>
        </h2>

        <div
          ref={statsRef}
          className="mx-auto mb-20 grid max-w-3xl grid-cols-1 gap-12 text-center md:mb-24 md:grid-cols-3 md:gap-16"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-heading text-[clamp(40px,5vw,56px)] font-light text-[var(--text-primary)]">
                {s.value}
              </p>
              <p className="font-heading mt-3 text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <div className="relative -mx-6 h-[280px] overflow-hidden md:-mx-10 md:h-[400px]">
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
