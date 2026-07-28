import { ARTICLES } from "@/data/articles";
import { CATEGORIES, PRODUCTS } from "@/data/products";

/**
 * Media id allocation, the single source of truth shared by the pages and by
 * MEDIA.md.
 *
 * Both the `.ph-tag` printed in the markup and the manifest row are derived
 * from this file, so an id can never drift between the two. R49 requires one
 * distinct subject specific asset per slot, and a mismatch between a
 * placeholder and its manifest row is exactly how filenames end up wrong and
 * assets land in the wrong slot.
 *
 * Layout:
 *   M01            hero poster still
 *   M02            hero video, 8s, MANDATORY (R30 / R44)
 *   M03 .. M08     6 category banners
 *   M09 .. M64     14 products x 4 gallery frames
 *   M65 .. M70     6 article covers
 *   M71            atelier / about
 *   M72            packaging
 *   M73 .. M74     2 lookbook editorials
 */

export const pad = (n: number) => `M${String(n).padStart(2, "0")}`;

export const HERO_POSTER = pad(1);
export const HERO_VIDEO = pad(2);

const CATEGORY_BASE = 3;
const PRODUCT_BASE = 9;
const ARTICLE_BASE = 65;

export const ATELIER = pad(71);
export const PACKAGING = pad(72);
export const LOOKBOOK = [pad(73), pad(74)];

export const categoryMediaId = (slug: string): string => {
  const i = CATEGORIES.findIndex((c) => c.slug === slug);
  return pad(CATEGORY_BASE + (i === -1 ? 0 : i));
};

/** the 4 gallery frame ids for a product, in gallery order */
export const productMediaIds = (slug: string): string[] => {
  const i = PRODUCTS.findIndex((p) => p.slug === slug);
  const base = PRODUCT_BASE + (i === -1 ? 0 : i) * 4;
  return [0, 1, 2, 3].map((k) => pad(base + k));
};

/** the card image is always gallery frame 0 */
export const productCardMediaId = (slug: string): string =>
  productMediaIds(slug)[0];

export const articleMediaId = (slug: string): string => {
  const i = ARTICLES.findIndex((a) => a.slug === slug);
  return pad(ARTICLE_BASE + (i === -1 ? 0 : i));
};

export const TOTAL_ASSETS = 74;
