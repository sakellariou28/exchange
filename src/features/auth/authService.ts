import { appConfig } from '../../config/appConfig';
import type { LoginInput, LoginResult } from './types';

interface AuthService {
  login(input: LoginInput): Promise<LoginResult>;
}

class MockAuthService implements AuthService {
  async login(input: LoginInput): Promise<LoginResult> {
    if (!input.username || !input.password) {
      throw new Error('Username and password are required');
    }

    return {
      token: `mock-jwt-${btoa(`${input.username}:${Date.now()}`)}`,
      user: {
        id: 'mock-user-1',
        fullName: 'Fallback User',
        email: `${input.username}@fallback.local`,
      },
    };
  }
}

class ApiAuthService implements AuthService {
  async login(input: LoginInput): Promise<LoginResult> {
    const response = await fetch(`${appConfig.apiBaseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    return (await response.json()) as LoginResult;
  }
}

export const authService: AuthService =
  appConfig.authMode === 'api' ? new ApiAuthService() : new MockAuthService();

