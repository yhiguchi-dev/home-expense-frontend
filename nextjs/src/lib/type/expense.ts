import { type Pagination } from "@/lib/type/pagination";

export type ExpenseCriteria = {
  page: number;
  perPage: number;
};

export type Expense = {
  id?: string;
  description: string;
  price: number;
  paymentDate: string;
  attributeId?: string;
  attributeName?: string;
  category?: string;
};

export type Expenses = Expense[];

export type ExpenseSummary = {
  expenses: Expenses;
  pagination: Pagination;
};
