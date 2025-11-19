import { I18N } from "../constants/i18n";
import {
  FilterRow,
  SearchInput,
  SearchButton,
  ClearButton,
} from "./components";

type Filters = Record<string, string>;

interface SearchFiltersBarProps {
  filters: Filters;
  searchKey: string;
  onFilterChange: (key: string, value: string) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  onSearch: () => void;
}

export const SearchFiltersBar = ({
  filters,
  searchKey,
  onFilterChange,
  hasActiveFilters,
  onClearFilters,
  onSearch,
}: SearchFiltersBarProps) => {
  return (
    <FilterRow>
      <SearchInput
        aria-label={I18N.SEARCH_INPUT_ARIA}
        placeholder={I18N.SEARCH_PLACEHOLDER}
        value={filters[searchKey] ?? ""}
        onChange={(e) => onFilterChange(searchKey, e.target.value)}
      />

      <SearchButton onClick={onSearch}>
        {I18N.SEARCH_BUTTON}
      </SearchButton>

      {hasActiveFilters && (
        <ClearButton onClick={onClearFilters}>
          {I18N.CLEAR_FILTERS}
        </ClearButton>
      )}
    </FilterRow>
  );
};
