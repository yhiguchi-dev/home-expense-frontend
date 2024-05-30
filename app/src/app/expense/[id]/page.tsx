import type { ReactElement } from "react";

import { getExpenseAttributeSummary } from "@/service/expense-attribute-service";
import { getExpense } from "@/service/expense-service";
import ExpenseEdit from "@/ui/expense-edit";

interface Props {
  params: {
    id: string;
  };
  searchParams: {
    category: string;
  };
}

const ExpenseEditPage = async ({
  params,
  searchParams,
}: Props): Promise<ReactElement> => {
  const { id } = params;
  const expense = await getExpense({ id, tag: `expense-${id}` });
  const { category = expense.category } = searchParams;
  const { expenseAttributes } = await getExpenseAttributeSummary({
    category,
    page: 1,
    perPage: 100,
    tag: `expense-attribute-${category}`,
  });
  return (
    <ExpenseEdit expense={expense} expenseAttributes={expenseAttributes} />
  );
};
export default ExpenseEditPage;
