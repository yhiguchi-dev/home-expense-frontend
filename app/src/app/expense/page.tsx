import React, { ReactElement } from "react";

import { isExpenseAttributeCategory } from "@/lib/expense-attribute";
import { getExpenseAttributeSummary } from "@/service/expense-attribute-service";
import { getExpenseSummary } from "@/service/expense-service";
import Expense from "@/ui/expense";

interface Props {
  searchParams: {
    page: number;
    perPage: number;
    year?: number;
    month?: number;
    category?: string;
    attributeName?: string;
  };
}

const ExpensePage = async ({ searchParams }: Props): Promise<ReactElement> => {
  const {
    page = 1,
    perPage = 20,
    year,
    month,
    category,
    attributeName,
  } = searchParams;
  const _category = isExpenseAttributeCategory(category) ? category : undefined;
  const getExpenseAttributeIfCategoryExists = async () => {
    if (_category) {
      const { expenseAttributes } = await getExpenseAttributeSummary({
        category: _category,
        page: 1,
        perPage: 100,
        tag: `expense-expense-attribute-${page}-${perPage}-${_category}`,
      });
      return expenseAttributes;
    }
    return [];
  };
  const expenseAttributes = await getExpenseAttributeIfCategoryExists();
  console.log(page, perPage);
  const { expenses, pagination } = await getExpenseSummary({
    page,
    perPage,
    year,
    month,
    category: _category,
    attributeName,
    tag: `expense-${page}-${perPage}-${year}-${month}-${category}-${attributeName}`,
  });
  console.log(pagination);
  console.log(month);
  return (
    <Expense
      expenses={expenses}
      pagination={pagination}
      year={year}
      month={month}
      category={_category}
      expenseAttributes={expenseAttributes}
      attributeName={attributeName}
    />
  );
};
export default ExpensePage;
