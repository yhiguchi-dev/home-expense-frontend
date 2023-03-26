import { expenseAttributesApi } from "@/lib/api/v1-expense-attributes";
import {
  type ExpenseAttribute,
  type ExpenseAttributeCriteria,
  type ExpenseAttributes,
  type ExpenseAttributeSummary,
  isExpenseAttributeCategory,
} from "@/lib/type/expense-attribute";
import { type Pagination } from "@/lib/type/pagination";

const get = async ({
  page,
  perPage,
}: ExpenseAttributeCriteria): Promise<ExpenseAttributeSummary> => {
  const { get } = expenseAttributesApi;
  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    total_number,
    page: _page,
    perPage: _perPage,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    expense_attributes,
  } = await get({
    page,
    perPage,
  });
  const pagination: Pagination = {
    totalNumber: total_number,
    page: _page,
    perPage: _perPage,
  };
  const expenseAttributes: ExpenseAttributes = expense_attributes.map(
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
    expenseAttributes,
    pagination,
  };
};

const register = async ({
  name,
  category,
}: {
  name: string;
  category: string;
}): Promise<void> => {
  await expenseAttributesApi.post({ name, category });
};

const update = async ({
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

export const expenseAttributeService = {
  get,
  register,
  update,
};
