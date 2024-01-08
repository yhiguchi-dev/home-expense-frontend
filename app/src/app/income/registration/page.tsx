import React, { ReactElement } from "react";

import { getIncomeAttributeSummary } from "@/service/income-attribute-service";
import IncomeRegistration from "@/ui/income-registration";

const IncomeRegistrationPage = async (): Promise<ReactElement> => {
  const { incomeAttributes } = await getIncomeAttributeSummary({
    page: 1,
    perPage: 100,
    tag: `income-attribute`,
  });
  return <IncomeRegistration incomeAttributes={incomeAttributes} />;
};
export default IncomeRegistrationPage;
