# ART-DIRECTION.md, Simpul

The image and video contract for `portfolio-simpul`. Stage 1 output, Brand Strategist.

Stage 3 pastes these blocks into every `MEDIA.md` row. Stage 4 generates against them.
**Paste PHOTO DNA and NEGATIVE verbatim. Do not paraphrase, do not shorten, do not send only
the SUBJECT line.** A prompt that ships with only a subject is how AI slop gets generated, and
R33 rejects it.

Generation settings for every still: model `gemini-3.1-flash-image`, 1K resolution,
**`useSearchGrounding: true`**. Grounding is mandatory here, the subject matter is real world
Indonesian textile product photography and the model needs real references.

---

## 1. The look in one paragraph

Quiet Indonesian editorial. One window, real cloth, real weight. Every frame should look like it
was shot in a small studio in Bandung on an overcast morning by someone who knows fabric, not
generated in a render engine. Muted warm neutral grade. Nothing glossy, nothing plastic, nothing
symmetrical. The scarf is always the most detailed thing in the frame, and you should be able to
see the weave and the edge stitch. Colour in the frame comes from the product, everything around
it stays neutral.

The failure this brand must never ship: a smooth waxy face, a scarf that flows like liquid metal,
and a background blurred into a fake bokeh halo. That is AI slop and the owner will call it.

---

## 2. PHOTO DNA, paste verbatim into every image prompt

```
PHOTO DNA:
Editorial fashion photograph, shot on a Canon EOS R5 with an 85mm f/1.4 prime lens at f/2.2,
ISO 200, 1/250s, handheld at eye level. Lit by one large north facing window as the only light
source, positioned camera left, with a single white bounce card camera right. Soft directional
light with a clear falloff across the frame, one readable soft shadow edge under the jaw and
along every fabric fold, gentle highlight roll off on the cloth, no frontal flash, no ring
light, no studio strobe. Real skin with visible pores, fine peach fuzz, natural texture and a
few honest imperfections, unretouched, matte not shiny. The textile is rendered as genuine woven
cloth: the weave grain is visible at close range, voal shows a fine matte nap, ceruty shows a
soft crepe surface, diamond crepe shows its orange peel texture, and the hem stitch line is
clearly readable along the edge. Fabric hangs with real weight and gravity, the drape follows
the body and the folds are irregular, asymmetric and believable, with one or two soft creases
left from being folded in the box. Shallow depth of field with natural optical falloff, the
background is softly out of focus but still legible as a real room, no cut out edge, no halo.
Muted true to life colour, a slightly desaturated warm neutral grade, subtle fine film grain
throughout. The fabric colour must match its named colourway exactly. Composition is slightly
off centre with generous breathing room, calm editorial mood, natural imperfect framing.
```

## 3. NEGATIVE, paste verbatim into every image prompt

```
NEGATIVE:
no plastic or waxy skin, no airbrushed skin, no over smoothed skin, no beauty filter, no glossy
magazine retouch, no over smoothed fabric, no fabric that looks like plastic or vinyl or liquid
metal, no melted fabric, no warped fabric, no impossible fabric flow, no fabric defying gravity,
no CGI look, no 3D render, no digital painting, no illustration, no hyper saturation, no HDR
glow, no faux bokeh halo around the subject, no cut out edges, no sticker like subject
separation, no floating objects, no extra fingers, no merged fingers, no malformed hands, no
extra limbs, no distorted facial features, no uncanny eyes, no too perfect symmetry, no mirror
perfect reflections, no warped logos, no melted logos, no garbled text, no fake or nonsense
lettering on labels or tags, no watermark, no signature, no stock photo caption, no artificial
studio smear, no heavy vignette, no neon colour cast, no unnatural colour grading, no visible
AI artefacts, no duplicated pattern seams, no repeating tiled background.
```

---

## 4. Hijab specific rules, on top of PHOTO DNA

These are the fabric truths that decide whether the image reads real or fake.

1. **Drape is gravity.** The scarf must fall downward with weight. Folds gather where the cloth
   is pinned or wrapped and open out below. A scarf that floats, ripples horizontally, or swirls
   like smoke is rejected.
2. **Fold edges are soft, not sharp.** Voal and ceruty break in soft rounded folds. Only the
   pressed centre crease from the packaging box is a straight line.
3. **The hem is visible.** Jahit tepi is a fine rolled stitch along the edge, laser cut is a
   clean sealed edge with no stitch. Name which one in the SUBJECT line, and it should be
   readable in close shots.
4. **Weave over smoothness.** If the fabric surface looks like a flat gradient, the image is
   wrong. Every material has a named surface: voal is a fine matte nap, ceruty babydoll is a
   soft crepe, diamond crepe is an orange peel texture, viscose has a slight sheen and heavier
   fall, satin has a low soft lustre, jersey has a visible knit.
5. **Modesty is correct or the image is unusable.** Hair fully covered, neck covered, ears
   covered, the hijab sits at the hairline. No loose hair at the temple or the nape.
6. **Hands are the weak point.** Prefer compositions where hands are out of frame, or where one
   hand rests clearly and simply against the fabric with fingers separated and countable. Never
   ask for two hands doing something complicated.
7. **One model per frame.** Groups multiply the chance of a malformed face.
8. **No text in the image.** Brand text is set in live HTML. If a hangtag appears, it is turned
   away or out of focus. Generated lettering warps and R33 lists it as a tell.

### Model direction

Indonesian or Southeast Asian woman, 22 to 30, natural brows, minimal makeup, calm and neutral
expression or a small closed mouth smile, never a wide commercial grin. Wardrobe under the hijab
is plain and neutral, cream, oat, charcoal, or soft indigo, so it never competes with the scarf
colourway. Vary the model across the catalogue rather than reusing one face on all fourteen SKUs.

### Environment direction

A small daylight studio or a plain interior. Allowed props, used sparingly: a linen or plaster
wall, a warm neutral paper backdrop, a plain wooden stool, a folded stack of scarves, a rattan
tray, a slim mirror edge. Forbidden: ornate furniture, gold ornament, mosque interiors, prayer
scenes, heavy florals, bottles, jars, apothecary shelves, kraft paper walls.

---

## 5. Palette anchor for every frame

The environment stays in the Simpul chrome so the product colour pops.

| Element | Target |
| --- | --- |
| Backdrop | warm off white to soft sand, around `#FAF6F0` to `#EFE6D9` |
| Shadow tone | cool neutral grey, never blue, never brown |
| Accent props | deep indigo near `#23375C`, or brass near `#8C5F14`, tiny amounts only |
| Product | the true named colourway, this is the only saturated thing in frame |

**Absolutely forbidden in any Simpul frame:** amber glass, kraft brown backgrounds, dark moody
apothecary sets, orange tungsten grade, gold gradient overlays. That palette belongs to essential
oils, and putting it on a Gen Z scarf label is the exact failure that shipped on Bersihara.

---

## 6. Shot type recipes

Each SUBJECT line below is composed as `SUBJECT + PHOTO DNA + NEGATIVE`. Stage 3 writes the
final per SKU SUBJECT into `MEDIA.md`.

### S1, worn on model, the primary product shot

Ratio 4:5 for cards, 3:2 for wide use.

> SUBJECT: A young Indonesian woman photographed from the chest up, three quarter angle, wearing
> a {MATERIAL} {CATEGORY} hijab in the colourway {COLOURWAY}, size {SIZE}, finished with
> {EDGE FINISH}. The scarf is wrapped in a simple everyday style, draped over one shoulder, and
> the fabric falls with visible weight. Plain warm off white plaster wall behind her. She looks
> slightly off camera with a calm expression, hands out of frame.

### S2, flat lay folded

Ratio 1:1. This is the honest spec shot.

> SUBJECT: A {MATERIAL} {CATEGORY} hijab in {COLOURWAY} folded into a neat rectangle and laid
> flat on a warm off white paper surface, photographed from directly above. One corner is folded
> back to reveal the {EDGE FINISH} hem and the small brass logo plate. The weave texture is
> clearly visible across the surface, with two soft creases from the packaging fold. Raking
> window light from the left casts a low soft shadow along the folded edges.

### S3, drape and fall

Ratio 3:4. Sells fabric behaviour, no model needed.

> SUBJECT: A {MATERIAL} {CATEGORY} hijab in {COLOURWAY} hanging from a plain wooden rail against
> a soft sand coloured wall, falling in long irregular vertical folds under its own weight. The
> lower hem moves slightly. The fabric surface texture and the {EDGE FINISH} edge are both
> readable. Nothing else in the frame.

### S4, colourway stack

Ratio 4:3. One per category, for the category banner.

> SUBJECT: Five {MATERIAL} hijabs folded into neat squares and stacked slightly offset on a warm
> off white surface, in the colourways {LIST}, photographed at a low three quarter angle so the
> folded edges and the weave of each layer are visible. Soft window light from the left, one
> gentle shadow to the right of the stack.

### S5, macro detail

Ratio 1:1. Proves the quality claim.

> SUBJECT: Extreme close up of the corner of a {MATERIAL} hijab in {COLOURWAY}, showing the
> {EDGE FINISH} hem stitch and a small unbranded brass plate stitched at the corner, fabric
> weave filling the frame, shot at a shallow angle so the depth falls off across the corner.

### S6, packaging and unboxing

Ratio 4:3. Uses the locked packaging keyword from `BRAND.md` section 3.

> SUBJECT: An open flat ivory doff carton box 20x20x3 cm on a warm off white surface, a folded
> {MATERIAL} hijab in {COLOURWAY} resting inside on tissue paper, a corded card hangtag turned
> away from camera so no text is legible, and a cream drawstring fabric pouch beside the box.
> Shot from a high three quarter angle, soft window light from the left.

### S7, article and editorial cover

Ratio 16:9.

> SUBJECT: {SCENE DESCRIBING THE ARTICLE TOPIC}, a young Indonesian woman in a neutral hijab in
> a bright plain interior, mid action and unposed, warm neutral colour, generous negative space
> on the {left|right} for a headline overlay.

### S8, atelier and about

Ratio 3:2.

> SUBJECT: A quiet small textile studio interior, bolts of neutral voal and ceruty fabric on a
> plain wooden table, a folded stack of finished hijabs, a pair of fabric shears, soft daylight
> from a large window on the left, no people in frame, no signage or lettering anywhere.

---

## 7. Hero video, H1, MANDATORY

R30 and R44. This is a hard deploy gate. The hero must be a real playing mp4, not a poster.

| Field | Value |
| --- | --- |
| Path | `public/video/hero-simpul.mp4` |
| Model | `veo-3.1-lite-generate-preview`, the Veo Lite tier |
| Duration | 8 seconds |
| Aspect | 16:9 |
| Resolution | 720p |
| Playback | muted, autoplay, loop, `playsinline` |
| Tone | **DARK graded.** This is locked and the navbar spec in `DESIGN.md` section 6 depends on it |

Generated in pipeline via the direct REST recipe against `$GEMINI_API_KEY`. The image only MCP
surface is not evidence that video is unavailable, R34. Do not hand this to a human as the
primary path, and do not substitute a Ken Burns poster.

**H1 prompt:**

> An eight second editorial fashion clip in a dark, moody daylight studio. A single large window
> camera left is the only light, the room falls off into deep charcoal and indigo shadow. Slow
> push in on a young Indonesian woman in a soft neutral voal hijab, seen from the chest up at a
> three quarter angle. She turns her head slowly toward the light, and the scarf drapes and
> settles across her shoulder with real weight, the folds shifting naturally as she moves. In
> the last two seconds the camera drifts down slightly to follow the fabric falling. Shot on an
> 85mm prime at f/2.0, shallow depth of field, gentle handheld drift, no cuts, no zoom snaps.
> Muted desaturated warm neutral grade with deep shadows, subtle film grain, calm and quiet mood.
> The fabric weave stays visible in the highlights.

Then append the NEGATIVE block from section 3, plus:

> no fast cuts, no whip pans, no speed ramps, no text overlay, no logo, no lens flare, no
> stuttering or morphing between frames, no fabric that stretches or melts as it moves.

**Veo Lite gotchas.** Do not send `generateAudio`, the lite model generates native audio itself
and rejects the field. Do not send `personGeneration: "dont_allow"`, it is rejected and this
clip needs a person.

---

## 8. Per SKU image requirement, R49

**Every one of the fourteen SKUs gets its own subject specific photograph.** A single generic
scarf image reused across cards, an icon where a photo belongs, or an empty slot is a rejected
build.

Minimum per SKU: one S1 or S2 as the card image. Product detail pages need at least four frames
for the R18 gallery, drawn from S1, S2, S3, and S5.

Additional required assets: six category banners at S4, six article covers at S7, one atelier
shot at S8, one packaging shot at S6, and the H1 hero video.

---

## 9. Stage 4 self check before closing

Look at every generated frame and answer honestly. Regenerate anything that fails, up to two
retries per asset, per R33.

1. Does the skin look like skin, with pores and texture, or like wax?
2. Can I see the weave of the fabric, or is it a smooth gradient?
3. Does the cloth hang downward with weight, or does it float and swirl?
4. Are the folds irregular, or suspiciously symmetrical?
5. Is there a glowing halo where the subject meets the background?
6. Are the hands, if visible, countable and correctly shaped?
7. Is any text in frame garbled? If yes, remove the text bearing prop entirely.
8. Is the colour the actual named colourway, or has it drifted saturated?
9. Is the background a real room, or an abstract blur?
10. Would the owner call this AI slop? If there is any doubt, regenerate.
