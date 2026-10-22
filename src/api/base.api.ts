import { type APIRequestContext, expect } from '@playwright/test';
import { ENV } from '../config/env';

export class BaseAPI {
  constructor(protected readonly request: APIRequestContext) {}

  protected async get<T>(path: string, token?: string): Promise<T> {
    const response = await this.request.get(`${ENV.apiUrl}${path}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    expect(response.ok(), `GET ${path} → ${response.status()}`).toBeTruthy();
    return response.json() as Promise<T>;
  }

  protected async post<T>(path: string, body: unknown, token?: string): Promise<T> {
    const response = await this.request.post(`${ENV.apiUrl}${path}`, {
      data: body,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    expect(response.ok(), `POST ${path} → ${response.status()}`).toBeTruthy();
    return response.json() as Promise<T>;
  }
}
