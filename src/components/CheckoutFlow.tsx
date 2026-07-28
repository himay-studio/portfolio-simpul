"use client";

import Link from "next/link";
import { useState } from "react";
import Select from "./Select";
import Media from "./Media";
import { useCart } from "./cart/CartContext";
import { productBySlug } from "@/data/products";
import { productCardMediaId } from "@/lib/media";
import { rupiah } from "@/lib/site";
import { waLink, waAnchorProps } from "@/lib/wa";

const PROVINSI = [
  { value: "dki", label: "DKI Jakarta", meta: "1 sampai 2 hari kerja" },
  { value: "jabar", label: "Jawa Barat", meta: "1 sampai 3 hari kerja" },
  { value: "jateng", label: "Jawa Tengah dan DIY", meta: "2 sampai 3 hari kerja" },
  { value: "jatim", label: "Jawa Timur", meta: "2 sampai 3 hari kerja" },
  { value: "banten", label: "Banten", meta: "1 sampai 2 hari kerja" },
  { value: "sumatera", label: "Sumatera", meta: "3 sampai 4 hari kerja" },
  { value: "bali", label: "Bali dan Nusa Tenggara", meta: "3 sampai 4 hari kerja" },
  { value: "timur", label: "Kalimantan, Sulawesi, ke timur", meta: "4 sampai 6 hari kerja" },
];

const KURIR = [
  { value: "jne", label: "JNE Reguler", meta: "Rp 16.000, paling luas jangkauannya" },
  { value: "sicepat", label: "SiCepat Halu", meta: "Rp 14.000, murah untuk Jawa" },
  { value: "anteraja", label: "Anteraja Next Day", meta: "Rp 28.000, sampai besok" },
];

const BAYAR = [
  { value: "transfer", label: "Transfer bank", meta: "BCA, Mandiri, BRI" },
  { value: "qris", label: "QRIS", meta: "Semua aplikasi pendukung" },
  { value: "ewallet", label: "E-wallet", meta: "GoPay, OVO, ShopeePay" },
];

const ONGKIR: Record<string, number> = { jne: 16000, sicepat: 14000, anteraja: 28000 };
const GRATIS_ONGKIR_MIN = 250000;

/**
 * The checkout demo. LAYOUT-ARCHITECTURE.md section 3 puts the transaction on
 * this page rather than in the cart slide over, because an address form does
 * not belong in a 380px drawer.
 *
 * R8 scope: this is a FEATURE DEMO, so the submit really runs and really
 * writes an order that `/akun` and `/dashboard` then read. R14 does not apply
 * to it. The WhatsApp CTA beside it does convert, so that one routes to Himay.
 *
 * R19: every field renders a visible label above it and a visible placeholder
 * inside it. A blank white box is a failed build.
 * R12 / R21: every dropdown is the custom Select, never a native one.
 */
export default function CheckoutFlow() {
  const { lines, subtotal, setQty, remove, placeOrder, hydrated } = useCart();

  const [stage, setStage] = useState<"form" | "processing" | "success">("form");
  const [orderId, setOrderId] = useState("");
  const [error, setError] = useState("");

  const [nama, setNama] = useState("");
  const [telepon, setTelepon] = useState("");
  const [alamat, setAlamat] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [kurir, setKurir] = useState("");
  const [bayar, setBayar] = useState("");

  const ongkir = kurir ? ONGKIR[kurir] : 0;
  const gratisOngkir = subtotal >= GRATIS_ONGKIR_MIN;
  const total = subtotal + (gratisOngkir ? 0 : ongkir);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!nama.trim() || !telepon.trim() || !alamat.trim()) {
      setError("Nama, nomor WhatsApp, dan alamat wajib diisi.");
      return;
    }
    if (!provinsi || !kurir || !bayar) {
      setError("Pilih provinsi, kurir, dan metode pembayaran dulu.");
      return;
    }

    setStage("processing");
    window.setTimeout(() => {
      const order = placeOrder({
        name: nama.trim(),
        lines,
        total,
        courier: KURIR.find((k) => k.value === kurir)?.label ?? "JNE Reguler",
        address: `${alamat.trim()}, ${PROVINSI.find((p) => p.value === provinsi)?.label ?? ""}`,
      });
      setOrderId(order.id);
      setStage("success");
    }, 1400);
  };

  /* ------------------------------------------------------------- success */
  if (stage === "success") {
    return (
      <div className="card card-pad reveal" style={{ padding: "var(--s-7)", maxWidth: 640 }}>
        <span className="eyebrow">Pesanan diterima</span>
        <h2>Terima kasih, {nama.split(" ")[0]}</h2>
        <p className="lead mt-4">
          Nomor pesananmu <strong>{orderId}</strong>. Kami sudah mencatatnya dan
          akan memprosesnya hari ini juga kalau pesanan masuk sebelum jam 14.00
          WIB.
        </p>
        <p className="text-soft mt-4">
          Simpan nomor itu, kamu bisa memasukkannya di halaman lacak pesanan
          kapan saja untuk melihat posisinya.
        </p>
        <div className="row mt-6">
          <Link href={`/lacak/?id=${orderId}`} className="btn btn-primary">
            Lacak pesanan ini
          </Link>
          <Link href="/akun/" className="btn btn-outline">
            Lihat di akun saya
          </Link>
          <Link href="/katalog/" className="btn btn-light">
            Belanja lagi
          </Link>
        </div>
      </div>
    );
  }

  /* ---------------------------------------------------------- processing */
  if (stage === "processing") {
    return (
      <div className="card card-pad" style={{ padding: "var(--s-7)", maxWidth: 640 }}>
        <span className="eyebrow">Sedang diproses</span>
        <h2>Menyimpan pesananmu</h2>
        <p className="lead mt-4" aria-live="polite">
          Sebentar, kami sedang mencatat pesanan dan menyiapkan nomornya.
        </p>
      </div>
    );
  }

  /* ---------------------------------------------------------------- form */
  if (hydrated && lines.length === 0) {
    return (
      <div className="card card-pad" style={{ padding: "var(--s-7)", maxWidth: 640 }}>
        <div className="stack-label">
          <span className="sl-title" style={{ fontSize: "var(--t-h2)" }}>
            Keranjangmu masih kosong
          </span>
          <span className="sl-meta" style={{ fontSize: "var(--t-body-l)" }}>
            Pilih dulu modelnya, warnanya bisa dipilih di halaman produk atau
            langsung dari kartu di katalog.
          </span>
        </div>
        <div className="row mt-6">
          <Link href="/katalog/" className="btn btn-primary">
            Lihat katalog
          </Link>
          <Link href="/panduan-ukuran/" className="btn btn-outline">
            Buka panduan ukuran
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid cols-2" style={{ gap: "var(--s-8)", alignItems: "start" }}>
      <form onSubmit={submit} noValidate>
        <h2 style={{ marginBottom: "var(--s-5)" }}>Alamat pengiriman</h2>

        <div className="stack">
          <div className="field">
            <label htmlFor="nama">Nama penerima</label>
            <input
              id="nama"
              className="input"
              placeholder="Misalnya Nadia Rahmawati"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              autoComplete="name"
            />
          </div>

          <div className="field">
            <label htmlFor="telepon">Nomor WhatsApp</label>
            <input
              id="telepon"
              className="input"
              type="tel"
              placeholder="Misalnya 0812 3456 7890"
              value={telepon}
              onChange={(e) => setTelepon(e.target.value)}
              autoComplete="tel"
            />
            <span className="hint">Dipakai untuk mengabari posisi paket.</span>
          </div>

          <div className="field">
            <label htmlFor="alamat">Alamat lengkap</label>
            <textarea
              id="alamat"
              className="textarea"
              placeholder="Nama jalan, nomor rumah, RT RW, kelurahan, kecamatan, kota, kode pos"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              autoComplete="street-address"
            />
          </div>

          <Select
            label="Provinsi"
            name="provinsi"
            value={provinsi}
            onChange={setProvinsi}
            options={PROVINSI}
            anchor="left"
            required
          />

          <Select
            label="Kurir"
            name="kurir"
            value={kurir}
            onChange={setKurir}
            options={KURIR}
            anchor="left"
            required
            hint={
              gratisOngkir
                ? "Belanjaanmu sudah lewat Rp 250.000, ongkirnya gratis."
                : "Ongkir dihitung otomatis setelah kurir dipilih."
            }
          />

          <Select
            label="Metode pembayaran"
            name="bayar"
            value={bayar}
            onChange={setBayar}
            options={BAYAR}
            anchor="left"
            required
          />

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          {/* R8 demo, so this really submits. Not a WhatsApp redirect. */}
          <button type="submit" className="btn btn-primary btn-block">
            Buat pesanan
          </button>
          <p className="text-small text-soft">
            Ini website demo, jadi tidak ada pembayaran sungguhan yang diproses.
          </p>
        </div>
      </form>

      {/* ------------------------------------------------------- summary */}
      <div className="card card-pad" style={{ position: "sticky", top: "calc(var(--header-h) + var(--s-5))" }}>
        <h2 style={{ fontSize: "var(--t-h3)", marginBottom: "var(--s-5)" }}>
          Ringkasan pesanan
        </h2>

        <div className="stack">
          {lines.map((l) => {
            const p = productBySlug(l.slug);
            if (!p) return null;
            const frame = p.colorways.find((c) => c.name === l.colour)?.frame ?? 0;
            return (
              <div
                key={`${l.slug}-${l.colour}`}
                className="row"
                style={{
                  alignItems: "flex-start",
                  flexWrap: "nowrap",
                  paddingBottom: "var(--s-4)",
                  borderBottom: "1px solid var(--line)",
                }}
              >
                <Media
                  id={productCardMediaId(p.slug)}
                  path={p.gallery[frame].path}
                  ratio="1:1"
                  brief={p.gallery[frame].alt + "."}
                  style={{ width: 64, flex: "0 0 64px", minHeight: 0 }}
                />
                <div className="stack-label" style={{ flex: "1 1 auto" }}>
                  {/* R42: the model name, not the colourway */}
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
                      style={{ minWidth: 44 }}
                      onClick={() => setQty(l.slug, l.colour, l.qty - 1)}
                      aria-label={`Kurangi jumlah ${p.name} warna ${l.colour}`}
                    >
                      &minus;
                    </button>
                    <span style={{ minWidth: 24, textAlign: "center" }}>{l.qty}</span>
                    <button
                      type="button"
                      className="btn btn-light btn-sm"
                      style={{ minWidth: 44 }}
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
            <span>{rupiah(subtotal)}</span>
          </div>
          <div className="row" style={{ justifyContent: "space-between" }}>
            <span className="text-soft">Ongkos kirim</span>
            <span>{gratisOngkir ? "Gratis" : kurir ? rupiah(ongkir) : "Pilih kurir"}</span>
          </div>
          <div
            className="row"
            style={{
              justifyContent: "space-between",
              borderTop: "1px solid var(--line-strong)",
              paddingTop: "var(--s-4)",
            }}
          >
            <span style={{ fontWeight: 600 }}>Total</span>
            <span className="price-now">{rupiah(total)}</span>
          </div>

          <a
            className="btn btn-outline btn-block"
            href={waLink("pesanan hijab Simpul di keranjang")}
            {...waAnchorProps}
          >
            Pesan lewat WhatsApp saja
          </a>
        </div>
      </div>
    </div>
  );
}
