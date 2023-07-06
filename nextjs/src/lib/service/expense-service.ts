import { expensesApi } from "@/lib/api/v1-expenses";
import {
  type Expense,
  type ExpenseCriteria,
  type Expenses,
  type ExpenseSummary,
} from "@/lib/type/expense";
import { isExpenseAttributeCategory } from "@/lib/type/expense-attribute";
import { type Pagination } from "@/lib/type/pagination";

const _get = async ({
  page,
  perPage,
}: ExpenseCriteria): Promise<ExpenseSummary> => {
  const {
    total_number: totalNumber,
    page: _page,
    per_page: _perPage,
    expenses,
  } = await expensesApi.get({
    page,
    perPage,
  });
  const pagination: Pagination = {
    totalNumber,
    page: _page,
    perPage: _perPage,
  };
  const _expenses: Expenses = expenses.map((value) => {
    const {
      id,
      description,
      expense_attribute: expenseAttribute,
      price,
      payment_date: paymentDate,
    } = value;
    const { id: attributeId, name, category } = expenseAttribute;
    if (isExpenseAttributeCategory(category)) {
      const expense: Expense = {
        id,
        description,
        price,
        paymentDate,
        attributeId,
        attributeName: name,
        category,
      };
      return expense;
    }
    // TODO
    const expense: Expense = {
      id,
      description,
      price,
      paymentDate,
      attributeId,
      attributeName,
      category,
    };
    return expense;
  });
  return {
    expenses: _expenses,
    pagination,
  };
};

const _register = async ({
  description,
  attributeId,
  price,
  paymentDate,
}: {
  description: string;
  attributeId: string;
  price: number;
  paymentDate: string;
}): Promise<void> => {
  await expensesApi.post({
    description,
    attribute_id: attributeId,
    price,
    payment_date: paymentDate,
  });
};

const _update = async ({
  id,
  description,
  attributeId,
  price,
  paymentDate,
}: {
  id: string;
  description: string;
  attributeId: string;
  price: number;
  paymentDate: string;
}): Promise<void> => {
  await expensesApi.put({
    id,
    description,
    attribute_id: attributeId,
    price,
    payment_date: paymentDate,
  });
};

const _delete = async ({ id }: { id: string }): Promise<void> => {
  await expensesApi.delete({ id });
};

export const expenseService = {
  get: _get,
  register: _register,
  update: _update,
  delete: _delete,
};
