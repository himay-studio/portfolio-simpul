"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import Select from "./Select";
import { CATEGORIES, PRODUCTS, catalogueColours } from "@/data/products";
import { productCardMediaId } from "@/lib/media";

const SORTS = [
  { value: "populer", label: "Paling populer", meta: "Berdasarkan jumlah ulasan" },
  { value: "murah", label: "Harga terendah", meta: "Dari yang paling terjangkau" },
  { value: "mahal", label: "Harga tertinggi", meta: "Dari yang paling premium" },
  { value: "nama", label: "Nama A sampai Z", meta: "Urut abjad" },
];

/**
 * The catalogue browser, in ECOMMERCE mode per LAYOUT-ARCHITECTURE.md
 * section 4. This is where the visitor came to buy, so cards carry badges,
 * swatches, and a green add-to-cart.
 *
 * R42, the filter contract: the colour filter narrows WHICH PRODUCTS are
 * shown. It never renames one. A product qualifies when any of its colourways
 * carries the selected colour, and the card keeps showing the model name.
 * On Lume Tumbler the colour filter appeared to "change the product name"
 * precisely because colour WAS the product name there.
 */
export default function CatalogueBrowser({
  fixedCategory,
}: {
  fixedCategory?: string;
}) {
  const [category, setCategory] = useState(fixedCategory ?? "semua");
  const [colour, setColour] = useState("semua");
  const [sort, setSort] = useState("populer");
  const [query, setQuery] = useState("");

  const colours = useMemo(() => catalogueColours(), []);

  const results = useMemo(() => {
    let list = PRODUCTS.slice();

    if (category !== "semua") list = list.filter((p) => p.category === category);

    // narrows WHICH products, never what they are called. R42.
    if (colour !== "semua")
      list = list.filter((p) => p.colorways.some((c) => c.name === colour));

    const q = query.trim().toLowerCase();
    if (q)
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q),
      );

    switch (sort) {
      case "murah":
        list.sort((a, b) => a.price - b.price);
        break;
      case "mahal":
        list.sort((a, b) => b.price - a.price);
        break;
      case "nama":
        list.sort((a, b) => a.name.localeCompare(b.name, "id"));
        break;
      default:
        list.sort((a, b) => b.reviews - a.reviews);
    }
    return list;
  }, [category, colour, sort, query]);

  return (
    <>
      <div className="grid cols-3" style={{ marginBottom: "var(--s-7)" }}>
        {!fixedCategory && (
          <Select
            label="Kategori"
            name="kategori"
            value={category}
            onChange={setCategory}
            anchor="left"
            options={[
              { value: "semua", label: "Semua kategori", meta: `${PRODUCTS.length} produk` },
              ...CATEGORIES.map((c) => ({
                value: c.slug,
                label: c.name,
                meta: c.meta,
              })),
            ]}
          />
        )}

        <Select
          label="Warna"
          name="warna"
          value={colour}
          onChange={setColour}
          anchor="left"
          hint="Menyaring produk yang punya warna ini, nama produknya tetap sama."
          options={[
            { value: "semua", label: "Semua warna", meta: `${colours.length} warna tersedia` },
            ...colours.map((c) => ({ value: c.name, label: c.name, meta: "Tersedia" })),
          ]}
        />

        <Select
          label="Urutkan"
          name="urut"
          value={sort}
          onChange={setSort}
          anchor="right"
          options={SORTS}
        />
      </div>

      {/* R19: visible label above the field, visible placeholder inside it. */}
      <div className="field" style={{ maxWidth: 460, marginBottom: "var(--s-7)" }}>
        <label htmlFor="cari-produk">Cari produk</label>
        <input
          id="cari-produk"
          className="input"
          type="search"
          placeholder="Misalnya voal, ceruty, atau segi empat"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <p className="text-small text-soft" aria-live="polite" style={{ marginBottom: "var(--s-5)" }}>
        {results.length} produk ditampilkan
        {colour !== "semua" ? `, tersedia dalam warna ${colour}` : ""}.
      </p>

      {results.length === 0 ? (
        <div className="card card-pad">
          <div className="stack-label">
            <span className="sl-title">Tidak ada yang cocok</span>
            <span className="sl-meta">
              Coba hapus salah satu filter, atau lihat semua produk tanpa
              penyaringan.
            </span>
          </div>
          <button
            type="button"
            className="btn btn-outline mt-4"
            style={{ alignSelf: "flex-start" }}
            onClick={() => {
              setCategory(fixedCategory ?? "semua");
              setColour("semua");
              setQuery("");
            }}
          >
            Hapus semua filter
          </button>
        </div>
      ) : (
        <>
          {/* R48: more than 3 peer items, so a snap carousel at 768px. */}
          <div className="snap-row cols-3">
            {results.map((p) => (
              <ProductCard
                key={p.slug}
                product={p}
                mode="commerce"
                mediaId={productCardMediaId(p.slug)}
              />
            ))}
          </div>
          <p className="snap-hint">Geser untuk melihat produk lainnya.</p>
        </>
      )}
    </>
  );
}
