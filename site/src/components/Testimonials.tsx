"use client";

import { useScrollBodyFade, useScrollHeadingClip } from "@/hooks/useScrollAnimation";

const items = [
  { quote: "Best pies in East Auckland, full stop.", author: "— SARAH M., FLAT BUSH" },
  { quote: "We come every Saturday morning. The kids love the donuts.", author: "— JAMES T., BOTANY" },
  { quote: "That steak and oyster pie needs to be on the menu permanently.", author: "— MIKE R., MANUKAU" },
] as const;

function TestimonialBlock({ quote, author }: { quote: string; author: string }) {
  const quoteRef = useScrollHeadingClip<HTMLParagraphElement>();
  const attrRef = useScrollBodyFade<HTMLParagraphElement>();

  return (
    <div className="mx-auto max-w-[720px] text-center">
      <span className="font-heading mb-4 block text-[80px] font-extralight leading-[0.6] text-[var(--border)]">
        &ldquo;
      </span>
      <p
        ref={quoteRef}
        className="font-heading mx-auto max-w-[720px] text-[clamp(18px,5vw,24px)] font-extralight leading-[1.4] text-[var(--text-primary)] md:text-[clamp(20px,3vw,32px)]"
      >
        {quote}
      </p>
      <p
        ref={attrRef}
        className="font-heading mt-4 text-[11px] uppercase tracking-[0.15em] text-[var(--text-muted)]"
      >
        {author}
      </p>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="bg-[var(--bg-secondary)] py-12 pl-[var(--page-padding-x)] pr-[var(--page-padding-x)] md:py-[var(--section-padding-y)] md:pl-[var(--page-padding-x)] md:pr-[var(--page-padding-x)]">
      <div className="mx-auto max-w-3xl">
        {items.map((item, i) => (
          <div key={item.quote}>
            <TestimonialBlock quote={item.quote} author={item.author} />
            {i < items.length - 1 ? (
              <div className="mx-auto my-[48px] h-px w-10 max-w-[40px] bg-[var(--border)]" aria-hidden />
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
