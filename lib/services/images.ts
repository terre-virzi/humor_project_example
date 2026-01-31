import { createClient } from "@supabase/supabase-js";

export type ImageRow = {
  id?: string;
  created_datetime_utc?: string | null;
  modified_datetime_utc?: string | null;
  url?: string | null;
  is_common_use?: boolean | null;
  profile_id?: string | null;
  additional_context?: string | null;
  is_public?: boolean | null;
  image_description?: string | null;
  celebrity_recognition?: string | null;
  [key: string]: unknown;
};

type ImageFetchResult = {
  data: ImageRow[];
  error: string | null;
  missingEnv: boolean;
};

const getSupabaseEnv = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL ?? "";
  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY ?? "";

  return { url, anonKey };
};

export const fetchImages = async (limit = 100): Promise<ImageFetchResult> => {
  const { url, anonKey } = getSupabaseEnv();

  if (!url || !anonKey) {
    return { data: [], error: null, missingEnv: true };
  }

  const supabase = createClient(url, anonKey, {
    auth: { persistSession: false },
  });

  const { data, error } = await supabase
    .from("images")
    .select(
      "id,created_datetime_utc,modified_datetime_utc,url,is_common_use,profile_id,additional_context,is_public,image_description,celebrity_recognition"
    )
    .order("created_datetime_utc", { ascending: false })
    .limit(limit);

  return {
    data: (data ?? []) as ImageRow[],
    error: error ? error.message : null,
    missingEnv: false,
  };
};
