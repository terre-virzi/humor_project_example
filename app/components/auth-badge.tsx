"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { createSupabaseBrowser } from "@/lib/supabase/client";

type AuthBadgeProps = {
  email?: string | null;
};

export default function AuthBadge({ email }: AuthBadgeProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSignOut = async () => {
    const supabase = createSupabaseBrowser();
    await supabase.auth.signOut();
    startTransition(() => {
      router.refresh();
      router.push("/login");
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="rounded-full border border-white/80 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#7a2557] shadow-[0_16px_40px_-28px_rgba(132,14,80,0.6)]">
        {email ? `Signed in as ${email}` : "Signed in"}
      </div>
      <button
        type="button"
        onClick={handleSignOut}
        disabled={isPending}
        className="rounded-full border border-[#7a2557]/30 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#7a2557] shadow-[0_16px_40px_-28px_rgba(132,14,80,0.5)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPending ? "Signing out…" : "Sign out"}
      </button>
    </div>
  );
}
