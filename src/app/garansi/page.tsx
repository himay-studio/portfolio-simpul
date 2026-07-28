import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHead from "@/components/SectionHead";
import Accordion, { type AccordionItem } from "@/components/Accordion";
import { waLink, waAnchorProps } from "@/lib/wa";

const COVERED = [
  {
    t: "Cacat jahitan",
    d: "Jahit tepi lepas, benang berumbai dari awal, atau jahitan meleset dari garis kain.",
  },
  {
    t: "Warna belang",
    d: "Warna tidak rata dalam satu lembar, atau jelas berbeda dari foto di halaman produk.",
  },
  {
    t: "Ukuran meleset",
    d: "Selisih lebih dari 3 cm dari ukuran yang tertulis. Toleransi normal kami 2 cm.",
  },
  {
    t: "Salah kirim",
    d: "Warna atau model yang datang berbeda dari yang tertulis di nomor pesananmu.",
  },
];

const STEPS = [
  {
    t: "Foto dulu sebelum dicuci",
    d: "Ambil foto bagian yang bermasalah dan satu foto keseluruhan hijabnya, dengan cahaya yang cukup. Kalau sudah dicuci, klaimnya jadi jauh lebih sulit kami proses.",
  },
  {
    t: "Kirim ke WhatsApp kami",
    d: "Sertakan nomor pesanan berformat SMP-XXXX. Kami balas paling lama satu hari kerja.",
  },
  {
    t: "Kami putuskan, ganti atau tukar",
    d: "Kalau cacat produksi, kami ganti baru dan ongkos kirimnya kami tanggung penuh. Kalau salah pilih ukuran atau warna, kami tukar dan ongkirnya dibagi dua.",
  },
  {
    t: "Barang pengganti dikirim",
    d: "Biasanya berangkat di hari yang sama setelah barang lamanya kami terima kembali.",
  },
];

const NOT_COVERED: AccordionItem[] = [
  {
    q: "Rusak karena cara mencuci",
    a: "Kain yang letoy setelah dicuci dengan air panas, warna pudar karena dijemur di bawah matahari langsung, atau serat rusak karena diperas dengan cara dipuntir. Panduan lengkapnya ada di halaman perawatan.",
  },
  {
    q: "Bekas parfum, minyak, atau kosmetik",
    a: "Alkohol dan minyak meninggalkan noda samar yang tidak bisa dihilangkan dan bukan cacat produksi.",
  },
  {
    q: "Sudah lewat 14 hari",
    a: "Batas klaim kami 14 hari sejak barang tercatat diterima oleh kurir. Setelah itu kami tetap bantu sebisanya, tapi di luar ketentuan garansi.",
  },
  {
    q: "Label sudah dilepas atau hijab sudah dipakai keluar",
    a: "Untuk penukaran ukuran dan warna, label harus masih menempel. Untuk cacat produksi, ini tidak berlaku, cacat tetap kami ganti.",
  },
  {
    q: "Selisih warna kecil antar batch",
    a: "Selisih tipis antar batch pewarnaan adalah hal normal pada kain yang diwarnai. Kalau kamu butuh benar benar seragam untuk acara, sebutkan waktu memesan dan kami ambilkan dari satu batch yang sama.",
  },
];

export default function GaransiPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/", label: "Beranda" }, { label: "Garansi" }]}
        eyebrow="Ketentuan"
        title="Garansi dan penukaran"
        note="Empat belas hari, syaratnya kami tulis apa adanya termasuk yang tidak kami tanggung. Lebih baik kamu tahu batasnya dari awal daripada kecewa nanti."
      />

      <section className="section">
        <div className="wrap">
          <SectionHead
            ordinal="01"
            title="Yang kami ganti baru"
            note="Kalau salah satu dari ini terjadi, kami ganti tanpa biaya, termasuk ongkos kirimnya."
          />
          {/* R48: 4 peer items */}
          <div className="snap-row cols-4">
            {COVERED.map((c) => (
              <div key={c.t} className="card card-pad reveal">
                <span className="badge badge-cta">Ditanggung</span>
                <div className="stack-label mt-4">
                  <span className="sl-title">{c.t}</span>
                  <span className="sl-meta">{c.d}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="snap-hint">Geser untuk melihat semuanya.</p>
        </div>
      </section>

      <section className="section band-sand">
        <div className="wrap">
          <SectionHead ordinal="02" title="Cara mengajukan klaim" />
          <ol className="stack" style={{ listStyle: "none", padding: 0, margin: 0, gap: "var(--s-6)" }}>
            {STEPS.map((s, i) => (
              <li
                key={s.t}
                className="row reveal"
                style={{ alignItems: "flex-start", flexWrap: "nowrap", gap: "var(--s-5)" }}
              >
                <span
                  aria-hidden="true"
                  className="display"
                  style={{
                    color: "var(--gold)",
                    fontSize: "var(--t-h3)",
                    lineHeight: 1.2,
                    flex: "0 0 auto",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="stack-label">
                  <span className="sl-title">{s.t}</span>
                  <span className="sl-meta">{s.d}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead
            ordinal="03"
            title="Yang tidak kami tanggung"
            note="Bukan untuk mempersulit, tapi supaya jelas sejak awal."
          />
          <div style={{ maxWidth: "72ch" }}>
            <Accordion items={NOT_COVERED} defaultOpen={null} />
          </div>

          <div className="card card-pad reveal mt-7" style={{ padding: "var(--s-7)" }}>
            <div className="stack-label">
              <span className="sl-title" style={{ fontSize: "var(--t-h2)" }}>
                Ada masalah dengan pesananmu
              </span>
              <span className="sl-meta" style={{ fontSize: "var(--t-body-l)" }}>
                Kirim fotonya ke WhatsApp kami dengan nomor pesanan, kami balas
                paling lama satu hari kerja.
              </span>
            </div>
            <div className="row mt-6">
              <a
                className="btn btn-primary"
                href={waLink("klaim garansi produk Simpul")}
                {...waAnchorProps}
              >
                Ajukan klaim
              </a>
              <Link href="/perawatan/" className="btn btn-outline">
                Baca panduan perawatan
              </Link>
              <Link href="/lacak/" className="btn btn-light">
                Lacak pesanan
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
