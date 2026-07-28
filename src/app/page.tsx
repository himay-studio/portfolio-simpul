import Link from "next/link";
import Media from "@/components/Media";
import SectionHead from "@/components/SectionHead";
import ProductCard from "@/components/ProductCard";
import { CATEGORIES, COLOURS, featuredProducts } from "@/data/products";
import { ARTICLES } from "@/data/articles";
import {
  HERO_POSTER,
  HERO_VIDEO,
  LOOKBOOK,
  articleMediaId,
  categoryMediaId,
  productCardMediaId,
} from "@/lib/media";
import { SITE } from "@/lib/site";
import { waLink, waAnchorProps } from "@/lib/wa";

/** the season's named colours, the brand's actual proposition stated up front */
const TICKER: (keyof typeof COLOURS)[] = [
  "Krem Susu",
  "Zaitun",
  "Mocha",
  "Biru Senja",
  "Putih Tulang",
  "Terakota",
  "Sage",
  "Marun Tua",
];

const TRUST = [
  {
    t: "Ukuran ditulis apa adanya",
    d: "175x75, 115x115, dan seterusnya. Bukan sebutan besar atau jumbo yang tidak bisa dibandingkan.",
  },
  {
    t: "Warna di foto sama dengan aslinya",
    d: "Setiap warna difoto di tiga kondisi cahaya, jadi kamu tahu persis yang datang nanti seperti apa.",
  },
  {
    t: "Jahit tepi, bukan obras kasar",
    d: "Tepinya dijahit halus supaya tidak berumbai setelah beberapa kali cuci.",
  },
  {
    t: "Tukar 14 hari",
    d: "Salah warna atau salah ukuran bisa ditukar selama label masih menempel.",
  },
];

const TESTIMONI = [
  {
    n: "Nadia, 24, Bekasi",
    r: 5,
    q: "Beli voal krem susu dan warnanya persis kayak di foto. Ini yang bikin gue akhirnya berhenti beli hijab random di marketplace.",
  },
  {
    n: "Rani, 31, Depok",
    r: 5,
    q: "Ambil tiga warna sekaligus buat seragaman keluarga. Bahannya sama semua, tidak ada yang lebih tipis, itu susah dicari.",
  },
  {
    n: "Sasa, 22, Bandung",
    r: 4,
    q: "Diamond crepe-nya beneran tidak letoy. Dipakai kuliah dari pagi sampai sore bentuknya masih sama.",
  },
  {
    n: "Ayu, 27, Jakarta",
    r: 5,
    q: "Sport hijabnya enak, tidak melorot waktu lari. Sebelumnya pakai bergo biasa dan tiap lima menit dibenerin.",
  },
];

export default function HomePage() {
  const featured = featuredProducts();
  const articles = ARTICLES.slice(0, 3);

  return (
    <>
      {/* ------------------------------------------------------------ hero */}
      {/* R2 + R31: the hero is graded DARK and the navbar above it is solid
          ivory from first paint, so nav legibility never depends on the
          footage. The only overlay is a bottom anchored gradient over the
          lower 45 percent, not a full section wash.
          R15 + R30 + R44: the 8 second mp4 is MANDATORY and its slot is a
          labelled placeholder until Stage 4 lands the file. Nothing here
          points a <video src> at a file that is not on disk. */}
      <section className="hero">
        <div className="hero-media" aria-hidden="true">
          <Media
            id={HERO_VIDEO}
            path="video/hero-simpul.mp4"
            type="video"
            ratio="16:9"
            brief="Klip hero 8 detik, studio gelap, model memakai voal netral, kain jatuh dengan berat. Veo Lite, 720p, autoplay muted loop. WAJIB, bukan opsional."
            style={{ height: "100%", width: "100%" }}
          />
        </div>
        <div className="hero-scrim" aria-hidden="true" />
        <div className="wrap hero-copy">
          <span className="eyebrow">Label scarf modest, dari Bandung</span>
          <h1>{SITE.tagline}</h1>
          <p className="lead">
            Voal, ceruty, dan diamond crepe dengan ukuran dan finishing yang kami
            tulis apa adanya. Kualitas yang terasa di tangan, dengan harga yang
            masih masuk akal buat dibeli dua kali sebulan.
          </p>
          <div className="hero-actions">
            <a
              className="btn btn-primary"
              href={waLink("koleksi hijab Simpul")}
              {...waAnchorProps}
            >
              Pesan sekarang
            </a>
            <Link href="/katalog/" className="btn btn-onDark">
              Lihat katalog
            </Link>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- colour ticker */}
      {/* R48: 8 peer items, so this is a snap carousel at 768px and below. */}
      <section className="band-sand section-tight">
        <div className="wrap">
          <span className="eyebrow">Warna musim ini</span>
          <div className="snap-row cols-4" style={{ gridAutoColumns: "unset" }}>
            {TICKER.map((name) => (
              <div
                key={name}
                className="row reveal"
                style={{ gap: "var(--s-3)", flexWrap: "nowrap" }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: 34,
                    height: 34,
                    flex: "0 0 34px",
                    background: COLOURS[name],
                    border: "1px solid var(--line-strong)",
                  }}
                />
                <span className="stack-label">
                  <span className="sl-meta" style={{ color: "var(--ink)", fontWeight: 600 }}>
                    {name}
                  </span>
                  <span className="sl-meta">Tersedia</span>
                </span>
              </div>
            ))}
          </div>
          <p className="snap-hint">Geser untuk melihat semua warna.</p>
        </div>
      </section>

      {/* -------------------------------------------------------- kategori */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            ordinal="01"
            title="Mulai dari bentuknya"
            note="Enam kategori, dari pashmina yang bisa dibentuk sampai bergo yang tinggal pakai. Kalau belum tahu mau yang mana, mulai dari sini."
            action={
              <Link href="/katalog/" className="btn btn-outline btn-sm">
                Semua produk
              </Link>
            }
          />
          {/* R48: 6 peer items */}
          <div className="snap-row cols-3">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/katalog/${c.slug}/`}
                className="card card-hover reveal"
              >
                <Media
                  id={categoryMediaId(c.slug)}
                  path={c.banner}
                  ratio="4:3"
                  brief={`Tumpukan hijab kategori ${c.name} dalam beberapa warna, foto sudut rendah.`}
                />
                <div className="card-pad stack-label">
                  <span className="sl-title">{c.name}</span>
                  <span className="sl-meta">{c.meta}</span>
                  <span className="sl-meta">{c.blurb}</span>
                  <span className="sl-meta" style={{ color: "var(--brand)" }}>
                    {c.spec}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <p className="snap-hint">Geser untuk melihat semua kategori.</p>
        </div>
      </section>

      {/* ------------------------------------------------------- pilihan */}
      {/* DISPLAY mode. LAYOUT-ARCHITECTURE.md section 4: the home page sells
          taste, so no badges and no add-to-cart here. The catalogue converts. */}
      <section className="section band-tint">
        <div className="wrap">
          <SectionHead
            ordinal="02"
            title="Pilihan musim ini"
            note="Enam model yang paling sering dibeli ulang. Foto apa adanya, tanpa filter yang mengubah warna."
            action={
              <Link href="/katalog/" className="btn btn-outline btn-sm">
                Lihat semua
              </Link>
            }
          />
          <div className="snap-row cols-3">
            {featured.map((p) => (
              <ProductCard
                key={p.slug}
                product={p}
                mode="display"
                mediaId={productCardMediaId(p.slug)}
              />
            ))}
          </div>
          <p className="snap-hint">Geser untuk melihat pilihan lainnya.</p>
        </div>
      </section>

      {/* --------------------------------------------------------- lookbook */}
      <section className="section">
        <div className="wrap">
          <div className="grid cols-2" style={{ alignItems: "center", gap: "var(--s-8)" }}>
            <Media
              id={LOOKBOOK[0]}
              path="img/lookbook/lookbook-pagi.jpg"
              ratio="3:2"
              brief="Editorial lookbook, model memakai pashmina zaitun di ruangan terang dengan dinding plester, cahaya jendela dari kiri."
              className="reveal"
            />
            <div className="stack reveal">
              <span className="eyebrow">Lookbook</span>
              <h2>Satu simpul, dan bentuknya berubah</h2>
              <p className="lead">
                Kain yang sama bisa jadi gaya kantor yang rapi, gaya kuliah yang
                santai, atau gaya kondangan yang tertutup. Yang membedakan cuma
                cara melipat dan di mana jarumnya dikunci.
              </p>
              <p className="text-soft">
                Kami tulis tutorialnya lengkap dengan foto tiap tahap, bukan
                cuma hasil akhirnya, supaya kamu bisa ikuti sambil berdiri di
                depan cermin.
              </p>
              <div className="row">
                <Link href="/artikel/" className="btn btn-outline">
                  Baca tutorialnya
                </Link>
                <Link href="/panduan-ukuran/" className="btn btn-light">
                  Panduan ukuran
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- trust */}
      <section className="section band-sand">
        <div className="wrap">
          <SectionHead
            ordinal="03"
            title="Kenapa orang balik lagi"
            note="Empat hal yang kami pegang, dan yang paling sering disebut di ulasan."
          />
          {/* R48: 4 peer items */}
          <div className="snap-row cols-4">
            {TRUST.map((t, i) => (
              <div key={t.t} className="card card-pad reveal">
                <span
                  className="display"
                  aria-hidden="true"
                  style={{ color: "var(--gold)", fontSize: "var(--t-h3)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="stack-label mt-4">
                  <span className="sl-title">{t.t}</span>
                  <span className="sl-meta">{t.d}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="snap-hint">Geser untuk melihat semuanya.</p>
        </div>
      </section>

      {/* --------------------------------------------------------- artikel */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            ordinal="04"
            title="Sebelum beli, baca dulu"
            note="Beda bahan, cara pakai, dan cara merawat. Ditulis supaya kamu tidak salah beli, bukan supaya kamu beli lebih banyak."
            action={
              <Link href="/artikel/" className="btn btn-outline btn-sm">
                Semua artikel
              </Link>
            }
          />
          <div className="grid cols-3">
            {articles.map((a) => (
              <Link key={a.slug} href={`/artikel/${a.slug}/`} className="card card-hover reveal">
                <Media
                  id={articleMediaId(a.slug)}
                  path={a.cover}
                  ratio="16:9"
                  brief={a.coverAlt + "."}
                />
                <div className="card-pad stack-label">
                  {/* R50: category, title, and meta are three blocks. Inline
                      they would read "TutorialCara pakai pashmina". */}
                  <span className="sl-meta" style={{ color: "var(--brand)", fontWeight: 600 }}>
                    {a.category}
                  </span>
                  <span className="sl-title">{a.title}</span>
                  <span className="sl-meta">{a.excerpt}</span>
                  <span className="sl-meta">{a.readMinutes} menit baca</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- testimoni */}
      <section className="section band-tint">
        <div className="wrap">
          <SectionHead ordinal="05" title="Kata yang sudah pakai" />
          {/* R48: 4 peer items */}
          <div className="snap-row cols-4">
            {TESTIMONI.map((t) => (
              <blockquote key={t.n} className="card card-pad reveal" style={{ margin: 0 }}>
                <span className="stars" aria-label={`${t.r} dari 5 bintang`}>
                  {"★".repeat(t.r)}
                </span>
                <p className="mt-4" style={{ color: "var(--ink)" }}>
                  {t.q}
                </p>
                <footer className="stack-label mt-4">
                  <span className="sl-meta" style={{ color: "var(--ink)", fontWeight: 600 }}>
                    {t.n}
                  </span>
                  <span className="sl-meta">Pembeli terverifikasi</span>
                </footer>
              </blockquote>
            ))}
          </div>
          <p className="snap-hint">Geser untuk membaca ulasan lainnya.</p>
        </div>
      </section>

      {/* ------------------------------------------------------------- cta */}
      <section className="section band-deep">
        <div className="wrap">
          <div className="grid cols-2" style={{ alignItems: "center", gap: "var(--s-8)" }}>
            <div className="stack reveal">
              <span className="eyebrow">Masih bingung pilih yang mana</span>
              <h2>Chat kami, kami bantu pilihkan</h2>
              <p className="lead">
                Sebutkan bahan yang biasa kamu pakai dan keluhannya apa, nanti
                kami sarankan dua atau tiga model yang paling mendekati. Tidak
                ada paksaan untuk langsung beli.
              </p>
              <div className="row">
                <a
                  className="btn btn-primary"
                  href={waLink("rekomendasi hijab yang cocok")}
                  {...waAnchorProps}
                >
                  Konsultasi gratis
                </a>
                <Link href="/faq/" className="btn btn-onDark">
                  Baca FAQ dulu
                </Link>
              </div>
            </div>
            <Media
              id={HERO_POSTER}
              path="img/hero-simpul-poster.jpg"
              ratio="16:9"
              brief="Still gelap dari klip hero, model memakai voal netral, cahaya jendela tunggal, bayangan dalam. Dipakai sebagai poster video."
              className="reveal"
            />
          </div>
        </div>
      </section>
    </>
  );
}
