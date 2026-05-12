"use client";

import Image from "next/image";
import { useFadeUp, useSlideIn, useStaggerCards } from "@/hooks/useScrollAnimation";

const stats = [
  { value: "10,000+", label: "pies sold" },
  { value: "★ 4.8", label: "Google rating" },
  { value: "Daily", label: "fresh bakes" },
];

export function About() {
  const headingRef = useFadeUp(0);
  const leftColRef = useSlideIn("left");
  const rightColRef = useSlideIn("right");
  const statsContainerRef = useStaggerCards<HTMLDivElement>([]);

  return (
    <section
      id="about"
      className="scroll-mt-24 bg-[var(--bg-secondary)] px-3 py-12 sm:px-4 sm:py-16 md:scroll-mt-28 md:px-6 md:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:gap-14 lg:gap-20">
        <div ref={leftColRef}>
          <div
            ref={statsContainerRef}
            className="grid gap-4 sm:grid-cols-3 md:grid-cols-1 md:gap-5"
          >
            {stats.map((s) => (
              <article
                key={s.label}
                data-stagger-card
                className="glass group p-5 transition-[transform,box-shadow] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(201,168,76,0.12)] sm:p-6"
              >
                <p className="font-display text-3xl font-semibold text-[var(--gold)] sm:text-4xl">
                  {s.value}
                </p>
                <p className="font-mono-accent mt-2 text-xs uppercase tracking-[0.18em] text-[var(--cream-muted)]">
                  {s.label}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div ref={rightColRef}>
          <div ref={headingRef}>
            <h2 className="font-display mb-5 text-3xl font-semibold leading-tight text-[var(--cream)] sm:mb-6 sm:text-4xl md:text-[2.75rem]">
              The Local Bakery That Actually Gives a Damn
            </h2>
          </div>
          <p className="mb-6 text-base leading-relaxed text-[var(--cream-muted)] sm:mb-8 sm:text-lg">
            We&apos;re not a chain. We&apos;re not a franchise. Bake Town is Flat Bush through and
            through — run by locals, for locals. Every pie, pastry and loaf is made fresh in-house
            every morning before most of Auckland is awake.
          </p>
          <div className="relative aspect-[16/10] w-full max-w-lg overflow-hidden rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-primary)]">
            <Image
              src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80"
              alt="Fresh artisan bread and baking at Bake Town Bakery Flat Bush Auckland"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 480px"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
