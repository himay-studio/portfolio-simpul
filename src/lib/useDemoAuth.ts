"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "simpul.session.v1";

export type DemoUser = { name: string; email: string; role: "pembeli" | "admin" };

export const DEMO_CREDENTIALS = {
  email: "nadia@contoh.id",
  password: "simpul2026",
};

/**
 * The R8 demo session.
 *
 * R14 scope note: login, the dashboard, and the customer portal are the
 * FEATURE being demonstrated, not sales CTAs, so they stay fully functional
 * and are never rewritten into WhatsApp links. `Masuk` really signs the
 * session in, the dashboard really reads the demo store, and `/akun` really
 * lists what checkout wrote.
 *
 * localStorage backed, no server, and every storage access is wrapped so a
 * browser with storage disabled degrades to signed out rather than throwing.
 */
export function useDemoAuth() {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      /* signed out is the safe fallback */
    }
    setReady(true);
  }, []);

  const signIn = useCallback((u: DemoUser) => {
    setUser(u);
    try {
      localStorage.setItem(KEY, JSON.stringify(u));
    } catch {
      /* no-op */
    }
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(KEY);
    } catch {
      /* no-op */
    }
  }, []);

  return { user, ready, signIn, signOut };
}
