import Link from "next/link";

const nav = [
  { href: "#menu", label: "MENU" },
  { href: "#about", label: "ABOUT" },
  { href: "#find-us", label: "FIND US" },
];

export function Footer() {
  return (
    <footer className="bg-[var(--text-primary)] text-white">
      <div className="mx-auto max-w-[1600px] pt-10 pb-8 pl-[var(--page-padding-x)] pr-[var(--page-padding-x)]">
        <div className="flex flex-col items-start gap-5 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-6">
          <p className="font-heading text-[13px] font-medium uppercase tracking-[0.15em]">
            Bake Town Bakery &amp; Cafe
          </p>
          <nav className="flex flex-wrap items-center gap-4 md:gap-6" aria-label="Footer">
            {nav.map(({ href, label }, i) => (
              <span key={label} className="flex items-center gap-4 md:gap-6">
                {i > 0 ? (
                  <span className="text-[11px] text-white/40" aria-hidden>
                    ·
                  </span>
                ) : null}
                <Link href={href} className="footer-nav-link">
                  {label}
                </Link>
              </span>
            ))}
          </nav>
          <div className="flex w-full justify-start md:w-auto md:justify-end">
            <Link
              href="#find-us"
              className="font-heading inline-flex min-h-11 items-center text-[11px] uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-80"
            >
              ORDER →
            </Link>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-white/10 pt-5 text-[11px] text-white/40 md:mt-6 md:flex-row md:flex-wrap md:items-start md:justify-between md:gap-3">
          <p>© 2025 Bake Town Bakery &amp; Cafe</p>
          <p className="max-w-full leading-relaxed md:max-w-xl">
            Proudly serving Flat Bush · Botany · Ormiston · Manukau · Clover Park · East Auckland
          </p>
        </div>
      </div>
    </footer>
  );
}
