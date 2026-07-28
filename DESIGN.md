# DESIGN.md, Simpul

Design system for `portfolio-simpul`. Stage 1 output, Brand Strategist.
This is the single source of truth for colour, type, spacing, and shape. Stage 3 and Stage 5
implement it as written. Every contrast number in section 3 was computed, not estimated.

---

## 1. Design thesis

Simpul is a gallery wall, and the scarves are the paintings.

The chrome is deliberately quiet: a warm ivory canvas, near black type, one deep indigo for
structure, and a single brass accent for the one detail the category actually cares about, the
metal logo plate at the corner of a scarf. All of the colour on this site comes from product
photography. That is how Buttonscarves wins in this exact market, and it is the correct answer
for a brand whose entire inventory is fourteen colourway families.

Three formal moves make it read modern rather than generic:

1. **Zero radius, everywhere.** Sharp corners on cards, buttons, inputs, and image frames. R10.
   Combined with hairline rules instead of soft shadows, this reads editorial print, not SaaS.
2. **A high contrast serif against a geometric Indonesian sans.** Fraunces for display, Plus
   Jakarta Sans for everything else.
3. **Generous vertical rhythm.** Sections breathe at 96px and 128px on desktop. Space is the
   luxury signal in this category, not ornament.

This system is derived from Simpul's own category realism, not lifted from another portfolio.
Token naming convention was informed by looking across several shipped workspace sites, the
values are all new.

---

## 2. Colour tokens

```css
:root {
  /* Surfaces */
  --ivory:        #FAF6F0;  /* page canvas, warm off white */
  --white:        #FFFFFF;  /* cards, product tiles, inputs */
  --sand:         #EFE6D9;  /* warm neutral section band */
  --tint:         #DCE4EF;  /* cool section band, chips, quiet callouts */

  /* Type */
  --ink:          #15181E;  /* primary text, headings */
  --ink-soft:     #4C5462;  /* secondary text, captions, meta */

  /* Brand structure */
  --brand:        #23375C;  /* Indigo Tinta. nav, secondary buttons, links, focus */
  --brand-deep:   #16233B;  /* footer, dark surfaces, dark bands */

  /* Signature accent, NON interactive only */
  --gold:         #8C5F14;  /* Kuningan. rating stars, badges, rules, the logo plate motif */

  /* Sales CTA, R5. Deliberately separate from --brand */
  --cta:          #12694A;  /* green, every sales and conversion button */
  --cta-hover:    #0E5539;

  /* Lines and state */
  --line:         #E4DCD0;  /* decorative hairline only, never a control border */
  --line-strong:  #8F7E66;  /* input and control borders, meets 3:1 */
  --focus:        #23375C;  /* focus ring, 3px solid, 2px offset */
  --danger:       #A3231B;  /* form errors, out of stock */

  /* Hero */
  --hero-scrim-from: rgba(21, 24, 30, 0);
  --hero-scrim-to:   rgba(21, 24, 30, 0.55);
}
```

### Role rules, so the palette cannot be misused

| Token | Allowed use | Forbidden |
| --- | --- | --- |
| `--brand` | navbar text on ivory, links, secondary and ghost buttons, focus ring, active states | never a sales CTA background |
| `--cta` | sales and conversion buttons only: Beli, Pesan, Tambah ke Keranjang, Checkout, Konsultasi, WhatsApp CTA | never a navigation link, never a section background |
| `--gold` | rating stars, small badge text, decorative rules, the brass plate detail | **never an interactive element, never a button, never a link.** Keeps it from competing with `--cta` |
| `--line` | decorative dividers between rows | never an input border, it is 1.31:1 and would be invisible as a control edge |
| `--line-strong` | every input, select, checkbox, quantity stepper, and card border that carries meaning | not needed for purely decorative rules |
| `--sand` / `--tint` | alternating section bands to break a long page | never both in adjacent sections |

The reason `--gold` is walled off from interactivity: R5 mandates a green sales CTA, and a
brass accent that is also clickable would compete with it and muddy the conversion path. Gold
emphasises, green converts, indigo navigates. One job each.

---

## 3. Certified contrast pairs

Computed with the WCAG 2.1 relative luminance formula. **33 pairs, 0 failures.** Text pairs are
held to 4.5:1 per R20, UI and control pairs to 3:1.

| Pair | Ratio | Required | Result |
| --- | --- | --- | --- |
| `--ink` on `--ivory` | 16.51:1 | 4.5 | PASS |
| `--ink` on `--white` | 17.78:1 | 4.5 | PASS |
| `--ink` on `--sand` | 14.38:1 | 4.5 | PASS |
| `--ink` on `--tint` | 13.87:1 | 4.5 | PASS |
| `--ink-soft` on `--ivory` | 7.09:1 | 4.5 | PASS |
| `--ink-soft` on `--white` | 7.63:1 | 4.5 | PASS |
| `--ink-soft` on `--sand` | 6.17:1 | 4.5 | PASS |
| `--ink-soft` on `--tint` | 5.95:1 | 4.5 | PASS |
| `--brand` on `--ivory` | 11.00:1 | 4.5 | PASS |
| `--brand` on `--white` | 11.85:1 | 4.5 | PASS |
| `--brand` on `--sand` | 9.59:1 | 4.5 | PASS |
| `--brand` on `--tint` | 9.25:1 | 4.5 | PASS |
| `--gold` on `--ivory` | 5.18:1 | 4.5 | PASS |
| `--gold` on `--white` | 5.58:1 | 4.5 | PASS |
| `--gold` on `--sand` | 4.52:1 | 4.5 | PASS |
| `--cta` on `--ivory` | 6.20:1 | 4.5 | PASS |
| `--cta` on `--white` | 6.68:1 | 4.5 | PASS |
| `--danger` on `--ivory` | 6.93:1 | 4.5 | PASS |
| `--danger` on `--white` | 7.46:1 | 4.5 | PASS |
| `--white` on `--cta` | 6.68:1 | 4.5 | PASS |
| `--white` on `--cta-hover` | 8.83:1 | 4.5 | PASS |
| `--white` on `--brand` | 11.85:1 | 4.5 | PASS |
| `--ivory` on `--brand` | 11.00:1 | 4.5 | PASS |
| `--ivory` on `--brand-deep` | 14.58:1 | 4.5 | PASS |
| `--white` on `--brand-deep` | 15.70:1 | 4.5 | PASS |
| `--tint` on `--brand-deep` | 12.25:1 | 4.5 | PASS |
| `--ivory` on hero scrim composite `#3A3833` | 10.88:1 | 4.5 | PASS |
| `--line-strong` on `--ivory` | 3.65:1 | 3 | PASS |
| `--line-strong` on `--white` | 3.93:1 | 3 | PASS |
| `--line-strong` on `--sand` | 3.18:1 | 3 | PASS |
| `--brand` on `--ivory` as UI edge | 11.00:1 | 3 | PASS |
| `--cta` on `--ivory` as UI edge | 6.20:1 | 3 | PASS |
| `--gold` on `--ivory` as UI edge | 5.18:1 | 3 | PASS |

**Two pairs that must never be built**, both verified as failures and listed here so nobody
reintroduces them:

- `--gold` on `--brand-deep` is 3.36:1. **Gold text is forbidden on the dark footer.** Footer
  text is `--ivory` or `--tint`.
- `--line` on `--ivory` is 1.31:1. **`--line` is never a control border.** Use `--line-strong`.

---

## 4. Typography

Two families, both on Google Fonts, both with Latin Extended so Indonesian copy renders clean.

```css
:root {
  --font-display: 'Fraunces', ui-serif, Georgia, serif;
  --font-body:    'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
}
```

**Display, Fraunces.** Variable, weights 300 to 700. Set the optical size axis, and keep the
character axes neutral so it reads elegant rather than quirky:

```css
.display { font-family: var(--font-display); font-variation-settings: 'SOFT' 0, 'WONK' 0; }
```

Used for: h1, h2, h3, product names, price figures, pull quotes. Nothing else.

**Body and UI, Plus Jakarta Sans.** Weights 400, 500, 600, 700. Designed in Indonesia, which is
a real and defensible fit for an Indonesian label, and it is highly legible at small sizes.

Used for: body copy, nav, buttons, labels, form fields, tables, badges, meta.

### Scale

Fluid with `clamp()`, mobile first. Ratio is roughly a major third.

| Token | Size | Line height | Tracking | Family |
| --- | --- | --- | --- | --- |
| `--t-display-xl` | `clamp(2.5rem, 6vw, 4.5rem)` | 1.05 | -0.02em | display |
| `--t-display-l` | `clamp(2rem, 4.5vw, 3.25rem)` | 1.10 | -0.015em | display |
| `--t-h2` | `clamp(1.625rem, 3vw, 2.25rem)` | 1.15 | -0.01em | display |
| `--t-h3` | `clamp(1.25rem, 2vw, 1.5rem)` | 1.25 | -0.005em | display |
| `--t-body-l` | `1.125rem` | 1.65 | 0 | body |
| `--t-body` | `1rem` | 1.70 | 0 | body |
| `--t-small` | `0.875rem` | 1.55 | 0 | body |
| `--t-eyebrow` | `0.75rem` | 1.40 | 0.14em, uppercase | body, weight 600 |

Body copy measure is capped at 68 characters. Never set body copy in the display serif.

---

## 5. Shape, spacing, elevation

### Shape, R10

```css
:root { --radius: 0; }
```

**Border radius is 0 on every element.** Cards, buttons, inputs, selects, modals, images,
badges, chips, thumbnails, the mega menu panel. The single exception in the whole build is the
mobile floating WhatsApp button, which stays an oval. On desktop that button is a rectangular
pill with the icon plus a CTA label per R45, and a pill at radius 0 means a sharp rectangle.

### Spacing

4px base. `--s-1: 4px`, then 8, 12, 16, 24, 32, 48, 64, 96, 128.

- Section padding: 64px mobile, 96px tablet, 128px desktop, vertical.
- Container: max width 1200px, gutter 20px mobile, 32px desktop.
- Grid: 12 columns desktop, 6 tablet, 4 mobile, 24px gutter.
- Minimum tap target 44x44px with a visible gap between neighbours. R47.

### Elevation

No large soft shadows. They belong to a rounded aesthetic and would fight the zero radius.

```css
--shadow-flat:  none;                                    /* default for cards */
--shadow-lift:  0 12px 28px -18px rgba(21, 24, 30, .35); /* hover on product cards only */
--shadow-panel: 0 18px 40px -24px rgba(21, 24, 30, .40); /* mega menu, modal, dropdown */
```

Cards are separated by a 1px `--line-strong` border, not by a shadow. Hover raises a product
card 2px with `--shadow-lift` and a 200ms ease.

### Motion

- Standard transition: 200ms `cubic-bezier(.2,.6,.2,1)`.
- Panel and drawer reveal: 260ms, grid rows 0fr to 1fr, plus a chevron rotate. R12, R32.
- Scroll reveal: 12px rise plus fade, 500ms, staggered 60ms.
- Page transition: 220ms cross fade. R46.
- Everything above is wrapped in `@media (prefers-reduced-motion: reduce)` and collapses to no
  transform and no fade.

---

## 6. Hero and navbar, the locked R31 decision

This section exists because Bersihara and Kirana both shipped a broken first paint, and the
mistake was designing a navbar against an imagined hero instead of the real one.

**Hero tone: DARK.**
The hero video and hero stills for Simpul are graded dark. Deep indigo and charcoal atelier
tones, a single window light, shadow heavy. Specified in `ART-DIRECTION.md` shot type H1.

**Navbar: SOLID `--ivory` with `--ink` text from first paint, at zero scroll.**
This is R31 remedy option (d). The bar is opaque from the very top, so navbar legibility does
not depend on hero brightness at all, and there is no state where light text sits on a light
hero. It also matches the editorial register of the category.

**Forbidden for this brand:** a transparent or semi transparent navbar overlaying the hero, in
any scroll state. Do not build one. If a later stage wants one, it is a spec change and needs
the contrast recomputed against the real first frame.

Certified: `--ink` on `--ivory` is 16.51:1. `--brand` on `--ivory` is 11.00:1 for the active
nav item. Both far above 4.5:1, and they hold regardless of what the hero does.

**Hero copy legibility, R2.**
Hero copy is `--ivory` over the dark graded footage. The only overlay is a bottom anchored
gradient covering the lower 45 percent of the hero:

```css
.hero-scrim {
  position: absolute; inset: auto 0 0 0; height: 45%;
  background: linear-gradient(to bottom, var(--hero-scrim-from), var(--hero-scrim-to));
  pointer-events: none;   /* mandatory, decorative overlay rule */
  z-index: 1;
}
.hero-copy { position: relative; z-index: 2; }
```

This is a gradient that darkens only behind the copy, which R2 explicitly allows. It is **not**
a full section wash, and there is no white or dark overlay above 30 percent across the whole
hero. The footage stays clearly visible, which is the entire point of R2.

Certified: `--ivory` on the darkest composite the gradient produces, `#3A3833`, is 10.88:1.

**Every decorative overlay in this build carries `pointer-events: none` and sits below the
interactive content in z-index.** Watch stacking context: a positioned parent with `z-index:
auto` does not contain its children, so a child scrim can escape above page content and eat
every click.

---

## 7. Component colour recipes

| Component | Recipe |
| --- | --- |
| Sales button, primary | bg `--cta`, text `--white`, radius 0, hover bg `--cta-hover`, focus ring 3px `--focus` offset 2px |
| Secondary button | bg transparent, text `--brand`, 1px border `--brand`, hover bg `--tint` |
| Ghost or text link | text `--brand`, underline 1px offset 3px, hover `--brand-deep` |
| Product card | bg `--white`, 1px `--line-strong`, name `--ink` display serif, price `--ink` display serif, material meta `--ink-soft` small |
| Price, discounted | old price `--ink-soft` with strikethrough, new price `--ink`, badge text `--gold` on `--white` |
| Rating stars | `--gold` fill, count text `--ink-soft` |
| Input, select, date field | bg `--white`, 1px `--line-strong`, text `--ink`, placeholder `--ink-soft`, label always visible above the field in `--ink`, focus 3px `--focus` offset 2px |
| Badge, quiet | text `--brand` on `--tint` |
| Badge, attention | text `--gold` on `--white` with a 1px `--gold` border |
| Section band A | bg `--sand` |
| Section band B | bg `--tint` |
| Navbar | bg `--ivory`, text `--ink`, active item `--brand`, 1px bottom border `--line-strong` |
| Mega menu panel | bg `--white`, 1px `--line-strong`, `--shadow-panel`, column headings `--ink-soft` eyebrow, links `--ink` |
| Footer | bg `--brand-deep`, body text `--ivory`, muted text `--tint`, links `--ivory` underlined on hover. **Logo must be the white knockout variant, R43.** Gold is forbidden here |
| Floating WhatsApp | desktop pill, bg `--cta`, `/img/whatsapp.png` icon plus label text `--white`, radius 0. Mobile, oval, icon only. R10, R17, R45 |

**R50, text separation.** Any row or card or dropdown item that pairs a title with a secondary
label, category, price, or badge must render the secondary label as its own block level element
with an explicit gap and its own font size. Two inline text nodes side by side collapse into
`Pashmina Alun VoalVoal premium`. Design the markup so this cannot happen, and test it with the
longest title in the catalogue, which is `Segi Empat Kanvas Polycotton`.

---

## 8. Full starter token block

Copy this into `globals.css` at Stage 3.

```css
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

:root {
  /* surfaces */
  --ivory: #FAF6F0;
  --white: #FFFFFF;
  --sand:  #EFE6D9;
  --tint:  #DCE4EF;

  /* type colour */
  --ink:      #15181E;
  --ink-soft: #4C5462;

  /* brand */
  --brand:      #23375C;
  --brand-deep: #16233B;
  --gold:       #8C5F14;

  /* sales cta, R5 */
  --cta:       #12694A;
  --cta-hover: #0E5539;

  /* lines and state */
  --line:        #E4DCD0;
  --line-strong: #8F7E66;
  --focus:       #23375C;
  --danger:      #A3231B;

  /* hero */
  --hero-scrim-from: rgba(21,24,30,0);
  --hero-scrim-to:   rgba(21,24,30,.55);

  /* type */
  --font-display: 'Fraunces', ui-serif, Georgia, serif;
  --font-body: 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
  --t-display-xl: clamp(2.5rem, 6vw, 4.5rem);
  --t-display-l:  clamp(2rem, 4.5vw, 3.25rem);
  --t-h2:         clamp(1.625rem, 3vw, 2.25rem);
  --t-h3:         clamp(1.25rem, 2vw, 1.5rem);
  --t-body-l: 1.125rem;
  --t-body:   1rem;
  --t-small:  .875rem;
  --t-eyebrow: .75rem;

  /* space */
  --s-1: 4px;  --s-2: 8px;  --s-3: 12px; --s-4: 16px; --s-5: 24px;
  --s-6: 32px; --s-7: 48px; --s-8: 64px; --s-9: 96px; --s-10: 128px;
  --container: 1200px;

  /* shape */
  --radius: 0;
  --shadow-flat:  none;
  --shadow-lift:  0 12px 28px -18px rgba(21,24,30,.35);
  --shadow-panel: 0 18px 40px -24px rgba(21,24,30,.40);

  /* motion */
  --ease: cubic-bezier(.2,.6,.2,1);
  --dur:  200ms;
}

* { border-radius: var(--radius); }

body {
  background: var(--ivory);
  color: var(--ink);
  font-family: var(--font-body);
  font-size: var(--t-body);
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, .display {
  font-family: var(--font-display);
  font-variation-settings: 'SOFT' 0, 'WONK' 0;
  color: var(--ink);
}

:focus-visible { outline: 3px solid var(--focus); outline-offset: 2px; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
    scroll-behavior: auto !important;
  }
}
```

The `* { border-radius: var(--radius) }` reset is intentional and enforces R10 globally. The
mobile WhatsApp oval opts out explicitly with its own `border-radius: 999px`.

---

## 9. Responsive contract, R19, R47, R48

Non negotiable, and QA tests these, it is not a judgement call.

- Breakpoints: 375, 480, 768, 1024, **1025**, 1280.
- **1025px is a required test width.** It sits just above the 1024px drawer breakpoint and is
  where mega menu panels have escaped the viewport before. R16.1.
- Every dropdown and mega menu panel carries `max-width: calc(100vw - 2rem)`. The leftmost nav
  item's panel anchors `left: 0` and grows right, the rightmost anchors `right: 0` and grows
  left. Only a true middle item may centre.
- Zero horizontal overflow on the body at every breakpoint.
- Mobile topbar at 480px and below holds at most the logo plus the hamburger, in a clean flex
  row with `justify-content: space-between` and a fixed height. Any CTA moves into the drawer.
  No overlap, no stacking. R47.
- **Any section with more than three peer items becomes a horizontal snap carousel at 768px and
  below.** Applies to the product grids, testimonials, article previews, and the colourway
  strip. Items at 80 to 85vw, `scroll-snap-type: x mandatory`, `scroll-snap-align: start`,
  and no body overflow. R48.
- Every input renders with a visible label above it and a visible placeholder. A blank white box
  is a failed build. R19.
