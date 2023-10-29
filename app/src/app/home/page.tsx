import React, { ReactElement } from "react";

import { getExpenseAggregate } from "@/service/expense-service";
import ExpenseAggregate from "@/ui/expense-aggregate";

interface Props {
  searchParams: {
    year: number;
    month: number;
  };
}

const HomePage = async ({ searchParams }: Props): Promise<ReactElement> => {
  const now = new Date(Date.now());
  const { year = now.getFullYear(), month = now.getMonth() + 1 } = searchParams;
  console.log(year, month);
  const aggregate = await getExpenseAggregate({
    year,
    month,
    tag: `expense-aggregate-${year}-${month}`,
  });
  const { totalAmount, fixed, variable } = aggregate;
  return (
    <ExpenseAggregate
      totalAmount={totalAmount}
      fixed={fixed}
      variable={variable}
    />
  );
};
export default HomePage;
