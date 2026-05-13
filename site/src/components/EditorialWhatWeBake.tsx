"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollBodyFade, useScrollHeadingClip, useScrollImageScale } from "@/hooks/useScrollAnimation";

function ScalableImage({
  src,
  alt,
  aspectClass,
}: {
  src: string;
  alt: string;
  aspectClass: string;
}) {
  const ref = useScrollImageScale<HTMLDivElement>();
  return (
    <div className={`overflow-hidden ${aspectClass}`}>
      <div ref={ref} className="relative h-full min-h-0 w-full">
        <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
      </div>
    </div>
  );
}

export function EditorialWhatWeBake() {
  const labelRef = useScrollBodyFade<HTMLParagraphElement>();
  const headingRef = useScrollHeadingClip<HTMLHeadingElement>();
  const bodyRef = useScrollBodyFade<HTMLParagraphElement>();
  const linkRef = useScrollBodyFade<HTMLDivElement>();
  const heroImgRef = useScrollImageScale<HTMLDivElement>();

  return (
    <section id="menu" className="scroll-mt-24 bg-[var(--bg-primary)] px-6 py-20 md:scroll-mt-28 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-x-6 gap-y-14 md:gap-x-8 md:gap-y-20">
        <div className="col-span-12 overflow-hidden md:col-span-5">
          <div ref={heroImgRef} className="relative aspect-[3/4] w-full">
            <Image
              src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80"
              alt="Fresh bread and pastries at Bake Town Bakery"
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 40vw"
            />
          </div>
        </div>

        <div className="col-span-12 flex flex-col justify-center md:col-span-7 md:pl-8 lg:pl-16">
          <p
            ref={labelRef}
            className="font-heading mb-6 text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)]"
          >
            OUR MENU
          </p>
          <h2
            ref={headingRef}
            className="font-heading mb-8 max-w-xl text-[clamp(32px,5vw,64px)] font-extralight leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)]"
          >
            Pies. Pastries. Coffee. Cake.
          </h2>
          <p ref={bodyRef} className="mb-10 max-w-md text-[15px] leading-[1.7] text-[var(--text-secondary)]">
            Everything made in-house, every morning. No shortcuts, no compromises.
          </p>
          <div ref={linkRef}>
            <Link href="#menu-explore" className="editorial-link min-h-12 inline-flex items-center py-2">
              View full menu →
            </Link>
          </div>
        </div>

        <div id="menu-explore" className="col-span-12 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          <article>
            <ScalableImage
              aspectClass="aspect-square w-full"
              src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&auto=format&fit=crop&q=80"
              alt="Steak and cheese pie"
            />
            <h3 className="font-heading mt-6 text-base font-normal text-[var(--text-primary)]">
              Steak &amp; Cheese Pie
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-[var(--text-muted)]">
              Slow-cooked steak, golden pastry.
            </p>
          </article>
          <article>
            <ScalableImage
              aspectClass="aspect-square w-full"
              src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80"
              alt="Buttery croissant"
            />
            <h3 className="font-heading mt-6 text-base font-normal text-[var(--text-primary)]">Croissant</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-[var(--text-muted)]">
              Buttery layers, baked till golden.
            </p>
          </article>
          <article>
            <ScalableImage
              aspectClass="aspect-square w-full"
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80"
              alt="Cake slice"
            />
            <h3 className="font-heading mt-6 text-base font-normal text-[var(--text-primary)]">Cake &amp; slices</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-[var(--text-muted)]">
              Baked fresh for the cabinet daily.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
