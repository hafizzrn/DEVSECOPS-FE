import { useQueryApi } from "@/lib/react-query";
import type { TransactionSummary } from "../types";
import type { ApiResponse } from "@/types/response";

export function useGetSummary() {
  return useQueryApi<ApiResponse<TransactionSummary>>(
    ["summary"],
    `/transactions/summary`,
  );
}
