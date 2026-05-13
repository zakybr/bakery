"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useScrollBodyFade,
  useScrollH2Fade,
  useScrollImageReveal,
  useStaggerProductGrid,
} from "@/hooks/useScrollAnimation";

function ProductImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="h-[56vw] w-full max-w-full overflow-hidden md:aspect-square md:h-auto md:min-h-0">
      <div className="relative h-full min-h-[160px] w-full md:min-h-0">
        <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width:768px) 50vw, 33vw" />
      </div>
    </div>
  );
}

export function EditorialWhatWeBake() {
  const labelRef = useScrollBodyFade<HTMLParagraphElement>();
  const headingRef = useScrollH2Fade<HTMLHeadingElement>();
  const bodyRef = useScrollBodyFade<HTMLParagraphElement>();
  const linkRef = useScrollBodyFade<HTMLDivElement>();
  const portraitRef = useScrollImageReveal<HTMLDivElement>();
  const productGridRef = useStaggerProductGrid<HTMLDivElement>();

  return (
    <section id="menu" className="scroll-mt-24 bg-[var(--bg-primary)] pt-[var(--section-gap)] pb-0 md:scroll-mt-28">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-12 gap-x-6 gap-y-0 md:gap-x-6">
          <div className="col-span-12 w-full max-w-full overflow-hidden md:col-span-5 md:pl-[var(--page-padding-x)]">
            <div
              ref={portraitRef}
              className="relative h-[70vw] min-h-[220px] w-full max-w-full md:aspect-[3/4] md:h-auto md:min-h-0"
            >
              <Image
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80"
                alt="Fresh bread and pastries at Bake Town Bakery"
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 40vw"
              />
            </div>
          </div>

          <div className="col-span-12 flex flex-col justify-center px-[var(--page-padding-x)] py-10 md:col-span-7 md:px-[var(--page-padding-x)] md:py-[clamp(48px,6vw,96px)]">
            <p
              ref={labelRef}
              className="font-heading mb-5 text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)]"
            >
              OUR MENU
            </p>
            <h2
              ref={headingRef}
              className="font-heading mb-7 max-w-xl text-[clamp(36px,4vw,64px)] font-extralight leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)]"
            >
              Pies. Pastries. Coffee. Cake.
            </h2>
            <p ref={bodyRef} className="mb-9 max-w-md text-[15px] leading-[1.7] text-[var(--text-secondary)]">
              Everything made in-house, every morning. No shortcuts, no compromises.
            </p>
            <div ref={linkRef}>
              <Link href="#menu-explore" className="editorial-link">
                View full menu →
              </Link>
            </div>
          </div>

          <div
            id="menu-explore"
            ref={productGridRef}
            className="col-span-12 mt-[clamp(48px,6vw,80px)] grid w-full max-w-full grid-cols-2 gap-x-[clamp(16px,2.5vw,32px)] gap-y-0 px-[var(--page-padding-x)] pb-[var(--section-gap)] md:grid-cols-3"
          >
            <article className="min-w-0">
              <ProductImage
                src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&auto=format&fit=crop&q=80"
                alt="Steak and cheese pie"
              />
              <h3 className="font-heading mt-4 text-[15px] font-medium text-[var(--text-primary)]">
                Steak &amp; Cheese Pie
              </h3>
              <p className="mb-0 mt-1.5 text-[13px] leading-relaxed text-[var(--text-muted)]">
                Slow-cooked steak, golden pastry.
              </p>
            </article>
            <article className="min-w-0">
              <ProductImage
                src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80"
                alt="Buttery croissant"
              />
              <h3 className="font-heading mt-4 text-[15px] font-medium text-[var(--text-primary)]">Croissant</h3>
              <p className="mb-0 mt-1.5 text-[13px] leading-relaxed text-[var(--text-muted)]">
                Buttery layers, baked till golden.
              </p>
            </article>
            <article className="col-span-2 min-w-0 md:col-span-1">
              <ProductImage
                src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80"
                alt="Cake slice"
              />
              <h3 className="font-heading mt-4 text-[15px] font-medium text-[var(--text-primary)]">Cake &amp; slices</h3>
              <p className="mb-0 mt-1.5 text-[13px] leading-relaxed text-[var(--text-muted)]">
                Baked fresh for the cabinet daily.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
