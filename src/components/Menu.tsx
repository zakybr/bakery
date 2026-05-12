"use client";

import clsx from "clsx";
import { useState } from "react";
import type { MenuCategoryId } from "@/data/menu";
import { menuCategories } from "@/data/menu";
import { useFadeUp, useStaggerCards } from "@/hooks/useScrollAnimation";

export function Menu() {
  const [active, setActive] = useState<MenuCategoryId>("pies");
  const headingRef = useFadeUp(0);
  const gridRef = useStaggerCards<HTMLDivElement>([active]);
  const activeItems = menuCategories.find((c) => c.id === active)?.items ?? [];

  return (
    <section
      id="menu"
      className="scroll-mt-24 bg-[var(--bg-primary)] px-3 py-12 sm:px-4 sm:py-16 md:scroll-mt-28 md:px-6 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div ref={headingRef} className="mb-8 flex flex-col gap-3 sm:mb-10 md:mb-12">
          <h2 className="font-display text-3xl font-semibold text-[var(--cream)] sm:text-4xl md:text-5xl">
            What We Bake
          </h2>
          <div className="h-px w-16 bg-[var(--gold)] opacity-80" />
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
                  ? "btn-gold border border-transparent text-[var(--bg-primary)]"
                  : "glass text-[var(--cream-muted)] hover:text-[var(--cream)]"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div
          ref={gridRef}
          key={active}
          role="tabpanel"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
        >
          {activeItems.map((item) => (
            <article
              key={item.name}
              data-stagger-card
              className="glass group p-5 transition-[transform,box-shadow,border-color] hover:-translate-y-1 hover:border-[rgba(201,168,76,0.35)] hover:shadow-[0_16px_48px_rgba(201,168,76,0.12)] sm:p-6"
            >
              <div className="mb-2 flex items-start justify-between gap-2">
                <h3 className="font-display text-lg font-normal text-[var(--cream)] sm:text-[18px]">
                  {item.name}
                </h3>
                {item.badge ? (
                  <span className="font-mono-accent shrink-0 rounded bg-[var(--gold)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--bg-primary)]">
                    {item.badge}
                  </span>
                ) : null}
              </div>
              <p className="mb-3 text-[13px] leading-relaxed text-[var(--cream-muted)] sm:mb-4">
                {item.description}
              </p>
              <p className="font-mono-accent text-sm font-semibold text-[var(--gold)]">
                {item.price}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
