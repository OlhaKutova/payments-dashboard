import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useDebounce } from "./useDebounce.ts";

const DELAY = 400;

describe("useDebounce", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("returns initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("hello", DELAY));
    expect(result.current).toBe("hello");
  });

  it("updates value only after delay", async () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, DELAY), {
      initialProps: { value: "a" },
    });
    rerender({ value: "ab" });
    vi.advanceTimersByTime(DELAY);
    await waitFor(() => expect(result.current).toBe("ab"));
  });

  it("cancels previous timeout on rapid value change", async () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, DELAY), {
      initialProps: { value: "a" },
    });
    rerender({ value: "ab" });
    vi.advanceTimersByTime(DELAY / 2);
    rerender({ value: "abc" });
    vi.advanceTimersByTime(DELAY / 2);
    expect(result.current).toBe("a");
    vi.advanceTimersByTime(DELAY);
    await waitFor(() => expect(result.current).toBe("abc"));
  });
});
