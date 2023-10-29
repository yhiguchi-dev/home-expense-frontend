"use client";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, ReactElement, useCallback, useState } from "react";

import { Expenses } from "@/lib/expense";

interface Props {
  year: number;
  month: number;
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
  year,
  month,
  totalAmount,
  fixed,
  variable,
}: Props): ReactElement => {
  const router = useRouter();
  const formattedYear = year.toString().padStart(2, "0");
  const formattedMonth = month.toString().padStart(2, "0");
  const [yearMonth, setYearMonth] = useState(
    `${formattedYear}-${formattedMonth}`,
  );
  const handleYearMonthChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const date = new Date(event.currentTarget.value);
      const year = date.getFullYear().toString();
      const month = (date.getMonth() + 1).toString();
      const searchParams = new URLSearchParams({
        year: year,
        month: month,
      }).toString();
      setYearMonth(`${year.padStart(2, "0")}-${month.padStart(2, "0")}`);
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
  }).format(variable.totalAmount);
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
      <input type="month" value={yearMonth} onChange={handleYearMonthChange} />
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
