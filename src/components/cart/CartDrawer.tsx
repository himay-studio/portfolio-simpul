"use client";

import Link from "next/link";
import { useCallback, useRef } from "react";
import { useCart } from "./CartContext";
import { productBySlug } from "@/data/products";
import { rupiah } from "@/lib/site";
import Portal from "../Portal";
import { CloseIcon } from "../Header";
import { useFocusTrap } from "@/lib/useFocusTrap";
import Media from "../Media";

/**
 * The cart slide over.
 *
 * LAYOUT-ARCHITECTURE.md section 3: this panel is for REASSURANCE, not for
 * transacting. It shows what is in the bag and hands off to /keranjang, which
 * owns the address form and the checkout state machine. A shipping form
 * crammed into a 380px drawer is how mobile checkouts end up as the blank
 * boxes R19 forbids.
 *
 * It reuses the same `.drawer` chrome and the same focus trap as the nav
 * drawer, so there is one drawer implementation in the codebase, not two that
 * drift apart. R53: portalled to document.body.
 */
export default function CartDrawer() {
  const { cartOpen, closeCart, lines, subtotal, setQty, remove } = useCart();
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => closeCart(), [closeCart]);

  useFocusTrap(ref, cartOpen, close);

  if (!cartOpen) return null;

  return (
    <Portal>
      <div className="drawer-scrim" onClick={close} aria-hidden="true" />
      <div
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Keranjang belanja"
        ref={ref}
      >
        <div className="drawer-head">
          <span className="stack-label">
            <span className="sl-title">Keranjang</span>
            <span className="sl-meta">
              {lines.length === 0
                ? "Belum ada barang"
                : `${lines.length} produk di keranjang`}
            </span>
          </span>
          <button
            type="button"
            className="icon-btn"
            onClick={close}
            aria-label="Tutup keranjang"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="drawer-body" style={{ flex: "1 1 auto" }}>
          {lines.length === 0 ? (
            <div className="stack">
              <p className="text-soft">
                Keranjangmu masih kosong. Mulai dari pashmina yang paling laris,
                atau lihat semua kategori dulu.
              </p>
              <Link href="/katalog/" className="btn btn-outline" onClick={close}>
                Lihat katalog
              </Link>
            </div>
          ) : (
            <>
              {lines.map((l) => {
                const p = productBySlug(l.slug);
                if (!p) return null;
                const frame =
                  p.colorways.find((c) => c.name === l.colour)?.frame ?? 0;
                return (
                  <div
                    key={`${l.slug}-${l.colour}`}
                    className="row"
                    style={{
                      alignItems: "flex-start",
                      gap: "var(--s-3)",
                      flexWrap: "nowrap",
                      paddingBottom: "var(--s-4)",
                      marginBottom: "var(--s-4)",
                      borderBottom: "1px solid var(--line)",
                    }}
                  >
                    <Media
                      id="CART"
                      path={p.gallery[frame].path}
                      ratio="1:1"
                      brief={p.gallery[frame].alt + "."}
                      style={{ width: 72, flex: "0 0 72px", minHeight: 0 }}
                    />
                    <div className="stack-label" style={{ flex: "1 1 auto" }}>
                      {/* R42: the MODEL name, constant across colourways. */}
                      <span className="sl-title" style={{ fontSize: "var(--t-body)" }}>
                        {p.name}
                      </span>
                      <span className="sl-meta">Warna {l.colour}</span>
                      <span className="sl-meta">{l.sku}</span>
                      <span className="sl-price" style={{ fontSize: "var(--t-body)" }}>
                        {rupiah(p.price * l.qty)}
                      </span>

                      <div className="row" style={{ gap: "var(--s-2)", marginTop: 4 }}>
                        <button
                          type="button"
                          className="btn btn-light btn-sm"
                          style={{ minWidth: 44, padding: "6px 10px" }}
                          onClick={() => setQty(l.slug, l.colour, l.qty - 1)}
                          aria-label={`Kurangi jumlah ${p.name} warna ${l.colour}`}
                        >
                          &minus;
                        </button>
                        <span aria-live="polite" style={{ minWidth: 24, textAlign: "center" }}>
                          {l.qty}
                        </span>
                        <button
                          type="button"
                          className="btn btn-light btn-sm"
                          style={{ minWidth: 44, padding: "6px 10px" }}
                          onClick={() => setQty(l.slug, l.colour, l.qty + 1)}
                          aria-label={`Tambah jumlah ${p.name} warna ${l.colour}`}
                        >
                          +
                        </button>
                        <button
                          type="button"
                          className="btn btn-ghost btn-sm"
                          onClick={() => remove(l.slug, l.colour)}
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="row" style={{ justifyContent: "space-between" }}>
                <span className="text-soft">Subtotal</span>
                <span className="price-now">{rupiah(subtotal)}</span>
              </div>
              <p className="text-small text-soft">
                Ongkos kirim dihitung di halaman keranjang.
              </p>

              {/* navigation, not a sales CTA, so it stays functional and does
                  not route to WhatsApp. R14 scope rule. */}
              <Link
                href="/keranjang/"
                className="btn btn-primary btn-block mt-4"
                onClick={close}
              >
                Lihat keranjang
              </Link>
              <Link href="/katalog/" className="btn btn-outline btn-block" onClick={close}>
                Lanjut belanja
              </Link>
            </>
          )}
        </div>
      </div>
    </Portal>
  );
}
