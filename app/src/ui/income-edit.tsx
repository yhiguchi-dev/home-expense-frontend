/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";
import React, { ReactElement } from "react";

import { Income } from "@/lib/income";
import { IncomeAttributes } from "@/lib/income-attribute";
import { updateIncome } from "@/service/income-service";
import IncomeForm from "@/ui/parts/income-form";

interface Props {
  income: Income;
  incomeAttributes: IncomeAttributes;
}

const IncomeEdit = ({ income, incomeAttributes }: Props): ReactElement => {
  console.log(income);
  return (
    <IncomeForm
      income={income}
      incomeAttributes={incomeAttributes}
      onSubmit={updateIncome}
      buttonTitle="更新"
    />
  );
};

export default IncomeEdit;
