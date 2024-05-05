"use client";
import { useRouter } from "next/navigation";
import React, { ReactElement, useCallback } from "react";

import { Expense } from "@/lib/expense";
import { ExpenseAttributes } from "@/lib/expense-attribute";
import { updateExpense } from "@/service/expense-service";
import ExpenseForm from "@/ui/parts/expense-form";

interface Props {
  expense: Expense;
  expenseAttributes: ExpenseAttributes;
}

const ExpenseEdit = ({ expense, expenseAttributes }: Props): ReactElement => {
  console.log(expense);
  const router = useRouter();
  const handleCategoryChange = useCallback(
    (category: string) => {
      const searchParams = new URLSearchParams({
        category,
      }).toString();
      router.push(`/expense/${expense.id}?${searchParams}`);
    },
    [expense.id, router],
  );
  return (
    <ExpenseForm
      expense={expense}
      expenseAttributes={expenseAttributes}
      onCategoryChange={handleCategoryChange}
      onSubmit={updateExpense}
      buttonTitle="更新"
    />
  );
};

export default ExpenseEdit;
