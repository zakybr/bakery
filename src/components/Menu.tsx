"use client";

import clsx from "clsx";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { MenuCategoryId } from "@/data/menu";
import { menuCategories } from "@/data/menu";
import { reducedMotionVariants, tabContent } from "@/lib/motion";

export function Menu() {
  const [active, setActive] = useState<MenuCategoryId>("pies");
  const reduce = useReducedMotion();
  const tabVariants = reducedMotionVariants(reduce, tabContent);
  const activeItems = menuCategories.find((c) => c.id === active)?.items ?? [];

  return (
    <section
      id="menu"
      className="scroll-mt-24 bg-[var(--cream)] px-3 py-12 sm:px-4 sm:py-16 md:scroll-mt-28 md:px-6 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-3 sm:mb-10 md:mb-12">
          <h2 className="font-display text-3xl font-semibold text-[var(--brown-dark)] sm:text-4xl md:text-5xl">
            What We Bake
          </h2>
          <div className="h-px w-16 bg-[var(--terracotta)]" />
        </div>

        <div
          className="-mx-1 mb-8 flex gap-1 overflow-x-auto pb-2 sm:mx-0 sm:mb-10 sm:flex-wrap sm:gap-2 sm:overflow-visible sm:pb-0"
          role="tablist"
          aria-label="Menu categories"
        >
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={active === cat.id}
              onClick={() => setActive(cat.id)}
              className={clsx(
                "font-mono-accent min-h-12 shrink-0 rounded-full px-4 text-[10px] font-medium uppercase tracking-[0.14em] transition-colors sm:px-5 sm:text-xs",
                active === cat.id
                  ? "bg-[var(--brown-dark)] text-[var(--warm-white)]"
                  : "bg-[var(--warm-white)] text-[var(--brown-mid)] hover:bg-[color-mix(in_srgb,var(--terracotta)_12%,var(--warm-white))]"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            role="tabpanel"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={tabVariants}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
          >
            {activeItems.map((item) => (
              <article
                key={item.name}
                className="group border border-transparent bg-[var(--warm-white)] px-5 py-5 shadow-sm transition-[border-color,box-shadow] hover:border-[color-mix(in_srgb,var(--terracotta)_45%,transparent)] hover:shadow-md sm:px-6 sm:py-6"
              >
                <div className="mb-2 flex items-start justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold text-[var(--brown-dark)] sm:text-xl">
                    {item.name}
                  </h3>
                  {item.badge ? (
                    <span className="font-mono-accent bg-[var(--terracotta)] shrink-0 rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                      {item.badge}
                    </span>
                  ) : null}
                </div>
                <p className="mb-3 text-sm leading-relaxed text-[var(--text-muted)] sm:mb-4">
                  {item.description}
                </p>
                <p className="font-mono-accent text-sm font-semibold text-[var(--terracotta)]">
                  {item.price}
                </p>
              </article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
