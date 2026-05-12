"use client";

import clsx from "clsx";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const links = [
  { href: "#menu", label: "MENU" },
  { href: "#about", label: "ABOUT" },
  { href: "#find-us", label: "FIND US" },
  { href: "#find-us", label: "ORDER" },
] as const;

export function Navbar() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const onHero = entry.isIntersecting && entry.intersectionRatio > 0.12;
        setSolid(!onHero);
      },
      { threshold: [0, 0.08, 0.12, 0.2, 0.35, 0.5, 1], rootMargin: "-56px 0px 0px 0px" }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const closeMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const effectiveSolid = solid || open;

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-300",
          effectiveSolid
            ? "bg-[var(--warm-white)] text-[var(--text-primary)] shadow-[0_8px_30px_rgba(44,26,14,0.08)]"
            : "bg-transparent text-white"
        )}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">
          <Link
            href="#hero"
            onClick={closeMenu}
            className="group min-h-12 min-w-0 shrink-0 py-2 text-left"
          >
            <span
              className={clsx(
                "font-display block text-xl font-bold leading-tight tracking-tight sm:text-2xl",
                !effectiveSolid && "drop-shadow-sm"
              )}
            >
              Bake Town
            </span>
            <span className="font-mono-accent text-[10px] font-medium uppercase tracking-[0.2em] text-current/80 sm:text-xs">
              Bakery & Cafe
            </span>
          </Link>

          <nav
            className="hidden items-center gap-6 font-mono-accent text-xs font-medium uppercase tracking-[0.18em] md:flex lg:gap-8"
            aria-label="Primary"
          >
            {links.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className="hover:text-[var(--terracotta)] min-h-12 inline-flex items-center transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-md md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span className="flex h-5 w-6 flex-col justify-center gap-1.5">
              <span
                className={clsx(
                  "h-0.5 w-full origin-center rounded-full bg-current transition-transform",
                  open && "translate-y-2 rotate-45"
                )}
              />
              <span
                className={clsx(
                  "h-0.5 w-full rounded-full bg-current transition-opacity",
                  open && "opacity-0"
                )}
              />
              <span
                className={clsx(
                  "h-0.5 w-full origin-center rounded-full bg-current transition-transform",
                  open && "-translate-y-2 -rotate-45"
                )}
              />
            </span>
          </button>
        </div>
      </header>

      <div
        id="mobile-nav"
        className={clsx(
          "fixed inset-0 z-40 flex flex-col bg-[var(--warm-white)] pt-20 transition-transform duration-300 ease-out md:hidden",
          open ? "translate-y-0" : "-translate-y-full pointer-events-none"
        )}
        aria-hidden={!open}
      >
        <nav className="font-mono-accent flex flex-1 flex-col gap-1 px-6 py-6 text-sm font-medium uppercase tracking-[0.2em] text-[var(--text-primary)]">
          {links.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              onClick={closeMenu}
              className="hover:bg-[var(--cream)] flex min-h-12 items-center rounded-lg px-3 py-3 transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
