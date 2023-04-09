import {
  atom,
  selector,
  useRecoilRefresher_UNSTABLE,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

import { expenseService } from "@/lib/service/expense-service";
import {
  type Expense,
  type ExpenseCriteria,
  type ExpenseSummary,
} from "@/lib/type/expense";

const expenseCriteriaState = atom<ExpenseCriteria>({
  key: "expenseCriteriaState",
  default: {
    page: 1,
    perPage: 20,
  },
});

const expenseState = atom<Expense>({
  key: "expenseState",
  default: {
    id: undefined,
    description: "",
    price: 0,
    paymentDate: "",
    attributeId: undefined,
    attributeName: undefined,
    category: undefined,
  },
});

const expenseQuery = selector({
  key: "expenseQuery",
  get: async ({ get }): Promise<ExpenseSummary> => {
    const criteria = get(expenseCriteriaState);
    return await expenseService.get(criteria);
  },
});

export const useExpense = (): Expense => {
  return useRecoilValue(expenseState);
};

export const useExpenseSummary = (): ExpenseSummary => {
  return useRecoilValue(expenseQuery);
};

export const useExpenseCriteriaMutation = (): {
  setExpenseCriteria: (
    valOrUpdater:
      | ((currVal: ExpenseCriteria) => ExpenseCriteria)
      | ExpenseCriteria
  ) => void;
} => {
  const setExpenseCriteria = useSetRecoilState(expenseCriteriaState);

  return {
    setExpenseCriteria,
  };
};

export const useExpenseMutation = (): {
  refresh: () => void;
  setExpense: (valOrUpdater: ((currVal: Expense) => Expense) | Expense) => void;
} => {
  const refresh = useRecoilRefresher_UNSTABLE(expenseQuery);
  const setExpense = useSetRecoilState(expenseState);
  return {
    refresh,
    setExpense,
  };
};
