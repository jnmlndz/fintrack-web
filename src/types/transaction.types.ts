export interface Balance {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export interface CategorySummary {
  category: string;
  total: number;
}

export interface MonthlySummary {
  month: string;
  income: number;
  expense: number;
}

export interface Transaction {
  id: number;
  amount: string; // TypeORM transforms it to string, so we need to keep it as string to avoid issues with the frontend.
  type: 'income' | 'expense';
  category: string;
  description: string | null;
  date: string;
  createdAt: string;
  userId: number;
}