"use client";

import type { ReactElement } from "react";

import { registerExpenseAttribute } from "@/service/expense-attribute-service";
import ExpenseAttributeForm from "@/ui/parts/expense-attribute-form";

const ExpenseRegistration = (): ReactElement => {
  return (
    <ExpenseAttributeForm
      onSubmit={registerExpenseAttribute}
      buttonTitle="登録"
    />
  );
};

export default ExpenseRegistration;
