/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";
import React, { ReactElement } from "react";

import { IncomeAttribute } from "@/lib/income-attribute";
import { updateIncomeAttribute } from "@/service/income-attribute-service";
import IncomeAttributeForm from "@/ui/parts/income-attribute-form";

interface Props {
  incomeAttribute: IncomeAttribute;
}

const IncomeAttributeEdit = ({ incomeAttribute }: Props): ReactElement => {
  return (
    <IncomeAttributeForm
      incomeAttribute={incomeAttribute}
      onSubmit={updateIncomeAttribute}
      buttonTitle="更新"
    />
  );
};

export default IncomeAttributeEdit;
