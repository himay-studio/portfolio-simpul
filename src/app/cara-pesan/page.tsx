import Link from "next/link";
import PageHero from "@/components/PageHero";
import { waLink, waAnchorProps } from "@/lib/wa";

/** the numbered rail, mirroring the home page device. See LAYOUT-ARCHITECTURE.md section 6. */
const STEPS = [
  {
    t: "Pilih modelnya dulu, bukan warnanya",
    d: "Tentukan bentuk dan bahan lebih dulu, pashmina atau segi empat, voal atau diamond crepe. Warna paling gampang diganti, bahan tidak. Kalau ragu, buka panduan ukuran atau baca perbandingan bahannya.",
  },
  {
    t: "Cek ukuran di halaman produk",
    d: "Setiap produk menulis ukuran jadi, bukan ukuran kain sebelum dipotong. Untuk segi empat, selisih 110 dan 115 terasa jelas di bagian dada, jadi jangan dilewati.",
  },
  {
    t: "Masukkan ke keranjang dan pilih warna",
    d: "Warna adalah pilihan di dalam satu produk, jadi kamu bisa menambahkan dua warna dari model yang sama dan keduanya masuk sebagai baris terpisah di keranjang.",
  },
  {
    t: "Isi alamat dan pilih kurir",
    d: "Kami kirim lewat JNE, SiCepat, dan Anteraja. Ongkos kirim muncul setelah kota tujuan dipilih. Pesanan di atas Rp 250.000 gratis ongkir ke seluruh Indonesia.",
  },
  {
    t: "Bayar, lalu lacak",
    d: "Transfer bank, QRIS, atau e-wallet. Setelah pembayaran dikonfirmasi kamu dapat nomor pesanan berformat SMP-XXXX yang bisa dimasukkan di halaman lacak pesanan kapan saja.",
  },
];

const PAYMENT = [
  { m: "Transfer bank", d: "BCA, Mandiri, BRI. Konfirmasi otomatis dalam 10 menit." },
  { m: "QRIS", d: "Semua aplikasi yang mendukung QRIS. Konfirmasi langsung." },
  { m: "E-wallet", d: "GoPay, OVO, ShopeePay. Konfirmasi langsung." },
  { m: "Dua termin", d: "Khusus grosir di atas sepuluh lembar, 50 persen di muka." },
];

const SHIPPING = [
  { area: "Jabodetabek", time: "1 sampai 2 hari kerja", cost: "Mulai Rp 12.000" },
  { area: "Pulau Jawa", time: "2 sampai 3 hari kerja", cost: "Mulai Rp 16.000" },
  { area: "Sumatera dan Bali", time: "3 sampai 4 hari kerja", cost: "Mulai Rp 24.000" },
  { area: "Kalimantan ke timur", time: "4 sampai 6 hari kerja", cost: "Mulai Rp 35.000" },
];

export default function CaraPesanPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/", label: "Beranda" }, { label: "Cara pesan" }]}
        eyebrow="Panduan"
        title="Cara pesan, lima langkah"
        note="Dari memilih model sampai barang jalan. Kalau di tengah jalan ada yang membingungkan, chat kami, tidak perlu menyelesaikan sendiri."
      />

      <section className="section">
        <div className="wrap">
          <ol className="stack" style={{ listStyle: "none", padding: 0, margin: 0, gap: "var(--s-7)" }}>
            {STEPS.map((s, i) => (
              <li
                key={s.t}
                className="row reveal"
                style={{ alignItems: "flex-start", flexWrap: "nowrap", gap: "var(--s-6)" }}
              >
                <span
                  aria-hidden="true"
                  className="display"
                  style={{
                    color: "var(--gold)",
                    fontSize: "var(--t-h2)",
                    lineHeight: 1,
                    flex: "0 0 auto",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="stack-label">
                  <span className="sl-title" style={{ fontSize: "var(--t-h3)" }}>
                    {s.t}
                  </span>
                  <span className="sl-meta" style={{ fontSize: "var(--t-body)" }}>
                    {s.d}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section band-sand">
        <div className="wrap">
          <div className="grid cols-2" style={{ gap: "var(--s-8)", alignItems: "start" }}>
            <div className="reveal">
              <h2 style={{ marginBottom: "var(--s-5)" }}>Cara bayar</h2>
              <table className="spec-table">
                <tbody>
                  {PAYMENT.map((p) => (
                    <tr key={p.m}>
                      <th scope="row">{p.m}</th>
                      <td>{p.d}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="reveal">
              <h2 style={{ marginBottom: "var(--s-5)" }}>Estimasi pengiriman</h2>
              <table className="spec-table">
                <thead>
                  <tr>
                    <th scope="col" style={{ color: "var(--ink)", fontWeight: 600 }}>
                      Tujuan
                    </th>
                    <th scope="col" style={{ width: "auto", color: "var(--ink)", fontWeight: 600 }}>
                      Estimasi
                    </th>
                    <th scope="col" style={{ width: "auto", color: "var(--ink)", fontWeight: 600 }}>
                      Ongkir
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {SHIPPING.map((s) => (
                    <tr key={s.area}>
                      <th scope="row">{s.area}</th>
                      <td>{s.time}</td>
                      <td>{s.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-small text-soft mt-4">
                Gratis ongkir untuk pesanan di atas Rp 250.000, se Indonesia.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="card card-pad reveal" style={{ padding: "var(--s-7)" }}>
            <div className="stack-label">
              <span className="sl-title" style={{ fontSize: "var(--t-h2)" }}>
                Lebih enak dibantu langsung
              </span>
              <span className="sl-meta" style={{ fontSize: "var(--t-body-l)" }}>
                Sebutkan bahan yang biasa kamu pakai dan keluhannya apa, nanti
                kami sarankan dua atau tiga model yang paling mendekati.
              </span>
            </div>
            <div className="row mt-6">
              <a
                className="btn btn-primary"
                href={waLink("bantuan memesan produk Simpul")}
                {...waAnchorProps}
              >
                Pesan lewat WhatsApp
              </a>
              <Link href="/panduan-ukuran/" className="btn btn-outline">
                Buka panduan ukuran
              </Link>
              <Link href="/faq/" className="btn btn-light">
                Baca FAQ
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
