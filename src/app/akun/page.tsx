"use client";

import Link from "next/link";
import { useState } from "react";
import PageHero from "@/components/PageHero";
import Media from "@/components/Media";
import { useCart } from "@/components/cart/CartContext";
import { useDemoAuth } from "@/lib/useDemoAuth";
import { productBySlug } from "@/data/products";
import { productCardMediaId } from "@/lib/media";
import { rupiah } from "@/lib/site";
import { waLink, waAnchorProps } from "@/lib/wa";

const TABS = [
  { id: "pesanan", label: "Pesanan saya" },
  { id: "alamat", label: "Alamat" },
  { id: "profil", label: "Profil" },
] as const;

/**
 * R8 customer portal. Really lists what the checkout demo wrote, so the
 * feature demonstrates itself end to end: add to cart, checkout, then see the
 * order appear here and at /lacak.
 */
export default function AkunPage() {
  const { orders } = useCart();
  const { user, ready, signOut } = useDemoAuth();
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("pesanan");

  if (ready && !user) {
    return (
      <>
        <PageHero
          crumbs={[{ href: "/", label: "Beranda" }, { label: "Akun saya" }]}
          eyebrow="Akun"
          title="Kamu belum masuk"
          note="Masuk dulu untuk melihat riwayat pesanan, alamat tersimpan, dan status pengiriman."
        />
        <section className="section">
          <div className="wrap">
            <div className="card card-pad" style={{ maxWidth: 560, padding: "var(--s-7)" }}>
              <div className="stack-label">
                <span className="sl-title">Butuh akses</span>
                <span className="sl-meta">
                  Kredensial demonya kami tulis terbuka di halaman masuk, tidak
                  perlu daftar apa apa.
                </span>
              </div>
              <div className="row mt-6">
                <Link href="/masuk/" className="btn btn-primary">
                  Masuk sekarang
                </Link>
                <Link href="/lacak/" className="btn btn-outline">
                  Lacak tanpa masuk
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        crumbs={[{ href: "/", label: "Beranda" }, { label: "Akun saya" }]}
        eyebrow="Akun"
        title={user ? `Halo, ${user.name.split(" ")[0]}` : "Akun saya"}
        note="Semua pesananmu, alamat pengiriman, dan detail profil ada di sini."
      />

      <section className="section">
        <div className="wrap">
          <div className="tabs" role="tablist" aria-label="Bagian akun">
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

          {tab === "pesanan" && (
            <div className="stack" style={{ gap: "var(--s-5)" }}>
              {orders.length === 0 && (
                <p className="text-soft">
                  Belum ada pesanan. Begitu kamu checkout, pesanannya muncul di
                  sini.
                </p>
              )}
              {orders.map((o) => (
                <div key={o.id} className="card card-pad reveal">
                  <div className="row" style={{ justifyContent: "space-between" }}>
                    <div className="stack-label">
                      <span className="sl-title">Pesanan {o.id}</span>
                      <span className="sl-meta">
                        {new Date(o.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                      <span className="sl-meta">{o.courier}</span>
                      <span className="sl-meta">{o.address}</span>
                    </div>
                    <span className="badge badge-quiet">{o.status}</span>
                  </div>

                  <hr className="hairline" style={{ marginBlock: "var(--s-4)" }} />

                  <div className="stack">
                    {o.lines.map((l) => {
                      const p = productBySlug(l.slug);
                      if (!p) return null;
                      const frame =
                        p.colorways.find((c) => c.name === l.colour)?.frame ?? 0;
                      return (
                        <div
                          key={`${l.slug}-${l.colour}`}
                          className="row"
                          style={{ alignItems: "flex-start", flexWrap: "nowrap" }}
                        >
                          <Media
                            id={productCardMediaId(p.slug)}
                            path={p.gallery[frame].path}
                            ratio="1:1"
                            brief={p.gallery[frame].alt + "."}
                            style={{ width: 60, flex: "0 0 60px", minHeight: 0 }}
                          />
                          <span className="stack-label" style={{ flex: "1 1 auto" }}>
                            {/* R42: model name, colour is a variant line */}
                            <span className="sl-title" style={{ fontSize: "var(--t-body)" }}>
                              {p.name}
                            </span>
                            <span className="sl-meta">Warna {l.colour}</span>
                            <span className="sl-meta">
                              {l.sku}, {l.qty} lembar
                            </span>
                          </span>
                          <span>{rupiah(p.price * l.qty)}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div
                    className="row mt-5"
                    style={{ justifyContent: "space-between", alignItems: "center" }}
                  >
                    <span className="price-now">{rupiah(o.total)}</span>
                    <div className="row">
                      <Link href={`/lacak/?id=${o.id}`} className="btn btn-outline btn-sm">
                        Lacak
                      </Link>
                      <a
                        className="btn btn-primary btn-sm"
                        href={waLink(`pesanan ${o.id}`)}
                        {...waAnchorProps}
                      >
                        Tanya pesanan ini
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "alamat" && (
            <div className="grid cols-2">
              <div className="card card-pad reveal">
                <span className="badge badge-quiet">Utama</span>
                <div className="stack-label mt-4">
                  <span className="sl-title">Rumah</span>
                  <span className="sl-meta">Nadia Rahmawati, 0812 3456 7890</span>
                  <span className="sl-meta">
                    Jalan Melati Raya 12, RT 04 RW 09, Jakamulya, Bekasi Selatan,
                    Kota Bekasi, Jawa Barat 17146
                  </span>
                </div>
              </div>
              <div className="card card-pad reveal">
                <span className="badge badge-attn">Kantor</span>
                <div className="stack-label mt-4">
                  <span className="sl-title">Kantor</span>
                  <span className="sl-meta">Nadia Rahmawati, 0812 3456 7890</span>
                  <span className="sl-meta">
                    Gedung Cakrawala lantai 8, Jalan Casablanca Raya 18, Tebet,
                    Jakarta Selatan, DKI Jakarta 12870
                  </span>
                </div>
              </div>
            </div>
          )}

          {tab === "profil" && (
            <div className="card card-pad reveal" style={{ maxWidth: 560 }}>
              <div className="stack">
                <div className="stack-label">
                  <span className="sl-title">Nama</span>
                  <span className="sl-meta">{user?.name}</span>
                </div>
                <div className="stack-label">
                  <span className="sl-title">Email</span>
                  <span className="sl-meta">{user?.email}</span>
                </div>
                <div className="stack-label">
                  <span className="sl-title">Nomor WhatsApp</span>
                  <span className="sl-meta">0812 3456 7890</span>
                </div>
                <div className="stack-label">
                  <span className="sl-title">Bergabung sejak</span>
                  <span className="sl-meta">Maret 2025</span>
                </div>
                <button
                  type="button"
                  className="btn btn-outline mt-4"
                  style={{ alignSelf: "flex-start" }}
                  onClick={signOut}
                >
                  Keluar dari akun
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
