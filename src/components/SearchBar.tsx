import { useState, useEffect, ChangeEvent } from "react";

import { I18N } from "../constants/i18n";
import { FilterRow, SearchInput, SearchButton } from "./components";
import { sanitizeInput } from "../utils/validation";
import { useDebounce } from "../hooks/useDebounce";

interface SearchBarProps {
  onSearch: (value: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [input, setInput] = useState("");
  const debouncedValue = useDebounce(input, 400);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const cleaned = sanitizeInput(event.target.value);
    setInput(cleaned);
  };

  return (
    <FilterRow>
      <SearchInput
        aria-label={I18N.SEARCH_INPUT_ARIA}
        placeholder={I18N.SEARCH_PLACEHOLDER}
        value={input}
        onChange={handleInputChange}
      />

      <SearchButton onClick={() => onSearch(input)}>
        {I18N.SEARCH_BUTTON}
      </SearchButton>
    </FilterRow>
  );
};
