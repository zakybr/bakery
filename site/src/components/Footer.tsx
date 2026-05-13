import Link from "next/link";

const nav = [
  { href: "#menu", label: "MENU" },
  { href: "#about", label: "ABOUT" },
  { href: "#find-us", label: "FIND US" },
];

export function Footer() {
  return (
    <footer className="bg-stone-900 text-white">
      <div className="mx-auto max-w-[1600px] px-6 py-12 md:px-16 lg:px-24">
        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-white/10 pb-8 max-md:flex-col max-md:items-start">
          <p className="font-heading text-[13px] font-medium uppercase tracking-[0.15em]">
            Bake Town Bakery &amp; Cafe
          </p>
          <nav className="flex flex-wrap items-center gap-4 md:gap-5" aria-label="Footer">
            {nav.map(({ href, label }, i) => (
              <span key={label} className="flex items-center gap-4 md:gap-5">
                {i > 0 ? (
                  <span className="text-[11px] text-white/40" aria-hidden>
                    ·
                  </span>
                ) : null}
                <Link
                  href={href}
                  className="font-heading text-[11px] uppercase tracking-[0.12em] text-white/50 transition-colors hover:text-white"
                >
                  {label}
                </Link>
              </span>
            ))}
          </nav>
          <div className="flex w-full justify-start md:w-auto md:justify-end">
            <Link
              href="#find-us"
              className="font-heading text-[11px] uppercase tracking-[0.12em] text-white hover:underline"
            >
              ORDER →
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 text-[11px] text-white/40">
          <p>© 2025 Bake Town Bakery &amp; Cafe</p>
          <p className="max-w-full leading-relaxed md:max-w-xl">
            Proudly serving Flat Bush · Botany · Ormiston · Manukau · Clover Park · East Auckland
          </p>
        </div>
      </div>
    </footer>
  );
}
