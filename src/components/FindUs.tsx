export function FindUs() {
  return (
    <section
      id="find-us"
      className="scroll-mt-24 bg-[var(--warm-white)] px-3 py-12 sm:px-4 sm:py-16 md:scroll-mt-28 md:px-6 md:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
        <div>
          <h2 className="font-display mb-6 text-3xl font-semibold text-[var(--brown-dark)] sm:mb-8 sm:text-4xl md:text-5xl">
            Find us
          </h2>
          <dl className="space-y-5 text-[var(--text-muted)] sm:space-y-6">
            <div>
              <dt className="font-mono-accent mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brown-mid)]">
                Address
              </dt>
              <dd className="text-base leading-relaxed sm:text-lg">
                Flat Bush, Auckland{" "}
                <span className="block text-sm text-[var(--text-muted)]">
                  (exact street address to be confirmed with the client)
                </span>
              </dd>
            </div>
            <div>
              <dt className="font-mono-accent mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brown-mid)]">
                Hours
              </dt>
              <dd className="text-base leading-relaxed sm:text-lg">
                Mon–Fri 5:30am – 4:00pm · Sat–Sun 6:00am – 2:00pm
              </dd>
            </div>
            <div>
              <dt className="font-mono-accent mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brown-mid)]">
                Phone
              </dt>
              <dd className="text-base leading-relaxed sm:text-lg">
                To be confirmed with the client — call us once we&apos;ve added your number here.
              </dd>
            </div>
          </dl>
          <p className="mt-8 text-base font-medium text-[var(--brown-dark)] sm:mt-10 sm:text-lg">
            Order ahead via phone or pop in — we&apos;d love to see you.
          </p>
        </div>
        <div
          className="flex min-h-[280px] items-center justify-center rounded-2xl bg-[var(--brown-light)] text-[var(--brown-dark)] shadow-inner sm:min-h-[320px] md:min-h-full"
          role="img"
          aria-label="Map placeholder — embed Google Maps when an API key is available"
        >
          <span className="font-mono-accent text-sm font-bold uppercase tracking-[0.4em] opacity-60">
            Map
          </span>
        </div>
      </div>
    </section>
  );
}
