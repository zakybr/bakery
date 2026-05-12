"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

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
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % quotes.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, [reduce]);

  const q = quotes[index];

  return (
    <section className="bg-[var(--terracotta)] px-3 py-12 sm:px-4 sm:py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-mono-accent mb-8 text-xs font-medium uppercase tracking-[0.28em] text-[color-mix(in_srgb,#fff_75%,transparent)] sm:mb-10">
          From our customers
        </h2>
        <div className="min-h-[200px] sm:min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={q.text}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: reduce ? 0 : 0.45 }}
              className="px-1"
            >
              <p className="font-display mb-6 text-2xl font-normal italic leading-snug text-[var(--warm-white)] sm:mb-8 sm:text-3xl md:text-4xl">
                &ldquo;{q.text}&rdquo;
              </p>
              <footer className="font-mono-accent text-sm font-medium uppercase tracking-[0.15em] text-[color-mix(in_srgb,#fff_88%,transparent)]">
                — {q.author}
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>
        <div className="mt-8 flex justify-center gap-2 sm:mt-10">
          {quotes.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show testimonial ${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={
                i === index
                  ? "h-2.5 w-8 rounded-full bg-[var(--warm-white)]"
                  : "h-2.5 w-2.5 rounded-full bg-[color-mix(in_srgb,#fff_45%,transparent)] hover:bg-[color-mix(in_srgb,#fff_65%,transparent)]"
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
