"use client";

import { useState } from "react";
import { createSupabaseBrowser } from "@/lib/supabase/client";

export default function LoginClient() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      const supabase = createSupabaseBrowser();
      const origin = window.location.origin;
      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${origin}/auth/callback`,
        },
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to start sign-in.");
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 flex flex-col items-center gap-4">
      <button
        type="button"
        onClick={handleSignIn}
        disabled={loading}
        className="rounded-full bg-[#2d0f22] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-[0_18px_40px_-20px_rgba(45,15,34,0.7)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Opening Google…" : "Sign in with Google"}
      </button>
      <p className="text-xs uppercase tracking-[0.35em] text-[#8a2c63]">
        Members-only lounge
      </p>
      {error ? (
        <p className="rounded-2xl border border-red-200 bg-white/80 px-4 py-2 text-xs text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
