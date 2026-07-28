import Link from "next/link";
import PageHero from "@/components/PageHero";
import Accordion, { type AccordionItem } from "@/components/Accordion";
import { waLink, waAnchorProps } from "@/lib/wa";

/** BRAND.md section 7. Answers written spec first, warm second, no filler. */
const FAQ: AccordionItem[] = [
  {
    q: "Bahan apa yang paling adem untuk dipakai seharian?",
    a: [
      "Ceruty babydoll, karena paling ringan di koleksi ini, sekitar 80 gram per lembar, dan permukaannya tidak menempel di kulit waktu berkeringat.",
      "Kalau kamu banyak di luar ruangan, voal juga aman. Yang perlu dihindari untuk cuaca panas adalah satin, karena kilaunya bagus tapi sirkulasi udaranya paling rendah.",
    ],
  },
  {
    q: "Apakah hijab Simpul nerawang?",
    a: [
      "Tidak. Semua voal dan ceruty di katalog ini sudah kami uji dengan cara paling sederhana, ditaruh di atas tulisan cetak dan difoto, dan tulisannya tidak terbaca menembus kain.",
      "Warna terang seperti Krem Susu dan Putih Tulang tetap aman dipakai satu lapis. Kalau kamu ingin ekstra tertutup, pakai inner ninja di baliknya.",
    ],
  },
  {
    q: "Berapa ukuran pashmina dan segi empat Simpul?",
    a: "Pashmina 175x75 cm untuk voal dan diamond crepe, 180x75 cm untuk ceruty dan viscose. Segi empat 110x110 cm dan 115x115 cm. Ukuran ini tertulis di setiap halaman produk, bukan sebutan besar atau jumbo yang tidak bisa dibandingkan.",
  },
  {
    q: "Bagaimana cara mencuci supaya warnanya tidak pudar dan tidak letoy?",
    a: [
      "Air dingin maksimal 30 derajat, deterjen cair untuk pakaian halus, rendam maksimal sepuluh menit, dan jangan diperas dengan cara dipuntir.",
      "Jemur di tempat teduh yang berangin, bukan di bawah matahari langsung. Panduan lengkapnya ada di halaman perawatan.",
    ],
  },
  {
    q: "Apakah warna di foto sama dengan warna aslinya?",
    a: "Ya, dan ini yang paling kami jaga. Setiap warna difoto di tiga kondisi cahaya, cahaya jendela pagi, ruangan ber-AC, dan sore hari, tanpa filter yang menaikkan saturasi. Kalau warna yang datang jelas berbeda dari foto, itu masuk garansi dan bisa ditukar.",
  },
  {
    q: "Berapa lama pesanan diproses dan dikirim?",
    a: "Pesanan sebelum jam 14.00 WIB diproses hari itu juga. Jabodetabek biasanya sampai dalam 1 sampai 2 hari kerja, Jawa 2 sampai 3 hari, luar Jawa 3 sampai 6 hari, tergantung kurir yang kamu pilih.",
  },
  {
    q: "Apakah bisa tukar ukuran atau warna kalau tidak cocok?",
    a: "Bisa, dalam 14 hari sejak barang diterima, selama label masih menempel dan hijabnya belum dicuci. Ongkos kirim penukaran ditanggung bersama, kami bayar satu arah.",
  },
  {
    q: "Apakah ada garansi kalau produk cacat atau jahitannya tidak rapi?",
    a: "Ada. Cacat produksi seperti jahitan lepas, warna belang, atau ukuran meleset lebih dari 3 cm kami ganti baru tanpa biaya, termasuk ongkos kirimnya. Cukup kirim foto ke WhatsApp kami.",
  },
  {
    q: "Metode pembayaran apa saja yang tersedia?",
    a: "Transfer bank BCA, Mandiri, dan BRI, QRIS, serta e-wallet GoPay, OVO, dan ShopeePay. Untuk pesanan grosir di atas sepuluh lembar kami juga terima pembayaran dua termin.",
  },
  {
    q: "Apakah Simpul melayani pembelian grosir atau seragaman untuk acara?",
    a: "Ya. Mulai dari sepuluh lembar warna sama sudah masuk harga grosir, dan kami bisa menahan stok satu warna untuk acara keluarga atau kantor. Hubungi kami lewat WhatsApp dengan menyebutkan jumlah dan tanggal acaranya.",
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/", label: "Beranda" }, { label: "FAQ" }]}
        eyebrow="Pertanyaan umum"
        title="Sepuluh yang paling sering ditanya"
        note="Kalau pertanyaanmu belum ada di sini, chat kami langsung. Biasanya dibalas di bawah lima menit pada jam kerja."
      />

      <section className="section">
        <div className="wrap">
          <div className="grid cols-2" style={{ gap: "var(--s-8)", alignItems: "start" }}>
            <div>
              <Accordion items={FAQ} />
            </div>

            <div className="card card-pad reveal" style={{ position: "sticky", top: "calc(var(--header-h) + var(--s-5))" }}>
              <div className="stack-label">
                <span className="sl-title">Masih ada yang mengganjal</span>
                <span className="sl-meta">
                  Sebutkan bahan yang biasa kamu pakai dan keluhannya apa. Kami
                  jawab apa adanya, termasuk kalau produk kami memang tidak cocok
                  buat kebutuhanmu.
                </span>
              </div>
              <a
                className="btn btn-primary btn-block mt-5"
                href={waLink("pertanyaan seputar produk Simpul")}
                {...waAnchorProps}
              >
                Tanya lewat WhatsApp
              </a>
              <Link href="/kontak/" className="btn btn-outline btn-block mt-4">
                Lihat kontak lengkap
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
