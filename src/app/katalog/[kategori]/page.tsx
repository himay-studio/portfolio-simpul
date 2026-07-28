import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import CatalogueBrowser from "@/components/CatalogueBrowser";
import Media from "@/components/Media";
import { CATEGORIES, categoryBySlug, productsByCategory } from "@/data/products";
import { categoryMediaId } from "@/lib/media";
import { waLink, waAnchorProps } from "@/lib/wa";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ kategori: c.slug }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ kategori: string }>;
}) {
  const { kategori } = await params;
  const category = categoryBySlug(kategori);
  if (!category) notFound();

  const items = productsByCategory(category.slug);

  return (
    <>
      <PageHero
        crumbs={[
          { href: "/", label: "Beranda" },
          { href: "/katalog/", label: "Katalog" },
          { label: category.name },
        ]}
        eyebrow={category.meta}
        title={category.name}
        note={category.blurb}
      >
        <p className="text-small mt-4" style={{ color: "var(--brand)" }}>
          {category.spec}
        </p>
        <div className="row mt-6">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/katalog/${c.slug}/`}
              className={`chip${c.slug === category.slug ? " is-active" : ""}`}
              aria-current={c.slug === category.slug ? "page" : undefined}
            >
              {c.name}
            </Link>
          ))}
        </div>
      </PageHero>

      <section className="section">
        <div className="wrap">
          <div className="grid cols-2" style={{ gap: "var(--s-8)", marginBottom: "var(--s-9)" }}>
            <Media
              id={categoryMediaId(category.slug)}
              path={category.banner}
              ratio="4:3"
              brief={`Tumpukan hijab kategori ${category.name} dalam beberapa warna, foto sudut rendah.`}
              className="reveal"
            />
            <div className="stack reveal">
              <span className="eyebrow">Tentang kategori ini</span>
              <h2>{category.name}</h2>
              <p className="lead">{category.blurb}</p>
              <p className="text-soft">
                Ada {items.length} model di kategori ini, masing masing tersedia
                dalam tiga warna. Kalau kamu belum yakin ukurannya, baca panduan
                ukuran dulu sebelum memilih.
              </p>
              <div className="row">
                <Link href="/panduan-ukuran/" className="btn btn-outline">
                  Panduan ukuran
                </Link>
                <a
                  className="btn btn-primary"
                  href={waLink(`kategori ${category.name} Simpul`)}
                  {...waAnchorProps}
                >
                  Tanya sebelum beli
                </a>
              </div>
            </div>
          </div>

          <CatalogueBrowser fixedCategory={category.slug} />
        </div>
      </section>
    </>
  );
}
