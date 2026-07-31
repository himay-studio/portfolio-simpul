/**
 * Single source of truth for brand level constants.
 * Values come from BRAND.md and the HIM-246 brief. Do not fork these into
 * components, import from here.
 */

export const SITE = {
  brand: "Simpul",
  wordmark: "SIMPUL",
  descriptor: "Label scarf modest",
  tagline: "Satu simpul, seribu gaya.",
  slug: "simpul",
  /** R26 / R35: the public custom domain, never the pages.dev fallback. */
  origin: "https://portfolio-simpul.himaystudio.com",
  /**
   * R35: point the canonical at a live paying client's own domain when there
   * is one. Simpul is a fictional showcase brand, so we self canonicalise.
   */
  clientDomain: null as string | null,
  /**
   * HIM-356 classification dimension for retargeting audiences. Simpul sells
   * a modest-fashion scarf/hijab label (see src/data/products.ts), so this
   * reads as a fashion catalog site.
   */
  category: "fashion" as string | null,
  himay: {
    name: "Himay Studio",
    url: "https://himaystudio.com",
    /** R14: 085772203654 in international form. A 0 prefix is a dead link. */
    waNumber: "6285772203654",
  },
  /** R36 tracking. GA4 is delivered through this container. */
  gtmId: "GTM-WZJZTSKG",
} as const;

/** R35 branded meta, applied to every page. */
export const META_TITLE = `${SITE.brand} - Portfolio Website by Himay Studio`;
export const META_DESCRIPTION = `Live preview website ${SITE.brand}. Proyek pembuatan website profesional oleh Himay Studio. Ingin buat web seperti ini? Hubungi kami.`;

/** R35 canonical: the client's real domain if live, otherwise self. */
export const CANONICAL = SITE.clientDomain ?? SITE.origin;

export const CONTACT = {
  waDisplay: "0857 7220 3654",
  email: "halo@simpul.id",
  addressLine1: "Atelier Simpul",
  addressLine2: "Jalan Cihampelas 21, Bandung, Jawa Barat 40131",
  hours: [
    { day: "Senin sampai Jumat", time: "09.00 sampai 18.00 WIB" },
    { day: "Sabtu", time: "09.00 sampai 15.00 WIB" },
    { day: "Minggu dan hari libur", time: "Tutup, pesan tetap masuk" },
  ],
} as const;

export const rupiah = (value: number): string =>
  "Rp " + value.toLocaleString("id-ID");
