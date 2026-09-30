import api from './axios';
import type { Balance, CategorySummary, MonthlySummary } from '../types/transaction.types';
import type { Transaction } from '../types/transaction.types';


//setup

export interface CreateTransactionPayload  {
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description?: string;
  date: string; // ISO 8601 date string
}


//functions
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

export async function createTransaction(token: string, payload: CreateTransactionPayload) {
  const response = await api.post('/transactions', payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function getTransactions(token: string): Promise<Transaction[]> {
  const response = await api.get<Transaction[]>('/transactions', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function updateTransaction(
  token: string,
  id: number,
  payload: Partial<CreateTransactionPayload>,
): Promise<Transaction> {
  const response = await api.patch<Transaction>(`/transactions/${id}`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function deleteTransaction(token: string, id: number): Promise<void> {
  await api.delete(`/transactions/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}