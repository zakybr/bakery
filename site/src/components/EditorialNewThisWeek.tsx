"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollBodyFade, useScrollHeadingClip, useScrollImageScale } from "@/hooks/useScrollAnimation";

export function EditorialNewThisWeek() {
  const imgRef = useScrollImageScale<HTMLDivElement>();
  const tagRef = useScrollBodyFade<HTMLParagraphElement>();
  const headingRef = useScrollHeadingClip<HTMLHeadingElement>();
  const bodyRef = useScrollBodyFade<HTMLParagraphElement>();
  const linkRef = useScrollBodyFade<HTMLDivElement>();

  return (
    <section className="bg-[var(--bg-secondary)]">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 md:grid-cols-5">
        <div className="relative order-1 h-[64vw] min-h-[200px] w-full max-w-full overflow-hidden md:order-1 md:col-span-3 md:h-auto md:min-h-[85vh]">
          <div ref={imgRef} className="absolute inset-0 h-full w-full">
            <Image
              src="https://images.unsplash.com/photo-1585325701956-60dd9c8553bc?w=1000&auto=format&fit=crop&q=80"
              alt="Steak and oyster pie at Bake Town Bakery"
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 60vw"
            />
          </div>
        </div>

        <div className="order-2 flex flex-col justify-center py-10 pl-[var(--page-padding-x)] pr-[var(--page-padding-x)] md:order-2 md:col-span-2 md:py-20 md:pl-14 md:pr-[var(--page-padding-x)]">
          <p
            ref={tagRef}
            className="font-heading mb-5 inline-block w-fit border border-[var(--terracotta)] px-[14px] py-[5px] text-[11px] uppercase tracking-[0.15em] text-[var(--terracotta)]"
          >
            NEW THIS WEEK
          </p>
          <h2
            ref={headingRef}
            className="font-heading mb-6 max-w-sm text-[clamp(36px,9vw,56px)] font-extralight leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)]"
          >
            <span className="block">Steak &amp;</span>
            <span className="block">Oyster Pie.</span>
          </h2>
          <p ref={bodyRef} className="mb-7 max-w-[320px] text-[15px] leading-[1.7] text-[var(--text-secondary)]">
            Slow-braised beef, hand-selected Bluff oysters, rich gravy — wrapped in our signature buttery
            pastry. Limited daily. Worth the early start.
          </p>
          <div ref={linkRef}>
            <Link
              href="#find-us"
              className="font-heading inline-flex min-h-11 items-center text-[13px] text-[var(--terracotta)] underline-offset-4 hover:underline"
            >
              Add to order →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
