export type DataSourceMode = 'mock' | 'api';
export type AuthMode = 'mock' | 'api';

const asMode = <T extends string>(value: string | undefined, allowed: readonly T[], fallback: T): T => {
  if (value && allowed.includes(value as T)) {
    return value as T;
  }

  return fallback;
};

export const appConfig = {
  dataSource: asMode(import.meta.env.VITE_DATA_SOURCE, ['mock', 'api'] as const, 'mock'),
  authMode: asMode(import.meta.env.VITE_AUTH_MODE, ['mock', 'api'] as const, 'mock'),
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '/api',
  authTokenStorageKey: 'fallback_auth_token',
  userStorageKey: 'fallback_user',
} as const;

