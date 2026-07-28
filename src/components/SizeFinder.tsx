"use client";

import Link from "next/link";
import { useState } from "react";
import Select from "./Select";
import Media from "./Media";
import { PRODUCTS, productBySlug } from "@/data/products";
import { productCardMediaId } from "@/lib/media";
import { rupiah } from "@/lib/site";

/**
 * The size finder, three custom Selects and a recommendation.
 *
 * Built deliberately from the R12 `Select` so the build carries a real,
 * exercised custom dropdown outside the navbar rather than one component that
 * only ever renders in one place.
 *
 * R24 relevance: the result card is inserted AFTER mount, so it is exactly the
 * kind of node a mount-only reveal pass would leave at `opacity: 0` forever.
 * It carries `.reveal`, and `ClientEffects`'s MutationObserver picks it up.
 * This is the `/lacak/?id=` failure from Kilau in another shape.
 */

const BENTUK = [
  { value: "pashmina", label: "Pashmina", meta: "Dililit dan dibentuk" },
  { value: "segi-empat", label: "Segi empat", meta: "Dilipat jadi segitiga" },
  { value: "instan", label: "Instan atau bergo", meta: "Tinggal pakai" },
];

const WAJAH = [
  { value: "bulat", label: "Cenderung bulat", meta: "Lebar pipi terasa dominan" },
  { value: "lonjong", label: "Cenderung lonjong", meta: "Dagu dan dahi terasa panjang" },
  { value: "oval", label: "Oval atau sedang", meta: "Tidak condong ke keduanya" },
];

const TUTUP = [
  { value: "ringkas", label: "Ringkas", meta: "Cukup sampai ulu hati" },
  { value: "tertutup", label: "Tertutup rapi", meta: "Menutup dada tanpa ditumpuk" },
];

/** deterministic mapping, no randomness, so the same answers always agree */
function recommend(bentuk: string, wajah: string, tutup: string): string {
  if (bentuk === "instan") {
    return tutup === "tertutup" ? "bergo-kerja-instan-voal" : "bergo-rapi-jersey";
  }
  if (bentuk === "segi-empat") {
    if (tutup === "tertutup") return "segi-empat-titik-voal";
    return wajah === "lonjong"
      ? "segi-empat-kanvas-polycotton"
      : "segi-empat-sulur-voal";
  }
  // pashmina
  if (tutup === "tertutup") return "pashmina-sanding-viscose";
  return wajah === "bulat" ? "pashmina-bilah-diamond" : "pashmina-alun-ceruty";
}

const REASON: Record<string, string> = {
  "bergo-kerja-instan-voal":
    "Kamu mau siap pakai tapi tetap tertutup rapi. Bergo voal dengan pet antem menjaga bentuk depannya tegak sampai sore.",
  "bergo-rapi-jersey":
    "Kamu mau yang paling praktis dan ringkas. Jerseynya tebal jadi tidak mencetak bentuk kepala.",
  "segi-empat-titik-voal":
    "Ukuran 115 menutup dada tanpa perlu ditumpuk, dan voalnya tidak belang setelah dicuci.",
  "segi-empat-kanvas-polycotton":
    "Ukuran 110 lebih pas untuk wajah lonjong, dan polycotton sedikit kaku jadi gampang dibentuk.",
  "segi-empat-sulur-voal":
    "Motif skala kecil membingkai wajah tanpa terlihat ramai, dan ukurannya 115.",
  "pashmina-sanding-viscose":
    "Viscose jatuhnya berat jadi menutup dada dengan rapi, dan tepi laser cut tidak menambah tebal.",
  "pashmina-bilah-diamond":
    "Diamond crepe lebih bertubuh, jadi lipatannya bisa dibuat tinggi sedikit di pelipis untuk menyeimbangkan wajah bulat.",
  "pashmina-alun-ceruty":
    "Ceruty paling ringan dan paling gampang dibentuk, pilihan aman kalau kamu belum sering pakai pashmina.",
};

export default function SizeFinder() {
  const [bentuk, setBentuk] = useState("");
  const [wajah, setWajah] = useState("");
  const [tutup, setTutup] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const ready = bentuk && wajah && tutup;
  const product = result ? productBySlug(result) : null;

  return (
    <div className="card card-pad" style={{ padding: "var(--s-7)" }}>
      <div className="stack-label" style={{ marginBottom: "var(--s-6)" }}>
        <span className="sl-title" style={{ fontSize: "var(--t-h2)" }}>
          Pencari ukuran
        </span>
        <span className="sl-meta">
          Tiga pertanyaan, lalu kami tunjukkan model yang paling mendekati
          kebutuhanmu. Ini saran, bukan aturan.
        </span>
      </div>

      <div className="grid cols-3">
        {/* R12: custom Selects, never a native <select>.
            R16.1 / R57 geometry: the last one anchors right so its panel grows
            inward and cannot escape the viewport. */}
        <Select
          label="Bentuk yang kamu cari"
          name="bentuk"
          value={bentuk}
          onChange={setBentuk}
          options={BENTUK}
          anchor="left"
        />
        <Select
          label="Bentuk wajahmu"
          name="wajah"
          value={wajah}
          onChange={setWajah}
          options={WAJAH}
          anchor="left"
        />
        <Select
          label="Seberapa tertutup"
          name="tutup"
          value={tutup}
          onChange={setTutup}
          options={TUTUP}
          anchor="right"
        />
      </div>

      <div className="row mt-6">
        <button
          type="button"
          className="btn btn-primary"
          disabled={!ready}
          onClick={() => setResult(recommend(bentuk, wajah, tutup))}
        >
          Tunjukkan rekomendasinya
        </button>
        {result && (
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => {
              setResult(null);
              setBentuk("");
              setWajah("");
              setTutup("");
            }}
          >
            Ulangi
          </button>
        )}
      </div>
      {!ready && (
        <p className="text-small text-soft mt-4">
          Jawab ketiganya dulu, tombolnya aktif setelah itu.
        </p>
      )}

      {/* inserted after mount, revealed by the MutationObserver in
          ClientEffects. R24. */}
      {product && (
        <div
          className="card card-pad reveal mt-6"
          style={{ background: "var(--tint)", borderColor: "var(--brand)" }}
          aria-live="polite"
        >
          <span className="eyebrow">Rekomendasi kami</span>
          <div className="row" style={{ alignItems: "flex-start", flexWrap: "nowrap" }}>
            <Media
              id={productCardMediaId(product.slug)}
              path={product.gallery[0].path}
              ratio="1:1"
              brief={product.gallery[0].alt + "."}
              style={{ width: 110, flex: "0 0 110px", minHeight: 0 }}
            />
            <div className="stack-label">
              <span className="sl-title">{product.name}</span>
              <span className="sl-meta">{product.material}</span>
              <span className="sl-meta">
                {product.size}, {product.edge.toLowerCase()}
              </span>
              <span className="sl-price">{rupiah(product.price)}</span>
              <span className="sl-meta">{REASON[product.slug]}</span>
            </div>
          </div>
          <div className="row mt-5">
            <Link href={`/produk/${product.slug}/`} className="btn btn-primary btn-sm">
              Lihat produknya
            </Link>
            <Link href="/katalog/" className="btn btn-light btn-sm">
              Lihat pilihan lain
            </Link>
          </div>
          <p className="text-small text-soft mt-4">
            Dari {PRODUCTS.length} model di katalog, ini yang paling mendekati
            jawabanmu. Kalau masih ragu, chat kami dan sebutkan keluhan hijabmu
            yang sekarang.
          </p>
        </div>
      )}
    </div>
  );
}
