import type { ReactElement } from "react";

import { getExpenseAttributeSummary } from "@/service/expense-attribute-service";
import ExpenseRegistration from "@/ui/expense-registration";

interface Props {
  searchParams: {
    category: string;
  };
}

const ExpenseRegistrationPage = async ({
  searchParams,
}: Props): Promise<ReactElement> => {
  const { category = "固定費" } = searchParams;
  const { expenseAttributes } = await getExpenseAttributeSummary({
    category,
    page: 1,
    perPage: 100,
    tag: `expense-attribute-${category}`,
  });
  return <ExpenseRegistration expenseAttributes={expenseAttributes} />;
};
export default ExpenseRegistrationPage;
