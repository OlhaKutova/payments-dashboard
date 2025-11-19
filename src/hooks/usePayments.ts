import { useEffect, useState } from "react";
import { isAxiosError } from "axios";

import { fetchPayments } from "../api/payments";
import type { Payment } from "../types/payment";
import { isProd } from "../constants/env";
import { I18N } from "../constants/i18n";

interface UsePaymentsParams {
  page: number;
  pageSize: number;
  filters: Record<string, string>;
}

interface UsePaymentsResult {
  payments: Payment[];
  total: number;
  isLoading: boolean;
  error: string | null;
}

export const usePayments = ({
  page,
  pageSize,
  filters,
}: UsePaymentsParams): UsePaymentsResult => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadPayments = async (): Promise<void> => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await fetchPayments(page, pageSize, filters);
        if (!isMounted) return;

        setPayments(data?.payments ?? []);
        setTotal(data?.total ?? 0);
      } catch (err) {
        if (!isMounted) return;

        if (!isProd) {
          console.error(I18N.API_REQUEST_FAILED, err, {
            page,
            pageSize,
            ...filters,
          });
        }

        let message: string = I18N.SOMETHING_WENT_WRONG;

        if (isAxiosError(err)) {
          const status = err.response?.status;

          if (status === 404) message = I18N.PAYMENT_NOT_FOUND;
          if (status === 500) message = I18N.INTERNAL_SERVER_ERROR;
        }

        setError(message);
        setPayments([]);
        setTotal(0);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    void loadPayments();

    return () => {
      isMounted = false;
    };
  }, [page, pageSize, filters]);

  return { payments, total, isLoading, error };
};
