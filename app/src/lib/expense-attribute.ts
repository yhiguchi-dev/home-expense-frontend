export type ExpenseAttributeCategory = "固定費" | "変動費";

export interface ExpenseAttribute {
  id?: string;
  name: string;
  category: ExpenseAttributeCategory;
}

export type ExpenseAttributes = ExpenseAttribute[];

export const isExpenseAttributeCategory = (
  value: unknown,
): value is ExpenseAttributeCategory => {
  return value === "固定費" || value === "変動費";
};
