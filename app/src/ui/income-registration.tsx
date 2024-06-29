"use client";

import type { ReactElement } from "react";

import type { IncomeAttributes } from "@/lib/income-attribute";
import { registerIncome } from "@/service/income-service";
import IncomeForm from "@/ui/parts/income-form";

interface Props {
  incomeAttributes: IncomeAttributes;
}

const IncomeRegistration = ({ incomeAttributes }: Props): ReactElement => {
  return (
    <IncomeForm
      incomeAttributes={incomeAttributes}
      onSubmit={registerIncome}
      buttonTitle="登録"
    />
  );
};

export default IncomeRegistration;
