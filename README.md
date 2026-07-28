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

## Three decisions downstream stages must not quietly change

1. **The navbar is solid ivory from first paint.** The hero is dark graded, and the navbar is
   opaque from zero scroll so legibility never depends on hero brightness. See `DESIGN.md`
   section 6.
2. **Border radius is 0 everywhere**, except the mobile floating WhatsApp button.
3. **Every one of the 14 SKUs gets its own photograph.** No reused generic product image.

## Stack

Next.js static export, TypeScript, deployed to Cloudflare Pages.
