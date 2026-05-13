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
      className="grid min-h-screen grid-cols-1 bg-white md:grid-cols-2"
    >
      <div className="order-2 flex w-full flex-col justify-center px-12 py-20 md:order-none md:px-16 lg:px-20">
        <p
          ref={labelRef}
          className="font-heading mb-7 text-xs uppercase tracking-widest text-stone-400"
        >
          FLAT BUSH, AUCKLAND · EST. 2018
        </p>
        <h1 className="font-heading m-0 text-[clamp(48px,7vw,88px)] font-thin leading-[0.95] tracking-tight text-stone-900">
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
          className="mt-8 max-w-sm text-base leading-relaxed text-stone-500"
        >
          Flat Bush&apos;s favourite award-winning bakery and cafe. Real ingredients, real craft —
          baked every morning before Auckland wakes up.
        </p>
        <div ref={linksRef} className="mt-10 flex flex-wrap items-center gap-7">
          <Link href="#menu" className="text-sm tracking-wide text-stone-800 hover:underline">
            View our menu →
          </Link>
          <Link href="#find-us" className="text-sm tracking-wide text-stone-500 hover:underline">
            Find us →
          </Link>
        </div>
      </div>

      <div className="relative order-1 h-[56vw] min-h-[200px] w-full overflow-hidden md:order-none md:h-full md:min-h-screen">
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
