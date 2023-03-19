import { type Pagination } from "@/lib/pagination";

export type ExpenseAttributeCategory = "fixed" | "variable";

export type ExpenseAttributeCriteria = {
  category: ExpenseAttributeCategory;
  page: number;
  perPage: number;
};

export type ExpenseAttribute = {
  id?: string;
  name: string;
  category: ExpenseAttributeCategory;
};

export type ExpenseAttributes = ExpenseAttribute[];

export type ExpenseAttributeSummary = {
  expenseAttributes: ExpenseAttributes;
  pagination: Pagination;
};

export const isExpenseAttributeCategory = (
  value: unknown
): value is ExpenseAttributeCategory => {
  return value === "fixed" || value === "variable";
};

export const getCategoryName = (category: ExpenseAttributeCategory): string => {
  switch (category) {
    case "fixed":
      return "固定費";
    case "variable":
      return "変動費";
  }
};
