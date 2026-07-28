"use client";

import { useCallback, useEffect, useState } from "react";
import Portal from "./Portal";
import { CloseIcon } from "./Header";
import { waLink, waAnchorProps } from "@/lib/wa";

const KEY = "simpul.pcta.dismissed";

/**
 * R37, the floating portfolio CTA.
 *
 * A portfolio subdomain is not a passive showcase. Every visitor here is a
 * prospective Himay client, not a customer of the fictional brand, so the
 * banner converts them through the R14 waLink() helper.
 *
 * Contract:
 *  - ONE appearance per browser session, sessionStorage gated
 *  - FULLY UNMOUNTS on close, leaving no invisible click blocking layer
 *  - dismissable via the X button AND Escape, keyboard accessible
 *  - animates in, and obeys prefers-reduced-motion through site.css
 *  - never collides with the R10/R17 WhatsApp float: this sits bottom LEFT on
 *    desktop, and above the 56px oval on mobile. See the collision map in
 *    LAYOUT-ARCHITECTURE.md section 10.
 *
 * Deliberately NOT focus trapped. It is a non modal region, not a dialog, so
 * trapping focus in it would hijack the page for a banner.
 */
export default function PortfolioCta() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(KEY) === "1";
    } catch {
      /* no-op */
    }
    if (dismissed) return;
    // appears after the welcome modal has had its moment
    const t = window.setTimeout(() => setOpen(true), 9000);
    return () => window.clearTimeout(t);
  }, []);

  const close = useCallback(() => {
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* no-op */
    }
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  if (!open) return null;

  return (
    <Portal>
      <aside
        className="pcta"
        role="region"
        aria-label="Tawaran dari Himay Studio"
      >
        <button
          type="button"
          className="pcta-close"
          onClick={close}
          aria-label="Tutup tawaran"
        >
          <CloseIcon />
        </button>

        <span className="pcta-title">Looking for a website like this?</span>
        <span className="pcta-sub">
          Website ini dibangun oleh Himay Studio. Kami bisa bikinkan yang serupa
          untuk bisnismu.
        </span>

        <a
          className="btn btn-primary btn-block mt-4"
          href={waLink("konsultasi pembuatan website portfolio")}
          {...waAnchorProps}
        >
          Build Yours with Himay Studio
        </a>
      </aside>
    </Portal>
  );
}
