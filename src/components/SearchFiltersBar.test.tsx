import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { SearchFiltersBar } from "./SearchFiltersBar";

describe("SearchFiltersBar", () => {
  const searchConfig = {
    key: "search",
    ariaLabel: "Search payments",
    placeholder: "Search...",
    buttonLabel: "Search",
  };

  const selectConfig = {
    key: "currency",
    ariaLabel: "Currency filter",
    placeholder: "All currencies",
    options: ["USD", "EUR"],
  };

  const baseProps = {
    filters: { search: "", currency: "" },
    onFilterChange: vi.fn(),
    onSearch: vi.fn(),
    onClearFilters: vi.fn(),
    clearButtonLabel: "Clear",
    search: searchConfig,
    select: selectConfig,
  };

  it("renders search input and select", () => {
    render(<SearchFiltersBar {...baseProps} hasActiveFilters={false} />);

    expect(screen.getByLabelText("Search payments")).toBeInTheDocument();
    expect(screen.getByLabelText("Currency filter")).toBeInTheDocument();
  });

  it("calls onFilterChange when typing in search input", () => {
    render(<SearchFiltersBar {...baseProps} hasActiveFilters={false} />);

    const input = screen.getByLabelText("Search payments");
    fireEvent.change(input, { target: { value: "pay_123" } });

    expect(baseProps.onFilterChange).toHaveBeenCalledWith("search", "pay_123");
  });

  it("calls onFilterChange when changing select value", () => {
    render(<SearchFiltersBar {...baseProps} hasActiveFilters={false} />);

    const select = screen.getByLabelText("Currency filter");
    fireEvent.change(select, { target: { value: "USD" } });

    expect(baseProps.onFilterChange).toHaveBeenCalledWith("currency", "USD");
  });

  it("calls onSearch when search button is clicked", () => {
    render(<SearchFiltersBar {...baseProps} hasActiveFilters={false} />);

    fireEvent.click(screen.getByText("Search"));
    expect(baseProps.onSearch).toHaveBeenCalled();
  });

  it("shows Clear button only when hasActiveFilters = true", () => {
    const { rerender } = render(
      <SearchFiltersBar {...baseProps} hasActiveFilters={false} />
    );

    expect(screen.queryByText("Clear")).not.toBeInTheDocument();

    rerender(<SearchFiltersBar {...baseProps} hasActiveFilters={true} />);
    expect(screen.getByText("Clear")).toBeInTheDocument();
  });

  it("calls onClearFilters when clicking Clear button", () => {
    render(<SearchFiltersBar {...baseProps} hasActiveFilters={true} />);

    fireEvent.click(screen.getByText("Clear"));
    expect(baseProps.onClearFilters).toHaveBeenCalled();
  });
});
