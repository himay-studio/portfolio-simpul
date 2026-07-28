import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import ProductDetail from "@/components/ProductDetail";
import ProductCard from "@/components/ProductCard";
import SectionHead from "@/components/SectionHead";
import Media from "@/components/Media";
import {
  PRODUCTS,
  categoryBySlug,
  productBySlug,
  relatedProducts,
} from "@/data/products";
import { PACKAGING, productCardMediaId, productMediaIds } from "@/lib/media";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();

  const category = categoryBySlug(product.category);
  const related = relatedProducts(product, 4);

  return (
    <>
      <PageHero
        crumbs={[
          { href: "/", label: "Beranda" },
          { href: "/katalog/", label: "Katalog" },
          { href: `/katalog/${product.category}/`, label: category?.name ?? "Kategori" },
          { label: product.name },
        ]}
        title={product.name}
        eyebrow={product.material}
        note={product.tagline}
      />

      <section className="section">
        <div className="wrap">
          <ProductDetail product={product} mediaIds={productMediaIds(product.slug)} />
        </div>
      </section>

      <section className="section band-sand">
        <div className="wrap">
          <div className="grid cols-2" style={{ gap: "var(--s-8)", alignItems: "center" }}>
            <div className="stack reveal">
              <span className="eyebrow">Sampai di rumah</span>
              <h2>Dikemas rapi, tidak kusut di jalan</h2>
              <p className="lead">
                Setiap pesanan dikirim dalam kotak karton ivory 20x20x3 cm,
                dialasi tissue paper, dengan hangtag bertali dan pouch kain krem.
                Hijabnya dilipat rapi jadi tidak perlu disetrika ulang begitu
                sampai.
              </p>
              <p className="text-soft">
                Kalau kamu memesan lebih dari tiga, kami pisahkan per warna
                supaya gampang dibagikan.
              </p>
            </div>
            <Media
              id={PACKAGING}
              path="img/packaging/simpul-unboxing.jpg"
              ratio="4:3"
              brief="Kotak karton ivory doff 20x20x3 cm terbuka di atas permukaan putih hangat, hijab terlipat di dalamnya beralas tissue paper, hangtag bertali menghadap menjauh, pouch kain krem di sampingnya."
              className="reveal"
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead
            ordinal="06"
            title="Mungkin cocok juga"
            note="Model lain di kategori yang sama, dan beberapa yang sering dibeli bersamaan."
          />
          {/* R48: 4 peer items, snap carousel at 768px */}
          <div className="snap-row cols-4">
            {related.map((p) => (
              <ProductCard
                key={p.slug}
                product={p}
                mode="commerce"
                mediaId={productCardMediaId(p.slug)}
              />
            ))}
          </div>
          <p className="snap-hint">Geser untuk melihat produk lainnya.</p>
        </div>
      </section>
    </>
  );
}
