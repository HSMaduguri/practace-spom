import { createClient, type SupabaseClient, type User } from '@supabase/supabase-js';

export interface AppUser {
  id: string;
  email: string;
  displayName: string;
  photoURL: string;
}

export type ProgressSection = 'practice' | 'flashcards' | 'notes';

function isValidSupabaseUrl(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  const trimmed = value.trim();
  if (!trimmed || trimmed.includes('YOUR_') || trimmed.includes('example')) {
    return false;
  }
  return (
    trimmed.startsWith('https://') ||
    trimmed.startsWith('http://localhost') ||
    trimmed.startsWith('http://127.0.0.1')
  );
}

function isValidSupabaseKey(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length < 20 || trimmed.includes('YOUR_')) {
    return false;
  }
  return true;
}

const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const rawKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabaseUrl = isValidSupabaseUrl(rawUrl) ? rawUrl.trim() : null;
export const supabaseKey = isValidSupabaseKey(rawKey) ? rawKey.trim() : null;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

export const supabase: SupabaseClient | null =
  isSupabaseConfigured && supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      })
    : null;

export function toAppUser(user: User): AppUser {
  const meta = user.user_metadata ?? {};
  const displayName =
    (typeof meta.full_name === 'string' && meta.full_name.trim()) ||
    (typeof meta.name === 'string' && meta.name.trim()) ||
    (typeof meta.display_name === 'string' && meta.display_name.trim()) ||
    '';
  const photoURL =
    (typeof meta.avatar_url === 'string' && meta.avatar_url.trim()) ||
    (typeof meta.picture === 'string' && meta.picture.trim()) ||
    '';

  return {
    id: user.id,
    email: user.email || '',
    displayName,
    photoURL,
  };
}
