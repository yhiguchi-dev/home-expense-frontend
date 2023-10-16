export interface Expense {
  id?: string;
  description: string;
  price: number;
  paymentDate: string;
  attributeId?: string;
  attributeName?: string;
  category?: string;
}

export type Expenses = Expense[];
