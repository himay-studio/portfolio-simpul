# Simpul

**Satu simpul, seribu gaya.**

Modern hijab scarf label for Gen Z and young millennial muslimah Indonesia.
Portfolio demo build by [Himay Studio](https://himaystudio.com). Fictional brand.

| | |
| --- | --- |
| Slug | `simpul` |
| Pages project | `himaystudio-portfolio-simpul` |
| Live domain | `portfolio-simpul.himaystudio.com` |
| Hero video | `public/video/hero-simpul.mp4` |

## Pipeline docs

| File | Owner | What it locks |
| --- | --- | --- |
| [`BRAND.md`](./BRAND.md) | Stage 1 | name, positioning, persona, tone, category realism, packaging keyword, 14 SKUs, articles, FAQ seed |
| [`DESIGN.md`](./DESIGN.md) | Stage 1 | colour tokens with 33 certified WCAG pairs, typography, spacing, zero radius, hero and navbar decision |
| [`ART-DIRECTION.md`](./ART-DIRECTION.md) | Stage 1 | the PHOTO DNA and NEGATIVE blocks every image prompt pastes verbatim, shot recipes, hero video prompt |
| [`LOGO.md`](./LOGO.md) | Stage 1 | logo concept, ready to run mark prompt, knockout variant, favicon set |
| [`LAYOUT-ARCHITECTURE.md`](./LAYOUT-ARCHITECTURE.md) | Stage 3 | the unique layout per surface with the reason attached, navbar and cart and shop mode decisions, page inventory, responsive contract |
| [`MEDIA.md`](./MEDIA.md) | Stage 3 | the contract Stage 4 executes, 74 assets, one distinct prompt per asset. **Generated**, edit `scripts/media-assets.mjs` and re-run `npm run media` |
| [`MEDIA-HOWTO.md`](./MEDIA-HOWTO.md) | Stage 3 | the human facing Google Flow tutorial, Bahasa Indonesia, with the per file checklist. **Generated** alongside `MEDIA.md` |

## Three decisions downstream stages must not quietly change

1. **The navbar is solid ivory from first paint.** The hero is dark graded, and the navbar is
   opaque from zero scroll so legibility never depends on hero brightness. See `DESIGN.md`
   section 6.
2. **Border radius is 0 everywhere**, except the mobile floating WhatsApp button.
3. **Every one of the 14 SKUs gets its own photograph.** No reused generic product image.

## Stack

Next.js 16 App Router with Tailwind v4, static export (`output: "export"`), deployed to
Cloudflare Pages as `himaystudio-portfolio-simpul`.

```bash
npm install
npm run dev           # local dev
npm run build         # static export into out/
npm run media         # regenerate MEDIA.md and MEDIA-HOWTO.md
npm run media:check   # assert every declared asset is used, and vice versa
```

`npm run media:check` reads the built `out/` HTML and compares every `data-media` path in
the markup against every path declared in `MEDIA.md`, in both directions. It is the guard
against an asset being generated for a slot that no longer exists, or a slot pointing at a
file nobody was ever asked to make.

## Stage 3 status

Layout first. All 43 routes are built and every media slot is an annotated placeholder
carrying its own generation brief. **No `<video>` or `<img>` in this build points at a file
that is not on disk** (R15), so nothing renders as a frozen dead element while the assets
are outstanding. Stage 5 swaps the placeholders for real elements once Stage 4 has landed
the 74 files at the exact paths `MEDIA.md` names.
