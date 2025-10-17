export interface TransactionSummary {
  total_income_monthly: number;
  total_expense_monthly: number;
  total_income_daily: number;
  total_expense_daily: number;
}
export interface TransactionWithPagination {
  data: Transaction[];
  current_page: number;
  limit: number;
  total_page: number;
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  transaction_type: "income" | "expense";
  category: string;
  date: string;
  note?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
  proof_file?: string;
  category_id: string;
  period: "daily" | "monthly" | "yearly";
}

export interface TransactionFilters {
  page: number;
  limit: number;
  type: string;
  period: string;
  start_date: string;
  end_date: string;
  sort_by: string;
  order_by: string;
}
