"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PageHero from "@/components/PageHero";
import { DEMO_CREDENTIALS, useDemoAuth } from "@/lib/useDemoAuth";

/**
 * R8 login demo. This really signs the demo session in, it is not a WhatsApp
 * redirect, because the working login IS the thing being demonstrated.
 */
export default function MasukPage() {
  const router = useRouter();
  const { user, signIn, signOut } = useDemoAuth();

  const [email, setEmail] = useState(DEMO_CREDENTIALS.email);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Email dan kata sandi wajib diisi.");
      return;
    }
    if (
      email.trim().toLowerCase() !== DEMO_CREDENTIALS.email ||
      password !== DEMO_CREDENTIALS.password
    ) {
      setError(
        "Email atau kata sandi belum cocok. Pakai kredensial demo yang tertulis di sebelah kanan.",
      );
      return;
    }

    setBusy(true);
    window.setTimeout(() => {
      signIn({ name: "Nadia Rahmawati", email: email.trim(), role: "pembeli" });
      router.push("/akun/");
    }, 700);
  };

  return (
    <>
      <PageHero
        crumbs={[{ href: "/", label: "Beranda" }, { label: "Masuk" }]}
        eyebrow="Akun"
        title="Masuk ke akunmu"
        note="Lihat riwayat pesanan, alamat tersimpan, dan status pengiriman. Ini demo, jadi kredensialnya kami tulis terbuka di halaman ini."
      />

      <section className="section">
        <div className="wrap">
          <div className="grid cols-2" style={{ gap: "var(--s-8)", alignItems: "start" }}>
            {user ? (
              <div className="card card-pad" style={{ padding: "var(--s-7)" }}>
                <div className="stack-label">
                  <span className="sl-title" style={{ fontSize: "var(--t-h2)" }}>
                    Kamu sudah masuk
                  </span>
                  <span className="sl-meta" style={{ fontSize: "var(--t-body-l)" }}>
                    Sebagai {user.name}, {user.email}.
                  </span>
                </div>
                <div className="row mt-6">
                  <Link href="/akun/" className="btn btn-primary">
                    Buka akun saya
                  </Link>
                  <Link href="/dashboard/" className="btn btn-outline">
                    Buka dashboard
                  </Link>
                  <button type="button" className="btn btn-light" onClick={signOut}>
                    Keluar
                  </button>
                </div>
              </div>
            ) : (
              <form
                className="card card-pad"
                style={{ padding: "var(--s-7)" }}
                onSubmit={submit}
                noValidate
              >
                <div className="stack">
                  {/* R19: visible label above, visible placeholder inside */}
                  <div className="field">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      className="input"
                      type="email"
                      placeholder="nama@contoh.id"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="password">Kata sandi</label>
                    <input
                      id="password"
                      className="input"
                      type="password"
                      placeholder="Masukkan kata sandi"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                    />
                  </div>

                  {error && (
                    <p className="form-error" role="alert">
                      {error}
                    </p>
                  )}

                  <button type="submit" className="btn btn-primary btn-block" disabled={busy}>
                    {busy ? "Sedang masuk" : "Masuk"}
                  </button>

                  <p className="text-small text-soft">
                    Belum punya akun? Pesanan pertamamu otomatis membuatkan satu.
                  </p>
                </div>
              </form>
            )}

            <div className="card card-pad" style={{ background: "var(--tint)", borderColor: "var(--brand)" }}>
              <span className="eyebrow">Kredensial demo</span>
              <div className="stack-label mt-4">
                <span className="sl-title">Email</span>
                <span className="sl-meta" style={{ fontFamily: "monospace" }}>
                  {DEMO_CREDENTIALS.email}
                </span>
              </div>
              <div className="stack-label mt-5">
                <span className="sl-title">Kata sandi</span>
                <span className="sl-meta" style={{ fontFamily: "monospace" }}>
                  {DEMO_CREDENTIALS.password}
                </span>
              </div>
              <p className="text-small text-soft mt-6">
                Website ini adalah contoh portofolio, jadi tidak ada data
                sungguhan di baliknya. Sesi disimpan di browsermu sendiri dan
                hilang begitu kamu menekan keluar.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
