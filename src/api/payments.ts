import { apiClient } from "./httpClient";
import { API_URL } from "../constants";
import type { PaymentSearchResponse } from "../types/payment";

export const fetchPayments = async (
  page: number,
  pageSize: number,
  search?: string
): Promise<PaymentSearchResponse> => {
  return apiClient.get<PaymentSearchResponse>(API_URL, {
    page,
    pageSize,
    search
  });
};
