#!/usr/bin/env tsx
/**
 * Usage: npx tsx scaffold.ts <url> [client-slug]
 * Example: npx tsx scaffold.ts https://flourandstone.co.nz flour-and-stone
 *
 * What it does:
 *  1. Fetches the bakery's existing website
 *  2. Extracts HTML content, meta tags, and CSS colour hints
 *  3. Sends everything to Claude to extract structured business data
 *  4. Writes a populated client.config.ts
 *  5. Copies the template into clients/[slug]/ ready to run
 */

import Anthropic from "@anthropic-ai/sdk";
import * as cheerio from "cheerio";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

// ─── Config ──────────────────────────────────────────────────────────────────

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
if (!ANTHROPIC_API_KEY) {
  console.error("Error: ANTHROPIC_API_KEY environment variable not set.");
  process.exit(1);
}

const [, , inputUrl, slugArg] = process.argv;
if (!inputUrl) {
  console.error("Usage: npx tsx scaffold.ts <url> [client-slug]");
  process.exit(1);
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATE_DIR = path.join(__dirname, "template");
const CLIENTS_DIR  = path.join(__dirname, "clients");

// ─── Helpers ─────────────────────────────────────────────────────────────────

function slugify(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function copyDirSync(src: string, dest: string) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(s, d);
    } else {
      fs.copyFileSync(s, d);
    }
  }
}

async function fetchText(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; BakeryScaffold/1.0)" },
      signal: AbortSignal.timeout(10_000),
    });
    return res.ok ? res.text() : null;
  } catch {
    return null;
  }
}

// Extract up to N external stylesheets and pull colour values from them
async function extractCssColors(html: string, baseUrl: string): Promise<string[]> {
  const $ = cheerio.load(html);
  const hrefs: string[] = [];
  $('link[rel="stylesheet"]').each((_, el) => {
    const href = $(el).attr("href");
    if (href) hrefs.push(href);
  });

  const hexRegex = /#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g;
  const colorCounts: Record<string, number> = {};

  for (const href of hrefs.slice(0, 3)) {
    const cssUrl = href.startsWith("http") ? href : new URL(href, baseUrl).toString();
    const css = await fetchText(cssUrl);
    if (!css) continue;
    for (const match of css.matchAll(hexRegex)) {
      const hex = match[0].toUpperCase();
      // Skip near-white and near-black — not brand colours
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      const brightness = (r + g + b) / 3;
      if (brightness > 230 || brightness < 25) continue;
      colorCounts[hex] = (colorCounts[hex] ?? 0) + 1;
    }
  }

  return Object.entries(colorCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([hex]) => hex);
}

// Pull the most useful text from the page for Claude
function extractPageContent(html: string): string {
  const $ = cheerio.load(html);

  // Remove noise
  $("script, style, noscript, iframe, nav, footer").remove();

  const title       = $("title").text().trim();
  const description = $('meta[name="description"]').attr("content") ?? "";
  const ogTitle     = $('meta[property="og:title"]').attr("content") ?? "";
  const ogDesc      = $('meta[property="og:description"]').attr("content") ?? "";

  // Collect meaningful text blocks
  const blocks: string[] = [];
  $("h1, h2, h3, h4, p, li, address, [class*='hour'], [class*='time'], [class*='menu'], [class*='price']").each((_, el) => {
    const text = $(el).text().replace(/\s+/g, " ").trim();
    if (text.length > 10) blocks.push(text);
  });

  // Deduplicate and limit size
  const unique = [...new Set(blocks)].slice(0, 120);

  return [
    `PAGE TITLE: ${title}`,
    `META DESCRIPTION: ${description}`,
    `OG TITLE: ${ogTitle}`,
    `OG DESCRIPTION: ${ogDesc}`,
    "",
    "PAGE TEXT CONTENT:",
    unique.join("\n"),
  ].join("\n");
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const url = inputUrl.startsWith("http") ? inputUrl : `https://${inputUrl}`;
console.log(`\nFetching ${url}...`);

const html = await fetchText(url);
if (!html) {
  console.error("Could not fetch the website. Check the URL and try again.");
  process.exit(1);
}

const [pageContent, cssColors] = await Promise.all([
  extractPageContent(html),
  extractCssColors(html, url),
]);

console.log(`Extracted page content. CSS colours found: ${cssColors.join(", ") || "none"}`);
console.log("Sending to Claude for analysis...");

// ─── Claude extraction ────────────────────────────────────────────────────────

const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

const systemPrompt = `You are a web developer building a professional bakery website.
You will be given scraped content from an existing bakery website and must extract
structured business data. Return ONLY a valid JSON object — no markdown, no commentary.
If a field cannot be determined from the content, use a sensible default for an Auckland bakery.`;

const userPrompt = `
Extract all business data from this bakery website and return a JSON object matching this exact shape.
Use the CSS colours list to determine brand colours where possible. If colours are not recognisable brand
colours, pick warm, professional bakery-appropriate colours.

CSS COLOURS FOUND ON SITE: ${cssColors.length ? cssColors.join(", ") : "none found — choose appropriate defaults"}

WEBSITE URL: ${url}

${pageContent}

Return this exact JSON shape (fill every field):
{
  "name": "Full bakery name",
  "tagline": "Their slogan or tagline, or a short evocative phrase",
  "shortName": "Short name for nav/logo",
  "colors": {
    "primary": "#hex — darkest brand colour, used for headings and CTAs",
    "secondary": "#hex — mid-tone brand colour",
    "accent": "#hex — highlight/warm colour",
    "bg": "#hex — page background (near white, warm)",
    "surface": "#hex — card background (slightly off-white)",
    "text": "#hex — body text (near black)",
    "textMuted": "#hex — secondary text (medium grey)"
  },
  "fonts": {
    "heading": "GoogleFontName_With_Underscores e.g. Playfair_Display",
    "body": "GoogleFontName e.g. Inter"
  },
  "business": {
    "address": "Full street address",
    "suburb": "Suburb name",
    "city": "Auckland",
    "country": "New Zealand",
    "postcode": "NNNN",
    "phone": "+64 X XXX XXXX",
    "email": "hello@domain.co.nz",
    "googleMapsUrl": "https://maps.google.com/?q=...",
    "googleMapsEmbed": "REPLACE_WITH_EMBED_ID",
    "geo": { "lat": -36.85, "lng": 174.76 }
  },
  "hours": [
    { "days": "Monday – Friday", "times": "7:00am – 5:00pm" },
    { "days": "Saturday", "times": "7:30am – 4:00pm" },
    { "days": "Sunday", "times": "8:00am – 2:00pm" }
  ],
  "social": {
    "instagram": "full URL or null",
    "facebook": "full URL or null",
    "tiktok": null
  },
  "hero": {
    "heading": "Compelling hero headline (their city/area + what makes them special)",
    "subheading": "1–2 sentence supporting description",
    "ctaPrimary": { "label": "View Our Menu", "href": "/#menu" },
    "ctaSecondary": { "label": "Order Online", "href": "#" }
  },
  "seo": {
    "titleTemplate": "%s | [Short Name]",
    "titleFull": "[Full Name] — [Type] in [Suburb], Auckland",
    "description": "150 char SEO meta description with location and key products",
    "keywords": ["bakery auckland", "artisan bakery [suburb]", "sourdough auckland"],
    "ogImage": "/og-image.jpg",
    "siteUrl": "${url.replace(/\/$/, "")}"
  },
  "menuItems": [
    { "name": "Item name", "price": 0.00, "category": "Bread|Pastries|Cakes & Slices|Beverages|Savoury", "description": "short desc", "featured": false }
  ],
  "aboutParagraphs": [
    "First paragraph about the bakery story",
    "Second paragraph about their approach or philosophy"
  ],
  "orderingUrl": "external ordering URL or empty string",
  "googleAnalyticsId": ""
}`;

const message = await client.messages.create({
  model: "claude-opus-4-7",
  max_tokens: 4096,
  messages: [{ role: "user", content: userPrompt }],
  system: systemPrompt,
});

const rawJson = (message.content[0] as { type: string; text: string }).text.trim();

let extracted: Record<string, unknown>;
try {
  extracted = JSON.parse(rawJson);
} catch {
  console.error("Claude returned invalid JSON. Raw response saved to debug.json");
  fs.writeFileSync(path.join(__dirname, "debug.json"), rawJson);
  process.exit(1);
}

// ─── Write client.config.ts ───────────────────────────────────────────────────

const slug = slugArg ?? slugify(String(extracted.name ?? "bakery"));
const clientDir = path.join(CLIENTS_DIR, slug);

if (fs.existsSync(clientDir)) {
  console.error(`clients/${slug}/ already exists. Delete it or provide a different slug.`);
  process.exit(1);
}

console.log(`Scaffolding project at clients/${slug}/...`);
copyDirSync(TEMPLATE_DIR, clientDir);

const c = extracted as {
  name: string; tagline: string; shortName: string;
  colors: Record<string,string>; fonts: Record<string,string>;
  business: Record<string,unknown>; hours: {days:string;times:string}[];
  social: Record<string,string|null>; hero: Record<string,unknown>;
  seo: Record<string,unknown>; menuItems: unknown[];
  aboutParagraphs: string[]; orderingUrl: string; googleAnalyticsId: string;
};

const config = `/**
 * CLIENT CONFIGURATION — ${c.name}
 * Generated by scaffold.ts from ${url}
 * Review every field before going live. Fields marked TODO need manual input.
 */

export const clientConfig = {
  name:      ${JSON.stringify(c.name)},
  tagline:   ${JSON.stringify(c.tagline)},
  shortName: ${JSON.stringify(c.shortName)},
  logoPath:  "/logo.svg", // TODO: add logo to /public/

  colors: {
    primary:   ${JSON.stringify(c.colors.primary)},
    secondary: ${JSON.stringify(c.colors.secondary)},
    accent:    ${JSON.stringify(c.colors.accent)},
    bg:        ${JSON.stringify(c.colors.bg)},
    surface:   ${JSON.stringify(c.colors.surface)},
    text:      ${JSON.stringify(c.colors.text)},
    textMuted: ${JSON.stringify(c.colors.textMuted)},
  },

  fonts: {
    heading: ${JSON.stringify(c.fonts.heading)},
    body:    ${JSON.stringify(c.fonts.body)},
  },

  business: {
    address:         ${JSON.stringify(c.business.address)},
    suburb:          ${JSON.stringify(c.business.suburb)},
    city:            ${JSON.stringify(c.business.city)},
    country:         ${JSON.stringify(c.business.country)},
    postcode:        ${JSON.stringify(c.business.postcode)},
    phone:           ${JSON.stringify(c.business.phone)},
    email:           ${JSON.stringify(c.business.email)},
    googleMapsUrl:   ${JSON.stringify(c.business.googleMapsUrl)},
    googleMapsEmbed: ${JSON.stringify(c.business.googleMapsEmbed)}, // TODO: replace with actual embed ID
    geo: { lat: ${(c.business.geo as {lat:number}).lat}, lng: ${(c.business.geo as {lng:number}).lng} },
  },

  hours: ${JSON.stringify(c.hours, null, 4).replace(/^/gm, "  ").trimStart()},

  social: {
    instagram: ${JSON.stringify(c.social.instagram)},
    facebook:  ${JSON.stringify(c.social.facebook)},
    tiktok:    null,
  },

  nav: [
    { label: "Home",     href: "/" },
    { label: "Menu",     href: "/#menu" },
    { label: "About",    href: "/#about" },
    { label: "Gallery",  href: "/#gallery" },
    { label: "Find Us",  href: "/#contact" },
  ],

  hero: {
    heading:    ${JSON.stringify((c.hero as {heading:string}).heading)},
    subheading: ${JSON.stringify((c.hero as {subheading:string}).subheading)},
    ctaPrimary:   { label: "View Our Menu", href: "/#menu" },
    ctaSecondary: { label: "Order Online",  href: ${JSON.stringify(c.orderingUrl || "#")} },
    imagePath: "/hero.jpg", // TODO: add hero image to /public/
  },

  seo: {
    titleTemplate: ${JSON.stringify((c.seo as {titleTemplate:string}).titleTemplate)},
    titleFull:     ${JSON.stringify((c.seo as {titleFull:string}).titleFull)},
    description:   ${JSON.stringify((c.seo as {description:string}).description)},
    keywords:      ${JSON.stringify(c.seo.keywords)},
    ogImage:       "/og-image.jpg", // TODO: add 1200x630 OG image to /public/
    siteUrl:       ${JSON.stringify((c.seo as {siteUrl:string}).siteUrl)},
  },

  googleAnalyticsId: ${JSON.stringify(c.googleAnalyticsId)},
  orderingUrl:       ${JSON.stringify(c.orderingUrl)},
  bookingUrl:        "",
} as const;

export type ClientConfig = typeof clientConfig;
`;

fs.writeFileSync(path.join(clientDir, "client.config.ts"), config);

// ─── Write Sanity seed data ───────────────────────────────────────────────────

const seedData = {
  menuItems: c.menuItems,
  aboutParagraphs: c.aboutParagraphs,
};
fs.writeFileSync(
  path.join(clientDir, "sanity-seed.json"),
  JSON.stringify(seedData, null, 2)
);

// ─── Summary ──────────────────────────────────────────────────────────────────

console.log(`
✓ Project scaffolded at: clients/${slug}/

Auto-filled:
  • Business name, tagline, address, phone, email
  • Brand colours (from CSS analysis + Claude)
  • Trading hours
  • Social links
  • Hero headline & subheading
  • SEO title, description, keywords
  • ${(c.menuItems as unknown[]).length} menu items → clients/${slug}/sanity-seed.json

Manual TODO (check client.config.ts):
  • /public/logo.svg      — add client logo
  • /public/hero.jpg      — add hero image (1920×1080+)
  • /public/about.jpg     — add about/kitchen photo
  • /public/og-image.jpg  — add OG image (1200×630)
  • googleMapsEmbed       — replace with actual Google Maps embed ID
  • About section copy    — review/edit in src/components/sections/About.tsx
  • Menu items            — import sanity-seed.json into Sanity Studio

Next steps:
  cd clients/${slug}
  cp .env.example .env.local   # fill in Sanity + Resend keys
  npm install
  npm run dev
`);
