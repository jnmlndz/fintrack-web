import api from './axios';
import type { LoginResponse } from '../types/auth.types';

export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>('/auth/login', { email, password });
  return response.data;
}

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
}

export async function register(payload: RegisterPayload): Promise<void> {
  await api.post('/users', payload);
}