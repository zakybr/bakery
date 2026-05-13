"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useScrollImageReveal } from "@/hooks/useScrollAnimation";

gsap.registerPlugin(useGSAP);

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const imageScrollRef = useScrollImageReveal<HTMLDivElement>();

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const label = labelRef.current;
      const l1 = line1Ref.current;
      const l2 = line2Ref.current;
      const l3 = line3Ref.current;
      const body = bodyRef.current;
      const links = linksRef.current;
      const imgInner = imageInnerRef.current;

      if (!label || !l1 || !l2 || !l3 || !body || !links || !imgInner) return;

      if (reduce) {
        gsap.set([label, l1, l2, l3, body, links], { opacity: 1, y: 0 });
        gsap.set(imgInner, { scale: 1 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from([label, l1, l2, l3, body, links], {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
      });
      tl.fromTo(
        imgInner,
        { scale: 1.05 },
        { scale: 1, duration: 1.4, ease: "power3.out" },
        0
      );
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="hero"
      className="grid min-h-[100svh] grid-cols-1 bg-[var(--bg-primary)] md:grid-cols-2"
    >
      <div className="order-2 flex flex-col justify-center gap-0 pt-10 pb-14 pl-[var(--page-padding-x)] pr-[var(--page-padding-x)] md:order-1 md:min-h-[100svh] md:py-[clamp(80px,10vw,140px)] md:pl-[clamp(32px,5vw,80px)] md:pr-[clamp(32px,5vw,80px)]">
        <p
          ref={labelRef}
          className="font-heading mb-7 text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)]"
        >
          FLAT BUSH, AUCKLAND · EST. 2018
        </p>
        <h1 className="font-heading m-0 font-extralight leading-[0.95] tracking-[-0.03em] text-[var(--text-primary)] [&>span]:mb-0">
          <span ref={line1Ref} className="block text-[clamp(40px,10vw,72px)] md:text-[88px]">
            Baked
          </span>
          <span ref={line2Ref} className="block text-[clamp(40px,10vw,72px)] md:text-[88px]">
            Fresh.
          </span>
          <span ref={line3Ref} className="block text-[clamp(40px,10vw,72px)] md:text-[88px]">
            Daily.
          </span>
        </h1>
        <p
          ref={bodyRef}
          className="mt-8 max-w-[380px] text-[15px] leading-[1.7] text-[var(--text-secondary)] md:text-base"
        >
          Flat Bush&apos;s favourite award-winning bakery and cafe. Real ingredients, real craft —
          baked every morning before Auckland wakes up.
        </p>
        <div ref={linksRef} className="mt-9 flex flex-wrap items-center gap-7">
          <Link href="#menu" className="editorial-link">
            View our menu →
          </Link>
          <Link href="#find-us" className="editorial-link editorial-link--muted">
            Find us →
          </Link>
        </div>
      </div>

      <div className="relative order-1 h-[55vw] min-h-[200px] w-full max-w-[100vw] overflow-hidden md:order-2 md:h-auto md:min-h-[100svh]">
        <div ref={imageScrollRef} className="absolute inset-0 h-full w-full">
          <div ref={imageInnerRef} className="absolute inset-0 h-full w-full will-change-transform">
            <Image
              src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1200&auto=format&fit=crop&q=80"
              alt="Artisan bread and baking at Bake Town Bakery Flat Bush"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
