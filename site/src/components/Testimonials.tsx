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
    <div className="text-center">
      <span className="font-heading block text-[120px] font-extralight leading-[0.5] text-[var(--border)]">
        &ldquo;
      </span>
      <p
        ref={quoteRef}
        className="font-heading mx-auto mt-2 max-w-[680px] text-[clamp(22px,4vw,32px)] font-extralight leading-snug text-[var(--text-primary)]"
      >
        {quote}
      </p>
      <p ref={attrRef} className="font-heading mt-8 text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
        {author}
      </p>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="bg-[var(--bg-secondary)] px-6 py-20 md:px-10 md:py-[100px]">
      <div className="mx-auto max-w-3xl">
        {items.map((item, i) => (
          <div key={item.quote}>
            <TestimonialBlock quote={item.quote} author={item.author} />
            {i < items.length - 1 ? (
              <div className="mx-auto my-[48px] h-px w-10 bg-[var(--border)]" aria-hidden />
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
