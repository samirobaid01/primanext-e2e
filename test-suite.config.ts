export const SUITES: Record<string, boolean> = {
  auth:           true,
  dashboard:      true,
  userManagement: false,
  api:            true,
};

export const FILES: Record<string, boolean> = {
  'auth/login.spec':         true,
  'auth/logout.spec':        true,
  'dashboard/overview.spec': true,
  'api/auth-api.spec':       true,
};
