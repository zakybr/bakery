"use client";

import { useFadeUp, useStaggerCards } from "@/hooks/useScrollAnimation";

const quotes = [
  {
    text: "Best pies in East Auckland, full stop.",
    author: "Sarah M., Flat Bush",
  },
  {
    text: "We come every Saturday morning. The kids love the donuts.",
    author: "James T., Botany",
  },
  {
    text: "That steak and oyster pie needs to be on the menu permanently.",
    author: "Mike R., Manukau",
  },
];

export function Testimonials() {
  const titleRef = useFadeUp(0);
  const gridRef = useStaggerCards<HTMLDivElement>([]);

  return (
    <section className="bg-[var(--bg-secondary)] px-3 py-12 sm:px-4 sm:py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div ref={titleRef} className="mb-10 text-center sm:mb-12">
          <h2 className="font-mono-accent text-xs font-medium uppercase tracking-[0.28em] text-[var(--cream-muted)]">
            From our customers
          </h2>
        </div>
        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6 lg:gap-8"
        >
          {quotes.map((q) => (
            <blockquote
              key={q.text}
              data-stagger-card
              className="glass relative overflow-hidden p-6 sm:p-8"
            >
              <span
                className="font-display pointer-events-none absolute left-3 top-2 text-[80px] leading-none text-[var(--gold)] opacity-[0.15]"
                aria-hidden
              >
                &ldquo;
              </span>
              <p className="font-display relative z-[1] pt-8 text-xl font-normal italic leading-snug text-[var(--cream)] sm:text-2xl">
                {q.text}
              </p>
              <footer className="font-mono-accent relative z-[1] mt-5 text-xs font-medium uppercase tracking-[0.12em] text-[var(--gold-light)]">
                — {q.author}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
