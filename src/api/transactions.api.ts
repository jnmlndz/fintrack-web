import api from './axios';
import type { Balance, CategorySummary, MonthlySummary } from '../types/transaction.types';

export async function getBalance(token: string): Promise<Balance> {
  const response = await api.get<Balance>('/transactions/summary/balance', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function getExpensesByCategory(token: string): Promise<CategorySummary[]> {
  const response = await api.get<CategorySummary[]>('/transactions/summary/by-category', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function getMonthlySummary(token: string): Promise<MonthlySummary[]> {
  const response = await api.get<MonthlySummary[]>('/transactions/summary/monthly', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}