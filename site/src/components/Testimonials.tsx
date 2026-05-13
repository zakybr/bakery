"use client";

import { useScrollTestimonialBlock } from "@/hooks/useScrollAnimation";

const items = [
  { quote: "Best pies in East Auckland, full stop.", author: "— SARAH M., FLAT BUSH" },
  { quote: "We come every Saturday morning. The kids love the donuts.", author: "— JAMES T., BOTANY" },
  { quote: "That steak and oyster pie needs to be on the menu permanently.", author: "— MIKE R., MANUKAU" },
] as const;

function TestimonialItem({ quote, author }: { quote: string; author: string }) {
  const blockRef = useScrollTestimonialBlock<HTMLDivElement>();

  return (
    <div
      ref={blockRef}
      className="mx-auto flex max-w-2xl flex-col items-center text-center"
    >
      <span className="font-heading mb-4 block text-center text-7xl leading-none text-stone-300">
        &ldquo;
      </span>
      <p className="font-heading text-center text-[clamp(18px,2.5vw,28px)] font-thin leading-[1.5] text-stone-800">
        {quote}
      </p>
      <p className="font-heading mt-5 text-center text-[11px] uppercase tracking-[0.2em] text-stone-400">
        {author}
      </p>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="bg-[#F7F4F0] px-10 py-16 md:px-14 md:py-32 lg:px-20">
      <div className="mx-auto max-w-3xl">
        {items.map((item, i) => (
          <div key={item.quote}>
            <TestimonialItem quote={item.quote} author={item.author} />
            {i < items.length - 1 ? (
              <div
                className="mx-auto my-14 h-16 w-px bg-stone-300"
                aria-hidden
              />
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
