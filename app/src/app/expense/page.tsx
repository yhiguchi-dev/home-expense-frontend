import React, { ReactElement } from "react";

import { getExpenseSummary } from "@/service/expense-service";
import Expense from "@/ui/expense";

interface Props {
  searchParams: {
    page: number;
    perPage: number;
    year: number;
    month: number;
  };
}

const ExpensePage = async ({ searchParams }: Props): Promise<ReactElement> => {
  const now = new Date(Date.now());
  const {
    page = 1,
    perPage = 20,
    year = now.getFullYear(),
    month = now.getMonth() + 1,
  } = searchParams;
  console.log(page, perPage);
  const { expenses, pagination } = await getExpenseSummary({
    page,
    perPage,
    year,
    month,
    tag: `expense-${year}-${month}`,
  });
  console.log(pagination);
  return (
    <Expense
      expenses={expenses}
      pagination={pagination}
      year={year}
      month={month}
    />
  );
};
export default ExpensePage;
