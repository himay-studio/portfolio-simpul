import PageHero from "@/components/PageHero";
import CatalogueBrowser from "@/components/CatalogueBrowser";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import Link from "next/link";

export default function KatalogPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/", label: "Beranda" }, { label: "Katalog" }]}
        eyebrow="Katalog"
        title="Semua produk Simpul"
        note={`${PRODUCTS.length} model, masing masing tersedia dalam tiga warna. Ukuran dan finishing ditulis di setiap kartu, jadi kamu bisa membandingkan tanpa harus membuka satu satu.`}
      >
        <div className="row mt-6">
          {CATEGORIES.map((c) => (
            <Link key={c.slug} href={`/katalog/${c.slug}/`} className="chip">
              {c.name}
            </Link>
          ))}
        </div>
      </PageHero>

      <section className="section">
        <div className="wrap">
          <CatalogueBrowser />
        </div>
      </section>
    </>
  );
}
