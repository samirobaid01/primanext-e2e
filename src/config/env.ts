function required(key: string): string {
  const val = process.env[key];
  if (!val) throw new Error(`Missing required env var: ${key}`);
  return val;
}

export const ENV = {
  baseUrl:       required('BASE_URL'),
  apiUrl:        required('API_URL'),
  adminEmail:    required('ADMIN_EMAIL'),
  adminPassword: required('ADMIN_PASSWORD'),
  env: (process.env.TEST_ENV ?? 'dev') as 'dev' | 'stage' | 'prod',
} as const;
