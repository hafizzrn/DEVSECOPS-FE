import { useQueryApi } from "@/lib/react-query";
import type { ApiResponse } from "@/types/response";
import type { TransactionWithPagination } from "../types";

export function useGetTransactions(queryKey: string[]) {
  const params = queryKey[1];
  const queryString = new URLSearchParams(params).toString();

  return useQueryApi<ApiResponse<TransactionWithPagination>>(
    queryKey,
    `/transactions?${queryString}`,
  );
}

export function useGetRecentTransactions(queryKey: string[]) {
  const dateToday = new Date().toISOString().split("T")[0];
  return useQueryApi<ApiResponse<TransactionWithPagination>>(
    queryKey,
    `/transactions?limit=5&sort_by=date&order_by=desc&start_date=${dateToday}&end_date=${dateToday}`,
  );
}
