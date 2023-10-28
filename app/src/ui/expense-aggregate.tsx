"use client";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, ReactElement, useCallback } from "react";

import { Expenses } from "@/lib/expense";

interface Props {
  totalAmount: number;
  fixed: {
    totalAmount: number;
    expenses: Expenses;
  };
  variable: {
    totalAmount: number;
    expenses: Expenses;
  };
}

const ExpenseAggregate = ({
  totalAmount,
  fixed,
  variable,
}: Props): ReactElement => {
  const router = useRouter();
  const handleYearMonthChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const date = new Date(event.currentTarget.value);
      const searchParams = new URLSearchParams({
        year: date.getFullYear().toString(),
        month: date.getMonth().toString(),
      }).toString();
      router.push(`/home?${searchParams}`);
    },
    [router],
  );
  const formattedTotalAmount = new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
  }).format(totalAmount);
  const formattedFixedTotalAmount = new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
  }).format(fixed.totalAmount);
  const formattedVariableTotalAmount = new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
  }).format(fixed.totalAmount);
  const fixedExpenses = fixed.expenses.map((value, index) => {
    const { description, price } = value;
    const formattedAmount = new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
    }).format(price);
    return (
      <div key={index}>
        {description} {formattedAmount}
      </div>
    );
  });
  const variableExpenses = variable.expenses.map((value, index) => {
    const { description, price } = value;
    const formattedAmount = new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
    }).format(price);
    return (
      <div key={index}>
        {description} {formattedAmount}
      </div>
    );
  });
  return (
    <div>
      <input type="month" onChange={handleYearMonthChange} />
      <label>支出合計</label>
      <div>{formattedTotalAmount}</div>
      <label>内訳</label>
      <details>
        <summary>
          <div>固定費 {formattedFixedTotalAmount}</div>
        </summary>
        {fixedExpenses}
      </details>
      <details>
        <summary>
          <div>変動費 {formattedVariableTotalAmount}</div>
        </summary>
        {variableExpenses}
      </details>
    </div>
  );
};
export default ExpenseAggregate;
