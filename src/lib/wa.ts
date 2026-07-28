import { SITE } from "./site";

/**
 * R14. Every SALES CTA on this portfolio site routes to Himay Studio's
 * WhatsApp, not to the fictional brand. The message body names the clicked
 * button's own context, then states the demo origin.
 *
 * Scope reminder, so this does not get over applied:
 *   - USE for buttons whose job is to CONVERT the visitor (Beli, Pesan,
 *     Tambah ke Keranjang on a card, Checkout, Konsultasi, Hubungi).
 *   - DO NOT use for navigation links, the R8 login / dashboard / customer
 *     portal demos, form internal submits, or tab / accordion / modal
 *     controls. Those stay functional so the demo actually demonstrates.
 *
 * The text is encoded with encodeURIComponent, never hand encoded.
 */
export function waLink(context: string): string {
  const body =
    `Hi saya tertarik dengan ${context}. ` +
    `Saya lihat dari website demo ${SITE.brand} di himaystudio.com.`;
  return `https://wa.me/${SITE.himay.waNumber}?text=${encodeURIComponent(body)}`;
}

/** Props every sales CTA anchor needs. Spread this so nothing is forgotten. */
export const waAnchorProps = {
  target: "_blank" as const,
  rel: "noopener noreferrer" as const,
};
