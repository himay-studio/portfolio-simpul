"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { NAV, SECONDARY_NAV, type NavItem } from "@/data/nav";
import { SITE } from "@/lib/site";
import { waLink, waAnchorProps } from "@/lib/wa";
import { useCart } from "./cart/CartContext";
import Portal from "./Portal";
import { useFocusTrap } from "@/lib/useFocusTrap";

const DESKTOP = "(min-width: 1025px)";

export default function Header() {
  const pathname = usePathname();
  const { count, openCart } = useCart();

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const navRef = useRef<HTMLElement | null>(null);
  const closeTimer = useRef<number | null>(null);

  /* R32: hover opens on desktop only. Below 1025px there is no mega menu at
     all, the nav collapses into the drawer, so hover must not fire there. */
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP);
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  /* every route change closes both layers, so navigating from inside a panel
     never leaves it hanging open over the new page */
  useEffect(() => {
    setOpenIndex(null);
    setDrawerOpen(false);
  }, [pathname]);

  /* R16: outside click and Escape close the panel. Hover is ADDED by R32,
     click / focus / keyboard are not removed. */
  useEffect(() => {
    if (openIndex === null) return;

    const onDocDown = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenIndex(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenIndex(null);
      navRef.current
        ?.querySelectorAll<HTMLButtonElement>("button.nav-link")
        ?.[openIndex]?.focus();
    };

    document.addEventListener("mousedown", onDocDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [openIndex]);

  const cancelClose = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const hoverOpen = (i: number) => {
    if (!isDesktop) return;
    cancelClose();
    setOpenIndex(i);
  };

  /* a small grace period so the pointer can cross the 1px gap between the
     trigger and the panel without the panel snapping shut */
  const hoverClose = () => {
    if (!isDesktop) return;
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpenIndex(null), 120);
  };

  const onTriggerKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key === "ArrowDown" || e.key === " " || e.key === "Enter") {
      e.preventDefault();
      setOpenIndex(i);
      // hand focus to the first link inside the panel
      window.requestAnimationFrame(() => {
        const item = navRef.current?.querySelectorAll(".nav-item")[i];
        item?.querySelector<HTMLAnchorElement>(".mega-link")?.focus();
      });
    }
  };

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, ""));

  return (
    <>
      {/* announcement bar sits ABOVE the sticky header so it scrolls away and
          never stacks on top of the topbar at 375px. R52. */}
      <div className="announce">
        <div className="wrap announce-inner">
          <span>Gratis ongkir untuk pesanan di atas Rp 250.000, se Indonesia.</span>
        </div>
      </div>

      {/* R31: solid ivory from first paint, at zero scroll, never transparent
          over the hero in any state. Locked in DESIGN.md section 6.
          R53: deliberately NO backdrop-filter here. A filtered header becomes
          the containing block for any position:fixed descendant. */}
      <header className="site-header">
        <div className="wrap header-inner">
          <Link href="/" className="brand-lock" aria-label={`${SITE.brand}, beranda`}>
            <img
              src="/img/logo-simpul-mark.png"
              alt=""
              width={36}
              height={36}
              aria-hidden="true"
            />
            {/* R50: wordmark and tagline are two BLOCK children of a flex
                column with a gap. An inline <small> here renders as
                "SIMPULLABEL SCARF MODEST", measured on Mabrur. */}
            <span className="brand-text">
              <span className="brand-word">{SITE.wordmark}</span>
              <span className="brand-tag">Label scarf modest</span>
            </span>
          </Link>

          <nav className="nav-desktop" aria-label="Navigasi utama" ref={navRef}>
            <ul className="nav-list">
              {NAV.map((item, i) => (
                <NavListItem
                  key={item.label}
                  item={item}
                  index={i}
                  open={openIndex === i}
                  current={isCurrent(item.href)}
                  onHoverOpen={() => hoverOpen(i)}
                  onHoverClose={hoverClose}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                  onTriggerKey={(e) => onTriggerKey(e, i)}
                />
              ))}
            </ul>
          </nav>

          <div className="header-actions">
            <Link href="/lacak/" className="icon-btn" aria-label="Lacak pesanan">
              <TruckIcon />
            </Link>

            <button
              type="button"
              className="icon-btn"
              onClick={openCart}
              aria-label={`Keranjang, ${count} barang`}
            >
              <BagIcon />
              {count > 0 && (
                <span className="cart-count" aria-hidden="true">
                  {count}
                </span>
              )}
            </button>

            {/* R14: a sales CTA, so it routes to Himay's WhatsApp.
                R47: hidden below 1025px, it lives in the drawer instead. */}
            <a
              className="btn btn-primary btn-sm header-cta"
              href={waLink("koleksi hijab Simpul")}
              {...waAnchorProps}
            >
              Pesan sekarang
            </a>

            <button
              type="button"
              className="icon-btn burger"
              aria-label={drawerOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={drawerOpen}
              aria-controls="menu-drawer"
              onClick={() => setDrawerOpen((v) => !v)}
            >
              <span className="burger-bars" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* R53: the drawer is portalled to document.body, a SIBLING of <header>,
          never a descendant. Nested inside a filtered header it would collapse
          to the header's own height and read as a narrow strip. */}
      {drawerOpen && (
        <MenuDrawer onClose={() => setDrawerOpen(false)} isCurrent={isCurrent} />
      )}
    </>
  );
}

/* -------------------------------------------------------------- nav item */

function NavListItem({
  item,
  index,
  open,
  current,
  onHoverOpen,
  onHoverClose,
  onToggle,
  onTriggerKey,
}: {
  item: NavItem;
  index: number;
  open: boolean;
  current: boolean;
  onHoverOpen: () => void;
  onHoverClose: () => void;
  onToggle: () => void;
  onTriggerKey: (e: React.KeyboardEvent) => void;
}) {
  const panelId = `mega-${index}`;

  if (!item.columns) {
    return (
      <li className="nav-item">
        <Link
          href={item.href}
          className={`nav-link${current ? " is-active" : ""}`}
          aria-current={current ? "page" : undefined}
        >
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li
      className="nav-item"
      data-open={open}
      onMouseEnter={onHoverOpen}
      onMouseLeave={onHoverClose}
      onFocus={onHoverOpen}
    >
      <button
        type="button"
        className={`nav-link${current ? " is-active" : ""}`}
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="true"
        onClick={onToggle}
        onKeyDown={onTriggerKey}
      >
        {item.label}
        <span className="nav-chev" aria-hidden="true" />
      </button>

      {/* R16.1 + R57: anchored away from the nearer viewport edge, clamped to
          calc(100vw - 2rem), and display:none when closed so a shut panel
          cannot widen document.scrollWidth. */}
      <div
        id={panelId}
        className="mega"
        data-anchor={item.anchor ?? "left"}
        role="menu"
        aria-label={item.label}
        style={
          {
            "--mega-cols": String(item.columns.length),
          } as React.CSSProperties
        }
      >
        <div className="row" style={{ alignItems: "flex-start", gap: "var(--s-7)" }}>
          <div className="mega-cols">
            {item.columns.map((col) => (
              <div key={col.heading}>
                <span className="mega-col-head">{col.heading}</span>
                <ul className="mega-list">
                  {col.links.map((l) => (
                    <li key={l.href + l.title}>
                      <Link href={l.href} className="mega-link" role="menuitem">
                        <span className="mt">{l.title}</span>
                        <span className="md">{l.meta}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {item.aside && (
            <div className="mega-aside">
              <span className="mega-col-head">{item.aside.heading}</span>
              <p className="text-small text-soft">{item.aside.body}</p>
              <Link
                href={item.aside.cta.href}
                className="link-underline text-small"
                role="menuitem"
              >
                {item.aside.cta.label}
              </Link>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

/* ---------------------------------------------------------------- drawer */

function MenuDrawer({
  onClose,
  isCurrent,
}: {
  onClose: () => void;
  isCurrent: (href: string) => boolean;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [openGroup, setOpenGroup] = useState<string | null>("Katalog");

  const close = useCallback(() => onClose(), [onClose]);
  useFocusTrap(panelRef, true, close);

  return (
    <Portal>
      <div className="drawer-scrim" onClick={close} aria-hidden="true" />
      <div
        id="menu-drawer"
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigasi"
        ref={panelRef}
      >
        <div className="drawer-head">
          <span className="brand-text">
            <span className="brand-word">{SITE.wordmark}</span>
            <span className="brand-tag">Label scarf modest</span>
          </span>
          <button
            type="button"
            className="icon-btn"
            onClick={close}
            aria-label="Tutup menu"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="drawer-body">
          {NAV.map((item) =>
            item.columns ? (
              <div key={item.label}>
                <button
                  type="button"
                  className="drawer-link"
                  style={{ width: "100%", textAlign: "left", background: "none", border: 0, borderBottom: "1px solid var(--line)", cursor: "pointer" }}
                  aria-expanded={openGroup === item.label}
                  onClick={() =>
                    setOpenGroup(openGroup === item.label ? null : item.label)
                  }
                >
                  <span className="mt">{item.label}</span>
                  <span className="md">
                    {openGroup === item.label ? "Tutup daftar" : "Lihat daftar"}
                  </span>
                </button>
                <div className="drawer-group" data-open={openGroup === item.label}>
                  <div>
                    <div className="drawer-sub">
                      {item.columns.flatMap((c) => c.links).map((l) => (
                        <Link
                          key={l.href + l.title}
                          href={l.href}
                          className="drawer-link"
                          onClick={close}
                        >
                          <span className="mt" style={{ fontSize: "var(--t-body)" }}>
                            {l.title}
                          </span>
                          <span className="md">{l.meta}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="drawer-link"
                aria-current={isCurrent(item.href) ? "page" : undefined}
                onClick={close}
              >
                <span className="mt">{item.label}</span>
                <span className="md">
                  {item.label === "Artikel"
                    ? "Tutorial dan panduan bahan"
                    : "Cerita dan standar bahan"}
                </span>
              </Link>
            ),
          )}

          {SECONDARY_NAV.map((l) => (
            <Link key={l.href} href={l.href} className="drawer-link" onClick={close}>
              <span className="mt">{l.title}</span>
              <span className="md">{l.meta}</span>
            </Link>
          ))}

          {/* R22 / R47: the topbar CTA does not render as a cramped box on
              mobile, it moves here with its full label and tap target. */}
          <a
            className="btn btn-primary btn-block mt-5"
            href={waLink("koleksi hijab Simpul")}
            {...waAnchorProps}
          >
            Pesan sekarang lewat WhatsApp
          </a>
        </div>
      </div>
    </Portal>
  );
}

/* ----------------------------------------------------------------- icons */

function BagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 7h16l-1.2 13H5.2L4 7Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M8.5 9V6a3.5 3.5 0 0 1 7 0v3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2 6h11v10H2V6Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M13 9h4.5L21 12.5V16h-8V9Z" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="7" cy="18" r="1.8" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.5" cy="18" r="1.8" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
