export function Awards() {
  const cards = [
    {
      icon: "🏆",
      title: "Award-Winning Baking",
      body: "Recognised as one of East Auckland's top local bakeries.",
    },
    {
      icon: "⭐",
      title: "4.8 Star Rating",
      body: "Consistently rated by our loyal Flat Bush community.",
    },
    {
      icon: "🥧",
      title: "Baked Fresh Daily",
      body: "Every single product made in-house from scratch, every morning.",
    },
  ];

  return (
    <section className="bg-[var(--cream)] px-3 py-12 sm:px-4 sm:py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display mb-10 text-center text-3xl font-semibold text-[var(--brown-dark)] sm:mb-12 sm:text-4xl md:text-5xl">
          Why Flat Bush Chooses Us
        </h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6 lg:gap-8">
          {cards.map((c) => (
            <article
              key={c.title}
              className="rounded-2xl border border-[color-mix(in_srgb,var(--brown-light)_40%,transparent)] bg-[var(--warm-white)] px-5 py-8 text-center shadow-sm sm:px-6 sm:py-10"
            >
              <div className="mb-4 text-4xl sm:mb-5 sm:text-5xl" aria-hidden>
                {c.icon}
              </div>
              <h3 className="font-display mb-3 text-xl font-semibold text-[var(--brown-dark)] sm:text-2xl">
                {c.title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">{c.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
