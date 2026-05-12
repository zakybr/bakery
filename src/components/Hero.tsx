"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { fadeUp } from "@/lib/motion";

const headline = "Baked Fresh. Every Single Day.";

function WheatBackdrop() {
  return (
    <svg
      className="pointer-events-none absolute right-[-20%] top-1/2 h-[min(120vw,720px)] w-[min(120vw,720px)] -translate-y-1/2 text-[var(--brown-light)] opacity-[0.12] sm:right-[-10%] sm:opacity-[0.15]"
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M200 20c-8 40-8 80 0 120M180 40c12 36 12 72 0 108M220 40c-12 36-12 72 0 108M200 140v240"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <g key={deg} transform={`rotate(${deg} 200 200)`}>
          <path
            d="M200 60 Q215 95 200 130 Q185 95 200 60"
            fill="currentColor"
            opacity="0.35"
          />
        </g>
      ))}
      <ellipse cx="200" cy="340" rx="120" ry="14" fill="currentColor" opacity="0.08" />
    </svg>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const words = headline.split(" ");
  const childVariants = reduce
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : fadeUp;

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] items-center overflow-hidden bg-gradient-to-br from-[#FAF6F0] to-[#F0E6D3] px-3 pb-12 pt-24 sm:px-4 sm:pb-16 sm:pt-28 md:px-6 md:pb-20 md:pt-32"
    >
      <WheatBackdrop />
      <div className="text-[var(--text-primary)] relative z-[1] mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-2 md:items-center md:gap-12 lg:gap-16">
        <div>
          <p className="font-mono-accent mb-4 text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--brown-mid)] sm:mb-5 sm:text-xs">
            ★ Award-winning · Flat Bush, Auckland
          </p>
          <h1 className="font-display mb-5 max-w-xl text-[2.5rem] font-normal italic leading-[1.08] tracking-tight text-[var(--brown-dark)] sm:mb-6 sm:text-5xl md:text-6xl lg:text-[4.5rem]">
            <motion.span
              className="flex flex-wrap gap-x-2 gap-y-1"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: reduce ? { staggerChildren: 0 } : { staggerChildren: 0.1 },
                },
              }}
            >
              {words.map((word, i) => (
                <motion.span
                  key={`${word}-${i}`}
                  custom={i}
                  variants={childVariants}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </motion.span>
          </h1>
          <p className="mb-8 max-w-md text-base leading-relaxed text-[var(--text-muted)] sm:mb-10 sm:text-lg">
            Flat Bush&apos;s favourite bakery and cafe since day one. Real ingredients, real craft,
            real community.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Link
              href="#menu"
              className="bg-[var(--terracotta)] hover:bg-[color-mix(in_srgb,var(--terracotta)_88%,#000)] inline-flex min-h-12 w-full items-center justify-center rounded-full px-8 text-sm font-semibold tracking-wide text-white shadow-sm transition-colors sm:w-auto"
            >
              View our menu →
            </Link>
            <Link
              href="#find-us"
              className="border-[var(--brown-mid)] text-[var(--brown-dark)] hover:border-[var(--terracotta)] hover:text-[var(--terracotta)] inline-flex min-h-12 w-full items-center justify-center rounded-full border-2 bg-transparent px-8 text-sm font-semibold tracking-wide transition-colors sm:w-auto"
            >
              Find us
            </Link>
          </div>
        </div>
        <div className="relative hidden min-h-[200px] md:block" aria-hidden>
          <span className="font-display absolute bottom-8 right-4 text-[clamp(8rem,22vw,14rem)] font-bold leading-none text-[var(--brown-light)] opacity-10 select-none">
            01
          </span>
        </div>
      </div>
    </section>
  );
}
