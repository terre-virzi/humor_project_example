import { Playfair_Display, Space_Grotesk } from "next/font/google";
import { fetchImages } from "@/lib/services/images";
import type { ImageRow } from "@/lib/services/images";
import AuthBadge from "@/app/components/auth-badge";
import { createSupabaseServer } from "@/lib/supabase/server";

export const revalidate = 60;

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

const getDescription = (row: ImageRow) => {
  if (typeof row.image_description === "string" && row.image_description.trim().length > 0) {
    return row.image_description;
  }
  if (typeof row.additional_context === "string" && row.additional_context.trim().length > 0) {
    return row.additional_context;
  }
  if (typeof row.celebrity_recognition === "string" && row.celebrity_recognition.trim().length > 0) {
    return row.celebrity_recognition;
  }
  return "No description provided.";
};

const formatDateTime = (value?: string | null) => {
  if (!value) return "Unknown date";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
};

export default async function Home() {
  const { data: images, error, missingEnv } = await fetchImages();
  let userEmail: string | null = null;

  if (!missingEnv) {
    const supabase = createSupabaseServer();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    userEmail = user?.email ?? null;
  }

  if (missingEnv) {
    return (
      <main
        className={`${display.variable} ${body.variable} min-h-screen bg-[radial-gradient(circle_at_top,_#ffe0f2,_#ffd1ea_35%,_#f7a7d8_70%,_#f37dbd)] px-6 py-12 text-[#2d0f22]`}
      >
        <div className="mx-auto w-full max-w-3xl rounded-[32px] border border-white/60 bg-white/70 p-8 text-center shadow-[0_35px_80px_-40px_rgba(132,14,80,0.6)] backdrop-blur">
          <h1 className="font-[var(--font-display)] text-4xl font-bold tracking-tight">
            Funny People Club
          </h1>
          <p className="mt-4 font-[var(--font-body)] text-base text-[#5d1f48]">
            Missing Supabase environment variables. Set{" "}
            <span className="rounded-full bg-white/80 px-2 py-1 font-mono text-xs">
              SUPABASE_URL
            </span>{" "}
            and{" "}
            <span className="rounded-full bg-white/80 px-2 py-1 font-mono text-xs">
              SUPABASE_ANON_KEY
            </span>{" "}
            in Vercel (or
            <span className="ml-1 rounded-full bg-white/80 px-2 py-1 font-mono text-xs">
              .env.local
            </span>{" "}
            for local development).
          </p>
        </div>
      </main>
    );
  }

  return (
    <main
      className={`${display.variable} ${body.variable} min-h-screen bg-[radial-gradient(circle_at_top,_#ffe0f2,_#ffd1ea_35%,_#f7a7d8_70%,_#f37dbd)] px-6 py-12 text-[#2d0f22]`}
    >
      <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-10">
        <div className="pointer-events-none absolute -left-24 top-10 -z-20 h-64 w-64 rounded-full bg-[#ffb7e0]/60 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-32 -z-20 h-72 w-72 rounded-full bg-[#ffd4eb]/70 blur-3xl" />
        <div className="pointer-events-none absolute left-1/2 top-[55%] -z-20 h-80 w-80 -translate-x-1/2 rounded-full bg-[#ffa6d8]/40 blur-[120px]" />
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <span className="absolute left-[6%] top-[8%] h-6 w-6 rounded-full bg-white/70 shadow-[0_0_30px_rgba(255,255,255,0.6)]" />
          <span className="absolute left-[18%] top-[24%] h-3 w-8 rounded-full bg-[#ffc2e3]/80 rotate-6" />
          <span className="absolute left-[70%] top-[12%] h-4 w-4 rounded-full bg-[#ffd4eb]/80" />
          <span className="absolute left-[82%] top-[28%] h-2 w-10 rounded-full bg-[#ffa6d8]/80 -rotate-3" />
          <span className="absolute left-[12%] top-[60%] h-5 w-5 rounded-full bg-[#ffe6f3]/80" />
          <span className="absolute left-[32%] top-[72%] h-3 w-7 rounded-full bg-[#ffb8e0]/70 rotate-12" />
          <span className="absolute left-[78%] top-[68%] h-6 w-6 rounded-full bg-white/60" />
          <span className="absolute left-[56%] top-[82%] h-2 w-9 rounded-full bg-[#ffcde9]/80 -rotate-6" />
          <span className="absolute left-[46%] top-[40%] h-4 w-4 rounded-full bg-[#ffd4eb]/70" />
        </div>

        <header className="rounded-[32px] border border-white/70 bg-white/70 p-8 shadow-[0_35px_80px_-40px_rgba(132,14,80,0.6)] backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-[var(--font-body)] text-xs uppercase tracking-[0.3em] text-[#8a2c63]">
                The Humor Project
              </p>
              <h1 className="mt-3 font-[var(--font-display)] text-4xl font-bold tracking-tight">
                Gallery of Giggles
              </h1>
              <p className="mt-3 max-w-2xl font-[var(--font-body)] text-base text-[#5d1f48]">
                Each image is a potential punchline, waiting for its big laugh.
              </p>
            </div>
            <div className="flex flex-col items-end gap-3">
              <div className="rounded-full border border-white/80 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#7a2557] shadow-[0_16px_40px_-28px_rgba(132,14,80,0.6)]">
                Pink - Playful - Punchlines
              </div>
              <AuthBadge email={userEmail} />
            </div>
          </div>
        </header>

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-white/80 px-5 py-4 text-sm text-red-700 shadow-[0_20px_60px_-40px_rgba(132,14,80,0.5)]">
            Failed to load images: {error}
          </div>
        ) : images.length === 0 ? (
          <div className="rounded-2xl border border-white/70 bg-white/80 px-5 py-4 text-sm text-[#5d1f48] shadow-[0_20px_60px_-40px_rgba(132,14,80,0.5)]">
            No images found yet.
          </div>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2">
            {images.map((image) => (
              <li
                key={image.id ?? JSON.stringify(image)}
                className="group relative flex flex-col gap-4 rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-[0_30px_70px_-45px_rgba(132,14,80,0.6)] backdrop-blur transition hover:-translate-y-1 hover:shadow-[0_40px_90px_-50px_rgba(132,14,80,0.7)]"
              >
                <div className="pointer-events-none absolute inset-0 rounded-[28px] border border-transparent bg-gradient-to-br from-white/60 via-transparent to-[#ffc2e3]/60 opacity-0 transition duration-500 group-hover:opacity-100" />
                <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-[22px] bg-[#ffe7f4]">
                  {typeof image.url === "string" && image.url.trim().length > 0 ? (
                    <img
                      src={image.url}
                      alt={image.image_description ?? "Uploaded image"}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-[#7a2557]">
                      No image URL
                    </div>
                  )}
                  <details className="absolute right-3 top-3">
                    <summary className="cursor-pointer list-none rounded-full border border-white/80 bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#7a2557] shadow-[0_10px_24px_-18px_rgba(132,14,80,0.7)] transition hover:-translate-y-0.5">
                      Details
                    </summary>
                    <div className="mt-2 max-h-60 w-64 overflow-auto rounded-2xl border border-white/70 bg-white/90 p-4 text-xs text-[#5d1f48] shadow-[0_20px_60px_-40px_rgba(132,14,80,0.6)] backdrop-blur">
                      <p className="font-semibold text-[#7a2557]">Description</p>
                      <p className="mt-1">{image.image_description ?? "-"}</p>
                      <p className="mt-3 font-semibold text-[#7a2557]">Celebrity recognition</p>
                      <p className="mt-1">{image.celebrity_recognition ?? "-"}</p>
                      <p className="mt-3 font-semibold text-[#7a2557]">Additional context</p>
                      <p className="mt-1">{image.additional_context ?? "-"}</p>
                    </div>
                  </details>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#8a2c63]">
                    {image.is_public ? <span className="rounded-full bg-[#ffd4eb] px-3 py-1">Public</span> : null}
                    {image.is_common_use ? (
                      <span className="rounded-full bg-[#ffc0e1] px-3 py-1">Common use</span>
                    ) : null}
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs text-[#7a2557]">
                    {typeof image.id === "string" && image.id.trim().length > 0 ? (
                      <span>ID: {image.id}</span>
                    ) : null}
                    <span>Created: {formatDateTime(image.created_datetime_utc)}</span>
                    {typeof image.profile_id === "string" && image.profile_id.trim().length > 0 ? (
                      <span>Profile: {image.profile_id}</span>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        <footer className="rounded-[24px] border border-white/70 bg-white/70 px-6 py-5 text-center text-sm text-[#6a2250] shadow-[0_20px_60px_-40px_rgba(132,14,80,0.55)]">
          Built for laughs, powered by Supabase, dressed in pink.
        </footer>
      </div>
    </main>
  );
}
