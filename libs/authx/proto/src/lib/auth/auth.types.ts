import { Observable } from 'rxjs';

export const AUTH_SERVICE = 'AuthService';
export const AUTH_PACKAGE = 'auth';

export interface AuthServiceClient {
  register(request: RegisterRequest): Observable<RegisterResponse>;

  login(request: LoginRequest): Observable<LoginResponse>;

  validate(request: ValidateRequest): Observable<ValidateResponse>;
}

export enum AuthMethod {
  Register = 'Register',
  Login = 'Login',
  Validate = 'Validate',
}

export interface RegisterRequest {
  email: string;
  password: string;
  tenant: string;
}

export interface RegisterResponse {
  status: number;
  error: string[];
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  tenant: string;
}

export interface LoginResponse {
  status: number;
  error: string[];
  token: string;
}

export interface ValidateRequest {
  token: string;
  tenant: string;
}

export interface ValidateResponse {
  status: number;
  error: string[];
  userId: number;
}
