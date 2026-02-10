import { Playfair_Display, Space_Grotesk } from "next/font/google";
import LoginClient from "./login-client";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
});

const body = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

export default function LoginPage() {
  return (
    <main
      className={`${display.variable} ${body.variable} min-h-screen bg-[radial-gradient(circle_at_top,_#ffe0f2,_#ffd1ea_35%,_#f7a7d8_70%,_#f37dbd)] px-6 py-12 text-[#2d0f22]`}
    >
      <div className="relative mx-auto flex w-full max-w-3xl flex-col gap-10">
        <div className="pointer-events-none absolute -left-20 top-6 -z-20 h-64 w-64 rounded-full bg-[#ffb7e0]/60 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-24 -z-20 h-72 w-72 rounded-full bg-[#ffd4eb]/70 blur-3xl" />
        <div className="pointer-events-none absolute left-1/2 top-[60%] -z-20 h-80 w-80 -translate-x-1/2 rounded-full bg-[#ffa6d8]/40 blur-[120px]" />

        <header className="rounded-[32px] border border-white/70 bg-white/70 p-8 text-center shadow-[0_35px_80px_-40px_rgba(132,14,80,0.6)] backdrop-blur">
          <p className="font-[var(--font-body)] text-xs uppercase tracking-[0.35em] text-[#8a2c63]">
            The Humor Project
          </p>
          <h1 className="mt-4 font-[var(--font-display)] text-4xl font-bold tracking-tight">
            Welcome to the Giggle Gate
          </h1>
          <p className="mt-4 font-[var(--font-body)] text-base text-[#5d1f48]">
            This route is protected. Sign in with Google to unlock the Gallery of Giggles.
          </p>
        </header>

        <section className="rounded-[28px] border border-white/70 bg-white/80 p-8 text-center shadow-[0_30px_70px_-45px_rgba(132,14,80,0.6)] backdrop-blur">
          <p className="text-sm uppercase tracking-[0.3em] text-[#7a2557]">
            Gate Status: Locked
          </p>
          <LoginClient />
          <p className="mt-8 text-xs text-[#6a2250]">
            Redirect URI is locked to <span className="font-mono">/auth/callback</span>.
          </p>
        </section>
      </div>
    </main>
  );
}
