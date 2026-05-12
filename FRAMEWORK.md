# Bakery Website Framework


This document is the full process. Follow it in order for every client. Each stage tells you what tool to open, what to do in it, and what done looks like before moving on.


---


## Before you start

You need four things set up once and never again.

Node.js installed on your machine. Download from nodejs.org if you do not have it.

A Cursor account with Claude available. This is your main building environment.

An Anthropic API key. Get it from console.anthropic.com. Set it in your terminal by running: export ANTHROPIC_API_KEY=your-key-here

A Resend account for contact form emails. Sign up free at resend.com. You will need to verify a sending domain — use your own domain, not the client's.


---


## Stage 1 — Understand the bakery

Time: 20 minutes
Tools: their existing website, their Instagram, Google Maps reviews

Open their current website. Open their Instagram. Read their Google reviews. You are not looking at design yet. You are answering four questions.

What is their signature product? The thing people mention by name in reviews. Sourdough, croissants, a specific cake, their coffee. This becomes the anchor of all copy.

What is their personality? Read how they write captions on Instagram. Are they earnest and craft-focused, cool and minimal, warm and community-rooted, or proud and editorial?

Who are their customers? Reviews will tell you. Parents grabbing pastries before school, couples on weekend brunch, office workers, foodies who travel for it.

What does their space look like? Find photos of the interior. This informs whether the website should feel cosy and warm or clean and architectural.

Write down one sentence describing what makes this bakery different from every other bakery in Auckland. If you cannot write that sentence, ask the client before continuing. That sentence becomes the hero headline.


---


## Stage 2 — Choose the archetype

Time: 5 minutes
Tools: your notes from Stage 1

Every bakery fits one of four archetypes. Pick the one that matches. This single decision shapes every visual choice that follows.

ARTISAN — Craft-first. Probably sourdough. Story matters. Customers are loyal and knowledgeable. Visual direction: dark, warm, textured. Serif headings. Moody photography. The site feels considered and slow.

MODERN — Design-conscious. Newer bakery, strong aesthetic, curated Instagram. Customers care about the experience as much as the food. Visual direction: clean, minimal, light. Sans-serif headings. Bright flat-lay photography. The site feels confident and sparse.

EDITORIAL — A destination. Known for one specific thing. Possibly featured in media. Customers talk about it. Visual direction: bold typography, strong colour use, magazine-feel. The site has a point of view.

NEIGHBOURHOOD — Community bakery. Everyone knows them. Open seven days. Warm and unpretentious. Regulars bring their kids. Visual direction: friendly, bright, rounded. The site feels like a welcome, not a brand statement.

Write the chosen archetype at the top of a notes document. Every decision from here references it.


---


## Stage 3 — Run the scaffold

Time: 5 minutes
Tools: Terminal, scaffold.ts (in this framework folder)

Open Terminal. Navigate to the bakery-framework folder. Run:

    npx tsx scaffold.ts https://theirbakery.co.nz

The script fetches their website, extracts colours from their CSS, pulls all text content, and sends it to Claude. Claude returns structured business data. The script writes a ready-to-open project into the clients folder.

When it finishes, the terminal prints everything it found and everything that still needs your input. Read this output. It tells you what was auto-filled and what to do next.

Done when: you see the success message and a new folder exists at clients/bakery-name.


---


## Stage 4 — Set up the CMS

Time: 15 minutes
Tools: sanity.io

Go to sanity.io. Create a free account. Click Create New Project. Name it after the bakery. Select the free plan. Copy the Project ID shown on the dashboard.

Open clients/bakery-name/.env.example. Duplicate this file and rename it .env.local. Paste the Project ID into the NEXT_PUBLIC_SANITY_PROJECT_ID field. Leave the dataset as production.

Go back to sanity.io. Add the client as a team member with Editor access using their email address. They will use this to manage content after handover.

Done when: .env.local has a real Project ID and the client has been invited.


---


## Stage 5 — Colours and fonts

Time: 20 minutes
Tools: Cursor, the archetype you chose, realtimecolors.com

Open clients/bakery-name/client.config.ts in Cursor. The scaffold has already filled in colours based on what it found on their existing site. Your job is to review and refine these to match the archetype direction.

Go to realtimecolors.com. This tool lets you test colour combinations on a live page preview. Use it to find a palette that feels right for the archetype before committing anything to code.

Colour rules that apply regardless of archetype:

The primary colour goes on headings and main buttons. It must be dark enough to read white text on top of it.

The accent colour is used sparingly for highlights, hover states, and badges. It must stand out clearly against the background.

The background and surface colours should be very close to each other — one is the page background, the other is card backgrounds. Never use pure white unless the archetype is Modern.

Do not use more than three colours visibly on the page. Primary, accent, and a mid-tone secondary. Everything else is tints of those.

Font direction per archetype:

Artisan: Playfair Display for headings, Lora for body. Feels considered and literary.

Modern: DM Sans for headings, Inter for body. Feels clean and contemporary.

Editorial: Cormorant Garamond for headings, Outfit for body. Feels confident and refined.

Neighbourhood: Nunito for headings, Source Sans 3 for body. Feels friendly and readable.

Update the fonts object in client.config.ts to match. Then open src/app/layout.tsx in Cursor and update the font imports at the top of the file to match. Ask Claude in Cursor to make that change if you are unsure of the syntax.

Done when: you run npm run dev and the homepage looks visually right for the archetype in terms of colour and type.


---


## Stage 6 — Images

Time: 30 to 60 minutes
Tools: squoosh.app, Canva, Vectorizer.ai (if needed)

This stage has more impact on the final quality than any code decision. Do not skip or rush it.

You need five images placed into clients/bakery-name/public/:

logo.svg — Ask the client for their logo file. If they only have a PNG or JPEG, go to vectorizer.ai and convert it to SVG for free. A blurry rasterised logo at small sizes looks unprofessional and is an immediate quality signal.

hero.jpg — The image that fills the entire screen on load. This must be 1920 pixels wide minimum. What the right image looks like depends on the archetype:

Artisan: close-up of hands working dough, or an overhead shot of a finished loaf. Dark background. No people looking at the camera.

Modern: bright, clean flat-lay of a single product on a neutral surface. Lots of negative space.

Editorial: a dramatic, full-frame shot of their signature product or an interior architectural shot. Should look like it belongs in a food magazine.

Neighbourhood: the shop counter or shop front with people in it. Warmth over perfection.

about.jpg — A photo inside the kitchen or a candid of the baker at work. Avoid posed shots.

og-image.jpg — This is the image that appears when someone shares the website on social media. Make it in Canva. Create a 1200 by 630 pixel canvas, fill it with the primary brand colour, centre the logo, add the bakery name in the heading font. Export as JPG. Fifteen minutes.

gallery images — You need at least seven product photos for the gallery section. Source these from their Instagram (ask permission), their Google Business Profile, or shoot them yourself. iPhone with natural window light and a clean surface is enough.

Once you have all images, run every JPG through squoosh.app before adding it to /public/. Set the format to WebP and quality to 80. Drag the quality slider down until the file is under 300KB while still looking sharp. Large images are the most common reason for a poor performance score.

Done when: all five required files are in /public/ and each is under 300KB.


---


## Stage 7 — Content

Time: 30 to 45 minutes
Tools: Cursor with Claude, Sanity Studio at localhost:3000/studio

Open the project in Cursor and run npm run dev. The site is now running at localhost:3000.

Open localhost:3000/studio in your browser. This is the Sanity content management interface. You will use it to add all menu items and gallery images.

Menu items: Go to Menu Item in the left panel. Create a new item for every product. At minimum fill in name, price, and category. Add a photo and description where you have them. Mark your three best items as Featured — these get a Popular badge.

Gallery images: Go to Gallery Image. Upload each product photo with a short caption. Set the display order so the best image appears first.

Testimonials: Go to Testimonial. Add at least three real customer reviews. Pull these from Google reviews or Facebook. Use the customer's real first name and last initial only.

About copy: Open src/components/sections/About.tsx in Cursor. Find the ABOUT_CONTENT object near the top of the file. Update the heading and two paragraphs. The heading should be specific to this bakery — not "Our Story" but something that captures what makes them different. The paragraphs should sound like a person talking, not a press release. Ask Claude in Cursor to help rewrite if needed, but give it the one-sentence bakery description you wrote in Stage 1 so it has something real to work from.

Hero copy: Open client.config.ts. Review the hero heading and subheading Claude generated from their existing site. The heading must name a location or a product or a specific differentiator. If it could apply to any bakery, rewrite it.

Done when: the site at localhost:3000 shows real content in every section with no placeholder text.


---


## Stage 8 — Archetype adjustments

Time: 20 minutes
Tools: Cursor with Claude

These are the structural changes that make each archetype look genuinely different. Tell Claude in Cursor which archetype you have chosen and ask it to apply the adjustments. Describe what you want in plain English — Claude knows the codebase.

If Artisan: ask Claude to make the hero overlay darker and moodier, to increase the spacing between sections by 25 percent, and to remove product images from non-featured menu cards so the menu reads as a proud simple list.

If Modern: ask Claude to change the hero layout to a two-column split with text on the left and a full-height photo on the right and no overlay, to remove the small eyebrow labels above section headings, and to simplify the footer to a single row.

If Editorial: ask Claude to make the hero headline much larger, to alternate the About and Testimonials section backgrounds so one uses the primary colour as a background with white text, and to make the gallery grid feel more intentional with the featured image spanning more space.

If Neighbourhood: ask Claude to move the Hours section to appear second on the page directly after the hero, and to change all button shapes from pill-shaped to softly rounded rectangles.

Review each change at localhost:3000 before moving on.

Done when: the site layout reflects the archetype structurally, not just in colour.


---


## Stage 9 — Quality check

Time: 30 minutes
Tools: Chrome DevTools, webaim.org/resources/contrastchecker, search.google.com/test/rich-results

Check every section at these five screen widths. Use Chrome DevTools device toolbar to switch between them.

375 pixels — iPhone SE. The smallest screen you will encounter. Check that hero text does not overflow, that buttons are full width, that the nav menu opens and closes correctly.

430 pixels — iPhone 15 Pro Max. Check that the gallery grid looks intentional rather than collapsed.

768 pixels — iPad. Check that two-column layouts switch correctly and that the menu grid uses two columns.

1280 pixels — Laptop. This is where most visitors will see it.

1440 pixels — Wide desktop. Check that content does not stretch too wide and that max-width containers are centred.

Open Chrome DevTools, go to the Lighthouse tab, and run an audit on the production build. You need to run npm run build and then npm start first for accurate scores. Target 90 or above on all four categories.

If Performance is below 90, the cause is almost always images. Run them through squoosh again.

If Accessibility is below 90, open the report and it will tell you exactly which elements failed. The most common issue is text colour not having enough contrast against its background. Check any combination that looks marginal at webaim.org/resources/contrastchecker.

If SEO is below 100, the report tells you exactly what is missing. Fix each item it lists.

Open search.google.com/test/rich-results and paste the localhost URL. Confirm it detects a Bakery entity with address, hours, and phone number. If anything is missing, cross-check that client.config.ts has that field filled in correctly.

Test the contact form. Submit a message and confirm it arrives at the client's email address. If it does not arrive, check that the RESEND_API_KEY in .env.local is correct and that your sending domain is verified in the Resend dashboard.

Load /sitemap.xml in the browser and confirm the homepage URL appears.

Done when: Lighthouse scores are 90 or above across all four categories, the Rich Results test passes, the contact form delivers email, and the site looks correct at all five screen widths.


---


## Stage 10 — Deploy

Time: 20 minutes
Tools: Vercel

Create a Vercel account using the client's email address. They will own this hosting account — you are setting it up for them.

Connect the GitHub repository to Vercel, or deploy directly from Cursor's terminal by running vercel --prod.

In the Vercel project dashboard go to Settings then Environment Variables. Add the same three variables that are in the client's .env.local file: the Sanity Project ID, the Sanity dataset, and the Resend API key. Without these the site will build but the CMS content and contact form will not work.

Trigger a new deployment after adding the variables. Vercel does not apply environment variables retroactively to existing builds.

Add the custom domain in Vercel under Settings then Domains. Vercel gives you the DNS records to add. Log into wherever the client's domain is registered and add those records. SSL provisions automatically within five minutes of the DNS propagating.

Once the live URL is working, open it and run through the quality checklist one more time on the real domain.

Submit the live URL to Google Search Console using the client's Google account. Click Request Indexing on the homepage. This tells Google the site exists and to crawl it.

Done when: the site loads on the custom domain with HTTPS, Sanity Studio works at yourdomain.com/studio with the client's credentials, and the contact form works on the live domain.


---


## Stage 11 — Handover

Time: 15 minutes
Tools: Sanity Studio, screen share

Do a 15-minute screen share with the client. Show them three things only.

How to update a menu price: open Studio, click Menu Item, find the item, change the number, click Publish. Done in 60 seconds.

How to add a gallery photo: open Studio, click Gallery Image, click Create New, upload the photo, click Publish.

How to read a contact form submission: check their email. That is where submissions go.

Tell them one thing they must not forget: their domain renews annually and they will get an email reminder. Do not let it lapse.

Send them their Sanity Studio login and the live URL. Done.


---


## The tools, summarised

realtimecolors.com — test colour palettes before touching code. Free.

vectorizer.ai — convert a PNG logo to SVG. Free tier is enough.

squoosh.app — compress images before adding to the project. Free, runs in the browser.

Canva — create the OG social share image. Free tier is enough.

sanity.io — the CMS. Client manages all content here after handover. Free for up to three users.

vercel.com — hosting and deployment. Free tier covers a small bakery indefinitely.

resend.com — contact form email delivery. Free for 3000 emails per month.

realtimecolors.com — already listed above, worth repeating because colour decisions need to be tested visually before committing to code.

Chrome DevTools Lighthouse — the quality audit tool built into Chrome. No account needed.

webaim.org/resources/contrastchecker — checks whether text colour has enough contrast against its background to meet accessibility standards.

search.google.com/test/rich-results — confirms the Local Business structured data is valid and Google can read it.

Cursor with Claude — where all code is written and modified. You describe what you want in plain English and Claude makes the change.
