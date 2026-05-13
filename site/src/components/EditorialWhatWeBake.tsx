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
    <div className="relative aspect-square w-full overflow-hidden">
      <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
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
    <section id="menu" className="scroll-mt-24 bg-white py-24 md:scroll-mt-28 md:py-32">
      <div className="mx-auto max-w-[1600px] px-10 md:px-14 lg:px-20">
        <div className="grid grid-cols-1 gap-0 md:grid-cols-2 md:gap-12">
          <div className="w-full overflow-hidden">
            <div
              ref={portraitRef}
              className="relative aspect-[3/4] w-full min-h-[220px] md:min-h-0"
            >
              <Image
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80"
                alt="Fresh bread and pastries at Bake Town Bakery"
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 45vw"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center py-16 md:py-24">
            <p
              ref={labelRef}
              className="font-heading mb-5 text-[11px] uppercase tracking-[0.18em] text-stone-400"
            >
              OUR MENU
            </p>
            <h2
              ref={headingRef}
              className="font-heading mb-0 text-[clamp(32px,4vw,60px)] font-thin leading-tight tracking-tight text-stone-900"
            >
              Pies. Pastries. Coffee. Cake.
            </h2>
            <p ref={bodyRef} className="mt-7 max-w-xs text-base leading-relaxed text-stone-500">
              Everything made in-house, every morning. No shortcuts, no compromises.
            </p>
            <div ref={linkRef} className="mt-9">
              <Link
                href="#menu-explore"
                className="text-sm tracking-wide text-stone-800 hover:underline"
              >
                View full menu →
              </Link>
            </div>
          </div>
        </div>

        <div
          id="menu-explore"
          ref={productGridRef}
          className="mt-16 grid grid-cols-1 gap-8 pb-24 pt-16 sm:grid-cols-2 md:grid-cols-3"
        >
          <article className="flex min-w-0 flex-col gap-0">
            <ProductImage
              src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&auto=format&fit=crop&q=80"
              alt="Steak and cheese pie"
            />
            <h3 className="font-heading mt-4 text-sm font-medium text-stone-800">
              Steak &amp; Cheese Pie
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-stone-400">
              Slow-cooked steak, golden pastry.
            </p>
          </article>
          <article className="flex min-w-0 flex-col gap-0">
            <ProductImage
              src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80"
              alt="Buttery croissant"
            />
            <h3 className="font-heading mt-4 text-sm font-medium text-stone-800">Croissant</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-stone-400">
              Buttery layers, baked till golden.
            </p>
          </article>
          <article className="flex min-w-0 flex-col gap-0 sm:col-span-2 md:col-span-1">
            <ProductImage
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80"
              alt="Cake slice"
            />
            <h3 className="font-heading mt-4 text-sm font-medium text-stone-800">Cake &amp; slices</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-stone-400">
              Baked fresh for the cabinet daily.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
