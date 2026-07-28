import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { CANONICAL, META_DESCRIPTION, META_TITLE, SITE } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientEffects from "@/components/ClientEffects";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import WelcomeModal from "@/components/WelcomeModal";
import PortfolioCta from "@/components/PortfolioCta";
import PageTransition from "@/components/PageTransition";
import MetaPixel from "@/components/MetaPixel";
import { CartProvider } from "@/components/cart/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";

/* R35: branded meta on every page, plus a canonical. Simpul is a fictional
   showcase brand so CANONICAL resolves to the portfolio subdomain itself. */
export const metadata: Metadata = {
  metadataBase: new URL(SITE.origin),
  title: { default: META_TITLE, template: META_TITLE },
  description: META_DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: META_TITLE,
    description: META_DESCRIPTION,
    url: CANONICAL,
    siteName: SITE.brand,
    locale: "id_ID",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#16233B",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
        />
        {/* R36: GTM as high as possible in <head>. GA4 is delivered through
            this container so himaystudio.com and every portfolio subdomain
            roll up into one property. */}
        <Script id="gtm-head" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${SITE.gtmId}');`}
        </Script>
      </head>
      <body>
        {/* R36: the noscript iframe sits immediately after the opening body. */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${SITE.gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>

        <MetaPixel />
        <ClientEffects />

        <a className="skip-link" href="#main">
          Lompat ke konten utama
        </a>

        <CartProvider>
          <Header />
          {/* R46: the shell remounts per route and cross fades on navigation. */}
          <PageTransition>
            <main id="main">{children}</main>
          </PageTransition>
          <Footer />
          <CartDrawer />
        </CartProvider>

        {/* R13 / R37 / R45 overlays live here, as siblings of <header>, so no
            filtered or transformed ancestor can become their containing
            block and collapse them to a strip. R53. */}
        <WelcomeModal />
        <PortfolioCta />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
