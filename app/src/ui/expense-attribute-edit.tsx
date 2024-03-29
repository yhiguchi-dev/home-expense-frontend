/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";
import React, { ReactElement } from "react";

import { ExpenseAttribute } from "@/lib/expense-attribute";
import { updateExpenseAttribute } from "@/service/expense-attribute-service";
import ExpenseAttributeForm from "@/ui/parts/expense-attribute-form";

interface Props {
  expenseAttribute: ExpenseAttribute;
}

const ExpenseAttributeEdit = ({ expenseAttribute }: Props): ReactElement => {
  return (
    <ExpenseAttributeForm
      expenseAttribute={expenseAttribute}
      onSubmit={updateExpenseAttribute}
      buttonTitle="更新"
    />
  );
};

export default ExpenseAttributeEdit;
