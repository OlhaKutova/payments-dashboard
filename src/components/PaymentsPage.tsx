import { useState } from "react";

import { I18N } from "../constants/i18n";
import { usePayments } from "../hooks/usePayments";
import { PAYMENT_FILTERS } from "../constants/filters";
import { CURRENCIES } from "../constants/currencies";

import {
  Container,
  Title,
  TableWrapper,
  Spinner,
  ErrorBox,
  EmptyBox,
} from "./components";
import { SearchFiltersBar } from "./SearchFiltersBar";
import { PaymentsTable } from "./PaymentsTable";

type Filters = Record<string, string>;

const INITIAL_FILTERS: Filters = {
  [PAYMENT_FILTERS.SEARCH]: "",
  [PAYMENT_FILTERS.CURRENCY]: "",
};

export const PaymentsPage = () => {
  const [filters, setFilters] = useState<Filters>({ ...INITIAL_FILTERS });
  const [appliedFilters, setAppliedFilters] = useState<Filters>({
    ...INITIAL_FILTERS,
  });

  const page = 1;
  const pageSize = 5;

  const hasActiveFilters = Object.values(filters).some(
    (val) => val.trim() !== ""
  );

  const { payments, isLoading, error } = usePayments({
    page,
    pageSize,
    filters: appliedFilters,
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = () => {
    setAppliedFilters(filters);
  };

  const handleClearFilters = () => {
    setFilters({ ...INITIAL_FILTERS });
    setAppliedFilters({ ...INITIAL_FILTERS });
  };

  return (
    <Container>
      <Title>{I18N.PAGE_TITLE}</Title>

      <SearchFiltersBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        onSearch={handleApplyFilters}
        hasActiveFilters={hasActiveFilters}
        search={{
          key: PAYMENT_FILTERS.SEARCH,
          ariaLabel: I18N.SEARCH_INPUT_ARIA,
          placeholder: I18N.SEARCH_PLACEHOLDER,
          buttonLabel: I18N.SEARCH_BUTTON,
        }}
        select={{
          key: PAYMENT_FILTERS.CURRENCY,
          ariaLabel: I18N.CURRENCY_FILTER_LABEL,
          placeholder: I18N.CURRENCIES_OPTION,
          options: CURRENCIES,
        }}
        clearButtonLabel={I18N.CLEAR_FILTERS}
      />

      {!error && (
        <TableWrapper aria-label={I18N.PAGE_TITLE}>
          {isLoading ? (
            <div className="flex justify-center items-center p-4">
              <Spinner aria-label={I18N.LOADING_PAYMENTS} />
            </div>
          ) : payments.length === 0 ? (
            <EmptyBox>{I18N.NO_PAYMENTS_FOUND}</EmptyBox>
          ) : (
            <PaymentsTable rows={payments} />
          )}
        </TableWrapper>
      )}

      {error && (
        <ErrorBox role="alert" className="mt-4">
          {error}
        </ErrorBox>
      )}
    </Container>
  );
};
