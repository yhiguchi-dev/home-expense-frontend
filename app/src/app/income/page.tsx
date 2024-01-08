import React, { ReactElement } from "react";

import { getIncomeSummary } from "@/service/income-service";
import Income from "@/ui/income";

interface Props {
  searchParams: {
    page: number;
    perPage: number;
    year: number;
  };
}

const IncomePage = async ({ searchParams }: Props): Promise<ReactElement> => {
  const now = new Date(Date.now());
  const { page = 1, perPage = 20, year = now.getFullYear() } = searchParams;
  console.log(page, perPage);
  const { incomes, pagination } = await getIncomeSummary({
    page,
    perPage,
    year,
    tag: `income-${year}`,
  });
  console.log(pagination);
  return <Income incomes={incomes} pagination={pagination} year={year} />;
};
export default IncomePage;
