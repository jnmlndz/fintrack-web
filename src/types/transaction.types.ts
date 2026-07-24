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