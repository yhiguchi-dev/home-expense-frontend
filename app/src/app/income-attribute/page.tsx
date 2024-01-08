import React, { ReactElement } from "react";

import { getIncomeAttributeSummary } from "@/service/income-attribute-service";
import IncomeAttribute from "@/ui/income-attribute";

interface Props {
  searchParams: {
    page: number;
    perPage: number;
  };
}

const IncomeAttributePage = async ({
  searchParams,
}: Props): Promise<ReactElement> => {
  const { page = 1, perPage = 20 } = searchParams;
  console.log(page, perPage);
  const { incomeAttributes, pagination } = await getIncomeAttributeSummary({
    page,
    perPage,
    tag: "income-attribute",
  });
  return (
    <IncomeAttribute
      incomeAttributes={incomeAttributes}
      pagination={pagination}
    />
  );
};
export default IncomeAttributePage;
