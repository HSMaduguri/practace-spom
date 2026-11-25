import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

interface FirebaseAppletConfig {
  projectId?: string;
  appId?: string;
  apiKey?: string;
  authDomain?: string;
  firestoreDatabaseId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  measurementId?: string;
}

function isValidFirebaseConfig(cfg: FirebaseAppletConfig | null | undefined): cfg is FirebaseAppletConfig {
  if (!cfg || typeof cfg.apiKey !== 'string' || typeof cfg.projectId !== 'string') {
    return false;
  }
  const apiKey = cfg.apiKey.trim();
  const projectId = cfg.projectId.trim();
  if (!apiKey.startsWith('AIza') || apiKey.length < 25) {
    return false;
  }
  if (projectId.length < 3 || projectId === 'remixed-project-id' || projectId.startsWith('YOUR_')) {
    return false;
  }
  return true;
}

function loadFirebaseConfig(): FirebaseAppletConfig | null {
  // 1. Optional local firebase-applet-config.json (present in AI Studio, gitignored on GitHub)
  const localConfigs = import.meta.glob<FirebaseAppletConfig>('/firebase-applet-config.json', {
    eager: true,
    import: 'default',
  });
  const localConfig = localConfigs['/firebase-applet-config.json'];
  if (isValidFirebaseConfig(localConfig)) {
    return localConfig;
  }

  // 2. Check JSON secret env var (e.g. VITE_FIREBASE_CONFIG from GitHub Actions Secrets)
  const rawConfigEnv = import.meta.env.VITE_FIREBASE_CONFIG;
  if (typeof rawConfigEnv === 'string' && rawConfigEnv.trim().startsWith('{')) {
    try {
      const parsed = JSON.parse(rawConfigEnv) as FirebaseAppletConfig;
      if (isValidFirebaseConfig(parsed)) {
        return parsed;
      }
    } catch (err) {
      console.warn('Invalid VITE_FIREBASE_CONFIG JSON:', err);
    }
  }

  // 3. Check individual VITE_FIREBASE_* environment variables (CI / GitHub Actions Secrets)
  const envConfig: FirebaseAppletConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    firestoreDatabaseId: import.meta.env.VITE_FIREBASE_FIRESTORE_DATABASE_ID,
  };
  if (isValidFirebaseConfig(envConfig)) {
    return envConfig;
  }

  return null;
}

const firebaseConfig = loadFirebaseConfig();

export const isFirebaseConfigured = Boolean(firebaseConfig?.apiKey && firebaseConfig?.projectId);

let app: FirebaseApp | null = null;
let dbInstance: Firestore | null = null;
let authInstance: Auth | null = null;
let googleProviderInstance: GoogleAuthProvider | null = null;

if (isFirebaseConfigured && firebaseConfig) {
  app = initializeApp(firebaseConfig);
  dbInstance = firebaseConfig.firestoreDatabaseId
    ? getFirestore(app, firebaseConfig.firestoreDatabaseId) /* CRITICAL: Required for named Firestore database */
    : getFirestore(app);
  authInstance = getAuth(app);
  googleProviderInstance = new GoogleAuthProvider();
}

export const db = dbInstance;
export const auth = authInstance;
export const googleProvider = googleProviderInstance;

// Standard Firebase Operation Types defined in Skill guidelines
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const currentUser = authInstance?.currentUser;
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: currentUser?.uid,
      email: currentUser?.email,
      emailVerified: currentUser?.emailVerified,
      isAnonymous: currentUser?.isAnonymous,
      tenantId: currentUser?.tenantId,
      providerInfo: currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}
