# BRAND.md, Simpul

Stage 1 output, Brand Strategist. Portfolio demo build for Himay Studio (HIM-241 / HIM-248).
Fictional showcase brand. All copy is Bahasa Indonesia.

---

## 1. Identity

| Field | Value |
| --- | --- |
| Brand name | **Simpul** |
| Slug (locked, used everywhere downstream) | `simpul` |
| Wordmark casing | `SIMPUL` in caps for the lockup, `Simpul` in running copy |
| Descriptor | Label scarf modest |
| Tagline | **Satu simpul, seribu gaya.** |
| Repo | `himay-studio/portfolio-simpul` |
| Hero video | `public/video/hero-simpul.mp4` |
| Cloudflare Pages project | `himaystudio-portfolio-simpul` |
| Live domain | `portfolio-simpul.himaystudio.com` |

### Naming logic

"Simpul" is the Indonesian word for knot. Every hijab style in this category is literally a
simpul: a fold, a twist, a pin, a tuck. The word is two syllables, easy to say, easy to spell,
and it is a concrete object rather than another vague pretty word. It also carries a second
meaning in "tersimpul senyum", a knot of a smile, which gives the brand warmth without being
saccharine.

Checked against the real market: the crowded names here are Buttonscarves, Vanilla Hijab,
Deenay, Wearing Klamby, Elzatta, Zoya, Rabbani, Mecca, Kami Idea, Heaven Lights, Lozy Hijab,
Umama, Khiban, Jenahara, Dian Pelangi, Vivizubedi. A web search for "Simpul" as a hijab or
modest fashion brand returned no incumbent. The name is clear.

Deliberately NOT chosen: anything of the shape "Hijab X", "X Scarf", "X Hijab", or an invented
pseudo Arabic word. Those read as marketplace reseller names, not as a label.

### Positioning

Simpul sits in the honest gap in the Indonesian market.

| Tier | Price band | Who is there | Problem |
| --- | --- | --- | --- |
| Marketplace flood | Rp 10.000 sampai Rp 45.000 | thousands of unbranded sellers | thin fabric, letoy, nerawang, photos lie about colour |
| **Simpul** | **Rp 29.000 sampai Rp 189.000, core at Rp 79.000 sampai Rp 129.000** | thin | quality you can feel, colours that are true, photography you can trust |
| Premium label | Rp 200.000 sampai Rp 400.000+ | Buttonscarves (Everyday Scarf Rp 275.000, premium from Rp 395.000), Wearing Klamby (Seville Scarf Rp 200.000) | out of reach for a student or a first jobber |

The promise: premium fabric behaviour and honest colour at a price a 24 year old can buy twice
a month, not twice a year.

### Target persona

**Nadia, 24, Bekasi, works in Jakarta.**
First jobber at an agency, or final semester with a side hustle. Buys through TikTok Shop,
Instagram, and Shopee, and checks the brand's own site to confirm the real colour before she
commits. Owns maybe fifteen hijabs and wears four of them. She wants a scarf that is easy to
shape in five minutes before standup, does not go letoy by 2pm, does not show her inner, and
photographs the same colour it looked on screen. She is not shopping for religion, she is
shopping for taste. She will pay Rp 129.000 if the fabric is genuinely better, and she will
tell her group chat either way.

Secondary: **Rani, 31**, married, works, buys three at a time in one colour family for
seragaman family events and for work.

### Tone of voice

Talk like a friend who actually knows fabric.

- Warm, direct, second person. "Kamu", never "Anda".
- Specific over poetic. Say "175x75 cm, jahit tepi, tidak nerawang" before you say "elegan".
- Confident, never salesy. No "buruan", no "wajib punya", no all caps shouting.
- Bahasa Indonesia sehari hari, light industry vocabulary is fine and expected: pashmina,
  segi empat, jahit tepi, letoy, nerawang, ciput, bergo, pet antem.
- English only where the market already uses English: scarf, sport hijab, lookbook, restock.
- Never use an em dash or an en dash. Use a comma. This is a hard rule, R11.

Do not write: "Hijab premium berkualitas tinggi dengan bahan terbaik pilihan."
Do write: "Voal premium 175x75, jatuhnya rapi, dan warnanya tidak berubah setelah dicuci."

---

## 2. Category realism self check

This section is mandatory and is answered out loud before any palette or art direction was
locked. Downstream agents copy the keywords from here verbatim.

### Q1. How is this product REALLY packaged?

Hijab is **apparel textile**, not a bottled or jarred product. There is no bottle, no jerry can,
no jar, no pouch of powder anywhere in this category.

Real market packaging, verified against Tokopedia, Shopee, Blibli, and Indonesian packaging
vendors:

- **Mid to premium local brands**: a flat carton box, ivory or kraft board around 310gsm with a
  doff laminate, common sizes 18x18x2.5 cm and 20x20x3 cm and 22x22x8 cm, with the hijab folded
  flat inside, wrapped in tissue paper, plus a printed hangtag and a thank you card. Many
  include a drawstring fabric pouch. Vendors sell exactly this as "dus hijab premium" and
  "box hijab window".
- **Marketplace tier**: a clear OPP plastic sleeve with a printed sticker and a hangtag.
- **Premium signal detail**: a small metal logo plate stitched at one corner of the scarf.
  Umama Scarves and Buttonscarves both do this and shoppers name it in listings.

**LOCKED PACKAGING KEYWORD.** Paste this verbatim into every packaging or unboxing image prompt:

> kemasan flat box karton ivory doff ukuran 20x20x3 cm, hijab dilipat rapi di dalamnya,
> dialasi tissue paper, dengan hangtag karton bertali dan pouch kain drawstring warna krem,
> plus plat logo kuningan kecil di sudut scarf

**LOCKED ANTI KEYWORD.** Never generate for this brand: botol kaca, botol amber, botol plastik,
drigen, jerry can, toples, jar, pump bottle, tube, sachet, kemasan apotek, label kraft ala
apothecary. Any of those means the prompt has drifted to the wrong category and the asset is
rejected.

**And the more important half:** the product photography for a scarf brand is not a packshot of
a container. It is, in order of volume on the site:

1. worn on a model, real drape on a real head and shoulders,
2. flat lay of the scarf folded, showing weave and the edge stitch,
3. fabric in motion or hanging, showing how it falls,
4. a folded stack showing the colourway range,
5. a macro of the hem stitch or the metal logo corner.

Full recipes for each of those five shot types are in `ART-DIRECTION.md`.

### Q2. What shelf am I on? Name real competitor products.

1. **Buttonscarves.** Everyday Scarf at Rp 275.000, premium lines from Rp 395.000. Packaging is
   a rigid branded box with tissue and a dust pouch, the signature is a metal button at the
   corner. Site chrome is near black and white, editorial, product photography carries all the
   colour. Sells out on drop.
2. **Wearing Klamby.** Seville Scarf and Azalea Scarf around Rp 200.000. Warm cream and soft
   neutral brand chrome, heavy on printed motif, styled lifestyle photography, strong on
   storytelling per collection.
3. **Vanilla Hijab.** Everyday tier, roughly Rp 30.000 sampai Rp 136.000. Clean white and pastel
   chrome, very high SKU count, colour grid is the hero of every listing.
4. **Umama Scarves.** Pashmina viscose at 75x175 cm, jahit tepi, metal logo, sells the fact that
   there are thirty colourways. This is the direct volume competitor for the core Simpul price.

Simpul lands between Vanilla Hijab and Buttonscarves, borrowing Buttonscarves' editorial
restraint and Umama's honesty about specs.

### Q3. Does my palette match the category mood, or am I defaulting to dark and warm because it looks premium?

Answered explicitly: **no, this is not a default, and it is not the amber apothecary trap.**

The reasoning, in order:

- The 2026 Indonesian hijab colour trend is real and verified: olive, mocha, beige, dusty blue,
  putih tulang, krem, soft metallic like champagne and ivory, plus muted pastel. Loud primary
  colour is out.
- But that is the **product colourway trend, not the brand chrome.** Confusing the two is how a
  site ends up beige text on a beige background. Bersihara and Kirana both shipped a light
  navbar sitting on a light hero and it was unreadable at first paint.
- So the professional move for a fashion label, and what Buttonscarves already proves in this
  exact market, is: **neutral high contrast chrome, and let the product colourways be the
  colour.** The site is the gallery wall, the scarves are the paintings.
- The chrome is therefore a warm ivory canvas, near black ink for type, and one deep indigo for
  structure. Indigo, not brown and not amber. A brown or amber chrome on a Gen Z fashion brand
  is exactly the jadul failure this checklist exists to prevent.
- Indigo is also defensible on trend grounds: dusty blue is one of the four named 2026 colours,
  and a deep denim indigo is the grown up version of it.
- One signature accent, an antique brass gold, exists only because the metal logo plate at the
  scarf corner is a real category convention. It is a detail colour, never a surface.
- The R5 green sales CTA does not clash with indigo. Green against a maroon or an olive chrome
  would have clashed, which is one reason both were rejected.

**Palette mood, locked: bright modern editorial, warm neutral canvas, deep indigo structure,
zero brown surfaces, zero amber surfaces, zero dark page backgrounds above the footer.**

---

## 3. Packaging direction, copy this line downstream

> **Simpul packaging direction:** flat ivory doff carton box 20x20x3 cm, folded scarf, tissue
> paper, corded hangtag, cream drawstring fabric pouch, small brass logo plate at the scarf
> corner. Never a bottle, jar, jerry can, tube, or sachet. Primary product imagery is worn on a
> model and flat lay textile, not a container packshot.

---

## 4. Product taxonomy

| Category | Slug | What it is | Real spec anchor |
| --- | --- | --- | --- |
| Pashmina | `pashmina` | rectangular scarf, wrapped and shaped | 175x75 cm or 180x75 cm, jahit tepi or laser cut |
| Segi empat | `segi-empat` | square scarf, folded to a triangle | 110x110 cm or 115x115 cm, syar'i from 135 cm |
| Bergo dan instan | `bergo-instan` | slip on, no pinning | jersey or voal, size M and L, with or without pet |
| Sport hijab | `sport` | training and prayer friendly, quick dry | scuba knit or quick dry jersey, S M L |
| Inner dan ciput | `inner-ciput` | worn under the hijab | jersey, one size |
| Aksesoris | `aksesoris` | pins, clips, pouch | brass and enamel finishes |

---

## 5. SKUs, 14 concrete products

Prices are the demo catalogue. Every SKU below needs its **own** subject specific photograph
per R49. A reused generic image across cards is a rejected build.

### Pashmina

**1. Pashmina Alun Voal**
`pashmina-alun-voal` | Voal premium ultrafine | 175x75 cm, jahit tepi | **Rp 89.000**
Colourways: Krem Susu, Biru Senja, Zaitun.
Voal ultrafine yang jatuhnya rapi tanpa perlu ditarik tarik. Tidak nerawang walau warnanya
terang, dan tepinya dijahit halus jadi tidak berumbai setelah beberapa kali cuci.

**2. Pashmina Alun Ceruty Babydoll**
`pashmina-alun-ceruty` | Ceruty babydoll premium | 180x75 cm, jahit tepi | **Rp 79.000**
Colourways: Kabut, Mocha, Hitam Pekat.
Paling ringan di koleksi ini. Bahannya halus dan jatuh, gampang dibentuk buat yang baru mulai
pakai pashmina, dan enak dipakai dari pagi sampai malam.

**3. Pashmina Bilah Diamond Crepe**
`pashmina-bilah-diamond` | Diamond crepe, tekstur kulit jeruk | 175x75 cm, jahit tepi | **Rp 95.000**
Colourways: Taro, Marun Tua, Putih Tulang.
Lebih tebal dan bertekstur dibanding ceruty. Kalau kamu tipe yang hijabnya sering letoy siang
hari, ini jawabannya, bentuknya bertahan seharian.

**4. Pashmina Sanding Viscose**
`pashmina-sanding-viscose` | Viscose premium | 180x75 cm, laser cut, plat logo kuningan | **Rp 149.000**
Colourways: Terakota, Sage, Abu Kabut.
Kelas paling atas di lini pashmina. Viscose yang jatuhnya berat dan mahal, tepi laser cut yang
rapi, dan plat logo kuningan kecil di sudut.

### Segi empat

**5. Segi Empat Titik Voal**
`segi-empat-titik-voal` | Voal premium | 115x115 cm, jahit tepi, plat logo kuningan | **Rp 109.000**
Colourways: Putih Tulang, Biru Senja, Zaitun.
Ukuran 115 buat kamu yang mau bagian dada tertutup rapi tanpa perlu ditumpuk. Voal premium,
warna tidak belang setelah dicuci.

**6. Segi Empat Kanvas Polycotton**
`segi-empat-kanvas-polycotton` | Polycotton | 110x110 cm, jahit tepi | **Rp 75.000**
Colourways: Hitam Pekat, Krem Susu, Biru Tinta.
Segi empat harian yang kaku sedikit jadi gampang dibentuk dan tidak licin waktu dipeniti.
Cocok buat sekolah, kuliah, dan kerja.

**7. Segi Empat Sulur Voal Motif**
`segi-empat-sulur-voal` | Voal premium printed | 115x115 cm, jahit tepi | **Rp 129.000**
Colourways: Sulur Pagi, Sulur Senja, Sulur Kabut.
Motif sulur yang digambar sendiri, skalanya sengaja kecil supaya tetap kalem dipakai kerja.
Satu hijab motif sudah cukup untuk menghidupkan outfit polos.

**8. Segi Empat Satin Lembayung**
`segi-empat-satin-lembayung` | Satin silk premium | 110x110 cm, jahit tepi | **Rp 189.000**
Colourways: Champagne, Marun Tua, Biru Tinta.
Kilau satin yang lembut, bukan yang mengkilap berlebihan. Ini hijab buat kondangan, lebaran,
dan foto keluarga.

### Bergo dan instan

**9. Bergo Rapi Jersey**
`bergo-rapi-jersey` | Cotton spandex jersey | Size M dan L, tanpa pet | **Rp 89.000**
Colourways: Hitam Pekat, Mocha, Kabut.
Tinggal pakai, tidak perlu jarum. Jerseynya tebal jadi tidak mencetak bentuk kepala, dan
bagian dahinya tidak melar setelah dipakai berkali kali.

**10. Bergo Kerja Instan Voal**
`bergo-kerja-instan-voal` | Voal dengan pet antem | Size all | **Rp 119.000**
Colourways: Krem Susu, Zaitun, Biru Tinta.
Rasanya seperti hijab voal yang dibentuk rapi, tapi siap pakai dalam sepuluh detik. Pet antem
di dalam menjaga bentuknya tetap tegak sampai sore.

### Sport

**11. Sport Hijab Laju**
`sport-hijab-laju` | Quick dry knit, karet anti geser | Size S, M, L | **Rp 99.000**
Colourways: Hitam Pekat, Biru Senja, Sage.
Dirancang buat gerak. Bahannya menyerap keringat dan cepat kering, ada karet halus di dalam
supaya tidak melorot waktu lari atau angkat beban.

### Inner dan ciput

**12. Inner Ninja Antem**
`inner-ninja-antem` | Jersey | Size all | **Rp 35.000**
Colourways: Hitam Pekat, Krem Susu, Abu Kabut.
Inner yang menutup sampai leher tanpa bikin gerah. Karet belakangnya lembut jadi tidak
meninggalkan bekas di dahi.

### Aksesoris

**13. Set Jarum Magnet Simpul**
`set-jarum-magnet` | 6 pcs magnet pin | Finish kuningan, perak, hitam | **Rp 45.000**
Colourways: Kuningan, Perak, Hitam Doff.
Magnet yang cukup kuat untuk voal dan satin, tapi tidak meninggalkan lubang di kain. Satu set
isi enam, disimpan di kotak kecil.

**14. Pouch Simpul Kanvas**
`pouch-kanvas` | Kanvas drawstring | 24x30 cm | **Rp 39.000**
Colourways: Krem, Zaitun.
Tempat menyimpan atau membawa hijab supaya tidak kusut di dalam tas. Muat tiga sampai empat
pashmina lipat.

---

## 6. Article and tutorial seed, 6 topics

1. **Cara pakai pashmina simpel untuk ke kantor, tiga menit jadi**
   Step by step dengan foto tiap tahap, pakai Pashmina Alun Voal.
2. **Beda voal, ceruty babydoll, dan diamond crepe, mana yang cocok buat kamu**
   Tabel perbandingan berat, jatuh, tekstur, dan siapa yang cocok pakai apa.
3. **Panduan warna hijab 2026, netral yang tetap terlihat segar**
   Olive, mocha, beige, dusty blue, dan cara memadukannya dengan outfit yang sudah kamu punya.
4. **Rahasia hijab tidak mudah letoy, dari cara cuci sampai cara simpan**
   Suhu air, deterjen, cara jemur, cara lipat, dan kesalahan yang paling sering terjadi.
5. **Segi empat 110 atau 115, mana ukuran yang pas untuk bentuk wajah kamu**
   Panduan ukuran dengan ilustrasi, terhubung ke halaman panduan ukuran.
6. **Sport hijab bukan cuma jersey biasa, ini yang bikin beda**
   Bahan quick dry, karet anti geser, dan kenapa hijab harian tidak nyaman buat olahraga.

---

## 7. FAQ seed, R7

1. Bahan apa yang paling adem untuk dipakai seharian?
2. Apakah hijab Simpul nerawang?
3. Berapa ukuran pashmina dan segi empat Simpul?
4. Bagaimana cara mencuci supaya warnanya tidak pudar dan tidak letoy?
5. Apakah warna di foto sama dengan warna aslinya?
6. Berapa lama pesanan diproses dan dikirim?
7. Apakah bisa tukar ukuran atau warna kalau tidak cocok?
8. Apakah ada garansi kalau produk cacat atau jahitannya tidak rapi?
9. Metode pembayaran apa saja yang tersedia?
10. Apakah Simpul melayani pembelian grosir atau seragaman untuk acara?

Answers are written at Stage 3 or Stage 5 in the tone of voice above: specific first, warm
second, no filler.

---

## 8. Brand do and do not

**Do**
- Lead with the spec. Material, size, edge finish, then the feeling.
- Show the same colourway in three lights so the buyer trusts the photo.
- Name colours in Bahasa Indonesia with a real referent: Krem Susu, Biru Senja, Zaitun, Taro.
- Keep the page calm. White space is the luxury signal here, not gold gradients.

**Do not**
- Do not use an em dash or an en dash anywhere. R11.
- Do not round any corner. Border radius is 0 everywhere except the mobile floating WhatsApp
  button. R10.
- Do not put a brown, amber, or kraft texture on any surface. That is the jadul trap.
- Do not use religious guilt or pressure as a sales angle. Simpul sells taste and fabric.
- Do not stage the product as a bottle, jar, or container. It is cloth.
- Do not write "premium berkualitas" without a number next to it.

---

## 9. Handoff notes for the next stages

- **Stage 2, Asset Forge**: logo brief is in `LOGO.md`. The knockout white variant is mandatory,
  the footer is `--brand-deep` `#16233B`. R43.
- **Stage 3, Site Architect**: the hero tone is **dark**, and the navbar is **solid ivory from
  first paint**, never transparent over the hero. This is a locked decision, see `DESIGN.md`
  section 6. All 14 SKUs need their own `MEDIA.md` row per R49.
- **Stage 4, Media Producer**: paste the PHOTO DNA and NEGATIVE blocks from `ART-DIRECTION.md`
  verbatim, and use the locked packaging keyword from section 3 above for any packaging shot.
  Hero video is mandatory, Veo Lite, 8 seconds, 16:9, `public/video/hero-simpul.mp4`. R30 and R44.
