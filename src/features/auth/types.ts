export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
}

export interface LoginInput {
  username: string;
  password: string;
}

export interface LoginResult {
  token: string;
  user: AuthUser;
}

