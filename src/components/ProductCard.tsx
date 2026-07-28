"use client";

import Link from "next/link";
import { useState } from "react";
import Media from "./Media";
import { rupiah } from "@/lib/site";
import { useCart } from "./cart/CartContext";
import type { Product } from "@/data/products";

/**
 * Product card, in the two modes LAYOUT-ARCHITECTURE.md section 4 defines.
 *
 *  - `display`  : large image, name, material, price. No badges, no buttons.
 *                 Used on the home page, where the job is taste, not checkout.
 *  - `commerce` : badges, colourway swatches, `Tambah` plus `Detail`.
 *                 Used in the catalogue, where the visitor came to buy.
 *
 * R42: the card always shows the MODEL name. Picking a swatch here changes
 * which colourway gets added to the cart, it never changes the displayed name
 * and it never navigates to a different slug.
 *
 * R50: name, material, and price are three separate block children of
 * `.stack-label` with an explicit gap. Inline they would render as
 * "Pashmina Alun VoalVoal premium ultrafine".
 */
export default function ProductCard({
  product,
  mode = "commerce",
  mediaId,
}: {
  product: Product;
  mode?: "display" | "commerce";
  mediaId: string;
}) {
  const { add } = useCart();
  const [colour, setColour] = useState(product.colorways[0]);

  const frame = product.gallery[colour.frame] ?? product.gallery[0];
  const href = `/produk/${product.slug}/`;

  return (
    <article className={`card card-hover pcard reveal`}>
      <Link href={href} className="pcard-media" aria-label={`Lihat ${product.name}`}>
        {mode === "commerce" && product.badges.length > 0 && (
          <span className="pcard-badges">
            {product.badges.map((b) => (
              <span className="badge badge-attn" key={b}>
                {b}
              </span>
            ))}
          </span>
        )}
        <Media
          id={mediaId}
          path={frame.path}
          ratio="4:5"
          brief={frame.alt + "."}
        />
      </Link>

      <div className="pcard-body">
        <div className="stack-label">
          {/* the MODEL name, constant across every colourway. R42. */}
          <Link href={href} className="sl-title" style={{ color: "var(--ink)" }}>
            {product.name}
          </Link>
          <span className="sl-meta">{product.material}</span>
          {mode === "commerce" && (
            <span className="sl-meta">
              {product.size}, {product.edge.toLowerCase()}
            </span>
          )}
          <span className="sl-price">{rupiah(product.price)}</span>
        </div>

        {mode === "commerce" && (
          <>
            <div className="swatch-row">
              <span className="text-small text-soft">Warna {colour.name}</span>
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
                    style={{ background: c.hex }}
                    onClick={() => setColour(c)}
                  />
                ))}
              </div>
            </div>

            <div className="pcard-actions">
              {/* R14 scope: this demonstrates the cart feature, so it stays
                  functional rather than routing to WhatsApp. */}
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() =>
                  add({ slug: product.slug, colour: colour.name, sku: colour.sku })
                }
              >
                Tambah
              </button>
              <Link href={href} className="btn btn-outline btn-sm">
                Detail
              </Link>
            </div>
          </>
        )}

        {mode === "display" && (
          <Link href={href} className="link-underline text-small">
            Lihat detail
          </Link>
        )}
      </div>
    </article>
  );
}
