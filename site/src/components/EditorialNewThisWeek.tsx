"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollBodyFade, useScrollH2Fade, useScrollImageReveal } from "@/hooks/useScrollAnimation";

export function EditorialNewThisWeek() {
  const imgRef = useScrollImageReveal<HTMLDivElement>();
  const tagRef = useScrollBodyFade<HTMLParagraphElement>();
  const headingRef = useScrollH2Fade<HTMLHeadingElement>();
  const bodyRef = useScrollBodyFade<HTMLParagraphElement>();
  const linkRef = useScrollBodyFade<HTMLDivElement>();

  return (
    <section className="min-h-[80vh] bg-[#F7F4F0]">
      <div className="mx-auto grid min-h-[80vh] max-w-[1600px] grid-cols-1 md:grid-cols-2">
        <div className="relative order-1 h-[56vw] min-h-[200px] w-full overflow-hidden md:order-none md:h-full md:min-h-[80vh]">
          <div ref={imgRef} className="absolute inset-0 h-full w-full">
            <Image
              src="https://images.unsplash.com/photo-1585325701956-60dd9c8553bc?w=1000&auto=format&fit=crop&q=80"
              alt="Steak and oyster pie at Bake Town Bakery"
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className="order-2 flex flex-col justify-center bg-[#F7F4F0] px-10 py-12 md:order-none md:py-20 md:pl-20 md:pr-16 lg:pl-24 lg:pr-24">
          <p
            ref={tagRef}
            className="font-heading mb-6 inline-block w-fit border border-[#C4613A] px-3 py-1.5 text-[11px] uppercase tracking-[0.15em] text-[#C4613A]"
          >
            NEW THIS WEEK
          </p>
          <h2
            ref={headingRef}
            className="font-heading text-[clamp(36px,4.5vw,60px)] font-thin leading-[1.0] tracking-tight text-stone-900"
          >
            <span className="block">Steak &amp;</span>
            <span className="block">Oyster Pie.</span>
          </h2>
          <p ref={bodyRef} className="mt-7 max-w-xs text-[15px] leading-relaxed text-stone-500">
            Slow-braised beef, hand-selected Bluff oysters, rich gravy — wrapped in our signature buttery
            pastry. Limited daily. Worth the early start.
          </p>
          <div ref={linkRef} className="mt-9">
            <Link
              href="#find-us"
              className="text-sm tracking-wide text-[#C4613A] hover:underline"
            >
              Add to order →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
