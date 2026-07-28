import { CATEGORIES } from "./products";

/**
 * Navigation model. R16 wants 1 to 3 top level items that open a panel, and
 * this build ships exactly two. `Artikel` and `Tentang` stay plain links,
 * because giving a two page section a mega menu is padding, not navigation.
 *
 * R16.1: `anchor` decides panel geometry. The LEFTMOST panel bearing item
 * anchors left and grows right, the RIGHTMOST anchors right and grows left.
 * Nothing is blind centred to a narrow <li>, which is what pushed Dapur
 * Tepat's menu outside the window at ~1025px.
 */

export type MegaLink = {
  href: string;
  /** rendered as its own block element */
  title: string;
  /** rendered as its own block element with a gap. Never inline beside the
   *  title, otherwise it reads "PashminaScarf panjang". R50. */
  meta: string;
};

export type MegaColumn = { heading: string; links: MegaLink[] };

export type NavItem = {
  label: string;
  href: string;
  anchor?: "left" | "right" | "center";
  columns?: MegaColumn[];
  aside?: { heading: string; body: string; cta: { href: string; label: string } };
};

export const NAV: NavItem[] = [
  {
    label: "Katalog",
    href: "/katalog/",
    anchor: "left",
    columns: [
      {
        heading: "Kategori",
        links: CATEGORIES.map((c) => ({
          href: `/katalog/${c.slug}/`,
          title: c.name,
          meta: c.meta,
        })),
      },
      {
        heading: "Belanja berdasarkan bahan",
        links: [
          { href: "/katalog/?bahan=voal", title: "Voal premium", meta: "Matte, jatuh rapi" },
          { href: "/katalog/?bahan=ceruty", title: "Ceruty babydoll", meta: "Paling ringan" },
          { href: "/katalog/?bahan=diamond", title: "Diamond crepe", meta: "Anti letoy" },
          { href: "/katalog/?bahan=viscose", title: "Viscose", meta: "Jatuh berat" },
          { href: "/katalog/?bahan=satin", title: "Satin silk", meta: "Untuk acara" },
          { href: "/katalog/?bahan=jersey", title: "Jersey", meta: "Instan dan inner" },
        ],
      },
    ],
    aside: {
      heading: "Lookbook musim ini",
      body: "Empat belas model, tiga warna masing masing. Lihat warnanya dulu sebelum memilih bahan.",
      cta: { href: "/katalog/", label: "Lihat semua produk" },
    },
  },
  {
    label: "Panduan",
    href: "/cara-pesan/",
    anchor: "right",
    columns: [
      {
        heading: "Sebelum membeli",
        links: [
          { href: "/panduan-ukuran/", title: "Panduan ukuran", meta: "110 atau 115, dan kenapa" },
          { href: "/cara-pesan/", title: "Cara pesan", meta: "Lima langkah sampai barang jalan" },
          { href: "/faq/", title: "Pertanyaan umum", meta: "Sepuluh yang paling sering" },
        ],
      },
      {
        heading: "Setelah membeli",
        links: [
          { href: "/perawatan/", title: "Perawatan", meta: "Cuci, jemur, simpan" },
          { href: "/lacak/", title: "Lacak pesanan", meta: "Masukkan nomor pesanan" },
          { href: "/garansi/", title: "Garansi dan tukar", meta: "14 hari, syaratnya jelas" },
        ],
      },
    ],
    aside: {
      heading: "Belum yakin ukurannya",
      body: "Jawab tiga pertanyaan singkat dan kami tunjukkan model yang paling mendekati kebutuhanmu.",
      cta: { href: "/panduan-ukuran/#pencari-ukuran", label: "Buka pencari ukuran" },
    },
  },
  { label: "Artikel", href: "/artikel/" },
  { label: "Tentang", href: "/tentang/" },
];

/** extra destinations that only appear in the mobile drawer and the footer */
export const SECONDARY_NAV: MegaLink[] = [
  { href: "/kontak/", title: "Kontak", meta: "WhatsApp, email, alamat atelier" },
  { href: "/akun/", title: "Akun saya", meta: "Riwayat pesanan" },
  { href: "/masuk/", title: "Masuk", meta: "Demo login" },
];
