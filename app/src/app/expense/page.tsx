import React, { ReactElement } from "react";

import { getExpenseSummary } from "@/service/expense-service";
import Expense from "@/ui/expense";

interface Props {
  searchParams: {
    page: number;
    perPage: number;
  };
}

const ExpensePage = async ({ searchParams }: Props): Promise<ReactElement> => {
  const { page = 1, perPage = 20 } = searchParams;
  console.log(page, perPage);
  const { expenses, pagination } = await getExpenseSummary({
    page,
    perPage,
    tag: "expense",
  });
  console.log(pagination);
  return <Expense expenses={expenses} pagination={pagination} />;
};
export default ExpensePage;
