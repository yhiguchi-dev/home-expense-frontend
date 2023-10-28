"use server";
import { revalidateTag } from "next/cache";

import { expensesApi } from "@/lib/api/v1-expenses";
import { expensesAggregateApi } from "@/lib/api/v1-expenses-aggregate";
import { Expense, Expenses } from "@/lib/expense";
import { Pagination } from "@/lib/pagination/pagination";
import { isString } from "@/lib/type-guard";

export const getExpenseSummary = async ({
  page,
  perPage,
  tag,
}: {
  page: number;
  perPage: number;
  tag: string;
}): Promise<{
  expenses: Expenses;
  pagination: Pagination;
}> => {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  const { pagination, response } = await expensesApi.getSummary({
    page,
    perPage,
    extension: {
      next: { tags: [tag] },
    },
  });
  const { expenses } = response;
  const _expenses: Expenses = expenses.map((value) => {
    const {
      id,
      description,
      expense_attribute: expenseAttribute,
      price,
      payment_date: paymentDate,
    } = value;
    const { id: attributeId, name, category } = expenseAttribute;
    const expense: Expense = {
      id,
      description,
      price,
      paymentDate,
      attributeId,
      attributeName: name,
      category: category,
    };
    return expense;
  });
  return {
    expenses: _expenses,
    pagination,
  };
};

export const getExpenseAggregate = async ({
  year,
  month,
  tag,
}: {
  year: number;
  month: number;
  tag: string;
}): Promise<{
  totalAmount: number;
  fixed: {
    totalAmount: number;
    expenses: Expenses;
  };
  variable: {
    totalAmount: number;
    expenses: Expenses;
  };
}> => {
  const response = await expensesAggregateApi.get({
    year,
    month,
    extension: {
      next: { tags: [tag] },
    },
  });
  const { total_amount, variable_expense_detail, fixed_expense_detail } =
    response;
  const fixedExpenses: Expenses = fixed_expense_detail.expenses.map((value) => {
    const {
      id,
      description,
      expense_attribute: expenseAttribute,
      price,
      payment_date: paymentDate,
    } = value;
    const { id: attributeId, name, category } = expenseAttribute;
    const expense: Expense = {
      id,
      description,
      price,
      paymentDate,
      attributeId,
      attributeName: name,
      category: category,
    };
    return expense;
  });
  const variableExpenses: Expenses = variable_expense_detail.expenses.map(
    (value) => {
      const {
        id,
        description,
        expense_attribute: expenseAttribute,
        price,
        payment_date: paymentDate,
      } = value;
      const { id: attributeId, name, category } = expenseAttribute;
      const expense: Expense = {
        id,
        description,
        price,
        paymentDate,
        attributeId,
        attributeName: name,
        category: category,
      };
      return expense;
    },
  );
  return {
    totalAmount: total_amount,
    fixed: {
      totalAmount: fixed_expense_detail.total_amount,
      expenses: fixedExpenses,
    },
    variable: {
      totalAmount: variable_expense_detail.total_amount,
      expenses: variableExpenses,
    },
  };
};

export const getExpense = async ({
  id,
  tag,
}: {
  id: string;
  tag: string;
}): Promise<Expense> => {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  const response = await expensesApi.get({
    id,
    extension: {
      next: { tags: [tag] },
    },
  });
  const {
    description,
    expense_attribute: expenseAttribute,
    price,
    payment_date: paymentDate,
  } = response;
  const { id: attributeId, name, category } = expenseAttribute;
  return {
    id,
    description,
    price,
    paymentDate,
    attributeId,
    attributeName: name,
    category: category,
  };
};

export const registerExpense = async (formData: FormData): Promise<void> => {
  const id = formData.get("expenseId");
  const description = formData.get("description");
  const attributeId = formData.get("attributeId");
  const price = formData.get("price");
  const paymentDate = formData.get("paymentDate");
  if (
    isString(id) &&
    isString(description) &&
    isString(attributeId) &&
    isString(price) &&
    isString(paymentDate)
  ) {
    await expensesApi.post({
      description,
      attribute_id: attributeId,
      price: parseInt(price),
      payment_date: paymentDate,
    });
  }
};

export const updateExpense = async (formData: FormData): Promise<void> => {
  const id = formData.get("expenseId");
  const description = formData.get("description");
  const attributeId = formData.get("attributeId");
  const price = formData.get("price");
  const paymentDate = formData.get("paymentDate");
  console.log(description);
  if (
    isString(id) &&
    isString(description) &&
    isString(attributeId) &&
    isString(price) &&
    isString(paymentDate)
  ) {
    console.log(description);
    await expensesApi.put({
      id,
      description,
      attribute_id: attributeId,
      price: parseInt(price),
      payment_date: paymentDate,
    });
  }
};

export const deleteExpense = async (formData: FormData): Promise<void> => {
  const expenseId = formData.get("expenseId");
  if (isString(expenseId)) {
    await expensesApi.delete({ id: expenseId });
    revalidateTag("expense");
  }
};
