import type { ReactElement } from "react";

import { getExpenseAttribute } from "@/service/expense-attribute-service";
import ExpenseAttributeEdit from "@/ui/expense-attribute-edit";

interface Props {
  params: {
    id: string;
  };
}

const ExpenseAttributeEditPage = async ({
  params,
}: Props): Promise<ReactElement> => {
  const { id } = params;
  const expenseAttribute = await getExpenseAttribute({
    id,
    tag: `expense-attribute-${id}`,
  });
  return <ExpenseAttributeEdit expenseAttribute={expenseAttribute} />;
};
export default ExpenseAttributeEditPage;
