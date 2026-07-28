import PageHero from "@/components/PageHero";
import TrackOrder from "@/components/TrackOrder";

export default function LacakPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/", label: "Beranda" }, { label: "Lacak pesanan" }]}
        eyebrow="Lacak"
        title="Lacak pesanan"
        note="Masukkan nomor pesanan yang kamu terima setelah pembayaran dikonfirmasi. Halaman ini juga bisa dibuka langsung lewat tautan berisi nomor pesanannya."
      />
      <section className="section">
        <div className="wrap">
          <TrackOrder />
        </div>
      </section>
    </>
  );
}
