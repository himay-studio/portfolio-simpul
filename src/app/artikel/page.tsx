import Link from "next/link";
import PageHero from "@/components/PageHero";
import Media from "@/components/Media";
import { ARTICLES, featuredArticle } from "@/data/articles";
import { articleMediaId } from "@/lib/media";

export default function ArtikelIndex() {
  const lead = featuredArticle();
  const rest = ARTICLES.filter((a) => a.slug !== lead.slug);

  return (
    <>
      <PageHero
        crumbs={[{ href: "/", label: "Beranda" }, { label: "Artikel" }]}
        eyebrow="Artikel"
        title="Tutorial dan panduan bahan"
        note="Ditulis supaya kamu tidak salah beli, bukan supaya kamu beli lebih banyak. Semua contohnya pakai produk yang benar benar ada di katalog."
      />

      <section className="section">
        <div className="wrap">
          {/* an editor picks a lead, and showing one is what makes an index
              read edited rather than like a flat feed. */}
          <Link href={`/artikel/${lead.slug}/`} className="card card-hover reveal">
            <Media
              id={articleMediaId(lead.slug)}
              path={lead.cover}
              ratio="16:9"
              brief={lead.coverAlt + "."}
            />
            <div className="card-pad stack-label" style={{ padding: "var(--s-6)" }}>
              <span className="sl-meta" style={{ color: "var(--brand)", fontWeight: 600 }}>
                {lead.category}
              </span>
              <span className="sl-title" style={{ fontSize: "var(--t-h2)" }}>
                {lead.title}
              </span>
              <span className="sl-meta">{lead.excerpt}</span>
              <span className="sl-meta">
                {lead.dateLabel}, {lead.readMinutes} menit baca
              </span>
            </div>
          </Link>

          {/* R48: 8 peer items (rest, lead excluded), snap carousel at 768px */}
          <div className="snap-row cols-3 mt-7">
            {rest.map((a) => (
              <Link key={a.slug} href={`/artikel/${a.slug}/`} className="card card-hover reveal">
                <Media
                  id={articleMediaId(a.slug)}
                  path={a.cover}
                  ratio="16:9"
                  brief={a.coverAlt + "."}
                />
                <div className="card-pad stack-label">
                  {/* R50: category, title, excerpt, meta, four blocks */}
                  <span className="sl-meta" style={{ color: "var(--brand)", fontWeight: 600 }}>
                    {a.category}
                  </span>
                  <span className="sl-title">{a.title}</span>
                  <span className="sl-meta">{a.excerpt}</span>
                  <span className="sl-meta">
                    {a.dateLabel}, {a.readMinutes} menit baca
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <p className="snap-hint">Geser untuk melihat semua artikel.</p>
        </div>
      </section>
    </>
  );
}
