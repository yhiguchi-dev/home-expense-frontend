"use client";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, ReactElement, useCallback, useState } from "react";

import { ExpenseAttributeAggregates } from "@/lib/expense-attribute";

import style from "./expense-aggregate.module.css";

interface Props {
  year: number;
  month: number;
  incomeTotalAmount: number;
  disposalIncomeAmount: number;
  totalAmount: number;
  fixed: {
    totalAmount: number;
    attributeAggregates: ExpenseAttributeAggregates;
  };
  variable: {
    totalAmount: number;
    attributeAggregates: ExpenseAttributeAggregates;
  };
}

const ExpenseAggregate = ({
  year,
  month,
  incomeTotalAmount,
  disposalIncomeAmount,
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
  const formattedIncomeTotalAmount = new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
  }).format(incomeTotalAmount);
  const formattedDisposalIncomeAmount = new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
  }).format(disposalIncomeAmount);
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
  const fixedExpenses = fixed.attributeAggregates.map((value, index) => {
    const { name, totalAmount } = value;
    const formattedAmount = new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
    }).format(totalAmount);
    return (
      <div key={index}>
        {name} {formattedAmount}
      </div>
    );
  });
  const variableExpenses = variable.attributeAggregates.map((value, index) => {
    const { name, totalAmount } = value;
    const formattedAmount = new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
    }).format(totalAmount);
    return (
      <div key={index}>
        {name} {formattedAmount}
      </div>
    );
  });
  return (
    <div className={style.textStyle}>
      <input
        className={style.yearMonth}
        type="month"
        value={yearMonth}
        onChange={handleYearMonthChange}
      />
      <div className={style.labelStyale}>
        <label>収入合計</label>
        <div>{formattedIncomeTotalAmount}</div>
      </div>
      <div className={style.labelStyale}>
        <label>支出合計</label>
        <div>{formattedTotalAmount}</div>
      </div>
      <div className={style.labelStyale}>
        <label>収入 - 支出</label>
        <div>{formattedDisposalIncomeAmount}</div>
      </div>
      <div>
        <label className={style.labelStyale}>内訳</label>
        <div className={style.amountStyle}>
          <details>
            <summary>固定費 {formattedFixedTotalAmount}</summary>
            <div className={style.expensesStyle}>{fixedExpenses}</div>
          </details>
          <details>
            <summary>変動費 {formattedVariableTotalAmount}</summary>
            <div className={style.expensesStyle}>{variableExpenses}</div>
          </details>
        </div>
      </div>
    </div>
  );
};
export default ExpenseAggregate;
