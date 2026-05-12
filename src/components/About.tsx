"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { reducedMotionVariants, sectionReveal } from "@/lib/motion";

const stats = [
  { value: "10,000+", label: "pies sold" },
  { value: "★ 4.8", label: "Google rating" },
  { value: "Daily", label: "fresh bakes" },
];

export function About() {
  const reduce = useReducedMotion();
  const v = reducedMotionVariants(reduce, sectionReveal);

  return (
    <section
      id="about"
      className="scroll-mt-24 bg-[var(--warm-white)] px-3 py-12 sm:px-4 sm:py-16 md:scroll-mt-28 md:px-6 md:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:gap-14 lg:gap-20">
        <motion.div
          className="grid gap-6 sm:grid-cols-3 md:grid-cols-1 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            visible: {
              transition: reduce ? { staggerChildren: 0 } : { staggerChildren: 0.12 },
            },
          }}
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={v}
              className="rounded-2xl border border-[color-mix(in_srgb,var(--brown-light)_35%,transparent)] bg-[var(--cream)] px-4 py-5 sm:px-5 sm:py-6"
            >
              <p className="font-display text-3xl font-semibold text-[var(--brown-dark)] sm:text-4xl">
                {s.value}
              </p>
              <p className="font-mono-accent mt-2 text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {s.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={v}
        >
          <h2 className="font-display mb-5 text-3xl font-semibold leading-tight text-[var(--brown-dark)] sm:mb-6 sm:text-4xl md:text-[2.75rem]">
            The Local Bakery That Actually Gives a Damn
          </h2>
          <p className="mb-6 text-base leading-relaxed text-[var(--text-muted)] sm:mb-8 sm:text-lg">
            We&apos;re not a chain. We&apos;re not a franchise. Bake Town is Flat Bush through and
            through — run by locals, for locals. Every pie, pastry and loaf is made fresh in-house
            every morning before most of Auckland is awake.
          </p>
          <div className="relative aspect-[16/10] w-full max-w-lg overflow-hidden rounded-2xl bg-[var(--cream)]">
            <Image
              src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80"
              alt="Fresh artisan bread and baking at Bake Town Bakery Flat Bush Auckland"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 480px"
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
