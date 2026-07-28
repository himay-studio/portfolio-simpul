import { waLink, waAnchorProps } from "@/lib/wa";

/**
 * R10 / R17 / R45, the floating WhatsApp button.
 *
 * R17: the icon is the shared asset copied into public/img/whatsapp.png at
 * Stage 2, referenced by its public path. Never a hand drawn inline SVG glyph
 * and never a third party WA icon.
 *
 * R45: on desktop at 1025px and up this renders as `[icon] + CTA label`, not a
 * bare icon circle. A bare icon on desktop wastes the prime conversion surface
 * and never tells the visitor what the button does. Below 1025px it collapses
 * to the icon only oval, which is the single documented R10 radius exception
 * in the whole build. Both states are driven by the media query in site.css,
 * so the same element stays clickable through to waLink().
 */
export default function WhatsAppFloat() {
  return (
    <a
      className="wa-float"
      href={waLink("konsultasi produk Simpul")}
      aria-label="Chat Simpul di WhatsApp"
      {...waAnchorProps}
    >
      <img src="/img/whatsapp.png" alt="" width={26} height={26} aria-hidden="true" />
      <span className="wa-label">Konsultasi Gratis</span>
    </a>
  );
}
