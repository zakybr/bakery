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
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg-primary)]">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-6 py-4 md:px-10">
          <Link
            href="#hero"
            onClick={closeMenu}
            className="font-heading min-h-12 shrink-0 py-2 text-[14px] font-medium uppercase tracking-[0.15em] text-[var(--text-primary)]"
          >
            Bake Town
          </Link>

          <nav
            className="font-heading hidden items-center gap-5 md:flex"
            aria-label="Primary"
          >
            <Link
              href="#menu"
              className="min-h-12 inline-flex items-center py-2 text-[12px] font-normal uppercase tracking-[0.12em] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
            >
              MENU
            </Link>
            <span className="select-none text-[12px] text-[var(--text-muted)]" aria-hidden>
              ·
            </span>
            <Link
              href="#about"
              className="min-h-12 inline-flex items-center py-2 text-[12px] font-normal uppercase tracking-[0.12em] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
            >
              ABOUT
            </Link>
            <span className="select-none text-[12px] text-[var(--text-muted)]" aria-hidden>
              ·
            </span>
            <Link
              href="#find-us"
              className="min-h-12 inline-flex items-center py-2 text-[12px] font-normal uppercase tracking-[0.12em] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
            >
              FIND US
            </Link>
            <span className="select-none text-[12px] text-[var(--text-muted)]" aria-hidden>
              ·
            </span>
            <Link
              href="#find-us"
              className="min-h-12 inline-flex items-center py-2 text-[12px] font-normal uppercase tracking-[0.12em] text-[var(--terracotta)] transition-opacity hover:opacity-80"
            >
              ORDER →
            </Link>
          </nav>

          <button
            type="button"
            className="inline-flex min-h-12 min-w-12 items-center justify-center text-[var(--text-primary)] md:hidden"
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
          "fixed inset-0 z-40 flex flex-col bg-[var(--bg-primary)] pt-24 transition-opacity duration-300 md:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-hidden={!open}
      >
        <nav
          className="font-heading flex flex-1 flex-col items-center justify-center gap-2 px-6 py-24"
          aria-label="Mobile"
        >
          {textLinks.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              onClick={closeMenu}
              className="flex min-h-12 w-full max-w-xs items-center justify-center py-3 text-center text-xl font-light uppercase tracking-[0.18em] text-[var(--text-primary)]"
            >
              {label}
            </Link>
          ))}
          <Link
            href="#find-us"
            onClick={closeMenu}
            className="mt-6 min-h-12 inline-flex items-center justify-center text-xl font-light uppercase tracking-[0.12em] text-[var(--terracotta)]"
          >
            ORDER →
          </Link>
        </nav>
      </div>
    </>
  );
}
