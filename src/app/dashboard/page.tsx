"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import PageHero from "@/components/PageHero";
import Select from "@/components/Select";
import Media from "@/components/Media";
import { useCart } from "@/components/cart/CartContext";
import { PRODUCTS, productBySlug } from "@/data/products";
import { productCardMediaId } from "@/lib/media";
import { rupiah } from "@/lib/site";

const TABS = [
  { id: "ringkasan", label: "Ringkasan" },
  { id: "pesanan", label: "Pesanan" },
  { id: "produk", label: "Produk" },
] as const;

const STATUS_FILTER = [
  { value: "semua", label: "Semua status", meta: "Tanpa penyaringan" },
  { value: "Diproses", label: "Diproses", meta: "Belum diserahkan ke kurir" },
  { value: "Dikirim", label: "Dikirim", meta: "Sedang di jalan" },
  { value: "Selesai", label: "Selesai", meta: "Sudah diterima" },
];

/**
 * R8 seller dashboard demo. Reads the same demo store the checkout writes to,
 * so placing an order on /keranjang really moves the numbers here.
 *
 * The dashboard is exempt from the R16 top navbar spec: it lives inside the
 * marketing site's chrome for the demo rather than carrying its own sidebar.
 */
export default function DashboardPage() {
  const { orders } = useCart();
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("ringkasan");
  const [status, setStatus] = useState("semua");

  const stats = useMemo(() => {
    const revenue = orders.reduce((n, o) => n + o.total, 0);
    const items = orders.reduce(
      (n, o) => n + o.lines.reduce((m, l) => m + l.qty, 0),
      0,
    );
    return [
      { label: "Total pesanan", value: String(orders.length), note: "Sejak awal bulan" },
      { label: "Pendapatan", value: rupiah(revenue), note: "Belum dipotong ongkir" },
      { label: "Lembar terjual", value: String(items), note: "Semua kategori" },
      { label: "Produk aktif", value: String(PRODUCTS.length), note: "Model di katalog" },
    ];
  }, [orders]);

  const filtered = useMemo(
    () => (status === "semua" ? orders : orders.filter((o) => o.status === status)),
    [orders, status],
  );

  /** best sellers, computed from the demo order store */
  const topProducts = useMemo(() => {
    const tally = new Map<string, number>();
    orders.forEach((o) =>
      o.lines.forEach((l) => tally.set(l.slug, (tally.get(l.slug) ?? 0) + l.qty)),
    );
    return PRODUCTS.map((p) => ({ p, sold: tally.get(p.slug) ?? 0 })).sort(
      (a, b) => b.sold - a.sold,
    );
  }, [orders]);

  return (
    <>
      <PageHero
        crumbs={[{ href: "/", label: "Beranda" }, { label: "Dashboard" }]}
        eyebrow="Demo dashboard"
        title="Dashboard penjual"
        note="Contoh panel pengelolaan toko. Angkanya dihitung dari pesanan demo, jadi kalau kamu checkout di halaman keranjang, angkanya benar benar berubah."
      />

      <section className="section">
        <div className="wrap">
          <div className="tabs" role="tablist" aria-label="Bagian dashboard">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                className="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === "ringkasan" && (
            <>
              {/* R48: 4 peer items, snap carousel at 768px */}
              <div className="snap-row cols-4">
                {stats.map((s) => (
                  <div key={s.label} className="card card-pad reveal">
                    <div className="stack-label">
                      <span className="sl-meta">{s.label}</span>
                      <span
                        className="sl-title"
                        style={{ fontSize: "var(--t-h2)", lineHeight: 1.1 }}
                      >
                        {s.value}
                      </span>
                      <span className="sl-meta">{s.note}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="snap-hint">Geser untuk melihat semua angka.</p>

              <h2 className="mt-7" style={{ marginBottom: "var(--s-5)" }}>
                Produk paling laku
              </h2>
              <div style={{ overflowX: "auto" }}>
                <table className="spec-table" style={{ minWidth: 560 }}>
                  <thead>
                    <tr>
                      <th scope="col" style={{ color: "var(--ink)", fontWeight: 600 }}>
                        Produk
                      </th>
                      <th scope="col" style={{ width: "auto", color: "var(--ink)", fontWeight: 600 }}>
                        Harga
                      </th>
                      <th scope="col" style={{ width: "auto", color: "var(--ink)", fontWeight: 600 }}>
                        Terjual
                      </th>
                      <th scope="col" style={{ width: "auto", color: "var(--ink)", fontWeight: 600 }}>
                        Warna
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {topProducts.slice(0, 8).map(({ p, sold }) => (
                      <tr key={p.slug}>
                        <th scope="row">
                          {/* R50: name and material as separate blocks */}
                          <span className="stack-label">
                            <span className="sl-title" style={{ fontSize: "var(--t-body)" }}>
                              {p.name}
                            </span>
                            <span className="sl-meta">{p.material}</span>
                          </span>
                        </th>
                        <td>{rupiah(p.price)}</td>
                        <td>{sold} lembar</td>
                        <td>{p.colorways.length} varian</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {tab === "pesanan" && (
            <>
              <div style={{ maxWidth: 320, marginBottom: "var(--s-6)" }}>
                <Select
                  label="Saring status"
                  name="status"
                  value={status}
                  onChange={setStatus}
                  options={STATUS_FILTER}
                  anchor="left"
                />
              </div>

              <div className="stack" style={{ gap: "var(--s-4)" }}>
                {filtered.length === 0 && (
                  <p className="text-soft">Tidak ada pesanan dengan status itu.</p>
                )}
                {filtered.map((o) => (
                  <div key={o.id} className="card card-pad reveal">
                    <div className="row" style={{ justifyContent: "space-between" }}>
                      <div className="stack-label">
                        <span className="sl-title">{o.id}</span>
                        <span className="sl-meta">{o.name}</span>
                        <span className="sl-meta">{o.address}</span>
                        <span className="sl-meta">
                          {o.lines.reduce((n, l) => n + l.qty, 0)} lembar, {o.courier}
                        </span>
                      </div>
                      <div className="stack-label" style={{ alignItems: "flex-end" }}>
                        <span className="badge badge-quiet">{o.status}</span>
                        <span className="sl-price">{rupiah(o.total)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === "produk" && (
            <>
              {/* R48: 14 peer items */}
              <div className="snap-row cols-4">
                {PRODUCTS.map((p) => (
                  <div key={p.slug} className="card reveal">
                    <Media
                      id={productCardMediaId(p.slug)}
                      path={p.gallery[0].path}
                      ratio="4:3"
                      brief={p.gallery[0].alt + "."}
                    />
                    <div className="card-pad stack-label">
                      <span className="sl-title" style={{ fontSize: "var(--t-body)" }}>
                        {p.name}
                      </span>
                      <span className="sl-meta">{p.material}</span>
                      <span className="sl-meta">
                        {p.colorways.length} warna, {p.gallery.length} foto
                      </span>
                      <span className="sl-price" style={{ fontSize: "var(--t-body)" }}>
                        {rupiah(p.price)}
                      </span>
                      <Link
                        href={`/produk/${p.slug}/`}
                        className="link-underline text-small"
                      >
                        Lihat halaman produk
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <p className="snap-hint">Geser untuk melihat semua produk.</p>
            </>
          )}
        </div>
      </section>
    </>
  );
}
