import { expenseAttributesApi } from "@/lib/api/v1-expense-attributes";
import { type Pagination } from "@/lib/pagination";
import {
  type ExpenseAttribute,
  type ExpenseAttributeCriteria,
  type ExpenseAttributes,
  type ExpenseAttributeSummary,
  isExpenseAttributeCategory,
} from "@/lib/type/expense-attribute";

const get = async ({
  category,
  page,
  perPage,
}: ExpenseAttributeCriteria): Promise<ExpenseAttributeSummary> => {
  const { get } = expenseAttributesApi;
  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    total_number,
    page: _page,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    expense_attributes,
  } = await get({
    category,
    page,
    perPage,
  });
  const pagination: Pagination = {
    totalNumber: total_number,
    page: _page,
    perPage,
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

export const expenseAttributeService = {
  get,
  register,
};
