/**
 * The Simpul asset table, the single authored source for MEDIA.md.
 *
 * Every entry here carries its OWN subject text. R49: the manifest is complete
 * only when the number of SUBJECT blocks equals the number of asset paths, and
 * no generated file is wired into two slots. The shared PHOTO DNA and NEGATIVE
 * blocks are APPENDED to each prompt by the generator, they never replace the
 * per asset subject.
 *
 * Ratios follow the shot recipes in ART-DIRECTION.md section 6.
 */

/** per SKU facts the four shot recipes are filled from */
export const SKUS = [
  {
    slug: "pashmina-alun-voal",
    name: "Pashmina Alun Voal",
    material: "voal premium ultrafine",
    surface: "a fine matte nap with a visible close weave",
    category: "pashmina hijab",
    size: "175x75 cm",
    edge: "a fine rolled jahit tepi stitch",
    colours: ["Krem Susu, a warm milky cream", "Biru Senja, a muted dusty blue", "Zaitun, a soft olive green"],
    detail:
      "The rolled hem stitch is the hero detail on this model, it should be readable as individual stitches at close range.",
  },
  {
    slug: "pashmina-alun-ceruty",
    name: "Pashmina Alun Ceruty Babydoll",
    material: "ceruty babydoll premium",
    surface: "a soft crepe surface with a fine irregular pebble texture",
    category: "pashmina hijab",
    size: "180x75 cm",
    edge: "a fine rolled jahit tepi stitch",
    colours: ["Kabut, a pale warm grey", "Mocha, a mid warm brown", "Hitam Pekat, a deep neutral black"],
    detail:
      "This is the lightest cloth in the range, so the folds must read as noticeably softer and more numerous than on a heavier fabric.",
  },
  {
    slug: "pashmina-bilah-diamond",
    name: "Pashmina Bilah Diamond Crepe",
    material: "diamond crepe",
    surface: "a pronounced orange peel texture across the whole surface",
    category: "pashmina hijab",
    size: "175x75 cm",
    edge: "a fine rolled jahit tepi stitch",
    colours: ["Taro, a muted mauve lilac", "Marun Tua, a deep maroon", "Putih Tulang, a warm bone white"],
    detail:
      "This cloth has more body than the others, so the folds must hold their shape and stand rather than collapse.",
  },
  {
    slug: "pashmina-sanding-viscose",
    name: "Pashmina Sanding Viscose",
    material: "premium viscose",
    surface: "a slight satin like sheen with a heavier fall",
    category: "pashmina hijab",
    size: "180x75 cm",
    edge: "a clean sealed laser cut edge with no stitching",
    colours: ["Terakota, a muted terracotta clay", "Sage, a greyed green", "Abu Kabut, a neutral mid grey"],
    detail:
      "A small unbranded brass plate is stitched at one corner, and the laser cut edge must read as sealed with no thread at all.",
  },
  {
    slug: "segi-empat-titik-voal",
    name: "Segi Empat Titik Voal",
    material: "voal premium",
    surface: "a fine matte nap with a visible close weave",
    category: "square segi empat hijab",
    size: "115x115 cm",
    edge: "a fine rolled jahit tepi stitch",
    colours: ["Putih Tulang, a warm bone white", "Biru Senja, a muted dusty blue", "Zaitun, a soft olive green"],
    detail:
      "This is the larger 115 cm square, so when worn the front layer must clearly cover the chest without a second layer.",
  },
  {
    slug: "segi-empat-kanvas-polycotton",
    name: "Segi Empat Kanvas Polycotton",
    material: "polycotton",
    surface: "a slightly crisp matte weave with a visible plain grain",
    category: "square segi empat hijab",
    size: "110x110 cm",
    edge: "a plain jahit tepi stitch",
    colours: ["Hitam Pekat, a deep neutral black", "Krem Susu, a warm milky cream", "Biru Tinta, a deep indigo ink blue"],
    detail:
      "This is the stiffest cloth in the range. Folds break with a slightly sharper crease than the voal models do.",
  },
  {
    slug: "segi-empat-sulur-voal",
    name: "Segi Empat Sulur Voal Motif",
    material: "printed voal premium",
    surface: "a fine matte nap carrying a small scale hand drawn vine motif",
    category: "square segi empat hijab",
    size: "115x115 cm",
    edge: "a fine rolled jahit tepi stitch",
    colours: [
      "Sulur Pagi, a pale oat ground with a soft tonal vine print",
      "Sulur Senja, a dusty mauve ground with a soft tonal vine print",
      "Sulur Kabut, a cool pale grey ground with a soft tonal vine print",
    ],
    detail:
      "The vine motif is deliberately small in scale and low in contrast, an abstract botanical line, never a large floral and never any lettering.",
  },
  {
    slug: "segi-empat-satin-lembayung",
    name: "Segi Empat Satin Lembayung",
    material: "premium satin silk",
    surface: "a low soft lustre that catches light gradually along a fold, never a hard specular flare",
    category: "square segi empat hijab",
    size: "110x110 cm",
    edge: "a fine rolled jahit tepi stitch",
    colours: ["Champagne, a pale warm gold beige", "Marun Tua, a deep maroon", "Biru Tinta, a deep indigo ink blue"],
    detail:
      "The lustre must stay restrained. A blown out highlight or a mirror bright reflection means the frame is wrong.",
  },
  {
    slug: "bergo-rapi-jersey",
    name: "Bergo Rapi Jersey",
    material: "cotton spandex jersey",
    surface: "a visible fine knit with a soft matte face",
    category: "slip on bergo hijab with no pins",
    size: "size M",
    edge: "a flat overlocked seam running down the back",
    colours: ["Hitam Pekat, a deep neutral black", "Mocha, a mid warm brown", "Kabut, a pale warm grey"],
    detail:
      "This is a shaped slip on garment, not a flat scarf. It holds a smooth rounded crown with no pins and no visible head shape beneath it.",
  },
  {
    slug: "bergo-kerja-instan-voal",
    name: "Bergo Kerja Instan Voal",
    material: "voal premium built over an inner pet antem brim",
    surface: "a fine matte nap with a visible close weave",
    category: "instant bergo hijab with a built in brim",
    size: "all size",
    edge: "a fine rolled jahit tepi stitch",
    colours: ["Krem Susu, a warm milky cream", "Zaitun, a soft olive green", "Biru Tinta, a deep indigo ink blue"],
    detail:
      "A stiffened inner brim holds the front edge upright and slightly forward, which is the single feature that distinguishes this from a plain bergo.",
  },
  {
    slug: "sport-hijab-laju",
    name: "Sport Hijab Laju",
    material: "quick dry technical knit",
    surface: "a fine performance knit with a slight dry matte hand",
    category: "sport hijab",
    size: "size M",
    edge: "flatlock seams and a soft silicone gripper band at the inner edge",
    colours: ["Hitam Pekat, a deep neutral black", "Biru Senja, a muted dusty blue", "Sage, a greyed green"],
    detail:
      "The flatlock seam and the thin inner gripper band are the proof points and should be findable in the frame.",
  },
  {
    slug: "inner-ninja-antem",
    name: "Inner Ninja Antem",
    material: "soft jersey",
    surface: "a fine smooth knit",
    category: "ninja style inner cap worn under a hijab",
    size: "all size",
    edge: "a soft elastic band across the back",
    colours: ["Hitam Pekat, a deep neutral black", "Krem Susu, a warm milky cream", "Abu Kabut, a neutral mid grey"],
    detail:
      "This is the under layer, a close fitting cap that covers the hair and the neck. It is plain and functional, never styled as an outer garment.",
  },
  {
    slug: "set-jarum-magnet",
    name: "Set Jarum Magnet Simpul",
    material: "metal finished magnetic hijab pins",
    surface: "a brushed metal finish, matte rather than mirror",
    category: "set of six magnetic hijab pins",
    size: "about 12 mm across",
    edge: "a smooth rolled rim with no sharp edge",
    colours: ["Kuningan, an antique brass", "Perak, a brushed silver", "Hitam Doff, a matte black"],
    detail:
      "Six small discs, no branding and no lettering on any face. When shown on cloth they sit flat and pinch the fabric without piercing it.",
  },
  {
    slug: "pouch-kanvas",
    name: "Pouch Simpul Kanvas",
    material: "cotton canvas",
    surface: "a visible plain canvas weave with a slightly slubby grain",
    category: "drawstring storage pouch for folded hijabs",
    size: "24x30 cm",
    edge: "a double stitched drawstring channel with a cotton cord",
    colours: ["Krem, a natural undyed cream", "Zaitun, a soft olive green", "Hitam Pekat, a deep neutral black"],
    detail:
      "The bag stands up on its own because the canvas has body. No printed logo and no lettering anywhere on it.",
  },
];

/** the four gallery frames every SKU gets, from ART-DIRECTION.md section 6 */
export const FRAMES = [
  {
    shot: "S1",
    ratio: "4:5",
    build: (s) =>
      `A young Indonesian woman photographed from the chest up at a three quarter angle, wearing a ${s.material} ${s.category} in the colourway ${s.colours[0]}, ${s.size}, finished with ${s.edge}. ${s.surface[0].toUpperCase() + s.surface.slice(1)} is visible where the cloth catches the light. The scarf is wrapped in a simple everyday style and draped over one shoulder, and the fabric falls with visible weight. Plain warm off white plaster wall behind her. She looks slightly off camera with a calm expression, hands out of frame. Hair, neck, and ears fully covered, the hijab sitting at the hairline. ${s.detail}`,
  },
  {
    shot: "S2",
    ratio: "1:1",
    build: (s) =>
      `A ${s.material} ${s.category} in the colourway ${s.colours[1]} folded into a neat rectangle and laid flat on a warm off white paper surface, photographed from directly above. One corner is folded back to reveal ${s.edge} and a small unbranded brass plate. ${s.surface[0].toUpperCase() + s.surface.slice(1)} is clearly visible across the surface, with two soft pressed creases left from the packaging fold. Raking window light from the left casts a low soft shadow along the folded edges. ${s.detail}`,
  },
  {
    shot: "S3",
    ratio: "3:4",
    build: (s) =>
      `A ${s.material} ${s.category} in the colourway ${s.colours[2]} hanging from a plain wooden rail against a soft sand coloured wall, falling in long irregular vertical folds under its own weight. The lower hem drifts very slightly. ${s.surface[0].toUpperCase() + s.surface.slice(1)} and ${s.edge} are both readable. Nothing else in the frame, no props and no people. ${s.detail}`,
  },
  {
    shot: "S5",
    ratio: "1:1",
    build: (s) =>
      `Extreme close up of the corner of a ${s.material} ${s.category} in the colourway ${s.colours[0]}, showing ${s.edge} and a small unbranded brass plate stitched at the corner, the fabric weave filling the frame so ${s.surface} reads clearly, shot at a shallow angle so depth falls off across the corner. ${s.detail}`,
  },
];

/** one S4 colourway stack per category, used as the category banner */
export const CATEGORY_BANNERS = [
  {
    slug: "pashmina",
    path: "img/categories/pashmina.jpg",
    subject:
      "Five voal and ceruty pashmina hijabs folded into neat squares and stacked slightly offset on a warm off white surface, in the colourways Krem Susu a warm milky cream, Biru Senja a muted dusty blue, Zaitun a soft olive green, Mocha a mid warm brown, and Kabut a pale warm grey, photographed at a low three quarter angle so the folded edges and the weave of each layer are visible. Soft window light from the left, one gentle shadow to the right of the stack.",
  },
  {
    slug: "segi-empat",
    path: "img/categories/segi-empat.jpg",
    subject:
      "Five square segi empat hijabs folded into neat squares and stacked slightly offset on a warm off white surface, in the colourways Putih Tulang a warm bone white, Hitam Pekat a deep neutral black, Biru Tinta a deep indigo ink blue, Champagne a pale warm gold beige, and Sulur Pagi a pale oat ground with a small tonal vine print, photographed at a low three quarter angle so the folded edges and the differing surfaces of voal, polycotton, and satin are all visible in one stack. Soft window light from the left.",
  },
  {
    slug: "bergo-instan",
    path: "img/categories/bergo-instan.jpg",
    subject:
      "Four slip on bergo hijabs arranged in a loose row on a warm off white surface, in the colourways Hitam Pekat a deep neutral black, Mocha a mid warm brown, Krem Susu a warm milky cream, and Zaitun a soft olive green. Each holds its own rounded crown shape rather than lying flat, so the difference between a plain jersey bergo and one with a stiffened inner brim is visible. Photographed at a low three quarter angle, soft window light from the left.",
  },
  {
    slug: "sport",
    path: "img/categories/sport.jpg",
    subject:
      "Three quick dry sport hijabs folded and stacked slightly offset on a warm off white surface, in the colourways Hitam Pekat a deep neutral black, Biru Senja a muted dusty blue, and Sage a greyed green, with one unfolded beside the stack so the flatlock seam and the thin soft gripper band at the inner edge are both visible. Photographed at a low three quarter angle, soft window light from the left.",
  },
  {
    slug: "inner-ciput",
    path: "img/categories/inner-ciput.jpg",
    subject:
      "Four ninja style jersey inner caps laid in a loose row on a warm off white surface, in the colourways Hitam Pekat a deep neutral black, Krem Susu a warm milky cream, Abu Kabut a neutral mid grey, and Mocha a mid warm brown, each holding a soft rounded shape with the back elastic band visible on one of them. Photographed slightly from above at a three quarter angle, soft window light from the left.",
  },
  {
    slug: "aksesoris",
    path: "img/categories/aksesoris.jpg",
    subject:
      "A flat lay of hijab accessories on a warm off white surface, six small magnetic pins in antique brass, brushed silver, and matte black arranged loosely beside a folded natural cream canvas drawstring pouch, with one pin resting on a corner of pale voal cloth to show how it pinches the fabric. No branding and no lettering on any object. Photographed from a high three quarter angle, soft window light from the left.",
  },
];

/** S7 editorial covers, one per article, with headline space reserved */
export const ARTICLE_COVERS = [
  {
    slug: "cara-pakai-pashmina-simpel-ke-kantor",
    path: "img/articles/cara-pakai-pashmina-kantor.jpg",
    subject:
      "A young Indonesian woman standing at a plain wall mirror in a bright simple bedroom in the early morning, mid action and unposed, lifting one side of a cream voal pashmina across her shoulder as she shapes it, one hand clearly visible against the cloth with fingers separated and countable. Warm neutral colour, generous negative space on the left for a headline overlay.",
  },
  {
    slug: "beda-voal-ceruty-diamond-crepe",
    path: "img/articles/beda-voal-ceruty-diamond.jpg",
    subject:
      "Three different hijab fabrics laid side by side and slightly overlapping on a plain wooden table, a fine matte voal, a soft crepe ceruty babydoll, and a pronounced orange peel diamond crepe, all in closely related neutral tones so the eye reads the surface difference rather than a colour difference. Raking window light from the left makes each texture legible. No people in frame, generous negative space on the right for a headline overlay.",
  },
  {
    slug: "panduan-warna-hijab-2026",
    path: "img/articles/panduan-warna-hijab-2026.jpg",
    subject:
      "A loose fan of folded hijabs spread across a warm off white surface in the 2026 neutral palette, olive, mocha, warm beige, and a muted dusty blue, overlapping so several colours are visible at once and the weave of each is readable. Photographed from slightly above at a three quarter angle, soft window light from the left, no people in frame, generous negative space on the right for a headline overlay.",
  },
  {
    slug: "rahasia-hijab-tidak-mudah-letoy",
    path: "img/articles/rahasia-hijab-tidak-letoy.jpg",
    subject:
      "A pale hijab being hand washed in a shallow basin of cold water on a plain surface beside a window, two hands resting in the water with fingers separated and countable, a small bottle of clear liquid detergent turned away from camera so no text is legible. Soft daylight from the left, warm neutral colour, generous negative space on the left for a headline overlay.",
  },
  {
    slug: "segi-empat-110-atau-115",
    path: "img/articles/segi-empat-110-atau-115.jpg",
    subject:
      "Two square hijabs of visibly different sizes laid flat and slightly overlapping on a warm off white floor, photographed from directly above, one clearly larger than the other so the size difference is the subject of the frame, both in closely related neutral tones with the hem stitch readable along the edges. No people in frame, generous negative space on the right for a headline overlay.",
  },
  {
    slug: "sport-hijab-bukan-jersey-biasa",
    path: "img/articles/sport-hijab-bukan-jersey-biasa.jpg",
    subject:
      "A young Indonesian woman mid warm up in a bright plain room with a wooden floor, wearing a dark quick dry sport hijab and plain neutral activewear, caught unposed at the top of a stretch so the hijab stays close to her head and does not shift. Warm neutral colour, soft daylight from a large window on the left, generous negative space on the left for a headline overlay.",
  },
];

/** the remaining one off assets */
export const SINGLES = [
  {
    id: 1,
    path: "img/hero-simpul-poster.jpg",
    ratio: "16:9",
    shot: "H1 still",
    where: "Poster still for the hero video, and the closing CTA band on the home page",
    subject:
      "A dark, moody daylight studio. A single large window camera left is the only light and the room falls away into deep charcoal and indigo shadow. A young Indonesian woman seen from the chest up at a three quarter angle wears a soft neutral voal hijab, her face turned partly toward the light so one side stays in shadow. The scarf drapes across her shoulder with real weight. Deep shadows, muted desaturated warm neutral grade, the fabric weave still visible in the highlights. This is the locked first frame of the hero clip, so it must match it in tone, wardrobe, and framing.",
  },
  {
    id: 71,
    path: "img/about/atelier-simpul.jpg",
    ratio: "3:2",
    shot: "S8",
    where: "About page, brand story section",
    subject:
      "A quiet small textile studio interior, bolts of neutral voal and ceruty fabric standing on a plain wooden table, a folded stack of finished hijabs beside them, a pair of fabric shears resting on the wood, soft daylight from a large window on the left. No people in frame, no signage and no lettering anywhere.",
  },
  {
    id: 72,
    path: "img/packaging/simpul-unboxing.jpg",
    ratio: "4:3",
    shot: "S6",
    where: "Product detail page, packaging section",
    subject:
      "An open flat ivory doff carton box 20x20x3 cm on a warm off white surface, a folded voal hijab in a warm milky cream resting inside on tissue paper, a corded card hangtag turned away from camera so no text is legible, and a cream drawstring fabric pouch beside the box. A small brass plate is visible at one corner of the folded scarf. Shot from a high three quarter angle, soft window light from the left. Never a bottle, jar, jerry can, tube, or sachet.",
  },
  {
    id: 73,
    path: "img/lookbook/lookbook-pagi.jpg",
    ratio: "3:2",
    shot: "S1 wide",
    where: "Home page, lookbook section",
    subject:
      "A young Indonesian woman standing three quarters to camera in a bright room with a warm off white plaster wall, wearing an olive green voal pashmina shaped in a simple everyday wrap over plain oat coloured clothing, the long end falling across one shoulder with clear weight. She looks off camera, calm expression, hands out of frame. Morning window light from the left with a readable soft shadow along every fold.",
  },
  {
    id: 74,
    path: "img/lookbook/lookbook-sore.jpg",
    ratio: "3:2",
    shot: "S1 wide",
    where: "About page, closing section",
    subject:
      "A young Indonesian woman seated on a plain wooden stool against a warm plaster wall, wearing a warm milky cream square segi empat hijab folded to a triangle over plain charcoal clothing, the front layer falling to cover the chest. Late afternoon window light from the left, longer softer shadows than a morning frame, calm unposed expression, one hand resting simply in her lap with fingers separated and countable.",
  },
];

/** H1, the mandatory hero video. R30 and R44. */
export const HERO_VIDEO = {
  id: 2,
  path: "video/hero-simpul.mp4",
  ratio: "16:9",
  model: "veo-3.1-lite-generate-preview",
  duration: "8 detik",
  resolution: "720p",
  subject:
    "An eight second editorial fashion clip in a dark, moody daylight studio. A single large window camera left is the only light, the room falls off into deep charcoal and indigo shadow. Slow push in on a young Indonesian woman in a soft neutral voal hijab, seen from the chest up at a three quarter angle. She turns her head slowly toward the light, and the scarf drapes and settles across her shoulder with real weight, the folds shifting naturally as she moves. In the last two seconds the camera drifts down slightly to follow the fabric falling. Shot on an 85mm prime at f/2.0, shallow depth of field, gentle handheld drift, no cuts, no zoom snaps. Muted desaturated warm neutral grade with deep shadows, subtle film grain, calm and quiet mood. The fabric weave stays visible in the highlights.",
  extraNegative:
    "no fast cuts, no whip pans, no speed ramps, no text overlay, no logo, no lens flare, no stuttering or morphing between frames, no fabric that stretches or melts as it moves.",
};
