import Link from "next/link";
import PageHero from "@/components/PageHero";
import SizeFinder from "@/components/SizeFinder";
import { waLink, waAnchorProps } from "@/lib/wa";

const PASHMINA = [
  ["Alun Voal", "175 x 75 cm", "Jahit tepi", "Harian dan kerja"],
  ["Alun Ceruty Babydoll", "180 x 75 cm", "Jahit tepi", "Pemula dan cuaca panas"],
  ["Bilah Diamond Crepe", "175 x 75 cm", "Jahit tepi", "Yang hijabnya sering letoy"],
  ["Sanding Viscose", "180 x 75 cm", "Laser cut", "Acara dan kerja formal"],
];

const SEGI = [
  ["Kanvas Polycotton", "110 x 110 cm", "Jahit tepi", "Sekolah dan kuliah"],
  ["Satin Lembayung", "110 x 110 cm", "Jahit tepi", "Kondangan dan lebaran"],
  ["Titik Voal", "115 x 115 cm", "Jahit tepi", "Kerja, dada tertutup rapi"],
  ["Sulur Voal Motif", "115 x 115 cm", "Jahit tepi", "Menghidupkan outfit polos"],
];

const INSTAN = [
  ["Bergo Rapi Jersey", "Size M dan L", "Tanpa pet", "Praktis, tidak perlu jarum"],
  ["Bergo Kerja Instan Voal", "All size", "Pet antem", "Rapi tapi siap pakai"],
  ["Sport Hijab Laju", "Size S, M, L", "Karet anti geser", "Olahraga"],
  ["Inner Ninja Antem", "All size", "Karet belakang", "Lapisan dalam"],
];

function SizeTable({
  caption,
  rows,
}: {
  caption: string;
  rows: string[][];
}) {
  return (
    <div className="reveal" style={{ overflowX: "auto" }}>
      <h3 style={{ marginBottom: "var(--s-4)" }}>{caption}</h3>
      <table className="spec-table" style={{ minWidth: 520 }}>
        <thead>
          <tr>
            <th scope="col" style={{ color: "var(--ink)", fontWeight: 600 }}>
              Model
            </th>
            <th scope="col" style={{ width: "auto", color: "var(--ink)", fontWeight: 600 }}>
              Ukuran
            </th>
            <th scope="col" style={{ width: "auto", color: "var(--ink)", fontWeight: 600 }}>
              Finishing
            </th>
            <th scope="col" style={{ width: "auto", color: "var(--ink)", fontWeight: 600 }}>
              Paling cocok untuk
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]}>
              <th scope="row">{r[0]}</th>
              <td>{r[1]}</td>
              <td>{r[2]}</td>
              <td>{r[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PanduanUkuranPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/", label: "Beranda" }, { label: "Panduan ukuran" }]}
        eyebrow="Panduan"
        title="Panduan ukuran"
        note="Semua ukuran di bawah adalah ukuran jadi, diukur setelah dijahit, bukan ukuran kain sebelum dipotong. Toleransi kami 2 cm."
      />

      <section className="section">
        <div className="wrap stack" style={{ gap: "var(--s-8)" }}>
          <SizeTable caption="Pashmina" rows={PASHMINA} />
          <SizeTable caption="Segi empat" rows={SEGI} />
          <SizeTable caption="Instan, sport, dan inner" rows={INSTAN} />
        </div>
      </section>

      <section className="section band-sand">
        <div className="wrap">
          <div className="grid cols-2" style={{ gap: "var(--s-8)", alignItems: "start" }}>
            <div className="stack reveal">
              <span className="eyebrow">Selisih lima sentimeter</span>
              <h2>110 atau 115, ini bedanya</h2>
              <p className="lead">
                Karena segi empat dilipat jadi segitiga, selisih lima sentimeter
                berlipat dan terasa jelas di bagian yang menutupi dada.
              </p>
              <ul className="stack-sm" style={{ paddingLeft: "1.1rem" }}>
                <li className="text-soft">
                  110 jatuh sampai sekitar ulu hati, kadang perlu ditumpuk untuk
                  kerja.
                </li>
                <li className="text-soft">
                  115 jatuh sampai bawah dada, umumnya sudah cukup tanpa
                  ditumpuk.
                </li>
                <li className="text-soft">
                  Wajah bulat biasanya lebih seimbang dengan 115 yang ditarik
                  sedikit maju di pelipis.
                </li>
                <li className="text-soft">
                  Wajah lonjong biasanya lebih pas dengan 110 yang dibiarkan
                  sedikit longgar di pipi.
                </li>
              </ul>
              <p className="text-small text-soft">
                Pembahasan lengkapnya ada di{" "}
                <Link href="/artikel/segi-empat-110-atau-115/" className="link-underline">
                  artikel perbandingan ukuran
                </Link>
                .
              </p>
            </div>

            <div className="stack reveal">
              <span className="eyebrow">Cara mengukur sendiri</span>
              <h2>Kalau mau membandingkan dengan koleksimu</h2>
              <ol className="stack-sm" style={{ paddingLeft: "1.2rem" }}>
                <li className="text-soft">
                  Bentangkan hijab yang paling kamu suka di lantai atau di kasur
                  sampai benar benar rata, tanpa ditarik.
                </li>
                <li className="text-soft">
                  Ukur sisi terpanjang dari ujung jahitan ke ujung jahitan, bukan
                  dari ujung kain mentah.
                </li>
                <li className="text-soft">
                  Untuk pashmina, ukur juga lebarnya, karena 70 dan 75 cm terasa
                  berbeda waktu dililit.
                </li>
                <li className="text-soft">
                  Cocokkan angkanya dengan tabel di atas, jangan dengan sebutan
                  besar atau jumbo.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="pencari-ukuran">
        <div className="wrap">
          <SizeFinder />
          <div className="row mt-6">
            <a
              className="btn btn-primary"
              href={waLink("bantuan memilih ukuran hijab Simpul")}
              {...waAnchorProps}
            >
              Tanya ukuran lewat WhatsApp
            </a>
            <Link href="/katalog/" className="btn btn-outline">
              Lihat katalog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
