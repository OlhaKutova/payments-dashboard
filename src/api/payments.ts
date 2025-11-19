import { apiClient } from "./httpClient";
import { API_URL } from "../constants";
import type { PaymentSearchResponse } from "../types/payment";

export const fetchPayments = async (
  page: number,
  pageSize: number,
  filters: Record<string, string> = {}
): Promise<PaymentSearchResponse> => {
  const activeFilters = Object.entries(filters).reduce<Record<string, string>>(
    (acc, [key, value]) => {
      if (value.trim() !== "") {
        acc[key] = value;
      }
      return acc;
    },
    {}
  );

  return apiClient.get<PaymentSearchResponse>(API_URL, {
    page,
    pageSize,
    ...activeFilters,
  });
};
