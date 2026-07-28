# LAYOUT-ARCHITECTURE.md, Simpul

Stage 3 output, Site Architect. Written before the first component, per the HIM-246 brief.

This document exists because **MilkyBreeze is reference only, never a 1:1 clone**. The stack is
shared (Next.js 16 App Router, Tailwind v4, static export, Cloudflare Pages). The layout is not.
Everything below is a decision made for Simpul specifically, with the reason attached, so Stage 5
and Stage 6 can tell a deliberate choice apart from an accident.

The visual system it implements is `DESIGN.md`. Where the two disagree, `DESIGN.md` wins.

---

## 1. The organising idea

`DESIGN.md` states the thesis: **Simpul is a gallery wall and the scarves are the paintings.**

The layout consequence is that the chrome must get out of the way. Concretely, three formal moves
carry the whole site and none of them are borrowed from the reference build:

1. **A numbered editorial rail.** Every major home section is prefixed with a two digit ordinal
   set in Fraunces at the left gutter, `01`, `02`, `03`. It is a print magazine device, it costs
   nothing, and it instantly reads as an edited page rather than a stack of generic CTA blocks.
2. **Hairlines instead of shadows.** Cards are separated by a 1px `--line-strong` border and
   nothing else. Combined with the global `border-radius: 0` from R10, the page reads as set type
   on paper. Shadows are reserved for exactly three things: a product card on hover, the mega menu
   panel, and the modal.
3. **Asymmetric hero, copy anchored bottom left.** Not a centred hero block. The dark graded video
   fills the frame, the copy sits in the lower left inside the R2 gradient, and directly beneath
   the hero runs a **colourway ticker**, a single horizontal strip of the season's named colours.
   That strip is the brand's actual proposition, honest colour, stated in the first screen.

What is deliberately NOT copied from MilkyBreeze: its navbar composition, its cart sidebar, its
news feed, and its belanja grid. Each is replaced below with a different pattern and a reason.

---

## 2. Navbar variant, decision and reason

**Chosen: split nav, brand lockup left, nav centred, actions right. Two mega panels, not three.**

The alternatives were considered and rejected on merit:

| Variant | Verdict |
| --- | --- |
| Minimal centred logo, nav underneath | Rejected. Costs a full row of vertical height on mobile, and R47 wants the mobile topbar as thin and uncluttered as possible. |
| Sticky pill floating nav | Rejected outright. A pill is a radius, and R10 sets radius 0 globally. A pill at radius 0 is just a rectangle, so the pattern loses its point. |
| Condensed nav, everything behind a burger on desktop | Rejected. R16 requires 1 to 3 top level items that open a dropdown panel on desktop. |
| **Split nav with two mega panels** | **Chosen.** Fits a 6 category catalogue plus a real guidance section without inventing a third panel just to hit a quota. |

### Composition

```
[ mark + SIMPUL / label scarf modest ]   [ Katalog v  Panduan v  Artikel  Tentang ]   [ search  cart  Pesan CTA ]
```

- **`Katalog`**, mega panel. Three columns: the six categories, a "Belanja berdasarkan bahan"
  column, and an aside promoting the current lookbook.
- **`Panduan`**, mega panel. Two columns: Cara pesan, Panduan ukuran, Perawatan, Garansi, plus an
  aside linking the size finder.
- `Artikel` and `Tentang` are plain links. Not every item needs a panel, and giving a two page
  section a mega menu is the kind of padding that reads as generated.

### R16.1 panel geometry, the rule that broke Dapur Tepat

This is the failure mode: centring every panel to a roughly 70px wide `<li>` with
`left: 50%; transform: translateX(-50%)` and no clamp. At around 1025px, just above the drawer
breakpoint, the panel escapes the window.

The contract implemented here:

- `Katalog` is the leftmost panel bearing item, so its panel carries `data-anchor="left"` and
  anchors `left: 0`, growing right.
- `Panduan` is the rightmost panel bearing item, so its panel carries `data-anchor="right"` and
  anchors `right: 0`, growing left.
- **Every** panel carries `max-width: calc(100vw - 2rem)` as an unconditional guard, whatever its
  anchor. A middle anchored variant exists in `site.css` but no item in this build uses it.
- **R57**: a closed panel is `display: none`, not `visibility: hidden` and not `opacity: 0`. A
  faded panel still occupies layout and still widens `document.documentElement.scrollWidth`, which
  is an overflow that appears in no screenshot because the culprit is invisible in exactly the
  state that breaks the page. This applies identically to Select and DatePicker panels.

### R32 open behaviour

Desktop at 1025px and up: **opens on hover**, and also on click, on focus, and on
`ArrowDown`. Closes on `Escape`, on outside click, and on focus leaving the item. Hover is added,
keyboard is not removed. The panel animates in and the chevron rotates 180 degrees.

Below 1025px there is no mega menu at all. The nav collapses into the hamburger drawer, where the
two panel sections become inline accordions animating `grid-template-rows: 0fr` to `1fr`.

### R53, where the drawer is rendered

The drawer and the welcome modal are rendered as **siblings of `<header>`**, portalled to
`document.body`. The header in this build deliberately carries no `backdrop-filter`, no `filter`,
and no `transform`, because any of those makes the header the containing block for a
`position: fixed` descendant, which collapses the drawer to the header's own height and renders it
as a narrow strip with a duplicated logo. The portal makes the mistake structurally impossible
rather than relying on nobody adding a blur later.

### R31, the locked first paint decision

The navbar is **solid `--ivory` with `--ink` text from first paint at zero scroll**, and it is
never transparent over the hero in any scroll state. This is `DESIGN.md` section 6 and it is not a
Stage 3 choice to revisit. The hero is graded dark, so a transparent bar would have worked here,
but the point of R31 remedy (d) is that legibility must not depend on hero brightness at all.
`--ink` on `--ivory` is 16.51:1, and it holds whatever the video does.

---

## 3. Cart pattern, decision and reason

**Chosen: a top right cart icon opening a right slide-over, plus a dedicated `/keranjang` page
that owns the checkout flow.**

MilkyBreeze puts checkout in a modal launched from the sidebar. Simpul splits the two jobs:

- **The slide-over is for reassurance, not for transacting.** It shows line items, the colourway
  chosen, quantity steppers, and a subtotal. Its primary action is a green `Lihat keranjang` that
  navigates to the real page. It is a glance, then out.
- **`/keranjang` owns the transaction.** Full line item table, a shipping form with the custom
  Select for province and courier, an order summary, and a `Buat pesanan` submit that runs the
  demo state machine form to processing to success. A checkout with a real address form does not
  belong in a 380px drawer, and cramming it there is how mobile checkout forms end up as the blank
  boxes R19 forbids.

The slide-over reuses the same `.drawer` chrome as the mobile nav, so there is one drawer
implementation and one focus trap in the codebase, not two that drift apart.

---

## 4. Shop mode, decision and reason

**Chosen: a deliberate mix, display mode on the home page, ecommerce mode in the catalogue.**

`DESIGN.md` says the site is a gallery wall. But a gallery wall does not convert, and R41 wants a
catalogue that reads like a real business.

| Surface | Mode | Contents | Why |
| --- | --- | --- | --- |
| Home, `Pilihan musim ini` | **Display** | large image, product name, material, price. No badges, no add to cart. | The home page sells taste. A row of green buttons in the first two screens undoes the editorial register the whole palette was built for. |
| Home, colourway ticker | Display | named colour chips only | States the brand promise, honest colour, before any price. |
| `/katalog` and `/katalog/[kategori]` | **Ecommerce** | image, badges, name, material, price, colourway swatches, `Tambah` plus `Detail` | This is where the visitor arrived to buy. Full affordances, green CTA per R5. |
| `/produk/[slug]` | **Ecommerce**, full | R18 gallery, colourway picker, quantity, `Tambah ke Keranjang`, specs, features, related | The detail page is the conversion surface. |

So: the home page shows the paintings, the catalogue sells them.

---

## 5. Article layout, decision and reason

**Index**: one featured lead article at 16:9 spanning the full width with the headline set in
Fraunces beneath it, then the remaining five in a three column grid. Not a flat equal weight feed.
An editor picks a lead, and showing one is what makes it read edited.

**Detail**: **main article column plus a right sidebar**, which is the high quality pattern the
brief names. The sidebar is sticky above 1025px and carries, in order:

1. `Artikel lainnya`, three related posts, each a `.stack-label` so the title and the category
   label can never glue into `Cara pakai pashminaPanduan` (R50).
2. `Produk di artikel ini`, the SKUs the article actually references. This is the layout's one
   commercial move and it is contextual rather than interruptive.
3. A quiet green `Konsultasi` CTA routing through `waLink()`.

Below 1025px the sidebar drops beneath the article body in the same order. It never becomes a
cramped second column at tablet width.

Article body sets a 68 character measure per `DESIGN.md` section 4, and the body is Plus Jakarta
Sans. Fraunces appears only in the headline, the subheads, and pull quotes.

---

## 6. Guidance layout, `Panduan`

Two pages, two different shapes, because they answer different questions.

- **`/cara-pesan`**: a numbered vertical step rail. The ordinal sits in the left gutter in
  Fraunces, mirroring the home page's `01 / 02 / 03` rail, so the device reads as a system rather
  than a one off. Five steps, each with an illustration slot and a short paragraph. Ends with the
  payment and shipping table and a green WhatsApp CTA.
- **`/panduan-ukuran`**: a comparison table first, because that is what the visitor came for, then
  a **size finder**. The finder is three custom Selects, category, face shape, and coverage
  preference, and it recommends a SKU. It is deliberately built from the R12 `Select` component so
  the build carries a real, exercised custom dropdown outside the navbar.

Any date field anywhere in the build, and there is one on `/lacak`, uses the R21 `DatePicker`. No
free text date input exists in this codebase.

---

## 7. Footer variant

Dark `--brand-deep` four column footer.

```
[ white knockout logo + tagline + short brand line ]  [ Belanja ]  [ Bantuan ]  [ Kontak + lead form ]
```

- **R43**: the logo here is `/img/logo-simpul-white.png`, the knockout variant, never the primary
  mark. The footer background is `#16233B`, and a coloured logo block on it is the blank rectangle
  failure this rule exists to stop.
- **R50**: the wordmark and the tagline are two block level children of a flex column with an
  explicit gap. An inline `<small>` under the wordmark renders as `SIMPULLABEL SCARF MODEST`,
  which is the exact shape measured on Mabrur.
- **`--gold` is forbidden here.** Gold on `--brand-deep` computes to 3.36:1 and fails. Footer text
  is `--ivory` or `--tint`, both above 12:1.
- **R35**: the bottom bar carries `Designed & Developed by Himay Studio` linking to
  `https://himaystudio.com`, `target="_blank"`, `rel="noopener"`, and deliberately **not**
  `nofollow`. This is the primary SEO equity channel back to the main domain.

---

## 8. Page inventory, R6

Complete, not thin stubs. 41 routes at static export.

| Route | What it is |
| --- | --- |
| `/` | Home |
| `/katalog/` | Full catalogue, category filter, sort, client side search |
| `/katalog/[kategori]/` | 6 category views: pashmina, segi-empat, bergo-instan, sport, inner-ciput, aksesoris |
| `/produk/[slug]/` | 14 product detail pages |
| `/tentang/` | Brand story, atelier, material standards |
| `/cara-pesan/` | Ordering steps, payment, shipping |
| `/panduan-ukuran/` | Size comparison plus the size finder |
| `/perawatan/` | Care guide, wash and store |
| `/artikel/` | Article index |
| `/artikel/[slug]/` | 6 article detail pages |
| `/faq/` | R7, 10 questions, accordion |
| `/kontak/` | Contact, hours, lead form |
| `/keranjang/` | Cart plus the checkout demo |
| `/lacak/` | Order tracking, deep linkable by `?id=` |
| `/garansi/` | Warranty and exchange policy |
| `/masuk/` | R8 login demo |
| `/dashboard/` | R8 seller dashboard demo |
| `/akun/` | R8 customer portal, order history |

### R8, the three demos stay functional

Login, dashboard, and customer portal are **working demos**, not WhatsApp redirects. R14 routes
sales CTAs to Himay's WhatsApp, and these three are not sales CTAs, they are the feature being
demonstrated. `Masuk` really signs the demo session in, the dashboard really renders orders from
the demo store, and `/akun` really lists what checkout wrote.

### R24, the deep link that has broken before

`/lacak/?id=SMP-2451` reads the query parameter in a `useEffect` and renders the result card
**after** mount. On Kilau that card landed at `opacity: 0` forever because the reveal pass only
ran once at mount. `ClientEffects` here pairs the `IntersectionObserver` with a `MutationObserver`
on `document.body`, cloned from `portfolio-kilau` post HIM-169, **not** from MilkyBreeze, whose
reference implementation still has the mount only scan.

---

## 9. Product data model, R42

Colour is a **variant dimension inside one product**, never a separate product.

```ts
type Product = {
  slug: string;          // one slug per MODEL
  name: string;          // "Pashmina Alun Voal", never "Pashmina Krem Susu"
  category: CategorySlug;
  material: string;
  price: number;         // base price, a variant may override
  colorways: Colorway[]; // [{ name, hex, sku, image, price? }]
  gallery: string[];
  ...
};
```

Consequences that are enforced in the components:

- The catalogue colour filter narrows **which products** are shown. It never changes a product's
  displayed name.
- The detail page colour picker swaps image, SKU, and price **in place**. It never navigates to a
  different slug. On Lume Tumbler the picker navigated between products because
  `const colorways = allProducts`, and the visible symptom was the product name changing when the
  user picked a colour.
- 14 product models, each with 3 colourways and a 4 frame gallery. R41's depth bar is met with
  real models and real variants, not by inflating colour into fake products.

---

## 10. Responsive contract

Implements `DESIGN.md` section 9. QA tests these as measurements, not as judgement calls.

- Test widths: 375, 480, 768, 1024, **1025**, 1440.
- **R48**: every section holding more than three peer items is a `.snap-row` at 768px and below.
  In this build that is: featured products, the category strip, the colourway ticker, testimonials,
  article previews, the trust band, related products, and every catalogue grid. The assertion is on
  the **container's computed style**, `overflow-x` in `auto | scroll` and `scroll-snap-type`
  starting with `x`. A container computing a single grid track with `overflow-x: visible` is the
  vertical stack the rule forbids, however good the desktop grid looks.
- **R57**: `document.documentElement.scrollWidth <= window.innerWidth` at every breakpoint with all
  panels **closed**, then again with each panel **open**. The closed state is the one that has
  shipped broken before.
- **R47**: at 480px and below the topbar holds the logo, the cart icon, and the burger, in one flex
  row with `justify-content: space-between` and a fixed height. The `Pesan` CTA moves into the
  drawer. Tap targets are 44x44 minimum with visible gaps.
- **R52**: the combination is tested together at 375px, announcement bar active, welcome modal
  open, topbar, and the floating WhatsApp button all at once. Each component looked sane alone on
  Bidan Riska and the bug was born from the combination.
- **R19**: every input renders a visible label above it and a visible placeholder.

### Floating layer collision map, R37 versus R10

| Breakpoint | WhatsApp float | Portfolio CTA |
| --- | --- | --- |
| 1025px and up | bottom right, `[icon] Konsultasi Gratis` pill, R45 | bottom left, 340px card |
| below 1025px | bottom right, 56px oval, icon only | full width, bottom 88px, clearing the oval |

They never share a corner and never overlap, at any width.

---

## 11. Media placeholder convention

Every image and video slot ships as an annotated placeholder carrying its own generation brief.
No blank boxes.

```jsx
<div className="ph ratio-4-5" data-media="img/products/pashmina-alun-voal-1.jpg"
     data-type="image" data-ratio="4:5">
  <span className="ph-tag">[MEDIA] M04. Worn on model, Pashmina Alun Voal, Krem Susu. Ratio 4:5.</span>
</div>
```

`data-media` is the exact path under `public/`, and it is the filename Stage 4 must write. The
`.ph-tag` text names the `MEDIA.md` row id so a mismatch is visible without opening the manifest.
`MEDIA.md` carries the full prompt: SUBJECT plus the PHOTO DNA and NEGATIVE blocks from
`ART-DIRECTION.md` pasted verbatim.

**R15 and the missing file rule.** No component in this build points a `<video src>` or a
`<source src>` at a file that is not on disk. Until Stage 4 lands `public/video/hero-simpul.mp4`,
the hero renders the annotated placeholder, not a dead `<video>` that would freeze on a missing
poster. Stage 5 wires the real element once the file exists.

---

## 12. What Stage 5 must not undo

Short list, because these are the ones that have regressed before:

1. The navbar stays solid ivory at zero scroll. R31, locked in `DESIGN.md` section 6.
2. `.reveal.in, .js .reveal.in` keeps its 0,3,0 specificity, and no `.js .reveal { opacity: 0 }`
   rule gets added back. R34.
3. The drawer and the modal stay portalled outside `<header>`, and no `backdrop-filter` gets added
   to the header. R53.
4. Closed panels stay `display: none`. R57.
5. Colour stays a variant, never a product. R42.
6. The footer logo stays the white knockout. R43.
7. Sales CTAs stay green and stay routed through `waLink()`. R5, R14.
