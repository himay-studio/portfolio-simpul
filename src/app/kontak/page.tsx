"use client";

import Link from "next/link";
import { useState } from "react";
import PageHero from "@/components/PageHero";
import Select from "@/components/Select";
import { CONTACT } from "@/lib/site";
import { waLink, waAnchorProps } from "@/lib/wa";

const TOPIK = [
  { value: "produk", label: "Tanya produk", meta: "Bahan, ukuran, ketersediaan warna" },
  { value: "pesanan", label: "Pesanan saya", meta: "Status, perubahan alamat, pembatalan" },
  { value: "garansi", label: "Garansi atau tukar", meta: "Produk cacat atau salah ukuran" },
  { value: "grosir", label: "Grosir dan seragaman", meta: "Sepuluh lembar ke atas" },
  { value: "lain", label: "Lainnya", meta: "Kerja sama, media, atau masukan" },
];

export default function KontakPage() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [topik, setTopik] = useState("");
  const [pesan, setPesan] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!nama.trim() || !email.trim() || !pesan.trim()) {
      setError("Nama, email, dan pesan wajib diisi.");
      return;
    }
    if (!topik) {
      setError("Pilih topiknya dulu supaya pesanmu masuk ke orang yang tepat.");
      return;
    }
    setSent(true);
  };

  return (
    <>
      <PageHero
        crumbs={[{ href: "/", label: "Beranda" }, { label: "Kontak" }]}
        eyebrow="Kontak"
        title="Hubungi kami"
        note="WhatsApp adalah jalur tercepat, biasanya dibalas di bawah lima menit pada jam kerja. Formulir di bawah juga masuk, tapi balasannya lebih lama."
      />

      <section className="section">
        <div className="wrap">
          <div className="grid cols-2" style={{ gap: "var(--s-8)", alignItems: "start" }}>
            {/* the form is a working demo, so it stays functional. R14 scope. */}
            {sent ? (
              <div className="card card-pad reveal" style={{ padding: "var(--s-7)" }}>
                <span className="eyebrow">Terkirim</span>
                <h2>Terima kasih, {nama.split(" ")[0]}</h2>
                <p className="lead mt-4">
                  Pesanmu sudah masuk. Kami balas ke {email} paling lama satu
                  hari kerja.
                </p>
                <p className="text-soft mt-4">
                  Kalau butuh jawaban lebih cepat, chat kami langsung lewat
                  WhatsApp.
                </p>
                <div className="row mt-6">
                  <a
                    className="btn btn-primary"
                    href={waLink("pertanyaan dari formulir kontak")}
                    {...waAnchorProps}
                  >
                    Chat WhatsApp
                  </a>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => {
                      setSent(false);
                      setNama("");
                      setEmail("");
                      setTopik("");
                      setPesan("");
                    }}
                  >
                    Kirim pesan lain
                  </button>
                </div>
              </div>
            ) : (
              <form className="card card-pad" style={{ padding: "var(--s-7)" }} onSubmit={submit} noValidate>
                <h2 style={{ marginBottom: "var(--s-5)" }}>Kirim pesan</h2>
                <div className="stack">
                  {/* R19: every field has a visible label and a visible
                      placeholder. A blank white box is a failed build. */}
                  <div className="field">
                    <label htmlFor="k-nama">Nama</label>
                    <input
                      id="k-nama"
                      className="input"
                      placeholder="Misalnya Nadia Rahmawati"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      autoComplete="name"
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="k-email">Email</label>
                    <input
                      id="k-email"
                      className="input"
                      type="email"
                      placeholder="nama@contoh.id"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                    />
                  </div>

                  <Select
                    label="Topik"
                    name="topik"
                    value={topik}
                    onChange={setTopik}
                    options={TOPIK}
                    anchor="left"
                    required
                  />

                  <div className="field">
                    <label htmlFor="k-pesan">Pesan</label>
                    <textarea
                      id="k-pesan"
                      className="textarea"
                      placeholder="Ceritakan yang ingin kamu tanyakan, sedetail yang kamu mau"
                      value={pesan}
                      onChange={(e) => setPesan(e.target.value)}
                    />
                  </div>

                  {error && (
                    <p className="form-error" role="alert">
                      {error}
                    </p>
                  )}

                  <button type="submit" className="btn btn-primary btn-block">
                    Kirim pesan
                  </button>
                  <p className="text-small text-soft">
                    Ini website demo, jadi pesannya tidak benar benar terkirim ke
                    mana pun.
                  </p>
                </div>
              </form>
            )}

            <div className="stack" style={{ gap: "var(--s-5)" }}>
              <div className="card card-pad reveal">
                <span className="mega-col-head">Jalur tercepat</span>
                <div className="stack-label">
                  <span className="sl-title">WhatsApp</span>
                  <span className="sl-meta">{CONTACT.waDisplay}</span>
                  <span className="sl-meta">
                    Biasanya dibalas di bawah lima menit pada jam kerja.
                  </span>
                </div>
                <a
                  className="btn btn-primary btn-block mt-5"
                  href={waLink("pertanyaan umum tentang Simpul")}
                  {...waAnchorProps}
                >
                  Chat sekarang
                </a>
              </div>

              <div className="card card-pad reveal">
                <span className="mega-col-head">Email dan alamat</span>
                <div className="stack">
                  <span className="stack-label">
                    <span className="sl-title">Email</span>
                    <span className="sl-meta">{CONTACT.email}</span>
                  </span>
                  <span className="stack-label">
                    <span className="sl-title">Atelier</span>
                    <span className="sl-meta">{CONTACT.addressLine1}</span>
                    <span className="sl-meta">{CONTACT.addressLine2}</span>
                  </span>
                </div>
                <p className="text-small text-soft mt-4">
                  Atelier bukan toko, jadi kunjungan perlu janji dulu.
                </p>
              </div>

              <div className="card card-pad reveal">
                <span className="mega-col-head">Jam operasional</span>
                <div className="stack-sm">
                  {CONTACT.hours.map((h) => (
                    <span key={h.day} className="stack-label">
                      <span className="sl-title" style={{ fontSize: "var(--t-body)" }}>
                        {h.day}
                      </span>
                      <span className="sl-meta">{h.time}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="card card-pad reveal">
                <span className="mega-col-head">Mungkin sudah terjawab</span>
                <p className="text-soft">
                  Sepuluh pertanyaan yang paling sering masuk sudah kami tulis
                  jawabannya, termasuk soal bahan yang paling adem dan apakah
                  produk kami nerawang.
                </p>
                <Link href="/faq/" className="btn btn-outline btn-block mt-4">
                  Buka FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
