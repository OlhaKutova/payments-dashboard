import { describe, it, expect } from "vitest";
import { sanitizeInput } from "./validation.tsx";

describe('sanitizeInput', () => {
  it('removes HTML tags', () => {
    expect(sanitizeInput('<div>pay_134_2</div>')).toBe('pay_134_2');
  });
  it('removes non-allowed chars', () => {
    expect(sanitizeInput('pay_134_2@@@!!!')).toBe('pay_134_2');
  });
  it('returns empty string for null/undefined', () => {
    expect(sanitizeInput(undefined as unknown as string)).toBe('');
    expect(sanitizeInput(null as unknown as string)).toBe('');
  });
});

