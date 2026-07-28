import Link from "next/link";
import PageHero from "@/components/PageHero";
import Accordion, { type AccordionItem } from "@/components/Accordion";
import SectionHead from "@/components/SectionHead";

const RULES = [
  {
    t: "Air dingin, maksimal 30 derajat",
    d: "Air panas melemaskan serat dan itulah awal letoy. Kalau ragu, pakai air keran biasa tanpa dicampur air panas sama sekali.",
  },
  {
    t: "Deterjen cair, bukan bubuk",
    d: "Butiran bubuk sering tidak larut sempurna dan meninggalkan bercak putih di kain gelap seperti Hitam Pekat dan Marun Tua.",
  },
  {
    t: "Rendam maksimal sepuluh menit",
    d: "Merendam lama membuat warna luntur, terutama pada warna tua. Sepuluh menit sudah cukup untuk hijab yang dipakai sehari.",
  },
  {
    t: "Jangan diperas dengan dipuntir",
    d: "Puntiran merusak jatuhnya kain secara permanen. Tekan pelan di antara dua telapak, atau gulung dengan handuk lalu tekan.",
  },
  {
    t: "Jemur teduh dan berangin",
    d: "Sinar matahari langsung memudarkan warna. Gantung memanjang, jangan dilipat di atas jemuran, supaya tidak ada garis lipat permanen.",
  },
  {
    t: "Simpan digulung",
    d: "Terutama untuk voal dan satin. Kalau dibawa di tas, masukkan ke pouch supaya tidak tergencet botol minum.",
  },
];

const PER_BAHAN: AccordionItem[] = [
  {
    q: "Voal premium",
    a: [
      "Cuci tangan dengan air dingin, atau mesin mode halus di dalam kantong cuci. Setrika suhu sedang kalau perlu, dan selalu dari sisi dalam.",
      "Voal paling gampang kembali rapi setelah disetrika, jadi ini bahan yang paling toleran terhadap kesalahan.",
    ],
  },
  {
    q: "Ceruty babydoll",
    a: [
      "Hanya cuci tangan. Jangan diperas, cukup ditekan. Hampir tidak perlu disetrika, karena permukaan crepe-nya memang tidak rata.",
      "Kalau ada bekas lipatan yang keras, gantung di kamar mandi saat mandi air hangat, uapnya cukup untuk melemaskan kembali.",
    ],
  },
  {
    q: "Diamond crepe",
    a: "Paling tahan dari semua. Boleh mesin cuci mode halus. Jangan disetrika langsung dengan suhu tinggi karena tekstur kulit jeruknya bisa memipih dan hilang.",
  },
  {
    q: "Viscose",
    a: "Cuci tangan, air dingin, dan jangan digantung dalam keadaan basah kuyup karena beratnya bisa menarik serat dan memanjangkan kain. Keringkan setengah dengan handuk dulu.",
  },
  {
    q: "Satin silk",
    a: "Cuci tangan terpisah dari kain lain. Setrika suhu paling rendah dengan alas kain katun di atasnya. Jangan disemprot parfum langsung, alkoholnya meninggalkan noda samar yang sulit hilang.",
  },
  {
    q: "Jersey, sport, dan inner",
    a: "Boleh mesin cuci. Untuk sport hijab, jangan pakai pelembut kain, karena lapisan pelembut menutup pori kain dan menghilangkan sifat quick dry-nya.",
  },
];

export default function PerawatanPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/", label: "Beranda" }, { label: "Perawatan" }]}
        eyebrow="Panduan"
        title="Perawatan hijab"
        note="Hijab jarang rusak karena dipakai. Biasanya rusak karena dicuci dan disimpan dengan cara yang salah. Ini urutan yang benar."
      />

      <section className="section">
        <div className="wrap">
          <SectionHead
            ordinal="01"
            title="Enam aturan dasar"
            note="Berlaku untuk semua bahan. Kalau cuma sempat mengingat satu, ingat yang pertama."
          />
          {/* R48: 6 peer items */}
          <div className="snap-row cols-3">
            {RULES.map((r, i) => (
              <div key={r.t} className="card card-pad reveal">
                <span
                  className="display"
                  aria-hidden="true"
                  style={{ color: "var(--gold)", fontSize: "var(--t-h3)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="stack-label mt-4">
                  <span className="sl-title">{r.t}</span>
                  <span className="sl-meta">{r.d}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="snap-hint">Geser untuk melihat semua aturan.</p>
        </div>
      </section>

      <section className="section band-tint">
        <div className="wrap">
          <SectionHead
            ordinal="02"
            title="Per bahan, kalau mau lebih teliti"
            note="Tiap bahan punya satu hal yang tidak boleh dilanggar. Ini daftarnya."
          />
          <div style={{ maxWidth: "72ch" }}>
            <Accordion items={PER_BAHAN} defaultOpen={null} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="card card-pad reveal" style={{ padding: "var(--s-7)" }}>
            <div className="stack-label">
              <span className="sl-title" style={{ fontSize: "var(--t-h2)" }}>
                Kalau sudah terlanjur rusak
              </span>
              <span className="sl-meta" style={{ fontSize: "var(--t-body-l)" }}>
                Kalau rusaknya karena cacat produksi, itu masuk garansi dan kami
                ganti baru. Kalau karena perawatan, kami tetap bantu sebisanya,
                kirim saja fotonya.
              </span>
            </div>
            <div className="row mt-6">
              <Link href="/garansi/" className="btn btn-outline">
                Baca ketentuan garansi
              </Link>
              <Link href="/artikel/rahasia-hijab-tidak-mudah-letoy/" className="btn btn-light">
                Baca artikel lengkapnya
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
