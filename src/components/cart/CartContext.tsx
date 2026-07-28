"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { PRODUCTS } from "@/data/products";

/**
 * Demo cart. localStorage backed, no server.
 *
 * R42 shows up in the line item shape: a line is identified by
 * `slug + colourway`, not by a per colour product slug. Colour is a variant
 * dimension inside one product, so two colourways of the same model are two
 * lines of the SAME product, and the product name is constant across both.
 */

export type CartLine = {
  slug: string;
  colour: string;
  sku: string;
  qty: number;
};

export type Order = {
  id: string;
  createdAt: string;
  name: string;
  lines: CartLine[];
  total: number;
  status: "Diproses" | "Dikirim" | "Selesai";
  courier: string;
  address: string;
};

type Ctx = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  add: (line: Omit<CartLine, "qty">, qty?: number) => void;
  setQty: (slug: string, colour: string, qty: number) => void;
  remove: (slug: string, colour: string) => void;
  clear: () => void;
  orders: Order[];
  placeOrder: (o: Omit<Order, "id" | "createdAt" | "status">) => Order;
  hydrated: boolean;
};

const CartCtx = createContext<Ctx | null>(null);

const LINES_KEY = "simpul.cart.v1";
const ORDERS_KEY = "simpul.orders.v1";

const priceOf = (slug: string): number =>
  PRODUCTS.find((p) => p.slug === slug)?.price ?? 0;

/** seeded so the R8 dashboard and customer portal have something to show */
const SEED_ORDERS: Order[] = [
  {
    id: "SMP-2451",
    createdAt: "2026-07-24T09:14:00+07:00",
    name: "Nadia Rahmawati",
    lines: [
      { slug: "pashmina-alun-voal", colour: "Krem Susu", sku: "SMP-PAV-KRS", qty: 2 },
      { slug: "inner-ninja-antem", colour: "Hitam Pekat", sku: "SMP-INA-HTM", qty: 1 },
    ],
    total: 213000,
    status: "Dikirim",
    courier: "JNE Reguler",
    address: "Bekasi Selatan, Jawa Barat",
  },
  {
    id: "SMP-2438",
    createdAt: "2026-07-19T16:02:00+07:00",
    name: "Nadia Rahmawati",
    lines: [
      { slug: "pashmina-bilah-diamond", colour: "Taro", sku: "SMP-PBD-TAR", qty: 1 },
    ],
    total: 95000,
    status: "Selesai",
    courier: "SiCepat Halu",
    address: "Bekasi Selatan, Jawa Barat",
  },
  {
    id: "SMP-2402",
    createdAt: "2026-07-11T11:40:00+07:00",
    name: "Nadia Rahmawati",
    lines: [
      { slug: "segi-empat-titik-voal", colour: "Zaitun", sku: "SMP-STV-ZTN", qty: 3 },
      { slug: "pouch-kanvas", colour: "Krem", sku: "SMP-PKV-KRM", qty: 1 },
    ],
    total: 366000,
    status: "Selesai",
    courier: "JNE Reguler",
    address: "Bekasi Selatan, Jawa Barat",
  },
];

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [orders, setOrders] = useState<Order[]>(SEED_ORDERS);
  const [cartOpen, setCartOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // read once on mount, so SSG output and first client paint agree
  useEffect(() => {
    try {
      const rawLines = localStorage.getItem(LINES_KEY);
      if (rawLines) setLines(JSON.parse(rawLines));
      const rawOrders = localStorage.getItem(ORDERS_KEY);
      if (rawOrders) setOrders(JSON.parse(rawOrders));
    } catch {
      /* corrupted or unavailable storage falls back to the seed */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(LINES_KEY, JSON.stringify(lines));
    } catch {
      /* no-op */
    }
  }, [lines, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    } catch {
      /* no-op */
    }
  }, [orders, hydrated]);

  const add: Ctx["add"] = useCallback((line, qty = 1) => {
    setLines((prev) => {
      const i = prev.findIndex(
        (l) => l.slug === line.slug && l.colour === line.colour,
      );
      if (i === -1) return [...prev, { ...line, qty }];
      const next = [...prev];
      next[i] = { ...next[i], qty: next[i].qty + qty };
      return next;
    });
    setCartOpen(true);
  }, []);

  const setQty: Ctx["setQty"] = useCallback((slug, colour, qty) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => !(l.slug === slug && l.colour === colour))
        : prev.map((l) =>
            l.slug === slug && l.colour === colour ? { ...l, qty } : l,
          ),
    );
  }, []);

  const remove: Ctx["remove"] = useCallback((slug, colour) => {
    setLines((prev) => prev.filter((l) => !(l.slug === slug && l.colour === colour)));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const placeOrder: Ctx["placeOrder"] = useCallback((o) => {
    const order: Order = {
      ...o,
      id: `SMP-${2460 + Math.floor(Math.random() * 400)}`,
      createdAt: new Date().toISOString(),
      status: "Diproses",
    };
    setOrders((prev) => [order, ...prev]);
    setLines([]);
    return order;
  }, []);

  const count = useMemo(() => lines.reduce((n, l) => n + l.qty, 0), [lines]);
  const subtotal = useMemo(
    () => lines.reduce((n, l) => n + priceOf(l.slug) * l.qty, 0),
    [lines],
  );

  const value = useMemo<Ctx>(
    () => ({
      lines,
      count,
      subtotal,
      cartOpen,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      add,
      setQty,
      remove,
      clear,
      orders,
      placeOrder,
      hydrated,
    }),
    [lines, count, subtotal, cartOpen, add, setQty, remove, clear, orders, placeOrder, hydrated],
  );

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart(): Ctx {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
