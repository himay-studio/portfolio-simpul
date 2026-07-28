"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import DatePicker from "./DatePicker";
import { useCart, type Order } from "./cart/CartContext";
import { productBySlug } from "@/data/products";
import { rupiah } from "@/lib/site";
import { waLink, waAnchorProps } from "@/lib/wa";

const TIMELINE: Record<Order["status"], { label: string; done: boolean }[]> = {
  Diproses: [
    { label: "Pesanan diterima", done: true },
    { label: "Pembayaran dikonfirmasi", done: true },
    { label: "Sedang dikemas", done: false },
    { label: "Diserahkan ke kurir", done: false },
    { label: "Sampai tujuan", done: false },
  ],
  Dikirim: [
    { label: "Pesanan diterima", done: true },
    { label: "Pembayaran dikonfirmasi", done: true },
    { label: "Sedang dikemas", done: true },
    { label: "Diserahkan ke kurir", done: true },
    { label: "Sampai tujuan", done: false },
  ],
  Selesai: [
    { label: "Pesanan diterima", done: true },
    { label: "Pembayaran dikonfirmasi", done: true },
    { label: "Sedang dikemas", done: true },
    { label: "Diserahkan ke kurir", done: true },
    { label: "Sampai tujuan", done: true },
  ],
};

/**
 * Order tracking, and the R24 canary of this build.
 *
 * `/lacak/?id=SMP-2451` reads the query parameter in a `useEffect`, so the
 * result card is inserted into the DOM AFTER mount. On Kilau that exact shape
 * shipped broken: the reveal pass ran once at mount, the card was never
 * observed, it never received `.in`, and the page read as blank even though
 * the markup was correct.
 *
 * The card below carries `.reveal`, and `ClientEffects` pairs its
 * IntersectionObserver with a MutationObserver on document.body that reveals
 * post-mount nodes immediately when they are already on screen. If anyone ever
 * regresses that observer, or reintroduces the `.js .reveal { opacity: 0 }`
 * rule R34 forbids, this page is where it shows up first.
 *
 * The query parameter is read from `window.location.search` rather than
 * `useSearchParams`, which under static export would force a client bailout
 * boundary for no benefit here.
 */
export default function TrackOrder() {
  const { orders } = useCart();

  const [query, setQuery] = useState("");
  const [date, setDate] = useState("");
  const [result, setResult] = useState<Order | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [searched, setSearched] = useState(false);

  const lookup = (id: string) => {
    const found = orders.find(
      (o) => o.id.toLowerCase() === id.trim().toLowerCase(),
    );
    setResult(found ?? null);
    setNotFound(!found);
    setSearched(true);
  };

  // deep link support, runs after mount
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id");
    if (!id) return;
    setQuery(id);
    lookup(id);
    // orders is stable enough here, and re-running on every order change would
    // clobber a search the visitor has since typed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <form
        className="card card-pad"
        style={{ padding: "var(--s-6)", maxWidth: 720 }}
        onSubmit={(e) => {
          e.preventDefault();
          lookup(query);
        }}
      >
        <div className="grid cols-2">
          {/* R19: visible label above, visible placeholder inside */}
          <div className="field">
            <label htmlFor="nomor-pesanan">Nomor pesanan</label>
            <input
              id="nomor-pesanan"
              className="input"
              placeholder="Misalnya SMP-2451"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <span className="hint">
              Formatnya SMP diikuti empat angka, ada di email dan WhatsApp
              konfirmasi.
            </span>
          </div>

          {/* R21: a real date picker, never a free text field with a
              "contoh: 12 Agustus 2026" placeholder. */}
          <DatePicker
            label="Tanggal pesanan, kalau ingat"
            name="tanggal"
            value={date}
            onChange={setDate}
            anchor="right"
            minToday={false}
            hint="Opsional, membantu kalau nomornya tertukar."
          />
        </div>

        <button type="submit" className="btn btn-primary mt-5" style={{ alignSelf: "flex-start" }}>
          Lacak pesanan
        </button>

        <p className="text-small text-soft mt-4">
          Ini demo, jadi coba saja dengan SMP-2451, SMP-2438, atau SMP-2402.
        </p>
      </form>

      {/* everything below is inserted AFTER mount. R24. */}
      {searched && notFound && (
        <div className="card card-pad reveal mt-6" style={{ maxWidth: 720 }} aria-live="polite">
          <div className="stack-label">
            <span className="sl-title">Nomor itu tidak ketemu</span>
            <span className="sl-meta">
              Cek lagi penulisannya, atau kirimkan bukti pembayaranmu ke
              WhatsApp kami dan kami carikan manual.
            </span>
          </div>
          <a
            className="btn btn-primary mt-5"
            style={{ alignSelf: "flex-start" }}
            href={waLink("bantuan melacak pesanan Simpul")}
            {...waAnchorProps}
          >
            Minta bantuan lewat WhatsApp
          </a>
        </div>
      )}

      {result && (
        <div className="card card-pad reveal mt-6" style={{ maxWidth: 720, padding: "var(--s-6)" }} aria-live="polite">
          <div className="row" style={{ justifyContent: "space-between" }}>
            <div className="stack-label">
              <span className="sl-title" style={{ fontSize: "var(--t-h3)" }}>
                Pesanan {result.id}
              </span>
              <span className="sl-meta">Atas nama {result.name}</span>
              <span className="sl-meta">{result.address}</span>
              <span className="sl-meta">Dikirim lewat {result.courier}</span>
            </div>
            <span className="badge badge-quiet">{result.status}</span>
          </div>

          <ol className="stack-sm mt-6" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {TIMELINE[result.status].map((s) => (
              <li
                key={s.label}
                className="row"
                style={{ flexWrap: "nowrap", gap: "var(--s-3)" }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: 14,
                    height: 14,
                    flex: "0 0 14px",
                    marginTop: 6,
                    background: s.done ? "var(--cta)" : "var(--white)",
                    border: `1px solid ${s.done ? "var(--cta)" : "var(--line-strong)"}`,
                  }}
                />
                <span style={{ color: s.done ? "var(--ink)" : "var(--ink-soft)" }}>
                  {s.label}
                </span>
              </li>
            ))}
          </ol>

          <hr className="hairline" />

          <div className="stack">
            {result.lines.map((l) => {
              const p = productBySlug(l.slug);
              if (!p) return null;
              return (
                <div
                  key={`${l.slug}-${l.colour}`}
                  className="row"
                  style={{ justifyContent: "space-between", alignItems: "flex-start" }}
                >
                  <span className="stack-label">
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
            <div
              className="row"
              style={{
                justifyContent: "space-between",
                borderTop: "1px solid var(--line-strong)",
                paddingTop: "var(--s-4)",
              }}
            >
              <span style={{ fontWeight: 600 }}>Total</span>
              <span className="price-now">{rupiah(result.total)}</span>
            </div>
          </div>

          <div className="row mt-6">
            <Link href="/akun/" className="btn btn-outline">
              Lihat semua pesananku
            </Link>
            <a
              className="btn btn-primary"
              href={waLink(`pesanan ${result.id}`)}
              {...waAnchorProps}
            >
              Tanya soal pesanan ini
            </a>
          </div>
        </div>
      )}
    </>
  );
}
