import React, { ReactElement } from "react";

import { getExpenseAttributeSummary } from "@/service/expense-attribute-service";
import ExpenseAttribute from "@/ui/expense-attribute";

interface Props {
  searchParams: {
    category?: string;
    page: number;
    perPage: number;
  };
}

const ExpenseAttributePage = async ({
  searchParams,
}: Props): Promise<ReactElement> => {
  const { page = 1, perPage = 20, category = "固定費" } = searchParams;
  console.log(page, perPage);
  const { expenseAttributes, pagination } = await getExpenseAttributeSummary({
    category,
    page,
    perPage,
    tag: "expense-attribute",
  });
  return (
    <ExpenseAttribute
      category={category}
      expenseAttributes={expenseAttributes}
      pagination={pagination}
    />
  );
};
export default ExpenseAttributePage;
