/**
 * Generates MEDIA.md, the contract Stage 4 executes.
 *
 * Why a generator and not a hand written file: the PHOTO DNA and NEGATIVE
 * blocks must be pasted VERBATIM into every one of the 74 rows
 * (ART-DIRECTION.md section 2 and 3 are explicit about this, a subject-only
 * prompt is how AI slop gets generated and R33 rejects it). Repeating two
 * fixed blocks 74 times by hand is exactly the kind of task that drifts, and a
 * single reworded copy would be invisible in review. Here the blocks are
 * copied once from ART-DIRECTION.md and concatenated mechanically, so drift is
 * impossible.
 *
 * The per asset SUBJECT text is authored by hand in `media-assets.mjs`, one
 * distinct block per asset, which is the half R49 actually cares about.
 *
 *   node scripts/gen-media.mjs          write MEDIA.md
 *   node scripts/gen-media.mjs --check  verify every path is reachable
 */

import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  SKUS,
  FRAMES,
  CATEGORY_BANNERS,
  ARTICLE_COVERS,
  SINGLES,
  HERO_VIDEO,
} from "./media-assets.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/* -------------------------------------------------------------------------
   PHOTO DNA and NEGATIVE, lifted verbatim from ART-DIRECTION.md sections 2
   and 3. Do not reword. If the art direction changes, change it there and
   re-run this script.
   ------------------------------------------------------------------------- */

const PHOTO_DNA = `PHOTO DNA:
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
off centre with generous breathing room, calm editorial mood, natural imperfect framing.`;

const NEGATIVE = `NEGATIVE:
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
AI artefacts, no duplicated pattern seams, no repeating tiled background.`;

const pad = (n) => `M${String(n).padStart(2, "0")}`;

/* ---------------------------------------------------------- build the list */

const assets = [];

const single = (n) => SINGLES.find((s) => s.id === n);

// M01 hero poster
assets.push({
  id: pad(1),
  path: single(1).path,
  type: "image",
  ratio: single(1).ratio,
  shot: single(1).shot,
  where: single(1).where,
  subject: single(1).subject,
});

// M02 hero video, MANDATORY
assets.push({
  id: pad(2),
  path: HERO_VIDEO.path,
  type: "video",
  ratio: HERO_VIDEO.ratio,
  shot: "H1",
  where: "Home page hero background. MANDATORY, R30 and R44.",
  subject: HERO_VIDEO.subject,
  extraNegative: HERO_VIDEO.extraNegative,
  model: HERO_VIDEO.model,
  duration: HERO_VIDEO.duration,
  resolution: HERO_VIDEO.resolution,
});

// M03 to M08, category banners
CATEGORY_BANNERS.forEach((c, i) => {
  assets.push({
    id: pad(3 + i),
    path: c.path,
    type: "image",
    ratio: "4:3",
    shot: "S4",
    where: `Home page category strip, and the header of /katalog/${c.slug}/`,
    subject: c.subject,
  });
});

// M09 to M64, 14 SKUs x 4 frames
SKUS.forEach((s, si) => {
  FRAMES.forEach((f, fi) => {
    assets.push({
      id: pad(9 + si * 4 + fi),
      path: `img/products/${s.slug}-${fi + 1}.jpg`,
      type: "image",
      ratio: f.ratio,
      shot: f.shot,
      where:
        fi === 0
          ? `Card image for ${s.name} everywhere it appears, plus gallery frame 1 on /produk/${s.slug}/`
          : `Gallery frame ${fi + 1} on /produk/${s.slug}/`,
      subject: f.build(s),
    });
  });
});

// M65 to M70, article covers
ARTICLE_COVERS.forEach((a, i) => {
  assets.push({
    id: pad(65 + i),
    path: a.path,
    type: "image",
    ratio: "16:9",
    shot: "S7",
    where: `Cover for /artikel/${a.slug}/, and its card in the article index`,
    subject: a.subject,
  });
});

// M71 to M74, the remaining one offs
[71, 72, 73, 74].forEach((n) => {
  const s = single(n);
  assets.push({
    id: pad(n),
    path: s.path,
    type: "image",
    ratio: s.ratio,
    shot: s.shot,
    where: s.where,
    subject: s.subject,
  });
});

/* ------------------------------------------------------------------ render */

const summary = assets.map(
  (a) =>
    `| \`${a.id}\` | \`public/${a.path}\` | ${a.type} | ${a.ratio} | ${a.shot} | ${a.where} |`,
);

const detail = assets.map((a) => {
  const head = [
    `### ${a.id}, \`public/${a.path}\``,
    "",
    `| | |`,
    `| --- | --- |`,
    `| Tipe | ${a.type} |`,
    `| Rasio | ${a.ratio} |`,
    `| Resep foto | ${a.shot} |`,
    `| Dipakai di | ${a.where} |`,
  ];
  if (a.model) {
    head.push(
      `| Model | \`${a.model}\` |`,
      `| Durasi | ${a.duration} |`,
      `| Resolusi | ${a.resolution} |`,
      `| Playback | muted, autoplay, loop, playsinline |`,
    );
  } else {
    head.push(
      `| Model | \`gemini-3.1-flash-image\`, 1K, \`useSearchGrounding: true\` |`,
    );
  }

  const prompt = [
    "```",
    `SUBJECT: ${a.subject}`,
    "",
    PHOTO_DNA,
    "",
    NEGATIVE,
    ...(a.extraNegative ? ["", a.extraNegative] : []),
    "```",
  ];

  return [...head, "", ...prompt, ""].join("\n");
});

const doc = `# MEDIA.md, Simpul

Stage 3 output, Site Architect. **This is the contract Stage 4 executes.**

${assets.length} aset, ${assets.filter((a) => a.type === "image").length} gambar dan ${assets.filter((a) => a.type === "video").length} video.
Tutorial langkah demi langkah untuk manusia ada di \`MEDIA-HOWTO.md\`.

> **File ini digenerate.** Sumbernya \`scripts/media-assets.mjs\` (SUBJECT per aset,
> ditulis tangan) plus blok PHOTO DNA dan NEGATIVE yang disalin verbatim dari
> \`ART-DIRECTION.md\`. Jalankan \`node scripts/gen-media.mjs\` setelah mengubah
> sumbernya. Jangan edit \`MEDIA.md\` langsung, editanmu akan tertimpa.

---

## Aturan yang mengikat Stage 4

1. **Nama file harus PERSIS seperti kolom path.** Salah satu huruf saja dan gambarnya
   hilang di build. Placeholder di kode membawa \`data-media\` yang isinya path yang sama
   persis, jadi keduanya bisa dicocokkan otomatis.
2. **Paste SUBJECT plus PHOTO DNA plus NEGATIVE, ketiganya.** Mengirim SUBJECT saja
   adalah cara paling cepat menghasilkan AI slop, dan R33 menolaknya.
3. **R49, satu subjek spesifik per aset.** Tidak ada satu gambar yang dipakai di dua slot.
   Jumlah blok SUBJECT di dokumen ini sama dengan jumlah path, ${assets.length} banding ${assets.length}.
4. **R30 dan R44, video hero WAJIB.** \`M02\` bukan opsional dan poster Ken Burns bukan
   pengganti yang sah. Situs tidak boleh dideploy dengan hero tanpa mp4 yang benar benar
   berputar, kecuali owner menyetujuinya tertulis untuk situs ini secara spesifik.
5. **R15, jangan pernah menunjuk file yang belum ada.** Komponen \`Media\` di Stage 3
   merender kotak beranotasi, bukan \`<video>\` mati. Stage 5 baru menggantinya jadi
   \`<img>\` dan \`<video>\` setelah filenya benar benar ada di disk.
6. **Cek mata sebelum menutup Stage 4.** Sepuluh pertanyaan self check ada di
   \`ART-DIRECTION.md\` section 9. Regenerate yang gagal, maksimal dua kali per aset.

### Catatan crop untuk galeri produk

Frame galeri di \`/produk/[slug]/\` dirender dalam kotak 4:5 dengan \`object-fit: cover\`.
Artinya frame S2 dan S5 yang 1:1 dan frame S3 yang 3:4 akan terpotong di sisi kiri dan
kanan ketika tampil sebagai foto utama. Susun subjeknya di area tengah, jangan menaruh
detail penting seperti plat kuningan atau jahitan tepi tepat di pinggir frame.

### Larangan kategori, dari \`BRAND.md\` section 2

Ini kain, bukan produk botolan. **Jangan pernah** menghasilkan botol kaca, botol amber,
botol plastik, drigen, toples, jar, pump bottle, tube, sachet, kemasan apotek, atau label
kraft ala apothecary untuk brand ini. Latar kraft coklat, set apothecary gelap, dan grade
tungsten oranye juga dilarang, itu palet minyak esensial dan itulah kegagalan yang sudah
pernah dikirim di Bersihara.

---

## Ringkasan, ${assets.length} aset

| ID | Path | Tipe | Rasio | Resep | Dipakai di |
| --- | --- | --- | --- | --- | --- |
${summary.join("\n")}

---

## Prompt lengkap, satu per aset

${detail.join("\n")}
`;

/* ------------------------------------------------------------------- write */

if (process.argv.includes("--check")) {
  // cross check every declared path against the placeholders in the built HTML
  const outDir = join(ROOT, "out");
  if (!existsSync(outDir)) {
    console.error("out/ not found, run `npm run build` first");
    process.exit(1);
  }

  const html = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, entry.name);
      if (entry.isDirectory()) walk(p);
      else if (entry.name.endsWith(".html")) html.push(readFileSync(p, "utf8"));
    }
  };
  walk(outDir);

  const inMarkup = new Set();
  const re = /data-media="([^"]+)"/g;
  for (const doc of html) {
    let m;
    while ((m = re.exec(doc))) inMarkup.add(m[1]);
  }

  const declared = new Set(assets.map((a) => a.path));
  const missing = [...inMarkup].filter((p) => !declared.has(p));
  const unused = [...declared].filter((p) => !inMarkup.has(p));

  console.log(`declared in MEDIA.md : ${declared.size}`);
  console.log(`referenced in markup : ${inMarkup.size}`);
  if (missing.length) {
    console.error("\nIn markup but NOT in MEDIA.md, Stage 4 would never generate these:");
    missing.forEach((p) => console.error("  " + p));
  }
  if (unused.length) {
    console.error("\nIn MEDIA.md but never referenced, would be generated for nothing:");
    unused.forEach((p) => console.error("  " + p));
  }
  if (missing.length || unused.length) process.exit(1);
  console.log("\nOK, every declared asset is used and every used asset is declared.");
} else {
  writeFileSync(join(ROOT, "MEDIA.md"), doc, "utf8");
  console.log(`MEDIA.md written, ${assets.length} assets`);

  /* ------------------------------------------------- MEDIA-HOWTO.md, R23 */

  const byFolder = new Map();
  for (const a of assets) {
    const folder = "public/" + a.path.split("/").slice(0, -1).join("/");
    if (!byFolder.has(folder)) byFolder.set(folder, []);
    byFolder.get(folder).push(a);
  }

  const checklist = [...byFolder.entries()]
    .map(([folder, list]) => {
      const rows = list.map(
        (a) =>
          `| \`${a.id}\` | \`${a.path.split("/").pop()}\` | ${a.ratio} | ${
            a.type === "video" ? "Veo Lite, 8 detik" : "Nano Banana, 1K"
          } | [ ] |`,
      );
      return [
        `#### \`${folder}/\`  (${list.length} file)`,
        "",
        "| ID | Nama file, PERSIS seperti ini | Rasio | Model | Sudah |",
        "| --- | --- | --- | --- | --- |",
        ...rows,
        "",
      ].join("\n");
    })
    .join("\n");

  const howto = `# MEDIA-HOWTO.md, Simpul

Panduan generate media untuk website **Simpul** (\`portfolio-simpul\`).

Dokumen ini adalah **satu satunya lembar instruksi** yang kamu butuhkan. Semua prompt
lengkapnya ada di \`MEDIA.md\` di folder yang sama. Total **${assets.length} aset**,
${assets.filter((a) => a.type === "image").length} gambar dan ${assets.filter((a) => a.type === "video").length} video.

Logo sudah selesai di tahap sebelumnya dan sudah ada di \`public/img/\`, jadi kamu tidak
perlu bikin logo lagi. Yang perlu digenerate cuma foto produk, banner kategori, cover
artikel, foto atelier, foto kemasan, lookbook, dan satu video hero.

---

## Lima langkah

### 1. Copy paste prompt yang sudah dirangkai

Buka Google Flow di link ini:

> https://labs.google/fx/id/tools/flow/project/1e873728-41ff-4e87-ab36-3de32f6ad416

Kerjakan di collection bernama **\`simpul\`** (slug site ini). Kalau collection-nya belum
ada, bikin dulu dengan nama itu persis.

Buka \`MEDIA.md\`, cari aset yang mau digenerate, lalu **copy seluruh isi blok kode**-nya
ke chat input Google Flow. Blok itu sudah berisi tiga bagian sekaligus:

- **SUBJECT**, deskripsi khusus aset itu
- **PHOTO DNA**, pengaturan kamera, cahaya, dan tekstur kain
- **NEGATIVE**, daftar hal yang harus dihindari

**Copy ketiga tiganya, jangan SUBJECT doang.** Kalau cuma SUBJECT yang dikirim, hasilnya
kelihatan AI banget dan pasti ditolak waktu review.

### 2. Atur config

| Setting | Nilai |
| --- | --- |
| Rasio | Ikuti kolom **Rasio** di \`MEDIA.md\`. 1:1 untuk produk flat lay dan makro, 4:5 untuk produk dipakai model, 3:4 untuk produk tergantung, 4:3 untuk banner kategori dan kemasan, 3:2 untuk lookbook dan atelier, 16:9 untuk cover artikel dan hero |
| Resolution | **1K** |
| Model gambar | **Nano Banana** |
| Model video | **Veo Lite**, 8 detik, 16:9 |

### 3. Generate, maksimum 4 sekaligus

**MAKSIMUM bulk 4 media sekaligus. GABOLEH berbarengan lebih dari 4.**
Lebih dari itu antriannya kacau dan hasilnya sering tertukar antar prompt.

### 4. Lanjut ke prompt berikutnya tanpa download dulu

Jangan download satu satu sambil jalan. Generate dulu semuanya sampai habis, baru
download belakangan sekaligus. Ini jauh lebih cepat.

### 5. Download dan taruh dengan nama file yang PERSIS

Kalau semua sudah jadi, select generated image, download, lalu taruh di:

> \`~/Project/simpul/public/\`

Masuk ke subfolder sesuai konvensinya, \`public/img/products/\`, \`public/img/categories/\`,
\`public/img/articles/\`, \`public/img/lookbook/\`, \`public/img/about/\`,
\`public/img/packaging/\`, dan \`public/video/\`.

Nama filenya **PERSIS seperti kolom path di \`MEDIA.md\`**. Salah satu huruf saja, atau
salah folder, gambarnya rusak dan tidak muncul di website. Checklist lengkapnya ada di
bawah.

---

## Yang paling sering bikin hasilnya ditolak

Baca ini sekali sebelum mulai, lebih hemat waktu daripada generate ulang.

1. **Kulit kelihatan seperti lilin.** Harus ada pori dan tekstur, bukan permukaan mulus.
2. **Kain kelihatan seperti plastik.** Anyaman kainnya harus kelihatan, bukan gradasi rata.
3. **Kain melayang atau berpusar.** Kain harus jatuh ke bawah, kena gravitasi.
4. **Lipatannya terlalu simetris.** Lipatan asli selalu tidak beraturan.
5. **Ada halo bercahaya di pinggir subjek.** Itu tanda paling jelas gambar AI.
6. **Jari lebih dari lima atau nyambung.** Kalau ragu, generate ulang tanpa tangan.
7. **Ada tulisan yang ngawur di hangtag atau label.** Semua teks brand ditulis di kode,
   bukan di gambar. Kalau ada tulisan muncul, generate ulang tanpa benda bertulisan.
8. **Warnanya bergeser dari nama warnanya.** Krem Susu harus krem susu, bukan kuning.
9. **Latar belakangnya blur abstrak.** Harus tetap terbaca sebagai ruangan asli.
10. **Ada botol, toples, atau latar kraft coklat.** Ini brand kain, bukan minyak esensial.
    Kalau muncul benda seperti itu, promptnya salah kategori.

---

## Checklist file, ${assets.length} aset

Centang setelah filenya ada di folder yang benar dengan nama yang benar.

${checklist}

---

## Catatan khusus video hero, \`M02\`

Ini **wajib**, bukan opsional. Website tidak boleh dideploy dengan hero tanpa video yang
benar benar berputar.

| | |
| --- | --- |
| File | \`public/video/hero-simpul.mp4\` |
| Model | **Veo Lite** |
| Durasi | **8 detik** |
| Rasio | **16:9** |
| Resolusi | 720p |
| Tone | **Gelap.** Studio gelap, satu jendela, bayangan dalam |

Dua hal yang bikin gagal di Veo Lite:

- **Jangan kirim \`generateAudio\`.** Model lite bikin audionya sendiri dan menolak field itu.
- **Jangan kirim \`personGeneration\` dengan nilai \`dont_allow\`.** Klip ini butuh orang di dalamnya.

Tone gelapnya dikunci karena navbar website ini didesain terhadap hero yang gelap. Kalau
videonya jadi terang, teks navbar dan teks hero jadi susah dibaca.

---

## Kalau ada yang tidak jelas

Jangan menebak nama file. Buka \`MEDIA.md\`, kolom path adalah kebenarannya. Kalau sebuah
prompt hasilnya aneh terus setelah dua kali coba, lewati dulu, catat ID-nya, dan lanjut ke
yang lain.
`;

  writeFileSync(join(ROOT, "MEDIA-HOWTO.md"), howto, "utf8");
  console.log(`MEDIA-HOWTO.md written`);
}
