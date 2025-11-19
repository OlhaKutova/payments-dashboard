import "@testing-library/jest-dom/vitest";
import { render, screen, within } from "@testing-library/react";
import { it, describe, expect } from "vitest";

import { PAYMENT_STATUS } from "../constants";
import type { Payment } from "../types/payment";
import { PaymentsTable } from "./PaymentsTable";

const mockPayments: Payment[] = [
  {
    id: "pay_134_2",
    date: "2024-04-15T11:00:00Z",
    amount: 150.5,
    currency: "EUR",
    customerName: "Bob Red",
    customerAddress: "202 Red Ave, Paris, France",
    status: PAYMENT_STATUS.PENDING,
    description: "Product purchase",
  },
];

describe("PaymentsTable", () => {
  it("renders all table headers", () => {
    render(<PaymentsTable rows={mockPayments} />);

    const expectedHeaders = [
      "Payment ID",
      "Date",
      "Amount",
      "Customer",
      "Currency",
      "Status",
    ];

    expectedHeaders.forEach((header) => {
      expect(
        screen.getByRole("columnheader", { name: header })
      ).toBeInTheDocument();
    });
  });

  it("renders payment rows", () => {
    render(<PaymentsTable rows={mockPayments} />);

    const row = screen.getByRole("row", { name: /pay_134_2/i });

    expect(within(row).getByText("pay_134_2")).toBeInTheDocument();
    expect(within(row).getByText("Bob Red")).toBeInTheDocument();
    expect(within(row).getByText("EUR")).toBeInTheDocument();
    expect(within(row).getByText(/pending/i)).toBeInTheDocument();
  });

  it("renders nothing when rows prop is empty", () => {
    render(<PaymentsTable rows={[]} />);

    expect(screen.queryByText("pay_134_2")).not.toBeInTheDocument();
  });
});
