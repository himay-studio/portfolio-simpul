import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Media from "@/components/Media";
import { ARTICLES, articleBySlug, otherArticles, type Block } from "@/data/articles";
import { productBySlug } from "@/data/products";
import { articleMediaId, productCardMediaId } from "@/lib/media";
import { rupiah } from "@/lib/site";
import { waLink, waAnchorProps } from "@/lib/wa";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

function renderBlock(b: Block, i: number) {
  switch (b.kind) {
    case "h2":
      return (
        <h2 key={i} className="mt-7" style={{ marginBottom: "var(--s-4)" }}>
          {b.text}
        </h2>
      );
    case "p":
      return (
        <p key={i} className="measure mt-4 text-soft">
          {b.text}
        </p>
      );
    case "quote":
      return (
        <blockquote
          key={i}
          className="mt-6"
          style={{
            margin: 0,
            borderLeft: "3px solid var(--gold)",
            paddingLeft: "var(--s-5)",
            fontFamily: "var(--font-display)",
            fontSize: "var(--t-h3)",
            lineHeight: 1.4,
            color: "var(--ink)",
          }}
        >
          {b.text}
        </blockquote>
      );
    case "list":
      return (
        <ul key={i} className="stack-sm mt-4 measure" style={{ paddingLeft: "1.1rem" }}>
          {b.items.map((it) => (
            <li key={it} className="text-soft">
              {it}
            </li>
          ))}
        </ul>
      );
    case "steps":
      return (
        <ol key={i} className="stack mt-5" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {b.items.map((s, k) => (
            <li key={s.title} className="row" style={{ alignItems: "flex-start", flexWrap: "nowrap", gap: "var(--s-5)" }}>
              <span
                aria-hidden="true"
                className="display"
                style={{ color: "var(--gold)", fontSize: "var(--t-h3)", flex: "0 0 auto", lineHeight: 1.2 }}
              >
                {String(k + 1).padStart(2, "0")}
              </span>
              {/* R50: title and body are separate blocks with a gap */}
              <span className="stack-label">
                <span className="sl-title">{s.title}</span>
                <span className="sl-meta">{s.text}</span>
              </span>
            </li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div key={i} className="mt-5" style={{ overflowX: "auto" }}>
          <table className="spec-table" style={{ minWidth: 480 }}>
            <thead>
              <tr>
                {b.head.map((h) => (
                  <th key={h} scope="col" style={{ width: "auto", color: "var(--ink)", fontWeight: 600 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, k) => (
                    <td key={k} style={k === 0 ? { color: "var(--ink-soft)" } : undefined}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article) notFound();

  const others = otherArticles(article.slug, 3);
  const products = article.productSlugs
    .map((s) => productBySlug(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <PageHero
        crumbs={[
          { href: "/", label: "Beranda" },
          { href: "/artikel/", label: "Artikel" },
          { label: article.title },
        ]}
        eyebrow={article.category}
        title={article.title}
        note={article.excerpt}
      >
        <p className="text-small text-soft mt-4">
          {article.dateLabel}, {article.readMinutes} menit baca
        </p>
      </PageHero>

      <section className="section">
        <div className="wrap">
          {/* main column plus a RIGHT sidebar. Below 1025px the sidebar drops
              beneath the body in the same order, it never becomes a cramped
              second column at tablet width. */}
          <div className="article-layout">
            <article>
              <Media
                id={articleMediaId(article.slug)}
                path={article.cover}
                ratio="16:9"
                brief={article.coverAlt + "."}
                className="reveal"
              />
              <div className="mt-6">{article.body.map(renderBlock)}</div>
            </article>

            <aside className="article-aside">
              <div className="card card-pad reveal">
                <span className="mega-col-head">Artikel lainnya</span>
                <div className="stack">
                  {others.map((o) => (
                    <Link key={o.slug} href={`/artikel/${o.slug}/`} className="stack-label">
                      {/* R50: title and category are separate blocks, so this
                          can never render as "Cara pakai pashminaTutorial". */}
                      <span className="sl-title" style={{ fontSize: "var(--t-body)" }}>
                        {o.title}
                      </span>
                      <span className="sl-meta">{o.category}</span>
                      <span className="sl-meta">{o.readMinutes} menit baca</span>
                    </Link>
                  ))}
                </div>
              </div>

              {products.length > 0 && (
                <div className="card card-pad reveal">
                  <span className="mega-col-head">Produk di artikel ini</span>
                  <div className="stack">
                    {products.map((p) => (
                      <Link key={p.slug} href={`/produk/${p.slug}/`} className="row" style={{ flexWrap: "nowrap", alignItems: "flex-start" }}>
                        <Media
                          id={productCardMediaId(p.slug)}
                          path={p.gallery[0].path}
                          ratio="1:1"
                          brief={p.gallery[0].alt + "."}
                          style={{ width: 64, flex: "0 0 64px", minHeight: 0 }}
                        />
                        <span className="stack-label">
                          <span className="sl-title" style={{ fontSize: "var(--t-body)" }}>
                            {p.name}
                          </span>
                          <span className="sl-meta">{p.material}</span>
                          <span className="sl-meta">{rupiah(p.price)}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="card card-pad reveal">
                <div className="stack-label">
                  <span className="sl-title">Masih ragu pilih yang mana</span>
                  <span className="sl-meta">
                    Ceritakan keluhanmu soal hijab yang sekarang, kami sarankan
                    dua atau tiga model yang paling mendekati.
                  </span>
                </div>
                <a
                  className="btn btn-primary btn-block mt-4"
                  href={waLink(`konsultasi setelah membaca artikel ${article.title}`)}
                  {...waAnchorProps}
                >
                  Konsultasi gratis
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
