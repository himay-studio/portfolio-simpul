import Link from "next/link";
import PageHero from "@/components/PageHero";
import Media from "@/components/Media";
import SectionHead from "@/components/SectionHead";
import { ATELIER, LOOKBOOK } from "@/lib/media";
import { waLink, waAnchorProps } from "@/lib/wa";

const STANDARDS = [
  {
    t: "Ukuran diukur setelah dijahit",
    d: "Bukan ukuran kain sebelum dipotong. Toleransi kami 2 cm, dan kalau meleset lebih dari itu produknya tidak kami jual.",
  },
  {
    t: "Warna diuji tiga kali cuci",
    d: "Sebelum satu warna masuk katalog, kami cuci tiga kali dan bandingkan dengan lembar aslinya. Yang belang tidak lolos.",
  },
  {
    t: "Tepi dijahit, bukan diobras",
    d: "Jahit tepi memakan waktu lebih lama dan biayanya lebih mahal, tapi ini yang membuat kain tidak berumbai setelah beberapa bulan.",
  },
  {
    t: "Satu batch, satu penjahit",
    d: "Satu batch warna dikerjakan oleh satu orang dari awal sampai akhir, jadi hasil jahitannya konsisten dalam satu pesanan.",
  },
];

export default function TentangPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/", label: "Beranda" }, { label: "Tentang" }]}
        eyebrow="Tentang Simpul"
        title="Kami mulai karena bosan ditipu foto"
        note="Simpul lahir dari keluhan yang sederhana. Warna di foto tidak pernah sama dengan yang datang, dan tidak ada satu pun penjual yang mau menulis ukuran kainnya dengan jelas."
      />

      <section className="section">
        <div className="wrap">
          <div className="grid cols-2" style={{ gap: "var(--s-8)", alignItems: "center" }}>
            <Media
              id={ATELIER}
              path="img/about/atelier-simpul.jpg"
              ratio="3:2"
              brief="Interior studio tekstil kecil yang tenang, gulungan kain voal dan ceruty netral di meja kayu, tumpukan hijab jadi, sepasang gunting kain, cahaya siang dari jendela besar di kiri, tanpa orang dan tanpa tulisan."
              className="reveal"
            />
            <div className="stack reveal">
              <span className="eyebrow">Cerita</span>
              <h2>Dari satu meja di Bandung</h2>
              <p className="lead">
                Kami mulai tahun 2023 dengan satu meja potong, dua penjahit, dan
                tiga warna voal. Idenya bukan bikin merek baru, tapi menjawab
                satu pertanyaan yang tidak pernah dijawab jujur di marketplace,
                yaitu kain ini sebenarnya seperti apa kalau dipegang.
              </p>
              <p className="text-soft">
                Sekarang koleksinya empat belas model, dan cara kerjanya masih
                sama. Setiap kain kami pegang dulu, cuci dulu, dan pakai dulu
                sebelum difoto. Kalau ada yang tidak lolos, kami tidak jual,
                sesederhana itu.
              </p>
              <p className="text-soft">
                Harga kami taruh di antara marketplace dan label premium, bukan
                karena ingin terlihat murah, tapi karena target kami memang
                perempuan yang beli hijab dua kali sebulan, bukan dua kali
                setahun.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section band-sand">
        <div className="wrap">
          <SectionHead
            ordinal="01"
            title="Standar yang kami pegang"
            note="Empat hal ini yang menentukan sebuah batch lolos atau tidak. Bukan slogan, ini checklist yang benar benar dipakai di meja produksi."
          />
          {/* R48: 4 peer items */}
          <div className="snap-row cols-4">
            {STANDARDS.map((s, i) => (
              <div key={s.t} className="card card-pad reveal">
                <span
                  className="display"
                  aria-hidden="true"
                  style={{ color: "var(--gold)", fontSize: "var(--t-h3)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="stack-label mt-4">
                  <span className="sl-title">{s.t}</span>
                  <span className="sl-meta">{s.d}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="snap-hint">Geser untuk melihat semuanya.</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="grid cols-2" style={{ gap: "var(--s-8)", alignItems: "center" }}>
            <div className="stack reveal">
              <span className="eyebrow">Yang tidak kami lakukan</span>
              <h2>Kami tidak jualan pakai rasa bersalah</h2>
              <p className="lead">
                Hijab itu pakaian, dan memilih pakaian itu soal selera dan
                kenyamanan. Kamu tidak akan menemukan kalimat yang menekan atau
                menghakimi di halaman mana pun di situs ini.
              </p>
              <p className="text-soft">
                Kami juga tidak memakai kata premium tanpa angka di sebelahnya.
                Kalau kami bilang sebuah kain lebih baik, akan ada gramasi,
                ukuran, atau jenis finishing yang bisa kamu bandingkan sendiri.
              </p>
              <div className="row">
                <Link href="/katalog/" className="btn btn-outline">
                  Lihat katalog
                </Link>
                <a
                  className="btn btn-primary"
                  href={waLink("kerja sama atau pertanyaan tentang Simpul")}
                  {...waAnchorProps}
                >
                  Hubungi kami
                </a>
              </div>
            </div>
            <Media
              id={LOOKBOOK[1]}
              path="img/lookbook/lookbook-sore.jpg"
              ratio="3:2"
              brief="Editorial lookbook kedua, model memakai segi empat krem susu duduk di kursi kayu polos, cahaya sore lembut dari jendela kiri, dinding plester hangat."
              className="reveal"
            />
          </div>
        </div>
      </section>
    </>
  );
}
