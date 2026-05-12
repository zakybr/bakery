"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardTiltRef = useRef<HTMLDivElement>(null);
  const [tiltOk, setTiltOk] = useState(false);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const badge = badgeRef.current;
      const l1 = line1Ref.current;
      const l2 = line2Ref.current;
      const desc = descRef.current;
      const cta = ctaRef.current;
      const stats = statsRef.current;
      const card = cardRef.current;

      if (!badge || !l1 || !l2 || !desc || !cta || !stats || !card) return;

      if (reduce) {
        gsap.set([badge, l1, l2, desc, cta, stats, card], {
          opacity: 1,
          y: 0,
          clipPath: "none",
        });
        return;
      }

      gsap.set([l1, l2], { clipPath: "inset(100% 0 0 0)" });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(badge, { y: 20, opacity: 0, duration: 0.55, ease: "power2.out" }, 0.3);
      tl.to(
        l1,
        { clipPath: "inset(0% 0 0 0)", duration: 1, ease: "power4.out" },
        0.35
      );
      tl.to(
        l2,
        { clipPath: "inset(0% 0 0 0)", duration: 1, ease: "power4.out" },
        0.5
      );
      tl.from(desc, { y: 24, opacity: 0, duration: 0.75, ease: "power2.out" }, 0.6);
      tl.from(cta, { y: 24, opacity: 0, duration: 0.75, ease: "power2.out" }, 0.8);
      tl.from(stats, { y: 16, opacity: 0, duration: 0.6, ease: "power2.out" }, 0.95);
      tl.from(card, { y: 40, opacity: 0, duration: 1.2, ease: "power3.out" }, 0.4);
    },
    { scope: root }
  );

  useGSAP(() => {
    const mq = window.matchMedia("(pointer: fine) and (min-width: 768px)");
    const apply = () => setTiltOk(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, { scope: root });

  const handleTiltMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltOk || !cardTiltRef.current) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    const max = 8;
    const rx = -dy * max;
    const ry = dx * max;
    cardTiltRef.current.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };

  const handleTiltLeave = () => {
    if (cardTiltRef.current) {
      cardTiltRef.current.style.transform = "";
    }
  };

  return (
    <section
      ref={root}
      id="hero"
      className="relative min-h-[100svh] overflow-hidden bg-[#0A0705] px-3 pb-14 pt-24 sm:px-4 sm:pb-16 sm:pt-28 md:px-6 md:pb-20 md:pt-32"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(800px circle at 100% 100%, rgba(196, 97, 58, 0.12), transparent 55%),
            radial-gradient(600px circle at 0% 0%, rgba(201, 168, 76, 0.06), transparent 50%),
            linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
          `,
          backgroundSize: "auto, auto, 60px 60px, 60px 60px",
          backgroundPosition: "center, center, 0 0, 0 0",
        }}
        aria-hidden
      />

      <div className="relative z-[1] mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 md:min-h-[calc(100svh-7rem)] md:grid-cols-[55%_45%] md:gap-8 lg:gap-12">
        <div className="flex flex-col justify-center md:pr-4">
          <div
            ref={badgeRef}
            className="glass mb-6 inline-flex w-fit max-w-full border-[rgba(201,168,76,0.25)] px-3 py-2 sm:mb-8 sm:px-4"
          >
            <p className="font-mono-accent text-[11px] font-medium uppercase leading-snug tracking-[0.12em] text-[var(--cream)]">
              ★ New release · Award winning · Flat Bush, AKL
            </p>
          </div>

          <h1 className="font-display mb-6 text-[2.5rem] font-normal italic leading-[1.05] tracking-tight text-[var(--cream)] sm:mb-8 md:mb-8 md:text-[2.625rem] lg:text-[5rem] lg:leading-[1.02]">
            <span ref={line1Ref} className="block">
              The Steak &amp;
            </span>
            <span
              ref={line2Ref}
              className="mt-1 block font-bold text-[var(--gold)] sm:mt-2"
            >
              Oyster Pie.
            </span>
          </h1>

          <p
            ref={descRef}
            className="mb-8 max-w-md text-base leading-relaxed text-[var(--cream-muted)] sm:mb-10 sm:text-base"
          >
            Slow-braised steak. Hand-selected Bluff oysters. Buttery house pastry. Our boldest
            creation yet — available daily while stocks last.
          </p>

          <div
            ref={ctaRef}
            className="mb-8 flex w-full flex-col gap-3 sm:mb-10 sm:flex-row sm:flex-wrap sm:gap-4"
          >
            <Link
              href="#find-us"
              className="btn-gold font-mono-accent inline-flex min-h-12 w-full items-center justify-center rounded-full px-6 text-xs font-semibold uppercase tracking-[0.1em] sm:w-auto sm:px-8"
            >
              Order now →
            </Link>
            <Link
              href="#menu"
              className="glass btn-ghost-glass font-mono-accent inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[var(--glass-border)] px-6 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--cream)] sm:w-auto sm:px-8"
            >
              View full menu
            </Link>
          </div>

          <div
            ref={statsRef}
            className="font-mono-accent flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--cream-muted)] sm:text-[11px] sm:tracking-[0.16em]"
          >
            <span>★ 4.8 Google rating</span>
            <span className="hidden h-3 w-px bg-[rgba(255,255,255,0.15)] sm:inline-block" />
            <span>Baked fresh daily</span>
            <span className="hidden h-3 w-px bg-[rgba(255,255,255,0.15)] sm:inline-block" />
            <span>Est. Flat Bush</span>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <div
            ref={cardRef}
            onMouseMove={handleTiltMove}
            onMouseLeave={handleTiltLeave}
            className="glass group relative w-full max-w-[420px] overflow-hidden p-2 transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(201,168,76,0.15)] md:p-3"
            style={{ borderRadius: "16px" }}
          >
            <div
              ref={cardTiltRef}
              className="relative h-[280px] w-full overflow-hidden rounded-xl sm:h-[320px] md:h-[380px]"
              style={{ transition: "transform 0.3s ease" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80"
                alt="Golden steak and oyster pie at Bake Town Bakery Flat Bush Auckland"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 420px"
                priority
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-xl"
                style={{
                  background:
                    "linear-gradient(to top, rgba(10,7,5,0.9) 0%, transparent 60%)",
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                <span className="font-mono-accent mb-2 inline-block rounded-full bg-[var(--gold)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--bg-primary)]">
                  New drop
                </span>
                <p className="font-display text-2xl font-normal italic text-[var(--cream)]">
                  Steak &amp; Oyster Pie
                </p>
                <p className="mt-1 font-sans text-sm font-medium text-[var(--cream-muted)]">
                  $7.50
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
