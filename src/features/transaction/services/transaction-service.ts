import { useMutationApi, useQueryApi } from "@/lib/react-query";
import type { ApiResponse } from "@/types/response";
import type { Transaction, TransactionWithPagination } from "../types";

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

export function useCreateTransaction() {
  return useMutationApi<ApiResponse<null>, FormData>({
    method: "post",
    url: "/transactions",
  });
}

export function useUpdateTransaction(id: string) {
  return useMutationApi<ApiResponse<null>, FormData>({
    method: "put",
    url: `/transactions/${id}`,
  });
}


export function useGetTransactionById(id: string) {
  return useQueryApi<ApiResponse<Transaction>>(
    ["transaction", id],
    `/transactions/${id}`,
  );
}

export function useGetImage(id: string) {
  return useQueryApi<ApiResponse<{ image_url: string }>>(
    ["transaction-image", id],
    `/transactions/${id}/proof`,
  );
}

export function useDeleteTransaction(id: string) {
  return useMutationApi<ApiResponse<null>, null>(
    {
      method: "delete",
      url: `/transactions/${id}`
    }
    
  );
}