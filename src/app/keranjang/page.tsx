import PageHero from "@/components/PageHero";
import CheckoutFlow from "@/components/CheckoutFlow";

export default function KeranjangPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/", label: "Beranda" }, { label: "Keranjang" }]}
        eyebrow="Keranjang"
        title="Keranjang dan checkout"
        note="Isi alamat, pilih kurir, lalu buat pesanan. Ini demo, jadi tidak ada pembayaran sungguhan yang diproses, tapi pesanannya benar benar tercatat dan bisa kamu lacak."
      />
      <section className="section">
        <div className="wrap">
          <CheckoutFlow />
        </div>
      </section>
    </>
  );
}
