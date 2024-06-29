"use server";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import { expenseAttributesApi } from "@/lib/api/v1-expense-attributes";
import {
  type ExpenseAttribute,
  type ExpenseAttributes,
  isExpenseAttributeCategory,
} from "@/lib/expense-attribute";
import type { Pagination } from "@/lib/pagination/pagination";
import { isString } from "@/lib/type-guard";

export const getExpenseAttributeSummary = async ({
  category,
  page,
  perPage,
  tag,
}: {
  category?: string;
  page: number;
  perPage: number;
  tag: string;
}): Promise<{
  expenseAttributes: ExpenseAttributes;
  pagination: Pagination;
}> => {
  const { pagination, response } = await expenseAttributesApi.getSummary({
    category,
    page,
    perPage,
    extension: {
      next: { tags: [tag] },
    },
  });
  const { expense_attributes: expenseAttributes } = response;
  const _expenseAttributes: ExpenseAttributes = expenseAttributes.map(
    (value) => {
      const { id, name, category } = value;
      const expenseAttribute: ExpenseAttribute = {
        id,
        name,
        category,
      };
      return expenseAttribute;
    },
  );
  return {
    expenseAttributes: _expenseAttributes,
    pagination,
  };
};

export const getExpenseAttribute = async ({
  id,
  tag,
}: {
  id: string;
  tag: string;
}): Promise<ExpenseAttribute> => {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  const response = await expenseAttributesApi.get({
    id,
    extension: {
      next: { tags: [tag] },
    },
  });
  const { id: attributeId, name, category } = response;
  return {
    id: attributeId,
    name,
    category,
  };
};

export const registerExpenseAttribute = async (
  formData: FormData,
): Promise<void> => {
  const name = formData.get("name");
  const category = formData.get("category");
  if (isString(name) && isExpenseAttributeCategory(category)) {
    await expenseAttributesApi.post({ name, category });
    redirect("/expense-attribute");
  }
};

export const updateExpenseAttribute = async (
  formData: FormData,
): Promise<void> => {
  const id = formData.get("expenseAttributeId");
  const name = formData.get("name");
  const category = formData.get("category");
  if (isString(id) && isString(name) && isExpenseAttributeCategory(category)) {
    await expenseAttributesApi.put({ id, name, category });
    redirect("/expense-attribute");
  }
};

export const deleteExpenseAttribute = async (
  formData: FormData,
): Promise<void> => {
  const id = formData.get("expenseAttributeId");
  if (isString(id)) {
    await expenseAttributesApi.delete({ id });
    revalidateTag("expense-attribute");
  }
};
