"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

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
      <div className="order-2 flex flex-col justify-center px-6 py-16 md:order-1 md:min-h-[100svh] md:px-[80px] md:py-24">
        <p
          ref={labelRef}
          className="font-heading mb-8 text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)]"
        >
          FLAT BUSH, AUCKLAND · EST. 2018
        </p>
        <h1 className="font-heading mb-10 text-[44px] font-extralight leading-none tracking-[-0.02em] text-[var(--text-primary)] md:mb-12 md:text-[88px]">
          <span ref={line1Ref} className="block">
            Baked
          </span>
          <span ref={line2Ref} className="block">
            Fresh.
          </span>
          <span ref={line3Ref} className="block">
            Daily.
          </span>
        </h1>
        <p
          ref={bodyRef}
          className="mb-12 max-w-[380px] text-base leading-[1.7] text-[var(--text-secondary)]"
        >
          Flat Bush&apos;s favourite award-winning bakery and cafe. Real ingredients, real craft —
          baked every morning before Auckland wakes up.
        </p>
        <div ref={linksRef} className="flex flex-wrap items-center gap-6">
          <Link href="#menu" className="editorial-link min-h-12 inline-flex items-center py-2">
            View our menu →
          </Link>
          <Link
            href="#find-us"
            className="editorial-link editorial-link--muted min-h-12 inline-flex items-center py-2"
          >
            Find us →
          </Link>
        </div>
      </div>

      <div className="relative order-1 h-[55vw] min-h-[220px] w-full overflow-hidden md:order-2 md:h-auto md:min-h-[100svh]">
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
    </section>
  );
}
