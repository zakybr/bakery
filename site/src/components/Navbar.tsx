"use client";

import clsx from "clsx";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const textLinks = [
  { href: "#menu", label: "MENU" },
  { href: "#about", label: "ABOUT" },
  { href: "#find-us", label: "FIND US" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
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

  return (
    <>
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-stone-100 bg-white px-6 md:px-16 lg:px-24">
        <Link
          href="#hero"
          onClick={closeMenu}
          className="font-heading text-sm font-medium uppercase tracking-[0.15em] text-stone-900"
        >
          Bake Town
        </Link>

        <nav className="font-heading hidden items-center gap-8 md:flex" aria-label="Primary">
          <Link
            href="#menu"
            className="text-xs uppercase tracking-[0.12em] text-stone-500 transition-colors hover:text-stone-900"
          >
            MENU
          </Link>
          <span className="text-xs text-stone-300" aria-hidden>
            ·
          </span>
          <Link
            href="#about"
            className="text-xs uppercase tracking-[0.12em] text-stone-500 transition-colors hover:text-stone-900"
          >
            ABOUT
          </Link>
          <span className="text-xs text-stone-300" aria-hidden>
            ·
          </span>
          <Link
            href="#find-us"
            className="text-xs uppercase tracking-[0.12em] text-stone-500 transition-colors hover:text-stone-900"
          >
            FIND US
          </Link>
          <span className="text-xs text-stone-300" aria-hidden>
            ·
          </span>
          <Link
            href="#find-us"
            className="text-xs uppercase tracking-[0.12em] text-[#C4613A] hover:underline"
          >
            ORDER →
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex size-11 min-h-11 min-w-11 shrink-0 items-center justify-center text-stone-900 md:hidden"
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
      </header>

      <div
        id="mobile-nav"
        className={clsx(
          "fixed inset-0 z-40 flex flex-col bg-white pt-16 transition-opacity duration-300 md:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-hidden={!open}
      >
        <nav
          className="font-heading flex flex-1 flex-col items-center justify-center gap-2 px-6 py-16"
          aria-label="Mobile"
        >
          {textLinks.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              onClick={closeMenu}
              className="flex min-h-11 w-full max-w-xs items-center justify-center py-3 text-center text-xl font-light uppercase tracking-[0.18em] text-stone-900"
            >
              {label}
            </Link>
          ))}
          <Link
            href="#find-us"
            onClick={closeMenu}
            className="mt-4 flex min-h-11 items-center justify-center text-xl font-light uppercase tracking-[0.12em] text-[#C4613A]"
          >
            ORDER →
          </Link>
        </nav>
      </div>
    </>
  );
}
