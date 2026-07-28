"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/**
 * R53. Every full viewport overlay renders through here, straight into
 * document.body.
 *
 * An ancestor carrying `backdrop-filter`, `filter`, `transform`,
 * `perspective`, `contain: paint`, or `will-change` on any of those becomes
 * the containing block for a `position: fixed` descendant. The fixed child
 * then stops referring to the viewport and gets clipped to the ancestor's box.
 * A drawer nested inside a blurred `<header>` collapses to the header's own
 * height and renders as a narrow strip with a duplicated logo, measured on
 * HIM-228 at 68px tall while its CSS said `top:0; bottom:0`.
 *
 * Reading the stylesheet cannot tell the broken case from the correct one,
 * because both say `position: fixed`. Portalling makes the mistake structurally
 * impossible instead of relying on nobody adding a blur to the header later.
 */
export default function Portal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return createPortal(children, document.body);
}
