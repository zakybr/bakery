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
      className="mx-auto flex max-w-[680px] flex-col items-center text-center max-sm:max-w-full max-sm:px-0"
    >
      <span className="font-heading mb-2 block text-center text-[72px] font-extralight leading-none text-[var(--border)]">
        &ldquo;
      </span>
      <p className="font-heading m-0 max-w-[680px] text-center text-[clamp(18px,5vw,24px)] font-extralight leading-[1.45] text-[var(--text-primary)] max-sm:max-w-full md:text-[clamp(20px,2.8vw,30px)]">
        {quote}
      </p>
      <p className="font-heading mt-5 text-center text-[11px] uppercase tracking-[0.15em] text-[var(--text-muted)]">
        {author}
      </p>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="bg-[var(--bg-secondary)] py-12 pl-[var(--page-padding-x)] pr-[var(--page-padding-x)] max-sm:py-12 md:py-[var(--section-gap)]">
      <div className="mx-auto max-w-3xl">
        {items.map((item, i) => (
          <div key={item.quote}>
            <TestimonialItem quote={item.quote} author={item.author} />
            {i < items.length - 1 ? (
              <span
                className="mx-auto my-12 block h-16 w-px bg-[var(--border)] max-sm:my-12"
                aria-hidden
              />
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
