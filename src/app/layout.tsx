import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { JsonLdScript } from "next-seo";
import CursorGlow from "@/components/CursorGlow";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://baketownbakery.co.nz"),
  title: "Bake Town Bakery & Cafe | Award-Winning Bakery in Flat Bush, Auckland",
  description:
    "Bake Town Bakery & Cafe — Flat Bush's favourite award-winning local bakery and cafe. Fresh pies, pastries, cakes and coffee baked daily in East Auckland. Visit us in Flat Bush.",
  keywords: [
    "bakery Flat Bush",
    "cafe Flat Bush",
    "bakery East Auckland",
    "pies Auckland",
    "fresh bread Flat Bush",
    "best bakery Auckland",
    "Bake Town Bakery",
    "award winning bakery NZ",
    "Flat Bush food",
    "Clover Park bakery",
    "pastries East Auckland",
    "steak and oyster pie Auckland",
  ],
  openGraph: {
    title: "Bake Town Bakery & Cafe | Flat Bush, Auckland",
    description:
      "Award-winning fresh baking in the heart of Flat Bush. Pies, pastries, cakes, coffee — baked fresh every day.",
    type: "website",
    locale: "en_NZ",
    url: "https://baketownbakery.co.nz",
    images: [
      {
        url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&h=630&q=80",
        width: 1200,
        height: 630,
        alt: "Fresh baking at Bake Town Bakery and Cafe Flat Bush Auckland",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: "Bake Town Bakery & Cafe" }],
  creator: "Bake Town Bakery & Cafe",
};

const bakeryJsonLd = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: "Bake Town Bakery & Cafe",
  description: "Award-winning bakery and cafe in Flat Bush, East Auckland",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Flat Bush",
    addressRegion: "Auckland",
    addressCountry: "NZ",
  },
  priceRange: "$",
  servesCuisine: "Bakery, Cafe",
  openingHours: "Mo-Fr 05:30-16:00, Sa-Su 06:00-14:00",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-NZ" className="h-full antialiased">
      <body className={`${inter.variable} min-h-full flex flex-col font-sans`}>
        <JsonLdScript scriptKey="bakery-jsonld" data={bakeryJsonLd} />
        <SmoothScroll>
          <CursorGlow />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
