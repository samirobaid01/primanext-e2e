import { BaseAPI } from './base.api';

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export class AuthAPI extends BaseAPI {
  async login(email: string, password: string): Promise<AuthResponse> {
    return this.post<AuthResponse>('/auth/login', { email, password });
  }

  async logout(token: string): Promise<void> {
    await this.post<void>('/auth/logout', {}, token);
  }

  async getProfile(token: string): Promise<User> {
    return this.get<User>('/auth/me', token);
  }
}
