import { ENV } from '../config/env';

interface UserCredentials {
  email: string;
  password: string;
}

interface UserSet {
  admin: UserCredentials;
}

const USERS: Record<'dev' | 'stage' | 'prod', UserSet> = {
  dev:   { admin: { email: ENV.adminEmail,  password: ENV.adminPassword } },
  stage: { admin: { email: ENV.adminEmail,  password: ENV.adminPassword } },
  prod:  { admin: { email: ENV.adminEmail,  password: ENV.adminPassword } },
};

export const currentUsers = USERS[ENV.env];
