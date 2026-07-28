"use client";

import Link from "next/link";
import { useState } from "react";
import Media from "./Media";
import { rupiah } from "@/lib/site";
import { useCart } from "./cart/CartContext";
import { waLink, waAnchorProps } from "@/lib/wa";
import { ASSETS } from "@/lib/asset-manifest";
import type { Product } from "@/data/products";

/**
 * Product detail: the R18 gallery plus the R42 colour picker.
 *
 * R18, the gallery contract:
 *  - clickable THUMBNAILS swap the main image
 *  - the active thumbnail carries a visible selected state
 *  - the main image swap is a CROSSFADE, not an instant jump
 *  - thumbnails are real <button>s, reachable by Tab, fire on Enter and Space
 * A gallery whose sub photos are inert decoration is a failed build, which is
 * what shipped on Komodrift.
 *
 * R42, the picker contract:
 *  - colour swaps image, SKU, and price IN PLACE
 *  - it NEVER navigates to another slug, and the product name never changes
 * On Lume Tumbler the picker did `const colorways = allProducts`, so choosing a
 * colour navigated to a different product and the visible symptom was the
 * product name changing.
 */
export default function ProductDetail({
  product,
  mediaIds,
}: {
  product: Product;
  mediaIds: string[];
}) {
  const { add } = useCart();

  /**
   * Live gallery, filtered to frames Stage 4 actually landed on disk. A
   * missing frame (Media's own filesystem gate would otherwise render a
   * placeholder thumbnail nobody can act on) is skipped entirely here, so
   * R18 stays fully functional with however many real photos exist instead
   * of mixing in dead thumbnails. Falls back to the full list only in the
   * pathological case where every frame for this product is missing.
   */
  const live = product.gallery
    .map((g, i) => ({ ...g, originalIndex: i, mediaId: mediaIds[i] }))
    .filter((g) => ASSETS[g.path]);
  const gallery = live.length > 0 ? live : product.gallery.map((g, i) => ({ ...g, originalIndex: i, mediaId: mediaIds[i] }));

  const [colour, setColour] = useState(product.colorways[0]);
  const [frame, setFrame] = useState(() => {
    const idx = gallery.findIndex((g) => g.originalIndex === product.colorways[0].frame);
    return idx === -1 ? 0 : idx;
  });
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  /** picking a colour swaps the visible frame in place, same page, same slug */
  const pickColour = (c: (typeof product.colorways)[number]) => {
    setColour(c);
    const idx = gallery.findIndex((g) => g.originalIndex === c.frame);
    setFrame(idx === -1 ? 0 : idx);
  };

  const onAdd = () => {
    add({ slug: product.slug, colour: colour.name, sku: colour.sku }, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="grid cols-2" style={{ gap: "var(--s-8)", alignItems: "start" }}>
      {/* ---------------------------------------------------------- gallery */}
      <div className="gallery">
        <div className="gallery-main ratio-4-5" style={{ position: "relative" }}>
          {gallery.map((g, i) => (
            <div
              key={g.path}
              className={`gallery-frame${i === frame ? " is-active" : ""}`}
              aria-hidden={i !== frame}
            >
              <Media
                id={g.mediaId}
                path={g.path}
                ratio="4:5"
                brief={g.alt + "."}
                style={{ height: "100%" }}
              />
            </div>
          ))}
        </div>

        <div
          className="gallery-thumbs"
          role="tablist"
          aria-label={`Galeri foto ${product.name}`}
        >
          {gallery.map((g, i) => (
            <button
              key={g.path}
              type="button"
              role="tab"
              className="thumb ratio-1-1"
              aria-selected={i === frame}
              aria-label={`Foto ${i + 1}, ${g.alt}`}
              onClick={() => setFrame(i)}
            >
              <Media
                id={g.mediaId}
                path={g.path}
                ratio="1:1"
                brief={g.alt + "."}
                style={{ height: "100%", minHeight: 0 }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------- info */}
      <div className="stack">
        <div className="stack-label">
          {/* R42: constant across colourways. Picking Zaitun does not rename
              this to "Pashmina Zaitun". */}
          <h1 className="sl-title" style={{ fontSize: "var(--t-display-l)" }}>
            {product.name}
          </h1>
          <span className="sl-meta">{product.material}</span>
          <span className="sl-meta">
            {product.size}, {product.edge.toLowerCase()}
          </span>
        </div>

        <div className="row">
          <span className="stars" aria-hidden="true">
            {"★".repeat(Math.round(product.rating))}
          </span>
          <span className="text-small text-soft">
            {product.rating.toFixed(1)} dari {product.reviews} ulasan
          </span>
        </div>

        <p className="lead">{product.description}</p>

        <div className="price-row">
          <span className="price-now">{rupiah(product.price)}</span>
          {product.priceWas && (
            <span className="price-was">{rupiah(product.priceWas)}</span>
          )}
        </div>

        {/* R42 colour picker. Swaps in place, never navigates. */}
        <div className="swatch-row">
          <span className="field-label">Warna, {colour.name}</span>
          <div className="swatches" role="radiogroup" aria-label="Pilihan warna">
            {product.colorways.map((c) => (
              <button
                key={c.sku}
                type="button"
                className="swatch"
                role="radio"
                aria-checked={c.name === colour.name}
                aria-label={`Warna ${c.name}`}
                title={c.name}
                style={{ background: c.hex, width: 40, height: 40 }}
                onClick={() => pickColour(c)}
              />
            ))}
          </div>
          <span className="text-small text-soft">Kode barang {colour.sku}</span>
        </div>

        <div className="field" style={{ maxWidth: 200 }}>
          <span className="field-label">Jumlah</span>
          <div className="row" style={{ gap: "var(--s-2)" }}>
            <button
              type="button"
              className="btn btn-light"
              style={{ minWidth: 44 }}
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              aria-label="Kurangi jumlah"
            >
              &minus;
            </button>
            <span aria-live="polite" style={{ minWidth: 32, textAlign: "center" }}>
              {qty}
            </span>
            <button
              type="button"
              className="btn btn-light"
              style={{ minWidth: 44 }}
              onClick={() => setQty((q) => Math.min(20, q + 1))}
              aria-label="Tambah jumlah"
            >
              +
            </button>
          </div>
        </div>

        <div className="row">
          {/* the cart demo stays functional, R14 scope */}
          <button type="button" className="btn btn-primary" onClick={onAdd}>
            Tambah ke keranjang
          </button>
          {/* this one converts, so it routes to Himay WhatsApp, R14 */}
          <a
            className="btn btn-outline"
            href={waLink(`${product.name} warna ${colour.name}`)}
            {...waAnchorProps}
          >
            Tanya lewat WhatsApp
          </a>
        </div>
        <p className="form-ok" aria-live="polite" style={{ minHeight: 22 }}>
          {added ? `${product.name} warna ${colour.name} masuk keranjang.` : ""}
        </p>

        <h2 style={{ fontSize: "var(--t-h3)", marginTop: "var(--s-5)" }}>Spesifikasi</h2>
        <table className="spec-table">
          <tbody>
            {product.specs.map((s) => (
              <tr key={s.label}>
                <th scope="row">{s.label}</th>
                <td>{s.value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 style={{ fontSize: "var(--t-h3)", marginTop: "var(--s-5)" }}>
          Kenapa ini cocok buat kamu
        </h2>
        <ul className="stack-sm" style={{ paddingLeft: "1.1rem" }}>
          {product.features.map((f) => (
            <li key={f} className="text-soft">
              {f}
            </li>
          ))}
        </ul>

        <p className="text-small text-soft mt-4">
          Belum yakin ukurannya?{" "}
          <Link href="/panduan-ukuran/" className="link-underline">
            Buka panduan ukuran
          </Link>
          , atau baca{" "}
          <Link href="/perawatan/" className="link-underline">
            cara merawatnya
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
