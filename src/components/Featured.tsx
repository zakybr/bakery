"use client";

import Image from "next/image";
import { useFadeUp, useSlideIn } from "@/hooks/useScrollAnimation";

export function Featured() {
  const titleRef = useFadeUp(0);
  const leftRef = useSlideIn("left");
  const rightRef = useSlideIn("right");

  return (
    <section className="relative overflow-hidden bg-[var(--bg-primary)] px-3 py-12 sm:px-4 sm:py-16 md:px-6 md:py-24">
      <p
        className="font-mono-accent pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[clamp(3rem,14vw,9rem)] font-bold uppercase tracking-[0.35em] text-[var(--gold)] opacity-[0.07]"
        aria-hidden
      >
        New drop
      </p>

      <div className="relative z-[1] mx-auto max-w-6xl">
        <div className="glass relative mb-10 px-6 py-10 sm:mb-12 sm:px-8 sm:py-12 md:px-12 md:py-14">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div ref={leftRef} className="relative order-2 lg:order-1">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-[var(--glass-border)] bg-[var(--bg-secondary)]">
                <Image
                  src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=900&q=80"
                  alt="Steak and oyster pie — limited daily special at Bake Town Bakery Flat Bush"
                  fill
                  className="object-cover transition-transform duration-500 ease-out hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
            </div>

            <div ref={rightRef} className="order-1 lg:order-2">
              <p className="font-mono-accent mb-3 text-xs uppercase tracking-[0.25em] text-[var(--gold)]">
                Spotlight
              </p>
              <div ref={titleRef}>
                <h2 className="font-display mb-6 text-4xl font-semibold italic leading-tight text-[var(--cream)] sm:text-5xl md:text-6xl">
                  New This Week
                </h2>
              </div>
              <h3 className="font-display mb-4 text-2xl font-semibold text-[var(--gold-light)] sm:text-3xl">
                Steak &amp; Oyster Pie
              </h3>
              <p className="mb-6 max-w-xl text-base leading-relaxed text-[var(--cream-muted)] sm:mb-8 sm:text-lg">
                A bold new take on a Kiwi classic. Tender slow-cooked steak, plump oysters, rich
                gravy — all wrapped in our signature buttery pastry. Limited quantities daily.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
