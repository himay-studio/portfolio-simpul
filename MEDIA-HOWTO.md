# MEDIA-HOWTO.md, Simpul

Panduan generate media untuk website **Simpul** (`portfolio-simpul`).

Dokumen ini adalah **satu satunya lembar instruksi** yang kamu butuhkan. Semua prompt
lengkapnya ada di `MEDIA.md` di folder yang sama. Total **74 aset**,
73 gambar dan 1 video.

Logo sudah selesai di tahap sebelumnya dan sudah ada di `public/img/`, jadi kamu tidak
perlu bikin logo lagi. Yang perlu digenerate cuma foto produk, banner kategori, cover
artikel, foto atelier, foto kemasan, lookbook, dan satu video hero.

---

## Lima langkah

### 1. Copy paste prompt yang sudah dirangkai

Buka Google Flow di link ini:

> https://labs.google/fx/id/tools/flow/project/1e873728-41ff-4e87-ab36-3de32f6ad416

Kerjakan di collection bernama **`simpul`** (slug site ini). Kalau collection-nya belum
ada, bikin dulu dengan nama itu persis.

Buka `MEDIA.md`, cari aset yang mau digenerate, lalu **copy seluruh isi blok kode**-nya
ke chat input Google Flow. Blok itu sudah berisi tiga bagian sekaligus:

- **SUBJECT**, deskripsi khusus aset itu
- **PHOTO DNA**, pengaturan kamera, cahaya, dan tekstur kain
- **NEGATIVE**, daftar hal yang harus dihindari

**Copy ketiga tiganya, jangan SUBJECT doang.** Kalau cuma SUBJECT yang dikirim, hasilnya
kelihatan AI banget dan pasti ditolak waktu review.

### 2. Atur config

| Setting | Nilai |
| --- | --- |
| Rasio | Ikuti kolom **Rasio** di `MEDIA.md`. 1:1 untuk produk flat lay dan makro, 4:5 untuk produk dipakai model, 3:4 untuk produk tergantung, 4:3 untuk banner kategori dan kemasan, 3:2 untuk lookbook dan atelier, 16:9 untuk cover artikel dan hero |
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

> `~/Project/simpul/public/`

Masuk ke subfolder sesuai konvensinya, `public/img/products/`, `public/img/categories/`,
`public/img/articles/`, `public/img/lookbook/`, `public/img/about/`,
`public/img/packaging/`, dan `public/video/`.

Nama filenya **PERSIS seperti kolom path di `MEDIA.md`**. Salah satu huruf saja, atau
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

## Checklist file, 74 aset

Centang setelah filenya ada di folder yang benar dengan nama yang benar.

#### `public/img/`  (1 file)

| ID | Nama file, PERSIS seperti ini | Rasio | Model | Sudah |
| --- | --- | --- | --- | --- |
| `M01` | `hero-simpul-poster.jpg` | 16:9 | Nano Banana, 1K | [ ] |

#### `public/video/`  (1 file)

| ID | Nama file, PERSIS seperti ini | Rasio | Model | Sudah |
| --- | --- | --- | --- | --- |
| `M02` | `hero-simpul.mp4` | 16:9 | Veo Lite, 8 detik | [ ] |

#### `public/img/categories/`  (6 file)

| ID | Nama file, PERSIS seperti ini | Rasio | Model | Sudah |
| --- | --- | --- | --- | --- |
| `M03` | `pashmina.jpg` | 4:3 | Nano Banana, 1K | [ ] |
| `M04` | `segi-empat.jpg` | 4:3 | Nano Banana, 1K | [ ] |
| `M05` | `bergo-instan.jpg` | 4:3 | Nano Banana, 1K | [ ] |
| `M06` | `sport.jpg` | 4:3 | Nano Banana, 1K | [ ] |
| `M07` | `inner-ciput.jpg` | 4:3 | Nano Banana, 1K | [ ] |
| `M08` | `aksesoris.jpg` | 4:3 | Nano Banana, 1K | [ ] |

#### `public/img/products/`  (56 file)

| ID | Nama file, PERSIS seperti ini | Rasio | Model | Sudah |
| --- | --- | --- | --- | --- |
| `M09` | `pashmina-alun-voal-1.jpg` | 4:5 | Nano Banana, 1K | [ ] |
| `M10` | `pashmina-alun-voal-2.jpg` | 1:1 | Nano Banana, 1K | [ ] |
| `M11` | `pashmina-alun-voal-3.jpg` | 3:4 | Nano Banana, 1K | [ ] |
| `M12` | `pashmina-alun-voal-4.jpg` | 1:1 | Nano Banana, 1K | [ ] |
| `M13` | `pashmina-alun-ceruty-1.jpg` | 4:5 | Nano Banana, 1K | [ ] |
| `M14` | `pashmina-alun-ceruty-2.jpg` | 1:1 | Nano Banana, 1K | [ ] |
| `M15` | `pashmina-alun-ceruty-3.jpg` | 3:4 | Nano Banana, 1K | [ ] |
| `M16` | `pashmina-alun-ceruty-4.jpg` | 1:1 | Nano Banana, 1K | [ ] |
| `M17` | `pashmina-bilah-diamond-1.jpg` | 4:5 | Nano Banana, 1K | [ ] |
| `M18` | `pashmina-bilah-diamond-2.jpg` | 1:1 | Nano Banana, 1K | [ ] |
| `M19` | `pashmina-bilah-diamond-3.jpg` | 3:4 | Nano Banana, 1K | [ ] |
| `M20` | `pashmina-bilah-diamond-4.jpg` | 1:1 | Nano Banana, 1K | [ ] |
| `M21` | `pashmina-sanding-viscose-1.jpg` | 4:5 | Nano Banana, 1K | [ ] |
| `M22` | `pashmina-sanding-viscose-2.jpg` | 1:1 | Nano Banana, 1K | [ ] |
| `M23` | `pashmina-sanding-viscose-3.jpg` | 3:4 | Nano Banana, 1K | [ ] |
| `M24` | `pashmina-sanding-viscose-4.jpg` | 1:1 | Nano Banana, 1K | [ ] |
| `M25` | `segi-empat-titik-voal-1.jpg` | 4:5 | Nano Banana, 1K | [ ] |
| `M26` | `segi-empat-titik-voal-2.jpg` | 1:1 | Nano Banana, 1K | [ ] |
| `M27` | `segi-empat-titik-voal-3.jpg` | 3:4 | Nano Banana, 1K | [ ] |
| `M28` | `segi-empat-titik-voal-4.jpg` | 1:1 | Nano Banana, 1K | [ ] |
| `M29` | `segi-empat-kanvas-polycotton-1.jpg` | 4:5 | Nano Banana, 1K | [ ] |
| `M30` | `segi-empat-kanvas-polycotton-2.jpg` | 1:1 | Nano Banana, 1K | [ ] |
| `M31` | `segi-empat-kanvas-polycotton-3.jpg` | 3:4 | Nano Banana, 1K | [ ] |
| `M32` | `segi-empat-kanvas-polycotton-4.jpg` | 1:1 | Nano Banana, 1K | [ ] |
| `M33` | `segi-empat-sulur-voal-1.jpg` | 4:5 | Nano Banana, 1K | [ ] |
| `M34` | `segi-empat-sulur-voal-2.jpg` | 1:1 | Nano Banana, 1K | [ ] |
| `M35` | `segi-empat-sulur-voal-3.jpg` | 3:4 | Nano Banana, 1K | [ ] |
| `M36` | `segi-empat-sulur-voal-4.jpg` | 1:1 | Nano Banana, 1K | [ ] |
| `M37` | `segi-empat-satin-lembayung-1.jpg` | 4:5 | Nano Banana, 1K | [ ] |
| `M38` | `segi-empat-satin-lembayung-2.jpg` | 1:1 | Nano Banana, 1K | [ ] |
| `M39` | `segi-empat-satin-lembayung-3.jpg` | 3:4 | Nano Banana, 1K | [ ] |
| `M40` | `segi-empat-satin-lembayung-4.jpg` | 1:1 | Nano Banana, 1K | [ ] |
| `M41` | `bergo-rapi-jersey-1.jpg` | 4:5 | Nano Banana, 1K | [ ] |
| `M42` | `bergo-rapi-jersey-2.jpg` | 1:1 | Nano Banana, 1K | [ ] |
| `M43` | `bergo-rapi-jersey-3.jpg` | 3:4 | Nano Banana, 1K | [ ] |
| `M44` | `bergo-rapi-jersey-4.jpg` | 1:1 | Nano Banana, 1K | [ ] |
| `M45` | `bergo-kerja-instan-voal-1.jpg` | 4:5 | Nano Banana, 1K | [ ] |
| `M46` | `bergo-kerja-instan-voal-2.jpg` | 1:1 | Nano Banana, 1K | [ ] |
| `M47` | `bergo-kerja-instan-voal-3.jpg` | 3:4 | Nano Banana, 1K | [ ] |
| `M48` | `bergo-kerja-instan-voal-4.jpg` | 1:1 | Nano Banana, 1K | [ ] |
| `M49` | `sport-hijab-laju-1.jpg` | 4:5 | Nano Banana, 1K | [ ] |
| `M50` | `sport-hijab-laju-2.jpg` | 1:1 | Nano Banana, 1K | [ ] |
| `M51` | `sport-hijab-laju-3.jpg` | 3:4 | Nano Banana, 1K | [ ] |
| `M52` | `sport-hijab-laju-4.jpg` | 1:1 | Nano Banana, 1K | [ ] |
| `M53` | `inner-ninja-antem-1.jpg` | 4:5 | Nano Banana, 1K | [ ] |
| `M54` | `inner-ninja-antem-2.jpg` | 1:1 | Nano Banana, 1K | [ ] |
| `M55` | `inner-ninja-antem-3.jpg` | 3:4 | Nano Banana, 1K | [ ] |
| `M56` | `inner-ninja-antem-4.jpg` | 1:1 | Nano Banana, 1K | [ ] |
| `M57` | `set-jarum-magnet-1.jpg` | 4:5 | Nano Banana, 1K | [ ] |
| `M58` | `set-jarum-magnet-2.jpg` | 1:1 | Nano Banana, 1K | [ ] |
| `M59` | `set-jarum-magnet-3.jpg` | 3:4 | Nano Banana, 1K | [ ] |
| `M60` | `set-jarum-magnet-4.jpg` | 1:1 | Nano Banana, 1K | [ ] |
| `M61` | `pouch-kanvas-1.jpg` | 4:5 | Nano Banana, 1K | [ ] |
| `M62` | `pouch-kanvas-2.jpg` | 1:1 | Nano Banana, 1K | [ ] |
| `M63` | `pouch-kanvas-3.jpg` | 3:4 | Nano Banana, 1K | [ ] |
| `M64` | `pouch-kanvas-4.jpg` | 1:1 | Nano Banana, 1K | [ ] |

#### `public/img/articles/`  (6 file)

| ID | Nama file, PERSIS seperti ini | Rasio | Model | Sudah |
| --- | --- | --- | --- | --- |
| `M65` | `cara-pakai-pashmina-kantor.jpg` | 16:9 | Nano Banana, 1K | [ ] |
| `M66` | `beda-voal-ceruty-diamond.jpg` | 16:9 | Nano Banana, 1K | [ ] |
| `M67` | `panduan-warna-hijab-2026.jpg` | 16:9 | Nano Banana, 1K | [ ] |
| `M68` | `rahasia-hijab-tidak-letoy.jpg` | 16:9 | Nano Banana, 1K | [ ] |
| `M69` | `segi-empat-110-atau-115.jpg` | 16:9 | Nano Banana, 1K | [ ] |
| `M70` | `sport-hijab-bukan-jersey-biasa.jpg` | 16:9 | Nano Banana, 1K | [ ] |

#### `public/img/about/`  (1 file)

| ID | Nama file, PERSIS seperti ini | Rasio | Model | Sudah |
| --- | --- | --- | --- | --- |
| `M71` | `atelier-simpul.jpg` | 3:2 | Nano Banana, 1K | [ ] |

#### `public/img/packaging/`  (1 file)

| ID | Nama file, PERSIS seperti ini | Rasio | Model | Sudah |
| --- | --- | --- | --- | --- |
| `M72` | `simpul-unboxing.jpg` | 4:3 | Nano Banana, 1K | [ ] |

#### `public/img/lookbook/`  (2 file)

| ID | Nama file, PERSIS seperti ini | Rasio | Model | Sudah |
| --- | --- | --- | --- | --- |
| `M73` | `lookbook-pagi.jpg` | 3:2 | Nano Banana, 1K | [ ] |
| `M74` | `lookbook-sore.jpg` | 3:2 | Nano Banana, 1K | [ ] |


---

## Catatan khusus video hero, `M02`

Ini **wajib**, bukan opsional. Website tidak boleh dideploy dengan hero tanpa video yang
benar benar berputar.

| | |
| --- | --- |
| File | `public/video/hero-simpul.mp4` |
| Model | **Veo Lite** |
| Durasi | **8 detik** |
| Rasio | **16:9** |
| Resolusi | 720p |
| Tone | **Gelap.** Studio gelap, satu jendela, bayangan dalam |

Dua hal yang bikin gagal di Veo Lite:

- **Jangan kirim `generateAudio`.** Model lite bikin audionya sendiri dan menolak field itu.
- **Jangan kirim `personGeneration` dengan nilai `dont_allow`.** Klip ini butuh orang di dalamnya.

Tone gelapnya dikunci karena navbar website ini didesain terhadap hero yang gelap. Kalau
videonya jadi terang, teks navbar dan teks hero jadi susah dibaca.

---

## Kalau ada yang tidak jelas

Jangan menebak nama file. Buka `MEDIA.md`, kolom path adalah kebenarannya. Kalau sebuah
prompt hasilnya aneh terus setelah dua kali coba, lewati dulu, catat ID-nya, dan lanjut ke
yang lain.
