"use client";

import Image from "next/image";
import { useScrollBodyFade, useScrollHeadingClip, useScrollImageScale } from "@/hooks/useScrollAnimation";

export function FindUs() {
  const imgRef = useScrollImageScale<HTMLDivElement>();
  const labelRef = useScrollBodyFade<HTMLParagraphElement>();
  const headingRef = useScrollHeadingClip<HTMLHeadingElement>();
  const bodyRef = useScrollBodyFade<HTMLDivElement>();
  const linkRef = useScrollBodyFade<HTMLDivElement>();

  return (
    <section id="find-us" className="scroll-mt-24 bg-[var(--bg-primary)] md:scroll-mt-28">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 md:grid-cols-2">
        <div className="relative order-1 h-[64vw] min-h-[200px] w-full max-w-full overflow-hidden md:order-1 md:h-auto md:min-h-[70vh]">
          <div ref={imgRef} className="absolute inset-0 h-full w-full">
            <Image
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80"
              alt="Bake Town Bakery cafe interior Flat Bush"
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className="order-2 flex flex-col justify-center py-10 pl-[var(--page-padding-x)] pr-[var(--page-padding-x)] md:py-20 md:pl-14 md:pr-[var(--page-padding-x)]">
          <p
            ref={labelRef}
            className="font-heading mb-3 text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)]"
          >
            FIND US
          </p>
          <h2
            ref={headingRef}
            className="font-heading mb-8 max-w-md text-[clamp(36px,4vw,64px)] font-extralight leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)]"
          >
            Come say hi.
          </h2>
          <div ref={bodyRef} className="max-w-md text-base leading-[2] text-[var(--text-secondary)]">
            <p>Flat Bush, Auckland</p>
            <p className="mt-1 text-sm text-[var(--text-muted)]">(exact street address to be confirmed with the client)</p>
            <p className="mt-6">Mon–Fri: 5:30am – 4:00pm</p>
            <p>Sat–Sun: 6:00am – 2:00pm</p>
          </div>
          <div ref={linkRef} className="mt-8">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Flat+Bush+Auckland+NZ"
              target="_blank"
              rel="noopener noreferrer"
              className="editorial-link"
            >
              Get directions →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
