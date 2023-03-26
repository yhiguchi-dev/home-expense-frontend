import { type Pagination } from "@/lib/type/pagination";

export type ExpenseAttributeCategory = "固定費" | "変動費";

export type ExpenseAttributeCriteria = {
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
  return value === "固定費" || value === "変動費";
};
