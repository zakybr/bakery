"use client";

import Image from "next/image";
import {
  useScrollBodyFade,
  useScrollH2Fade,
  useScrollImageReveal,
} from "@/hooks/useScrollAnimation";

export function FindUs() {
  const imgRef = useScrollImageReveal<HTMLDivElement>();
  const labelRef = useScrollBodyFade<HTMLParagraphElement>();
  const headingRef = useScrollH2Fade<HTMLHeadingElement>();
  const bodyRef = useScrollBodyFade<HTMLDivElement>();
  const linkRef = useScrollBodyFade<HTMLDivElement>();

  return (
    <section id="find-us" className="scroll-mt-24 bg-white md:scroll-mt-28">
      <div className="mx-auto grid min-h-[70vh] max-w-[1600px] grid-cols-1 md:grid-cols-2">
        <div className="relative order-1 h-[56vw] min-h-[200px] w-full overflow-hidden md:order-none md:h-full md:min-h-[70vh]">
          <div ref={imgRef} className="absolute inset-0 h-full w-full">
            <Image
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80"
              alt="Bake Town Bakery cafe interior Flat Bush"
              fill
              className="h-full w-full object-cover"
              sizes="(max-width:768px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className="order-2 flex flex-col justify-center bg-white px-10 py-12 md:order-none md:py-20 md:pl-20 md:pr-16 lg:pl-24">
          <p
            ref={labelRef}
            className="font-heading mb-4 text-[11px] uppercase tracking-[0.2em] text-stone-400"
          >
            FIND US
          </p>
          <h2
            ref={headingRef}
            className="font-heading text-[clamp(36px,4vw,64px)] font-thin tracking-tight text-stone-900"
          >
            Come say hi.
          </h2>
          <div ref={bodyRef} className="mt-10 flex flex-col gap-1">
            <p className="text-base leading-loose text-stone-600">Flat Bush, Auckland</p>
            <p className="text-base leading-loose text-stone-600">
              (exact street address to be confirmed with the client)
            </p>
            <p className="text-base leading-loose text-stone-600">Mon–Fri: 5:30am – 4:00pm</p>
            <p className="text-base leading-loose text-stone-600">Sat–Sun: 6:00am – 2:00pm</p>
          </div>
          <div ref={linkRef} className="mt-10">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Flat+Bush+Auckland+NZ"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm tracking-wide text-stone-800 hover:underline"
            >
              Get directions →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
