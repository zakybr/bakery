"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { reducedMotionVariants, slideFromRight } from "@/lib/motion";

export function Featured() {
  const reduce = useReducedMotion();
  const v = reducedMotionVariants(reduce, slideFromRight);

  return (
    <section className="bg-[var(--brown-dark)] px-3 py-12 text-[var(--cream)] sm:px-4 sm:py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={v}
        >
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[color-mix(in_srgb,var(--brown-mid)_40%,#000)]">
              <Image
                src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=900&q=80"
                alt="Steak and oyster pie — limited daily special at Bake Town Bakery Flat Bush"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
            <div className="font-mono-accent absolute -right-2 -top-3 rotate-6 rounded-full bg-[var(--terracotta)] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-lg sm:right-2 sm:top-2">
              New drop
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="font-mono-accent mb-3 text-xs uppercase tracking-[0.25em] text-[var(--brown-light)]">
              Spotlight
            </p>
            <h2 className="font-display mb-6 text-4xl font-semibold italic leading-tight sm:text-5xl md:text-6xl">
              New This Week
            </h2>
            <h3 className="font-display mb-4 text-2xl font-semibold text-[var(--warm-white)] sm:text-3xl">
              Steak &amp; Oyster Pie
            </h3>
            <p className="mb-6 max-w-xl text-base leading-relaxed text-[color-mix(in_srgb,var(--cream)_82%,#fff)] sm:mb-8 sm:text-lg">
              A bold new take on a Kiwi classic. Tender slow-cooked steak, plump oysters, rich gravy
              — all wrapped in our signature buttery pastry. Limited quantities daily.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
