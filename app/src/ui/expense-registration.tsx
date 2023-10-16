"use client";
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useRouter } from "next/navigation";
import React, { ReactElement, useCallback } from "react";

import { ExpenseAttributes } from "@/lib/expense-attribute";
import { registerExpense } from "@/service/expense-service";
import ExpenseForm from "@/ui/parts/expense-form";

interface Props {
  expenseAttributes: ExpenseAttributes;
}

const ExpenseRegistration = ({ expenseAttributes }: Props): ReactElement => {
  const router = useRouter();
  const handleCategoryChange = useCallback(
    (category: string) => {
      const searchParams = new URLSearchParams({
        category,
      }).toString();
      router.push(`/expense/registration?${searchParams}`);
    },
    [router],
  );
  return (
    <ExpenseForm
      expenseAttributes={expenseAttributes}
      onCategoryChange={handleCategoryChange}
      onSubmit={registerExpense}
      buttonTitle="登録"
    />
  );
};

export default ExpenseRegistration;
