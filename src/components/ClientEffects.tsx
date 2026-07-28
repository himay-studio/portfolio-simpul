"use client";

import { useEffect } from "react";

/**
 * R24 + R34, the scroll reveal system.
 *
 * Cloned from `portfolio-kilau` post HIM-169, NOT from MilkyBreeze. The
 * MilkyBreeze reference still runs a mount-only scan that observes `<section>`
 * nodes present at mount, so a 1:1 clone of it reintroduces the bug where any
 * node inserted AFTER mount lands at opacity:0 forever and never receives
 * `.in`. That is how `/lacak/?id=...` rendered a blank result card on Kilau.
 *
 * Two observers, both required:
 *   - IntersectionObserver reveals `.reveal` nodes as they scroll into view.
 *   - MutationObserver on document.body catches nodes inserted after mount
 *     (deep link results, form submit results, tab and accordion panel swaps,
 *     async and paginated loads) and either reveals them immediately if they
 *     are already on screen, or hands them to the IntersectionObserver.
 *
 * The `prefers-reduced-motion` branch mirrors the same late-node handling, so
 * a reduced-motion visitor never ends up with permanently hidden content.
 *
 * The CSS half of the contract lives in `site.css`:
 *   `.reveal.in, .js .reveal.in { opacity:1; transform:none }`  (0,3,0)
 * written at strictly higher specificity than any hide rule, and there is
 * deliberately no `.js .reveal { opacity:0 }` twin. R34.
 */
export default function ClientEffects() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");

    // current year, wherever a footer or a policy page needs it
    document.querySelectorAll<HTMLElement>("[data-year]").forEach((el) => {
      el.textContent = String(new Date().getFullYear());
    });

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const revealNow = (el: Element) => el.classList.add("in");

    // ---- reduced motion: reveal everything, including late nodes ----
    if (reduce) {
      document.querySelectorAll(".reveal").forEach(revealNow);

      const mo = new MutationObserver((records) => {
        for (const rec of records) {
          rec.addedNodes.forEach((node) => {
            if (!(node instanceof Element)) return;
            if (node.classList.contains("reveal")) revealNow(node);
            node.querySelectorAll?.(".reveal").forEach(revealNow);
          });
        }
      });
      mo.observe(document.body, { childList: true, subtree: true });
      return () => mo.disconnect();
    }

    // ---- normal motion ----
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );

    /**
     * A node inserted after mount may already be sitting inside the viewport,
     * in which case waiting for an intersection change would never fire.
     * Reveal it immediately, otherwise observe it for scroll-in.
     */
    const track = (el: Element) => {
      if (el.classList.contains("in")) return;
      const rect = el.getBoundingClientRect();
      const onScreen =
        rect.top < window.innerHeight && rect.bottom > 0 && rect.height > 0;
      if (onScreen) revealNow(el);
      else io.observe(el);
    };

    document.querySelectorAll(".reveal").forEach(track);

    const mo = new MutationObserver((records) => {
      for (const rec of records) {
        rec.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.classList.contains("reveal")) track(node);
          node.querySelectorAll?.(".reveal").forEach(track);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
