import Link from "next/link";

const nav = [
  { href: "#menu", label: "MENU" },
  { href: "#about", label: "ABOUT" },
  { href: "#find-us", label: "FIND US" },
];

export function Footer() {
  return (
    <footer className="bg-[var(--text-primary)] text-white">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid grid-cols-1 items-center gap-10 py-12 text-center md:grid-cols-3 md:gap-8 md:py-12 md:text-left">
          <p className="font-heading justify-self-center text-[13px] font-medium uppercase tracking-[0.15em] md:justify-self-start">
            Bake Town Bakery &amp; Cafe
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-4 md:justify-center md:gap-5" aria-label="Footer">
            {nav.map(({ href, label }, i) => (
              <span key={label} className="flex items-center gap-4 md:gap-5">
                {i > 0 ? (
                  <span className="text-[11px] text-white/40" aria-hidden>
                    ·
                  </span>
                ) : null}
                <Link href={href} className="footer-nav-link min-h-12 inline-flex items-center py-2">
                  {label}
                </Link>
              </span>
            ))}
          </nav>
          <div className="flex justify-center md:justify-end">
            <Link
              href="#find-us"
              className="font-heading min-h-12 inline-flex items-center py-2 text-[11px] uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-80"
            >
              ORDER →
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 border-t border-white/10 pt-6 pb-12 text-center text-[11px] text-white/40 md:flex-row md:justify-between md:pt-6 md:pb-12 md:text-left">
          <p>© 2025 Bake Town Bakery &amp; Cafe</p>
          <p className="max-w-xl leading-relaxed">
            Proudly serving Flat Bush · Botany · Ormiston · Manukau · Clover Park · East Auckland
          </p>
        </div>
      </div>
    </footer>
  );
}
