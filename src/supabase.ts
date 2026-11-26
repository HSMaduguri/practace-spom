import { createClient, type Session, type SupabaseClient, type User } from '@supabase/supabase-js';

export interface AppUser {
  id: string;
  email: string;
  displayName: string;
  photoURL: string;
}

export type ProgressSection = 'practice' | 'flashcards' | 'notes';

const RECOVERY_STORAGE_KEY = 'practace_password_recovery_active';
const COMPLETED_RECOVERY_TS_KEY = 'practace_completed_recovery_ts';
const INITIAL_AUTH_ERROR_KEY = 'practace_initial_auth_error';

export interface InitialUrlAuthSnapshot {
  isRecovery: boolean;
  tokenHash: string | null;
  verifyType: string | null;
  errorDescription: string | null;
  errorCode: string | null;
}

/**
 * Capture URL hash & query parameters synchronously at module load time BEFORE
 * GoTrueClient.initialize() parses and clears window.location.hash.
 */
function captureUrlAuthSnapshot(): InitialUrlAuthSnapshot {
  if (typeof window === 'undefined') {
    return {
      isRecovery: false,
      tokenHash: null,
      verifyType: null,
      errorDescription: null,
      errorCode: null,
    };
  }

  const rawHash = window.location.hash ? window.location.hash.replace(/^#/, '') : '';
  const hashParams = new URLSearchParams(rawHash);
  const searchParams = new URLSearchParams(window.location.search);

  const typeParam = hashParams.get('type') || searchParams.get('type');
  const tokenHash = searchParams.get('token_hash') || hashParams.get('token_hash');
  const errorCode = hashParams.get('error_code') || searchParams.get('error_code');
  const rawErrorDesc =
    hashParams.get('error_description') ||
    searchParams.get('error_description') ||
    hashParams.get('error') ||
    searchParams.get('error');

  const errorDescription = rawErrorDesc ? rawErrorDesc.replace(/\+/g, ' ').trim() : null;
  const isRecoveryUrl = typeParam === 'recovery';

  try {
    if (isRecoveryUrl) {
      sessionStorage.setItem(RECOVERY_STORAGE_KEY, 'true');
    }
    if (errorDescription) {
      sessionStorage.setItem(INITIAL_AUTH_ERROR_KEY, errorDescription);
    }
  } catch {
    // ignore sessionStorage restrictions
  }

  const persistedRecovery = (() => {
    try {
      return sessionStorage.getItem(RECOVERY_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  })();

  const persistedError = (() => {
    try {
      return sessionStorage.getItem(INITIAL_AUTH_ERROR_KEY);
    } catch {
      return null;
    }
  })();

  return {
    isRecovery: isRecoveryUrl || persistedRecovery,
    tokenHash,
    verifyType: typeParam,
    errorDescription: errorDescription || persistedError,
    errorCode,
  };
}

export const initialUrlAuthSnapshot: InitialUrlAuthSnapshot = captureUrlAuthSnapshot();

export function setPasswordRecoveryActive(active: boolean, completedSession?: Session | null): void {
  try {
    if (active) {
      sessionStorage.setItem(RECOVERY_STORAGE_KEY, 'true');
    } else {
      sessionStorage.removeItem(RECOVERY_STORAGE_KEY);
      const recoveryTs = getSessionRecoveryTimestamp(completedSession);
      if (recoveryTs) {
        sessionStorage.setItem(COMPLETED_RECOVERY_TS_KEY, String(recoveryTs));
      }
    }
  } catch {
    // ignore storage errors
  }
}

export function clearInitialAuthError(): void {
  try {
    sessionStorage.removeItem(INITIAL_AUTH_ERROR_KEY);
  } catch {
    // ignore storage errors
  }
}

/**
 * Inspects a Supabase session's JWT access_token `amr` (Authentication Methods Reference)
 * claim to detect if the current session was authenticated via a password recovery link.
 */
export function getSessionRecoveryTimestamp(session: Session | null | undefined): number | null {
  if (!session?.access_token) return null;
  try {
    const parts = session.access_token.split('.');
    if (parts.length < 2) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
    const payload = JSON.parse(atob(padded));
    if (Array.isArray(payload?.amr)) {
      const recoveryEntry = payload.amr.find(
        (item: any) => item && item.method === 'recovery'
      );
      if (recoveryEntry) {
        return typeof recoveryEntry.timestamp === 'number' ? recoveryEntry.timestamp : 1;
      }
    }
  } catch {
    // ignore malformed JWT payload
  }
  return null;
}

export function isRecoverySession(session: Session | null | undefined): boolean {
  try {
    if (sessionStorage.getItem(RECOVERY_STORAGE_KEY) === 'true') {
      return true;
    }
  } catch {
    // ignore
  }
  const recoveryTs = getSessionRecoveryTimestamp(session);
  if (!recoveryTs) return false;
  try {
    const completedTs = sessionStorage.getItem(COMPLETED_RECOVERY_TS_KEY);
    if (completedTs && Number(completedTs) >= recoveryTs) {
      return false;
    }
  } catch {
    // ignore
  }
  return true;
}

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

const DEFAULT_PUBLIC_SUPABASE_URL = 'https://fzqhclnqyierfdahgaqz.supabase.co';
const DEFAULT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_X8N8_tgSEISvPqDnrCKvAA_jaE8bT9E';

const rawUrl = import.meta.env.VITE_SUPABASE_URL || DEFAULT_PUBLIC_SUPABASE_URL;
const rawKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  DEFAULT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

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
