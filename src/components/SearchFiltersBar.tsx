import {
  FilterRow,
  SearchInput,
  SearchButton,
  ClearButton,
} from "./components";
import { SelectField } from "./SelectField";

type Filters = Record<string, string>;

interface SearchConfig {
  key: string;
  ariaLabel: string;
  placeholder: string;
  buttonLabel: string;
}

interface SelectConfig {
  key: string;
  ariaLabel: string;
  placeholder: string;
  options: string[];
}

interface SearchFiltersBarProps {
  search: SearchConfig;
  select: SelectConfig;
  filters: Filters;
  onFilterChange: (key: string, value: string) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  onSearch: () => void;
  clearButtonLabel: string;
}

export const SearchFiltersBar = ({
  filters,
  onFilterChange,
  onSearch,
  onClearFilters,
  hasActiveFilters,
  clearButtonLabel,
  search,
  select,
}: SearchFiltersBarProps) => {
  return (
    <FilterRow>
      <SearchInput
        aria-label={search.ariaLabel}
        placeholder={search.placeholder}
        value={filters[search.key] ?? ""}
        onChange={(e) => onFilterChange(search.key, e.target.value)}
      />

      <SelectField
        ariaLabel={select.ariaLabel}
        value={filters[select.key] ?? ""}
        placeholder={select.placeholder}
        options={select.options}
        onChange={(value) => onFilterChange(select.key, value)}
      />

      <SearchButton onClick={onSearch}>
        {search.buttonLabel}
      </SearchButton>

      {hasActiveFilters && (
        <ClearButton onClick={onClearFilters}>
          {clearButtonLabel}
        </ClearButton>
      )}
    </FilterRow>
  );
};
