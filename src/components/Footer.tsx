import Link from "next/link";

const links = [
  { href: "#menu", label: "Menu" },
  { href: "#about", label: "About" },
  { href: "#find-us", label: "Find us" },
  { href: "#find-us", label: "Order" },
];

export function Footer() {
  return (
    <footer className="bg-[var(--brown-dark)] px-3 py-10 text-[var(--cream)] sm:px-4 sm:py-12 md:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-6">
        <div className="shrink-0">
          <p className="font-display text-2xl font-bold text-[var(--warm-white)]">Bake Town</p>
          <p className="font-mono-accent mt-1 text-[10px] uppercase tracking-[0.22em] text-[color-mix(in_srgb,var(--cream)_65%,transparent)]">
            Bakery &amp; Cafe
          </p>
        </div>
        <nav
          className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-[color-mix(in_srgb,var(--cream)_88%,transparent)] md:justify-center"
          aria-label="Footer"
        >
          {links.map(({ href, label }) => (
            <Link key={label} href={href} className="hover:text-[var(--terracotta)] min-h-12 inline-flex items-center transition-colors">
              {label}
            </Link>
          ))}
        </nav>
        <p className="font-mono-accent text-xs text-[color-mix(in_srgb,var(--cream)_75%,transparent)] md:text-right">
          © 2025 Bake Town Bakery &amp; Cafe. All rights reserved.
        </p>
      </div>
      <p className="mx-auto mt-8 max-w-6xl text-center text-[11px] leading-relaxed text-[color-mix(in_srgb,var(--cream)_45%,transparent)] sm:mt-10 md:text-left">
        Proudly serving Flat Bush, Flat Bush, Ormiston, Botany, Manukau, Clover Park and surrounding
        East Auckland communities.
      </p>
    </footer>
  );
}
