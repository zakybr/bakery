"use client";

import { useFadeUp, useStaggerCards } from "@/hooks/useScrollAnimation";

const cards = [
  {
    icon: "🏆",
    title: "Award-Winning Baking",
    body: "Recognised as one of East Auckland's top local bakeries.",
  },
  {
    icon: "⭐",
    title: "4.8 Star Rating",
    body: "Consistently rated by our loyal Flat Bush community.",
  },
  {
    icon: "🥧",
    title: "Baked Fresh Daily",
    body: "Every single product made in-house from scratch, every morning.",
  },
];

export function Awards() {
  const headingRef = useFadeUp(0);
  const gridRef = useStaggerCards<HTMLDivElement>([]);

  return (
    <section className="bg-[var(--bg-primary)] px-3 py-12 sm:px-4 sm:py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div ref={headingRef} className="mb-10 text-center sm:mb-12">
          <h2 className="font-display text-3xl font-semibold text-[var(--cream)] sm:text-4xl md:text-5xl">
            Why Flat Bush Chooses Us
          </h2>
        </div>
        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6 lg:gap-8"
        >
          {cards.map((c) => (
            <article
              key={c.title}
              data-stagger-card
              className="glass p-6 text-center sm:p-8 md:p-10"
            >
              <div className="mb-4 text-4xl text-[var(--gold)] sm:mb-5 sm:text-5xl" aria-hidden>
                {c.icon}
              </div>
              <h3 className="font-display mb-3 text-xl font-semibold text-[var(--cream)] sm:text-2xl">
                {c.title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--cream-muted)] sm:text-base">
                {c.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
