export interface Income {
  id?: string;
  description: string;
  amount: number;
  receiveDate: string;
  attributeId?: string;
  attributeName?: string;
}

export type Incomes = Income[];
