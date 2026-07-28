# LOGO.md, Simpul

Logo brief and ready to run prompt for Stage 2, Asset Forge.
Stage 1 does not generate the logo, it hands over the prompt. This file is that handover.

---

## 1. The concept

**Simpul means knot.** The mark is a single continuous line tied into a simple overhand knot,
drawn with one even stroke weight, geometric and calm. Read one way it is a knot, read another
way it resolves into an **S**. Nothing else in the mark.

Why this and not a scarf silhouette, a crescent, or a woman's profile: a draped scarf shape
becomes an unreadable blob at 16px, a crescent is the generic modest fashion cliche that half
the category already uses, and a face mark dates instantly. A knot is the one thing every hijab
style physically has in common, it is the brand name made literal, and a closed loop of even
stroke survives being shrunk to a favicon.

---

## 2. Lockup, and the one rule that keeps text from breaking

**Generate the MARK ONLY. Do not generate the wordmark.**

Image models garble letterforms, and `ART-DIRECTION.md` lists warped and melted lettering as a
rejection reason. A logo with a subtly wrong letter S is worse than no logo, and it would ship
on every page.

The lockup is assembled, not generated:

| Part | How it is made | Spec |
| --- | --- | --- |
| Mark | generated PNG, `public/img/logo-simpul-mark.png` | 1:1, transparent, `--brand` `#23375C` |
| Wordmark | **live text or hand set SVG**, never generated | `SIMPUL`, Fraunces, weight 600, `SOFT` 0, `WONK` 0, all caps, letter spacing `0.18em`, colour `--ink` `#15181E` |
| Arrangement | mark left, wordmark right, optically centred | gap equal to 45 percent of the mark height, wordmark cap height about 62 percent of mark height |

Because the wordmark is live text, the footer wordmark simply recolours to `--ivory` `#FAF6F0`
with CSS and can never wash out. Only the mark needs a second file.

---

## 3. Required output files

| File | What | Why |
| --- | --- | --- |
| `public/img/logo-simpul-mark.png` | primary mark, `#23375C` on transparent, 1024x1024 | light grounds, navbar, everywhere |
| `public/img/logo-simpul-white.png` | knockout mark, pure `#FFFFFF` on transparent, 1024x1024 | **mandatory, R43** |
| `public/img/logo-simpul-mark.svg` | optional vector trace | crispness at any size |

**R43, the footer.** The Simpul footer is `--brand-deep` `#16233B`. A dark indigo mark placed on
it disappears, and a mark generated with its own light background block reads as a blank washed
rectangle. Legatara shipped exactly that. The white knockout is not optional. Derive it from the
primary with `process_image` or sharp, by colour keying the indigo to pure white while keeping
the alpha channel intact, then **look at it composited on `#16233B` before committing it.**

Certified: `--white` on `--brand-deep` is 15.70:1, `--ivory` on `--brand-deep` is 14.58:1.
Gold `#8C5F14` on `#16233B` is 3.36:1 and **fails** for text, so no gold in the footer lockup.

---

## 4. Ready to paste prompt, primary mark

Model `gemini-3.1-flash-image`, aspect ratio 1:1, 1K resolution, transparent background.

```
A minimalist flat vector logo mark for a modern Indonesian hijab scarf label called Simpul.
The mark is a single continuous line tied into one simple overhand knot, forming a closed
looping shape that also reads as the letter S. One even stroke weight throughout, roughly
one tenth of the mark's width, with softly rounded stroke ends. Clean geometric construction,
generous open counters inside the loops so the shape stays readable when scaled down to
sixteen pixels. Perfectly centred in a square frame with even padding on all four sides.
Solid single colour, deep indigo hex #23375C, on a fully transparent background. Flat vector
illustration, crisp clean edges, high contrast, no fill inside the loops, boutique fashion
label quality, calm and confident.

Negative: no text, no letters, no words, no typography, no wordmark, no photograph, no 3D
render, no gradient, no gradient mesh, no shading, no drop shadow, no glow, no bevel, no
emboss, no texture, no grain, no background colour, no background shape, no square or circle
container behind the mark, no border, no frame, no generic stock icon look, no clip art, no
crescent moon, no star, no mosque, no woman silhouette, no face, no hijab illustration, no
fabric illustration, no ribbon bow, no infinity symbol, no multiple colours, no gold, no
metallic effect, no watermark, no signature, no mockup, no presentation board, no multiple
variations in one image, only one single mark.
```

### Knockout variant

Preferred: derive it from the finished primary rather than generating a second time, so the two
files are guaranteed identical in shape. Colour key `#23375C` to `#FFFFFF`, keep alpha.

If it must be generated instead, reuse the prompt above with one change: replace
`deep indigo hex #23375C` with `pure white hex #FFFFFF`, and keep every negative term.

---

## 5. Favicon set

Derive everything from the finished 1024x1024 **mark**, never from the full lockup. A wordmark
at 16px is an unreadable smear.

| File | Size | Notes |
| --- | --- | --- |
| `public/favicon.ico` | 16, 32, 48 bundled | multi resolution ico |
| `public/icon-16.png` | 16x16 | transparent |
| `public/icon-32.png` | 32x32 | transparent |
| `public/icon-48.png` | 48x48 | transparent |
| `public/apple-touch-icon.png` | 180x180 | **`--ivory` `#FAF6F0` background, not transparent.** iOS composites transparent icons onto black and the indigo mark would vanish |
| `public/icon-192.png` | 192x192 | transparent, PWA manifest |
| `public/icon-512.png` | 512x512 | transparent, PWA manifest |

Simplest route, downscale the master with sharp, then bundle the ico:

```bash
for s in 16 32 48 192 512; do
  npx sharp-cli -i public/img/logo-simpul-mark.png -o public/icon-$s.png resize $s $s
done
npx sharp-cli -i public/img/logo-simpul-mark.png -o public/apple-touch-icon.png \
  resize 180 180 -- flatten --background "#FAF6F0"
npx png-to-ico public/icon-16.png public/icon-32.png public/icon-48.png > public/favicon.ico
```

**Check at 16px before committing.** Open `icon-16.png` at actual size. If the knot has closed
into a solid dot, the stroke is too heavy or the counters too tight, and the mark needs
regenerating with wider open counters. This is a look with your eyes check, not an assumption.

---

## 6. Handoff paths

Primary path, Stage 2 generates in pipeline with the `gemini-image` MCP and writes straight into
the repo:

```
public/img/logo-simpul-mark.png
public/img/logo-simpul-white.png
public/favicon.ico
public/icon-16.png  public/icon-32.png  public/icon-48.png
public/apple-touch-icon.png
public/icon-192.png  public/icon-512.png
public/img/whatsapp.png        <- R17, copied not drawn
```

Everything must physically exist under `public/` at build time. This is a static export, so an
`<img src>` pointing at a missing file returns 404 on the deployed site, the same failure class
as a dead hero video.

Fallback path only, if a human generates the assets instead: drop the finished files at the exact
paths above in the repo checkout. Filenames are load bearing, a renamed file is a broken image.

---

## 7. How to generate (Google Flow, free)

Documented fallback for a human doing this without the MCP.

1. **Copy paste the full prompt.** Open the Google Flow project at
   <https://labs.google/fx/id/tools/flow/project/1e873728-41ff-4e87-ab36-3de32f6ad416>, use the
   collection named `simpul`, and paste the **entire** block from section 4 above into the chat
   input. That means the prompt body **and** the Negative line, not just the first sentence.
   Pasting only the subject is what produces generic stock icon output.
2. **Set the config.** Aspect ratio **1:1**, resolution **1K**, model **Nano Banana** for images.
   Veo Lite is for video and is not used here.
3. **Generate. Maximum four media at a time.** Do not queue more than four in parallel.
4. **Move to the next prompt without downloading yet.** Run the primary mark, then the white
   knockout variant, then come back.
5. **When finished**, select the generated image, download it, and save it into the repo at the
   exact path from section 6, for example `public/img/logo-simpul-mark.png`. A wrong filename
   means a broken image on the built site.

---

## 8. Stage 2 acceptance checklist

- [ ] Mark is a single indigo `#23375C` knot on a genuinely transparent background, no container
      shape behind it, no text anywhere in the image.
- [ ] White knockout exists at `public/img/logo-simpul-white.png` and was **visually checked**
      composited on `#16233B`.
- [ ] `icon-16.png` opened at actual size and the knot is still legible, not a solid dot.
- [ ] `apple-touch-icon.png` is flattened onto `#FAF6F0`, not transparent.
- [ ] `public/img/whatsapp.png` copied in from an existing portfolio repo, not hand drawn as SVG
      and not a third party substitute. R17.
- [ ] Every file above exists on disk under `public/`.
- [ ] Committed and **pushed to `origin`**, verified with `git ls-remote origin`, before the
      issue is marked done. R27.
