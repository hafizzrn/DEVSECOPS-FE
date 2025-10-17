import type { ApiResponse } from "@/types/response";
import type { Category } from "../types";
import { useQueryApi } from "@/lib/react-query";

export function useGetCategories() {
  return useQueryApi<ApiResponse<Category[]>>(["categories"], `/categories`);
}
