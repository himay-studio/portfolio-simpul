"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Portal from "./Portal";
import { CloseIcon } from "./Header";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { SITE } from "@/lib/site";

const KEY = "simpul.welcome.seen";

/**
 * R13, the welcome modal. Generated portfolio sites only.
 *
 * Contract, all of it load bearing:
 *  - copy opens `Selamat datang di himaystudio, kali ini kami sajikan website
 *    Simpul ...`
 *  - animates in and out, role=dialog + aria-modal, focus trapped while open
 *  - closes on the X button, on Escape, and on backdrop click
 *  - FULLY UNMOUNTED on close, so it can never leave an invisible layer
 *    trapping clicks. That is the HIM-93 scrim failure in modal form.
 *  - shown once per session per site, sessionStorage gated
 *
 * R52 and R53: portalled to document.body so no filtered ancestor can clip it,
 * and centred inside a scrolling scrim so at 375px it fits the viewport rather
 * than rendering as a narrow strip that overlays or pushes the topbar.
 */
export default function WelcomeModal() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {
      // private mode or storage disabled, treat as unseen and never throw
    }
    if (seen) return;
    const t = window.setTimeout(() => setOpen(true), 700);
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

  useFocusTrap(ref, open, close);

  // fully unmounted, not hidden
  if (!open) return null;

  return (
    <Portal>
      <div
        className="modal-scrim"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div
          className="modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="welcome-title"
          ref={ref}
          tabIndex={-1}
        >
          <button
            type="button"
            className="modal-close"
            onClick={close}
            aria-label="Tutup"
          >
            <CloseIcon />
          </button>

          <div className="modal-body">
            <span className="eyebrow">Portfolio Himay Studio</span>
            <h2 id="welcome-title" style={{ marginBottom: "var(--s-4)" }}>
              Selamat datang di himaystudio
            </h2>
            <p className="text-soft">
              Selamat datang di himaystudio, kali ini kami sajikan website{" "}
              {SITE.brand}, sebuah label scarf modest fiktif yang kami bangun
              sebagai contoh nyata. Semua halaman, katalog, keranjang, sampai
              dashboardnya berfungsi, jadi silakan diklik sepuasnya.
            </p>
            <p className="text-soft mt-4">
              Kalau kamu suka dengan hasilnya dan mau website seperti ini untuk
              bisnismu, tinggal hubungi kami.
            </p>

            <div className="row mt-6">
              <button type="button" className="btn btn-outline" onClick={close}>
                Lihat websitenya
              </button>
              <Link
                href="/katalog/"
                className="btn btn-light"
                onClick={close}
              >
                Langsung ke katalog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
}
