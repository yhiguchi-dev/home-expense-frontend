import { expenseAttributesApi } from "@/lib/api/v1-expense-attributes";
import { delay } from "@/lib/promise";
import {
  type ExpenseAttribute,
  type ExpenseAttributeCriteria,
  type ExpenseAttributes,
  type ExpenseAttributeSummary,
  isExpenseAttributeCategory,
} from "@/lib/type/expense-attribute";
import { type Pagination } from "@/lib/type/pagination";

const _get = async ({
  category,
  page,
  perPage,
}: ExpenseAttributeCriteria): Promise<ExpenseAttributeSummary> => {
  await delay(1000);
  const {
    total_number: totalNumber,
    page: _page,
    per_page: _perPage,
    expense_attributes: expenseAttributes,
  } = await expenseAttributesApi.get({
    category,
    page,
    perPage,
  });
  const pagination: Pagination = {
    totalNumber,
    page: _page,
    perPage: _perPage,
  };
  const _expenseAttributes: ExpenseAttributes = expenseAttributes.map(
    (value) => {
      const { id, name, category } = value;
      if (isExpenseAttributeCategory(category)) {
        const expenseAttribute: ExpenseAttribute = {
          id,
          name,
          category,
        };
        return expenseAttribute;
      }
      throw Error("");
    }
  );
  return {
    expenseAttributes: _expenseAttributes,
    pagination,
  };
};

const _register = async ({
  name,
  category,
}: {
  name: string;
  category: string;
}): Promise<void> => {
  await expenseAttributesApi.post({ name, category });
};

const _update = async ({
  id,
  name,
  category,
}: {
  id: string;
  name: string;
  category: string;
}): Promise<void> => {
  await expenseAttributesApi.put({ id, name, category });
};

const _delete = async ({ id }: { id: string }): Promise<void> => {
  await expenseAttributesApi.delete({ id });
};

export const expenseAttributeService = {
  get: _get,
  register: _register,
  update: _update,
  delete: _delete,
};
