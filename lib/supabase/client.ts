import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseEnv } from "./env";

export const createSupabaseBrowser = () => {
  const { url, anonKey } = getSupabaseEnv();

  if (!url || !anonKey) {
    throw new Error("Missing Supabase environment variables.");
  }

  return createBrowserClient(url, anonKey);
};
