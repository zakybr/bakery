"use client";

import { useFadeUp, useSlideIn } from "@/hooks/useScrollAnimation";

export function FindUs() {
  const titleRef = useFadeUp(0);
  const infoRef = useSlideIn("left");
  const mapRef = useSlideIn("right");

  return (
    <section
      id="find-us"
      className="scroll-mt-24 bg-[var(--bg-secondary)] px-3 py-12 sm:px-4 sm:py-16 md:scroll-mt-28 md:px-6 md:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
        <div ref={infoRef}>
          <div ref={titleRef}>
            <h2 className="font-display mb-6 text-3xl font-semibold text-[var(--cream)] sm:mb-8 sm:text-4xl md:text-5xl">
              Find us
            </h2>
          </div>
          <dl className="space-y-5 text-[var(--cream-muted)] sm:space-y-6">
            <div>
              <dt className="font-mono-accent mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
                Address
              </dt>
              <dd className="text-base leading-relaxed text-[var(--cream)] sm:text-lg">
                Flat Bush, Auckland{" "}
                <span className="block text-sm text-[var(--cream-muted)]">
                  (exact street address to be confirmed with the client)
                </span>
              </dd>
            </div>
            <div>
              <dt className="font-mono-accent mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
                Hours
              </dt>
              <dd className="text-base leading-relaxed sm:text-lg">
                Mon–Fri 5:30am – 4:00pm · Sat–Sun 6:00am – 2:00pm
              </dd>
            </div>
            <div>
              <dt className="font-mono-accent mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
                Phone
              </dt>
              <dd className="text-base leading-relaxed sm:text-lg">
                To be confirmed with the client — call us once we&apos;ve added your number here.
              </dd>
            </div>
          </dl>
          <p className="mt-8 text-base font-medium text-[var(--cream)] sm:mt-10 sm:text-lg">
            Order ahead via phone or pop in — we&apos;d love to see you.
          </p>
        </div>
        <div
          ref={mapRef}
          className="glass flex min-h-[280px] items-center justify-center sm:min-h-[320px] md:min-h-full"
          role="img"
          aria-label="Map placeholder — embed Google Maps when an API key is available"
        >
          <span className="font-mono-accent text-sm font-bold uppercase tracking-[0.4em] text-[var(--cream-muted)]">
            Map
          </span>
        </div>
      </div>
    </section>
  );
}
