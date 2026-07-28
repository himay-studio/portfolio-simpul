/**
 * Simpul catalogue. Single source of truth, BRAND.md section 4 and 5.
 *
 * R42, the modelling rule this file exists to get right:
 *   Colour is a VARIANT DIMENSION inside one product, never a separate
 *   product. A product's `name` is the MODEL, "Pashmina Alun Voal". There is
 *   no product named "Pashmina Krem Susu". The catalogue colour filter narrows
 *   WHICH products are shown, it never changes a displayed name, and the
 *   detail page colour picker swaps image, SKU, and price IN PLACE without
 *   navigating to another slug.
 *
 * R41 depth: 14 product models, 3 colourways each, 4 gallery frames each.
 * R49: every one of those 56 frames has its own subject specific row in
 * MEDIA.md. No image is reused across two slots.
 */

export type CategorySlug =
  | "pashmina"
  | "segi-empat"
  | "bergo-instan"
  | "sport"
  | "inner-ciput"
  | "aksesoris";

export type Category = {
  slug: CategorySlug;
  name: string;
  /** short label, rendered as its own block next to the name. R50. */
  meta: string;
  blurb: string;
  spec: string;
  banner: string;
};

export const CATEGORIES: Category[] = [
  {
    slug: "pashmina",
    name: "Pashmina",
    meta: "Scarf panjang",
    blurb:
      "Scarf panjang yang dililit dan dibentuk. Paling fleksibel, satu kain bisa jadi lima gaya.",
    spec: "175x75 cm atau 180x75 cm, jahit tepi atau laser cut",
    banner: "img/categories/pashmina.jpg",
  },
  {
    slug: "segi-empat",
    name: "Segi empat",
    meta: "Scarf persegi",
    blurb:
      "Dilipat jadi segitiga, cepat dan rapi. Pilihan aman buat sekolah, kuliah, dan kerja.",
    spec: "110x110 cm atau 115x115 cm, jahit tepi",
    banner: "img/categories/segi-empat.jpg",
  },
  {
    slug: "bergo-instan",
    name: "Bergo dan instan",
    meta: "Tanpa jarum",
    blurb:
      "Tinggal pakai, tidak perlu dipeniti. Buat pagi yang buru buru tapi tetap mau rapi.",
    spec: "Jersey atau voal, size M dan L, dengan atau tanpa pet",
    banner: "img/categories/bergo-instan.jpg",
  },
  {
    slug: "sport",
    name: "Sport hijab",
    meta: "Quick dry",
    blurb:
      "Dirancang buat gerak. Menyerap keringat, cepat kering, dan tidak melorot waktu olahraga.",
    spec: "Quick dry knit, size S, M, L",
    banner: "img/categories/sport.jpg",
  },
  {
    slug: "inner-ciput",
    name: "Inner dan ciput",
    meta: "Lapisan dalam",
    blurb:
      "Dipakai di balik hijab supaya rambut tertutup rapi dan hijabnya tidak licin.",
    spec: "Jersey, one size",
    banner: "img/categories/inner-ciput.jpg",
  },
  {
    slug: "aksesoris",
    name: "Aksesoris",
    meta: "Jarum dan pouch",
    blurb:
      "Jarum magnet yang tidak melubangi kain, dan pouch supaya hijab tidak kusut di tas.",
    spec: "Finish kuningan, perak, dan hitam doff",
    banner: "img/categories/aksesoris.jpg",
  },
];

export const categoryBySlug = (slug: string): Category | undefined =>
  CATEGORIES.find((c) => c.slug === slug);

/**
 * Shared colourway dictionary. One name, one hex, everywhere.
 * The catalogue colour filter reads these keys, which is only coherent
 * because colour is a variant and not a product. R42.
 */
export const COLOURS = {
  "Krem Susu": "#EDE2D2",
  "Putih Tulang": "#F2EDE3",
  "Biru Senja": "#6A7F9B",
  "Biru Tinta": "#2A3B57",
  Zaitun: "#6E7350",
  Sage: "#9BA891",
  Kabut: "#C3C0BA",
  "Abu Kabut": "#A5A6A4",
  Mocha: "#8A6E5C",
  Taro: "#B7A6BC",
  "Marun Tua": "#5E2B33",
  Terakota: "#B0674C",
  "Hitam Pekat": "#1B1B1D",
  "Hitam Doff": "#26262A",
  Champagne: "#D9C6A5",
  "Sulur Pagi": "#DCD8C6",
  "Sulur Senja": "#8F7E86",
  "Sulur Kabut": "#B9BDBC",
  Kuningan: "#9C7A3C",
  Perak: "#B9BCC1",
  Krem: "#E4D9C6",
} as const;

export type ColourName = keyof typeof COLOURS;

export type Colorway = {
  /** the variant label the shopper sees. Never the product name. R42. */
  name: ColourName;
  hex: string;
  /** variant SKU, swapped in place by the colour picker */
  sku: string;
  /** the frame the picker swaps to. Index into the product gallery. */
  frame: number;
};

export type Product = {
  slug: string;
  /** the MODEL name. Constant across every colourway. R42. */
  name: string;
  category: CategorySlug;
  /** secondary label, always rendered as its own block. R50. */
  material: string;
  size: string;
  edge: string;
  price: number;
  /** shown struck through when present */
  priceWas?: number;
  badges: string[];
  tagline: string;
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
  colorways: Colorway[];
  /** 4 frames: worn, flat lay, drape, macro. R18 gallery. */
  gallery: { path: string; alt: string; shot: string }[];
  rating: number;
  reviews: number;
  featured?: boolean;
};

const g = (slug: string, n: number) => `img/products/${slug}-${n}.jpg`;

export const PRODUCTS: Product[] = [
  /* ---------------------------------------------------------------- pashmina */
  {
    slug: "pashmina-alun-voal",
    name: "Pashmina Alun Voal",
    category: "pashmina",
    material: "Voal premium ultrafine",
    size: "175x75 cm",
    edge: "Jahit tepi",
    price: 89000,
    badges: ["Paling laris"],
    tagline: "Jatuhnya rapi tanpa perlu ditarik tarik.",
    description:
      "Voal ultrafine yang jatuhnya rapi tanpa perlu ditarik tarik. Tidak nerawang walau warnanya terang, dan tepinya dijahit halus jadi tidak berumbai setelah beberapa kali cuci.",
    features: [
      "Voal ultrafine, permukaannya matte halus dan tidak licin waktu dibentuk",
      "Tidak nerawang, aman dipakai tanpa lapis dua walau warnanya terang",
      "Jahit tepi rapi, tidak berumbai setelah dicuci berkali kali",
      "Ukuran 175x75 cm, cukup untuk gaya sederhana sampai yang menutup dada",
    ],
    specs: [
      { label: "Bahan", value: "Voal premium ultrafine" },
      { label: "Ukuran", value: "175 x 75 cm" },
      { label: "Finishing tepi", value: "Jahit tepi halus" },
      { label: "Berat", value: "Sekitar 95 gram" },
      { label: "Perawatan", value: "Cuci tangan, air dingin, jemur di tempat teduh" },
    ],
    colorways: [
      { name: "Krem Susu", hex: COLOURS["Krem Susu"], sku: "SMP-PAV-KRS", frame: 0 },
      { name: "Biru Senja", hex: COLOURS["Biru Senja"], sku: "SMP-PAV-BSJ", frame: 1 },
      { name: "Zaitun", hex: COLOURS["Zaitun"], sku: "SMP-PAV-ZTN", frame: 2 },
    ],
    gallery: [
      { path: g("pashmina-alun-voal", 1), alt: "Pashmina Alun Voal warna Krem Susu dipakai model", shot: "S1" },
      { path: g("pashmina-alun-voal", 2), alt: "Pashmina Alun Voal warna Biru Senja dilipat rapi", shot: "S2" },
      { path: g("pashmina-alun-voal", 3), alt: "Pashmina Alun Voal warna Zaitun tergantung memperlihatkan jatuhnya kain", shot: "S3" },
      { path: g("pashmina-alun-voal", 4), alt: "Detail jahit tepi Pashmina Alun Voal", shot: "S5" },
    ],
    rating: 4.8,
    reviews: 214,
    featured: true,
  },
  {
    slug: "pashmina-alun-ceruty",
    name: "Pashmina Alun Ceruty Babydoll",
    category: "pashmina",
    material: "Ceruty babydoll premium",
    size: "180x75 cm",
    edge: "Jahit tepi",
    price: 79000,
    badges: ["Paling ringan"],
    tagline: "Paling ringan di koleksi ini, gampang dibentuk.",
    description:
      "Paling ringan di koleksi ini. Bahannya halus dan jatuh, gampang dibentuk buat yang baru mulai pakai pashmina, dan enak dipakai dari pagi sampai malam.",
    features: [
      "Ceruty babydoll dengan permukaan crepe lembut",
      "Ringan dan jatuh, cocok buat pemula yang baru pindah dari segi empat",
      "Tidak gerah dipakai seharian di ruangan ber-AC maupun di luar",
      "Ukuran 180x75 cm, sedikit lebih panjang untuk gaya berlapis",
    ],
    specs: [
      { label: "Bahan", value: "Ceruty babydoll premium" },
      { label: "Ukuran", value: "180 x 75 cm" },
      { label: "Finishing tepi", value: "Jahit tepi halus" },
      { label: "Berat", value: "Sekitar 80 gram" },
      { label: "Perawatan", value: "Cuci tangan, air dingin, jangan diperas kencang" },
    ],
    colorways: [
      { name: "Kabut", hex: COLOURS["Kabut"], sku: "SMP-PAC-KBT", frame: 0 },
      { name: "Mocha", hex: COLOURS["Mocha"], sku: "SMP-PAC-MCH", frame: 1 },
      { name: "Hitam Pekat", hex: COLOURS["Hitam Pekat"], sku: "SMP-PAC-HTM", frame: 2 },
    ],
    gallery: [
      { path: g("pashmina-alun-ceruty", 1), alt: "Pashmina Alun Ceruty warna Kabut dipakai model", shot: "S1" },
      { path: g("pashmina-alun-ceruty", 2), alt: "Pashmina Alun Ceruty warna Mocha dilipat rapi", shot: "S2" },
      { path: g("pashmina-alun-ceruty", 3), alt: "Pashmina Alun Ceruty warna Hitam Pekat tergantung", shot: "S3" },
      { path: g("pashmina-alun-ceruty", 4), alt: "Detail permukaan crepe ceruty babydoll", shot: "S5" },
    ],
    rating: 4.7,
    reviews: 168,
    featured: true,
  },
  {
    slug: "pashmina-bilah-diamond",
    name: "Pashmina Bilah Diamond Crepe",
    category: "pashmina",
    material: "Diamond crepe bertekstur",
    size: "175x75 cm",
    edge: "Jahit tepi",
    price: 95000,
    badges: ["Anti letoy"],
    tagline: "Bentuknya bertahan dari pagi sampai sore.",
    description:
      "Lebih tebal dan bertekstur dibanding ceruty. Kalau kamu tipe yang hijabnya sering letoy siang hari, ini jawabannya, bentuknya bertahan seharian.",
    features: [
      "Diamond crepe dengan tekstur kulit jeruk yang khas",
      "Lebih bertubuh, jadi lipatan dan bentuk bertahan sampai sore",
      "Tidak licin, gampang dipeniti dan tidak gampang melorot",
      "Cocok buat kamu yang aktivitasnya padat dan tidak sempat benerin hijab",
    ],
    specs: [
      { label: "Bahan", value: "Diamond crepe, tekstur kulit jeruk" },
      { label: "Ukuran", value: "175 x 75 cm" },
      { label: "Finishing tepi", value: "Jahit tepi halus" },
      { label: "Berat", value: "Sekitar 115 gram" },
      { label: "Perawatan", value: "Cuci tangan atau mesin mode halus, air dingin" },
    ],
    colorways: [
      { name: "Taro", hex: COLOURS["Taro"], sku: "SMP-PBD-TAR", frame: 0 },
      { name: "Marun Tua", hex: COLOURS["Marun Tua"], sku: "SMP-PBD-MRN", frame: 1 },
      { name: "Putih Tulang", hex: COLOURS["Putih Tulang"], sku: "SMP-PBD-PTL", frame: 2 },
    ],
    gallery: [
      { path: g("pashmina-bilah-diamond", 1), alt: "Pashmina Bilah Diamond warna Taro dipakai model", shot: "S1" },
      { path: g("pashmina-bilah-diamond", 2), alt: "Pashmina Bilah Diamond warna Marun Tua dilipat rapi", shot: "S2" },
      { path: g("pashmina-bilah-diamond", 3), alt: "Pashmina Bilah Diamond warna Putih Tulang tergantung", shot: "S3" },
      { path: g("pashmina-bilah-diamond", 4), alt: "Detail tekstur kulit jeruk diamond crepe", shot: "S5" },
    ],
    rating: 4.9,
    reviews: 142,
    featured: true,
  },
  {
    slug: "pashmina-sanding-viscose",
    name: "Pashmina Sanding Viscose",
    category: "pashmina",
    material: "Viscose premium",
    size: "180x75 cm",
    edge: "Laser cut",
    price: 149000,
    badges: ["Plat kuningan"],
    tagline: "Jatuhnya berat, tepinya laser cut, ada plat kuningan di sudut.",
    description:
      "Kelas paling atas di lini pashmina. Viscose yang jatuhnya berat dan mahal, tepi laser cut yang rapi, dan plat logo kuningan kecil di sudut.",
    features: [
      "Viscose premium dengan sedikit kilau dan jatuh yang berat",
      "Tepi laser cut, bersih tanpa jahitan dan tidak menambah tebal",
      "Plat logo kuningan kecil dijahit di satu sudut",
      "Pilihan buat acara yang butuh tampil rapi tanpa berlebihan",
    ],
    specs: [
      { label: "Bahan", value: "Viscose premium" },
      { label: "Ukuran", value: "180 x 75 cm" },
      { label: "Finishing tepi", value: "Laser cut" },
      { label: "Detail", value: "Plat logo kuningan di sudut" },
      { label: "Perawatan", value: "Cuci tangan, air dingin, setrika suhu rendah" },
    ],
    colorways: [
      { name: "Terakota", hex: COLOURS["Terakota"], sku: "SMP-PSV-TRK", frame: 0 },
      { name: "Sage", hex: COLOURS["Sage"], sku: "SMP-PSV-SGE", frame: 1 },
      { name: "Abu Kabut", hex: COLOURS["Abu Kabut"], sku: "SMP-PSV-ABK", frame: 2 },
    ],
    gallery: [
      { path: g("pashmina-sanding-viscose", 1), alt: "Pashmina Sanding Viscose warna Terakota dipakai model", shot: "S1" },
      { path: g("pashmina-sanding-viscose", 2), alt: "Pashmina Sanding Viscose warna Sage dilipat rapi", shot: "S2" },
      { path: g("pashmina-sanding-viscose", 3), alt: "Pashmina Sanding Viscose warna Abu Kabut tergantung", shot: "S3" },
      { path: g("pashmina-sanding-viscose", 4), alt: "Detail tepi laser cut dan plat kuningan", shot: "S5" },
    ],
    rating: 4.9,
    reviews: 97,
    featured: true,
  },

  /* ------------------------------------------------------------- segi empat */
  {
    slug: "segi-empat-titik-voal",
    name: "Segi Empat Titik Voal",
    category: "segi-empat",
    material: "Voal premium",
    size: "115x115 cm",
    edge: "Jahit tepi",
    price: 109000,
    badges: ["Plat kuningan"],
    tagline: "Ukuran 115 supaya dada tertutup rapi tanpa ditumpuk.",
    description:
      "Ukuran 115 buat kamu yang mau bagian dada tertutup rapi tanpa perlu ditumpuk. Voal premium, warna tidak belang setelah dicuci.",
    features: [
      "Ukuran 115x115 cm, menutup dada tanpa perlu lapis dua",
      "Voal premium yang warnanya tidak belang setelah dicuci",
      "Jahit tepi rapi di keempat sisi",
      "Plat logo kuningan kecil di satu sudut",
    ],
    specs: [
      { label: "Bahan", value: "Voal premium" },
      { label: "Ukuran", value: "115 x 115 cm" },
      { label: "Finishing tepi", value: "Jahit tepi halus" },
      { label: "Detail", value: "Plat logo kuningan di sudut" },
      { label: "Perawatan", value: "Cuci tangan, air dingin, jemur di tempat teduh" },
    ],
    colorways: [
      { name: "Putih Tulang", hex: COLOURS["Putih Tulang"], sku: "SMP-STV-PTL", frame: 0 },
      { name: "Biru Senja", hex: COLOURS["Biru Senja"], sku: "SMP-STV-BSJ", frame: 1 },
      { name: "Zaitun", hex: COLOURS["Zaitun"], sku: "SMP-STV-ZTN", frame: 2 },
    ],
    gallery: [
      { path: g("segi-empat-titik-voal", 1), alt: "Segi Empat Titik Voal warna Putih Tulang dipakai model", shot: "S1" },
      { path: g("segi-empat-titik-voal", 2), alt: "Segi Empat Titik Voal warna Biru Senja dilipat rapi", shot: "S2" },
      { path: g("segi-empat-titik-voal", 3), alt: "Segi Empat Titik Voal warna Zaitun tergantung", shot: "S3" },
      { path: g("segi-empat-titik-voal", 4), alt: "Detail sudut dan plat kuningan Segi Empat Titik Voal", shot: "S5" },
    ],
    rating: 4.8,
    reviews: 131,
    featured: true,
  },
  {
    slug: "segi-empat-kanvas-polycotton",
    name: "Segi Empat Kanvas Polycotton",
    category: "segi-empat",
    material: "Polycotton",
    size: "110x110 cm",
    edge: "Jahit tepi",
    price: 75000,
    badges: ["Harian"],
    tagline: "Sedikit kaku jadi gampang dibentuk dan tidak licin dipeniti.",
    description:
      "Segi empat harian yang kaku sedikit jadi gampang dibentuk dan tidak licin waktu dipeniti. Cocok buat sekolah, kuliah, dan kerja.",
    features: [
      "Polycotton dengan sedikit body, bentuknya gampang diatur",
      "Tidak licin, jarum pentul menancap dan tidak bergeser",
      "Tahan dipakai setiap hari dan dicuci sering",
      "Ukuran 110x110 cm, ukuran standar segi empat harian",
    ],
    specs: [
      { label: "Bahan", value: "Polycotton" },
      { label: "Ukuran", value: "110 x 110 cm" },
      { label: "Finishing tepi", value: "Jahit tepi" },
      { label: "Berat", value: "Sekitar 105 gram" },
      { label: "Perawatan", value: "Cuci mesin mode halus, air dingin" },
    ],
    colorways: [
      { name: "Hitam Pekat", hex: COLOURS["Hitam Pekat"], sku: "SMP-SKP-HTM", frame: 0 },
      { name: "Krem Susu", hex: COLOURS["Krem Susu"], sku: "SMP-SKP-KRS", frame: 1 },
      { name: "Biru Tinta", hex: COLOURS["Biru Tinta"], sku: "SMP-SKP-BTA", frame: 2 },
    ],
    gallery: [
      { path: g("segi-empat-kanvas-polycotton", 1), alt: "Segi Empat Kanvas Polycotton warna Hitam Pekat dipakai model", shot: "S1" },
      { path: g("segi-empat-kanvas-polycotton", 2), alt: "Segi Empat Kanvas Polycotton warna Krem Susu dilipat rapi", shot: "S2" },
      { path: g("segi-empat-kanvas-polycotton", 3), alt: "Segi Empat Kanvas Polycotton warna Biru Tinta tergantung", shot: "S3" },
      { path: g("segi-empat-kanvas-polycotton", 4), alt: "Detail anyaman polycotton dan jahit tepi", shot: "S5" },
    ],
    rating: 4.6,
    reviews: 203,
  },
  {
    slug: "segi-empat-sulur-voal",
    name: "Segi Empat Sulur Voal Motif",
    category: "segi-empat",
    material: "Voal premium printed",
    size: "115x115 cm",
    edge: "Jahit tepi",
    price: 129000,
    badges: ["Motif sendiri"],
    tagline: "Motif sulur skala kecil, tetap kalem dipakai kerja.",
    description:
      "Motif sulur yang digambar sendiri, skalanya sengaja kecil supaya tetap kalem dipakai kerja. Satu hijab motif sudah cukup untuk menghidupkan outfit polos.",
    features: [
      "Motif sulur digambar sendiri, tidak dibeli dari katalog motif umum",
      "Skala motif kecil, tidak ramai dan aman dipakai ke kantor",
      "Voal premium yang sama dengan lini polos, jatuhnya rapi",
      "Cukup satu untuk menghidupkan outfit yang semuanya polos",
    ],
    specs: [
      { label: "Bahan", value: "Voal premium printed" },
      { label: "Ukuran", value: "115 x 115 cm" },
      { label: "Finishing tepi", value: "Jahit tepi halus" },
      { label: "Motif", value: "Sulur skala kecil, cetak digital" },
      { label: "Perawatan", value: "Cuci tangan, air dingin, jangan direndam lama" },
    ],
    colorways: [
      { name: "Sulur Pagi", hex: COLOURS["Sulur Pagi"], sku: "SMP-SSV-SPG", frame: 0 },
      { name: "Sulur Senja", hex: COLOURS["Sulur Senja"], sku: "SMP-SSV-SSJ", frame: 1 },
      { name: "Sulur Kabut", hex: COLOURS["Sulur Kabut"], sku: "SMP-SSV-SKB", frame: 2 },
    ],
    gallery: [
      { path: g("segi-empat-sulur-voal", 1), alt: "Segi Empat Sulur Voal motif Sulur Pagi dipakai model", shot: "S1" },
      { path: g("segi-empat-sulur-voal", 2), alt: "Segi Empat Sulur Voal motif Sulur Senja dilipat rapi", shot: "S2" },
      { path: g("segi-empat-sulur-voal", 3), alt: "Segi Empat Sulur Voal motif Sulur Kabut tergantung", shot: "S3" },
      { path: g("segi-empat-sulur-voal", 4), alt: "Detail cetakan motif sulur pada voal", shot: "S5" },
    ],
    rating: 4.7,
    reviews: 88,
  },
  {
    slug: "segi-empat-satin-lembayung",
    name: "Segi Empat Satin Lembayung",
    category: "segi-empat",
    material: "Satin silk premium",
    size: "110x110 cm",
    edge: "Jahit tepi",
    price: 189000,
    badges: ["Acara"],
    tagline: "Kilau satin yang lembut, bukan yang mengkilap berlebihan.",
    description:
      "Kilau satin yang lembut, bukan yang mengkilap berlebihan. Ini hijab buat kondangan, lebaran, dan foto keluarga.",
    features: [
      "Satin silk dengan kilau rendah yang tidak memantul di foto",
      "Jatuhnya berat dan mewah, cocok untuk acara",
      "Jahit tepi halus supaya sudutnya tetap rapi",
      "Warna dipilih supaya aman untuk seragaman keluarga",
    ],
    specs: [
      { label: "Bahan", value: "Satin silk premium" },
      { label: "Ukuran", value: "110 x 110 cm" },
      { label: "Finishing tepi", value: "Jahit tepi halus" },
      { label: "Kilau", value: "Rendah, tidak memantul di kamera" },
      { label: "Perawatan", value: "Cuci tangan, air dingin, setrika suhu paling rendah" },
    ],
    colorways: [
      { name: "Champagne", hex: COLOURS["Champagne"], sku: "SMP-SSL-CHP", frame: 0 },
      { name: "Marun Tua", hex: COLOURS["Marun Tua"], sku: "SMP-SSL-MRN", frame: 1 },
      { name: "Biru Tinta", hex: COLOURS["Biru Tinta"], sku: "SMP-SSL-BTA", frame: 2 },
    ],
    gallery: [
      { path: g("segi-empat-satin-lembayung", 1), alt: "Segi Empat Satin Lembayung warna Champagne dipakai model", shot: "S1" },
      { path: g("segi-empat-satin-lembayung", 2), alt: "Segi Empat Satin Lembayung warna Marun Tua dilipat rapi", shot: "S2" },
      { path: g("segi-empat-satin-lembayung", 3), alt: "Segi Empat Satin Lembayung warna Biru Tinta tergantung", shot: "S3" },
      { path: g("segi-empat-satin-lembayung", 4), alt: "Detail kilau lembut satin silk", shot: "S5" },
    ],
    rating: 4.8,
    reviews: 76,
  },

  /* ---------------------------------------------------------- bergo instan */
  {
    slug: "bergo-rapi-jersey",
    name: "Bergo Rapi Jersey",
    category: "bergo-instan",
    material: "Cotton spandex jersey",
    size: "Size M dan L",
    edge: "Obras rapi, tanpa pet",
    price: 89000,
    badges: ["Tanpa jarum"],
    tagline: "Tinggal pakai, tidak mencetak bentuk kepala.",
    description:
      "Tinggal pakai, tidak perlu jarum. Jerseynya tebal jadi tidak mencetak bentuk kepala, dan bagian dahinya tidak melar setelah dipakai berkali kali.",
    features: [
      "Cotton spandex jersey yang tebal dan tidak menerawang",
      "Tidak mencetak bentuk kepala, permukaannya rata",
      "Bagian dahi tidak melar walau sering dipakai dan dicuci",
      "Tersedia size M dan L, jahitan belakang rapi",
    ],
    specs: [
      { label: "Bahan", value: "Cotton spandex jersey" },
      { label: "Ukuran", value: "M dan L" },
      { label: "Pet", value: "Tanpa pet" },
      { label: "Panjang", value: "Sekitar 70 cm dari puncak kepala" },
      { label: "Perawatan", value: "Cuci mesin mode halus, jangan pakai pemutih" },
    ],
    colorways: [
      { name: "Hitam Pekat", hex: COLOURS["Hitam Pekat"], sku: "SMP-BRJ-HTM", frame: 0 },
      { name: "Mocha", hex: COLOURS["Mocha"], sku: "SMP-BRJ-MCH", frame: 1 },
      { name: "Kabut", hex: COLOURS["Kabut"], sku: "SMP-BRJ-KBT", frame: 2 },
    ],
    gallery: [
      { path: g("bergo-rapi-jersey", 1), alt: "Bergo Rapi Jersey warna Hitam Pekat dipakai model", shot: "S1" },
      { path: g("bergo-rapi-jersey", 2), alt: "Bergo Rapi Jersey warna Mocha dilipat rapi", shot: "S2" },
      { path: g("bergo-rapi-jersey", 3), alt: "Bergo Rapi Jersey warna Kabut tergantung", shot: "S3" },
      { path: g("bergo-rapi-jersey", 4), alt: "Detail rajutan jersey dan jahitan bergo", shot: "S5" },
    ],
    rating: 4.7,
    reviews: 189,
    featured: true,
  },
  {
    slug: "bergo-kerja-instan-voal",
    name: "Bergo Kerja Instan Voal",
    category: "bergo-instan",
    material: "Voal dengan pet antem",
    size: "Size all",
    edge: "Jahit tepi, pet antem di dalam",
    price: 119000,
    badges: ["Siap 10 detik"],
    tagline: "Rasanya seperti voal yang dibentuk rapi, tapi siap pakai.",
    description:
      "Rasanya seperti hijab voal yang dibentuk rapi, tapi siap pakai dalam sepuluh detik. Pet antem di dalam menjaga bentuknya tetap tegak sampai sore.",
    features: [
      "Voal asli, bukan jersey, jadi jatuhnya tetap seperti hijab biasa",
      "Pet antem di dalam menjaga bagian depan tetap tegak",
      "Siap pakai dalam sepuluh detik, tidak perlu jarum sama sekali",
      "Cocok buat kerja, rapat, dan hari yang jadwalnya padat",
    ],
    specs: [
      { label: "Bahan", value: "Voal premium" },
      { label: "Ukuran", value: "All size" },
      { label: "Pet", value: "Pet antem menyatu di dalam" },
      { label: "Panjang", value: "Sekitar 85 cm dari puncak kepala" },
      { label: "Perawatan", value: "Cuci tangan, jangan dilipat di bagian pet" },
    ],
    colorways: [
      { name: "Krem Susu", hex: COLOURS["Krem Susu"], sku: "SMP-BKV-KRS", frame: 0 },
      { name: "Zaitun", hex: COLOURS["Zaitun"], sku: "SMP-BKV-ZTN", frame: 1 },
      { name: "Biru Tinta", hex: COLOURS["Biru Tinta"], sku: "SMP-BKV-BTA", frame: 2 },
    ],
    gallery: [
      { path: g("bergo-kerja-instan-voal", 1), alt: "Bergo Kerja Instan Voal warna Krem Susu dipakai model", shot: "S1" },
      { path: g("bergo-kerja-instan-voal", 2), alt: "Bergo Kerja Instan Voal warna Zaitun dilipat rapi", shot: "S2" },
      { path: g("bergo-kerja-instan-voal", 3), alt: "Bergo Kerja Instan Voal warna Biru Tinta tergantung", shot: "S3" },
      { path: g("bergo-kerja-instan-voal", 4), alt: "Detail pet antem di bagian dalam bergo", shot: "S5" },
    ],
    rating: 4.8,
    reviews: 124,
  },

  /* ------------------------------------------------------------------ sport */
  {
    slug: "sport-hijab-laju",
    name: "Sport Hijab Laju",
    category: "sport",
    material: "Quick dry knit",
    size: "Size S, M, L",
    edge: "Jahit flatlock, karet anti geser",
    price: 99000,
    badges: ["Quick dry"],
    tagline: "Menyerap keringat, cepat kering, tidak melorot waktu lari.",
    description:
      "Dirancang buat gerak. Bahannya menyerap keringat dan cepat kering, ada karet halus di dalam supaya tidak melorot waktu lari atau angkat beban.",
    features: [
      "Quick dry knit yang menyerap keringat dan cepat kering",
      "Karet halus di bagian dalam, tidak melorot waktu lari atau angkat beban",
      "Jahitan flatlock supaya tidak menggesek kulit waktu berkeringat",
      "Tersedia tiga ukuran, S, M, dan L",
    ],
    specs: [
      { label: "Bahan", value: "Quick dry knit" },
      { label: "Ukuran", value: "S, M, L" },
      { label: "Jahitan", value: "Flatlock, tidak menggesek kulit" },
      { label: "Detail", value: "Karet anti geser di bagian dalam" },
      { label: "Perawatan", value: "Cuci mesin, jangan pakai pelembut kain" },
    ],
    colorways: [
      { name: "Hitam Pekat", hex: COLOURS["Hitam Pekat"], sku: "SMP-SHL-HTM", frame: 0 },
      { name: "Biru Senja", hex: COLOURS["Biru Senja"], sku: "SMP-SHL-BSJ", frame: 1 },
      { name: "Sage", hex: COLOURS["Sage"], sku: "SMP-SHL-SGE", frame: 2 },
    ],
    gallery: [
      { path: g("sport-hijab-laju", 1), alt: "Sport Hijab Laju warna Hitam Pekat dipakai model", shot: "S1" },
      { path: g("sport-hijab-laju", 2), alt: "Sport Hijab Laju warna Biru Senja dilipat rapi", shot: "S2" },
      { path: g("sport-hijab-laju", 3), alt: "Sport Hijab Laju warna Sage tergantung", shot: "S3" },
      { path: g("sport-hijab-laju", 4), alt: "Detail jahitan flatlock dan karet anti geser", shot: "S5" },
    ],
    rating: 4.6,
    reviews: 112,
  },

  /* ------------------------------------------------------------ inner ciput */
  {
    slug: "inner-ninja-antem",
    name: "Inner Ninja Antem",
    category: "inner-ciput",
    material: "Jersey lembut",
    size: "Size all",
    edge: "Karet belakang lembut",
    price: 35000,
    badges: ["Wajib punya"],
    tagline: "Menutup sampai leher tanpa bikin gerah.",
    description:
      "Inner yang menutup sampai leher tanpa bikin gerah. Karet belakangnya lembut jadi tidak meninggalkan bekas di dahi.",
    features: [
      "Menutup rambut sampai bagian leher, rapi di balik hijab apa pun",
      "Jersey lembut yang tetap adem dipakai seharian",
      "Karet belakang lembut, tidak meninggalkan bekas di dahi",
      "Harga paling terjangkau, banyak yang beli tiga sekaligus",
    ],
    specs: [
      { label: "Bahan", value: "Jersey lembut" },
      { label: "Ukuran", value: "All size" },
      { label: "Model", value: "Ninja, menutup sampai leher" },
      { label: "Karet", value: "Karet lembut di bagian belakang" },
      { label: "Perawatan", value: "Cuci mesin mode halus" },
    ],
    colorways: [
      { name: "Hitam Pekat", hex: COLOURS["Hitam Pekat"], sku: "SMP-INA-HTM", frame: 0 },
      { name: "Krem Susu", hex: COLOURS["Krem Susu"], sku: "SMP-INA-KRS", frame: 1 },
      { name: "Abu Kabut", hex: COLOURS["Abu Kabut"], sku: "SMP-INA-ABK", frame: 2 },
    ],
    gallery: [
      { path: g("inner-ninja-antem", 1), alt: "Inner Ninja Antem warna Hitam Pekat dipakai model", shot: "S1" },
      { path: g("inner-ninja-antem", 2), alt: "Inner Ninja Antem warna Krem Susu dilipat rapi", shot: "S2" },
      { path: g("inner-ninja-antem", 3), alt: "Inner Ninja Antem warna Abu Kabut tergantung", shot: "S3" },
      { path: g("inner-ninja-antem", 4), alt: "Detail karet belakang inner ninja", shot: "S5" },
    ],
    rating: 4.7,
    reviews: 341,
  },

  /* ------------------------------------------------------------- aksesoris */
  {
    slug: "set-jarum-magnet",
    name: "Set Jarum Magnet Simpul",
    category: "aksesoris",
    material: "Magnet berlapis logam",
    size: "Isi 6 pcs",
    edge: "Finish kuningan, perak, hitam doff",
    price: 45000,
    badges: ["Tanpa lubang"],
    tagline: "Cukup kuat untuk voal dan satin, tanpa melubangi kain.",
    description:
      "Magnet yang cukup kuat untuk voal dan satin, tapi tidak meninggalkan lubang di kain. Satu set isi enam, disimpan di kotak kecil.",
    features: [
      "Daya magnet cukup kuat untuk voal, ceruty, dan satin",
      "Tidak melubangi kain, aman untuk hijab yang mahal",
      "Satu set isi enam buah dengan kotak penyimpanan kecil",
      "Tiga pilihan finish supaya bisa disesuaikan dengan warna hijab",
    ],
    specs: [
      { label: "Isi", value: "6 pcs per set" },
      { label: "Diameter", value: "Sekitar 12 mm" },
      { label: "Finish", value: "Kuningan, perak, atau hitam doff" },
      { label: "Kemasan", value: "Kotak kecil dengan busa penahan" },
      { label: "Catatan", value: "Jauhkan dari kartu magnetik dan alat pacu jantung" },
    ],
    colorways: [
      { name: "Kuningan", hex: COLOURS["Kuningan"], sku: "SMP-SJM-KNG", frame: 0 },
      { name: "Perak", hex: COLOURS["Perak"], sku: "SMP-SJM-PRK", frame: 1 },
      { name: "Hitam Doff", hex: COLOURS["Hitam Doff"], sku: "SMP-SJM-HTD", frame: 2 },
    ],
    gallery: [
      { path: g("set-jarum-magnet", 1), alt: "Set Jarum Magnet Simpul finish Kuningan di atas kain", shot: "S2" },
      { path: g("set-jarum-magnet", 2), alt: "Set Jarum Magnet Simpul finish Perak dalam kotak", shot: "S2" },
      { path: g("set-jarum-magnet", 3), alt: "Set Jarum Magnet Simpul finish Hitam Doff terpasang di hijab", shot: "S1" },
      { path: g("set-jarum-magnet", 4), alt: "Detail permukaan magnet dan jepitan kain", shot: "S5" },
    ],
    rating: 4.5,
    reviews: 156,
  },
  {
    slug: "pouch-kanvas",
    name: "Pouch Simpul Kanvas",
    category: "aksesoris",
    material: "Kanvas drawstring",
    size: "24x30 cm",
    edge: "Jahit dua kali di bagian tali",
    price: 39000,
    badges: ["Muat 4 pashmina"],
    tagline: "Supaya hijab tidak kusut di dalam tas.",
    description:
      "Tempat menyimpan atau membawa hijab supaya tidak kusut di dalam tas. Muat tiga sampai empat pashmina lipat.",
    features: [
      "Kanvas yang berdiri sendiri, isi di dalamnya tidak tertekan",
      "Muat tiga sampai empat pashmina dalam kondisi terlipat",
      "Tali serut dijahit dua kali supaya tidak lepas",
      "Cukup ringan untuk dibawa harian di dalam tas kerja",
    ],
    specs: [
      { label: "Bahan", value: "Kanvas" },
      { label: "Ukuran", value: "24 x 30 cm" },
      { label: "Kapasitas", value: "3 sampai 4 pashmina terlipat" },
      { label: "Penutup", value: "Tali serut" },
      { label: "Perawatan", value: "Cuci tangan, jemur terbalik" },
    ],
    colorways: [
      { name: "Krem", hex: COLOURS["Krem"], sku: "SMP-PKV-KRM", frame: 0 },
      { name: "Zaitun", hex: COLOURS["Zaitun"], sku: "SMP-PKV-ZTN", frame: 1 },
      { name: "Hitam Pekat", hex: COLOURS["Hitam Pekat"], sku: "SMP-PKV-HTM", frame: 2 },
    ],
    gallery: [
      { path: g("pouch-kanvas", 1), alt: "Pouch Simpul Kanvas warna Krem berisi hijab terlipat", shot: "S2" },
      { path: g("pouch-kanvas", 2), alt: "Pouch Simpul Kanvas warna Zaitun tertutup tali serut", shot: "S2" },
      { path: g("pouch-kanvas", 3), alt: "Pouch Simpul Kanvas warna Hitam Pekat tergantung", shot: "S3" },
      { path: g("pouch-kanvas", 4), alt: "Detail anyaman kanvas dan jahitan tali serut", shot: "S5" },
    ],
    rating: 4.6,
    reviews: 94,
  },
];

/* ------------------------------------------------------------------ lookups */

export const productBySlug = (slug: string): Product | undefined =>
  PRODUCTS.find((p) => p.slug === slug);

export const productsByCategory = (cat: CategorySlug): Product[] =>
  PRODUCTS.filter((p) => p.category === cat);

export const featuredProducts = (): Product[] =>
  PRODUCTS.filter((p) => p.featured);

/**
 * R42: this narrows WHICH products are shown. It never renames one.
 * A product qualifies when any of its colourways carries the colour.
 */
export const productsByColour = (colour: string): Product[] =>
  PRODUCTS.filter((p) => p.colorways.some((c) => c.name === colour));

/** every colour actually present in the catalogue, for the filter chips */
export const catalogueColours = (): { name: string; hex: string }[] => {
  const seen = new Map<string, string>();
  PRODUCTS.forEach((p) =>
    p.colorways.forEach((c) => {
      if (!seen.has(c.name)) seen.set(c.name, c.hex);
    }),
  );
  return [...seen.entries()].map(([name, hex]) => ({ name, hex }));
};

export const relatedProducts = (p: Product, limit = 4): Product[] => {
  const sameCat = PRODUCTS.filter(
    (x) => x.category === p.category && x.slug !== p.slug,
  );
  const rest = PRODUCTS.filter(
    (x) => x.category !== p.category && x.slug !== p.slug,
  );
  return [...sameCat, ...rest].slice(0, limit);
};
