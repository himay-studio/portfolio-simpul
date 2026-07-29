import Link from "next/link";
import { CATEGORIES } from "@/data/products";
import { CONTACT, SITE } from "@/lib/site";
import { waLink, waAnchorProps } from "@/lib/wa";

const HELP = [
  { href: "/cara-pesan/", label: "Cara pesan" },
  { href: "/panduan-ukuran/", label: "Panduan ukuran" },
  { href: "/perawatan/", label: "Perawatan hijab" },
  { href: "/lacak/", label: "Lacak pesanan" },
  { href: "/garansi/", label: "Garansi dan tukar" },
  { href: "/faq/", label: "Pertanyaan umum" },
];

/* R59: kontak/akun/masuk only ever rendered inside the mobile drawer
   (SECONDARY_NAV in Header.tsx), which is display:none at >=1025px, so a
   desktop visitor had no path to these pages at all. The footer renders on
   every breakpoint, so linking them here closes the gap without touching the
   desktop topbar's icon count. */
const ACCOUNT = [
  { href: "/kontak/", label: "Halaman kontak" },
  { href: "/akun/", label: "Akun saya" },
  { href: "/masuk/", label: "Masuk" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            {/* R43: on --brand-deep the logo MUST be the white knockout
                variant. The primary mark is a coloured block and would read as
                a blank rectangle against #16233B, which is the failure this
                rule was written for on Legatara. */}
            <div className="brand-lock" style={{ marginBottom: "var(--s-4)" }}>
              <img
                src="/img/logo-simpul-white.png"
                alt=""
                width={40}
                height={40}
                aria-hidden="true"
              />
              {/* R50: two block children with a gap. An inline tagline here
                  renders as "SIMPULLABEL SCARF MODEST". */}
              <span className="brand-text">
                <span className="brand-word">{SITE.wordmark}</span>
                <span className="brand-tag">Label scarf modest</span>
              </span>
            </div>
            <p className="foot-muted" style={{ maxWidth: "38ch" }}>
              {SITE.tagline} Voal, ceruty, dan diamond crepe dengan ukuran dan
              finishing yang kami tulis apa adanya.
            </p>
            <a
              className="btn btn-primary btn-sm mt-5"
              href={waLink("koleksi hijab Simpul")}
              {...waAnchorProps}
            >
              Chat kami di WhatsApp
            </a>
          </div>

          <div>
            <span className="foot-head">Belanja</span>
            <ul className="foot-list">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link href={`/katalog/${c.slug}/`}>{c.name}</Link>
                </li>
              ))}
              <li>
                <Link href="/katalog/">Semua produk</Link>
              </li>
            </ul>
          </div>

          <div>
            <span className="foot-head">Bantuan</span>
            <ul className="foot-list">
              {HELP.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="foot-head">Kontak</span>
            <ul className="foot-list">
              <li>
                <a href={waLink("informasi umum Simpul")} {...waAnchorProps}>
                  WhatsApp {CONTACT.waDisplay}
                </a>
              </li>
              <li className="foot-muted">{CONTACT.email}</li>
              <li className="foot-muted">{CONTACT.addressLine1}</li>
              <li className="foot-muted">{CONTACT.addressLine2}</li>
              {ACCOUNT.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
            <span className="foot-head" style={{ marginTop: "var(--s-6)" }}>
              Jam operasional
            </span>
            <ul className="foot-list">
              {CONTACT.hours.map((h) => (
                <li key={h.day} className="foot-muted text-small">
                  {h.day}, {h.time}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="foot-bottom">
          <span>
            &copy; <span data-year>2026</span> {SITE.brand}. Website demo, bukan toko
            sungguhan.
          </span>
          {/* R35: DOFOLLOW backlink to himaystudio.com. Never nofollow,
              sponsored, or ugc. This is the primary SEO equity channel back to
              the main domain. */}
          <span>
            Designed &amp; Developed by{" "}
            <a
              href={SITE.himay.url}
              target="_blank"
              rel="noopener"
              style={{ textDecoration: "underline", textUnderlineOffset: "3px" }}
            >
              {SITE.himay.name}
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
