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
      <header
        className="fixed inset-x-0 top-0 z-50 border-b border-[var(--glass-border)] text-[var(--cream)]"
        style={{
          background: "rgba(10, 7, 5, 0.7)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">
          <Link
            href="#hero"
            onClick={closeMenu}
            className="group min-h-12 min-w-0 shrink-0 py-2 text-left"
          >
            <span className="font-display block text-xl font-normal italic leading-tight text-[var(--gold)] sm:text-2xl">
              Bake Town
            </span>
            <span className="font-mono-accent mt-0.5 block text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--cream-muted)] sm:text-xs">
              Bakery &amp; Cafe
            </span>
          </Link>

          <nav
            className="hidden items-center gap-7 font-mono-accent text-xs font-medium uppercase tracking-[0.12em] md:flex lg:gap-9"
            aria-label="Primary"
          >
            {textLinks.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className="nav-link-underline min-h-12 inline-flex items-center py-2"
              >
                {label}
              </Link>
            ))}
            <Link
              href="#find-us"
              className="btn-gold ml-1 inline-flex min-h-12 items-center rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.1em]"
            >
              Order
            </Link>
          </nav>

          <button
            type="button"
            className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-md text-[var(--cream)] md:hidden"
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
          "fixed inset-0 z-40 flex flex-col border-b border-[var(--glass-border)] pt-20 transition-transform duration-300 ease-out md:hidden",
          open ? "translate-y-0" : "-translate-y-full pointer-events-none"
        )}
        style={{
          background: "rgba(10, 7, 5, 0.92)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
        aria-hidden={!open}
      >
        <nav className="font-mono-accent flex flex-1 flex-col gap-1 px-6 py-6 text-sm font-medium uppercase tracking-[0.18em] text-[var(--cream)]">
          {textLinks.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              onClick={closeMenu}
              className="nav-link-underline flex min-h-12 items-center rounded-lg px-3 py-3"
            >
              {label}
            </Link>
          ))}
          <Link
            href="#find-us"
            onClick={closeMenu}
            className="btn-gold mt-3 inline-flex min-h-12 items-center justify-center rounded-full px-6 text-xs font-semibold uppercase tracking-[0.1em]"
          >
            Order
          </Link>
        </nav>
      </div>
    </>
  );
}
