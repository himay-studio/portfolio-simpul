"use client";

import { usePathname } from "next/navigation";

/**
 * R46, animated page transitions.
 *
 * Keying the wrapper on the pathname remounts it on every route change, which
 * restarts the `page-enter` animation in site.css. That is a 220ms cross fade
 * plus a 6px rise, short enough not to delay first contentful paint or block
 * interaction, and it works under static export with no router hooks beyond
 * `usePathname`.
 *
 * `prefers-reduced-motion` disables the animation in site.css rather than here,
 * so a reduced motion visitor still gets the content instantly.
 */
export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-shell">
      {children}
    </div>
  );
}
