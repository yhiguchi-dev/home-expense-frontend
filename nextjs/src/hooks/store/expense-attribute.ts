import {
  atom,
  selector,
  useRecoilRefresher_UNSTABLE,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

import { expenseAttributeService } from "@/lib/service/expense-attribute-service";
import {
  type ExpenseAttributeCriteria,
  type ExpenseAttributeSummary,
} from "@/lib/type/expense-attribute";

const expenseAttributeCriteriaState = atom<ExpenseAttributeCriteria>({
  key: "expenseAttributeCriteriaState",
  default: {
    category: "fixed",
    page: 1,
    perPage: 20,
  },
});

const expenseAttributeQuery = selector({
  key: "expenseAttributeQuery",
  get: async ({ get }): Promise<ExpenseAttributeSummary> => {
    const criteria = get(expenseAttributeCriteriaState);
    return expenseAttributeService.get(criteria);
  },
});

export const useExpenseAttributeSummary = (): ExpenseAttributeSummary => {
  return useRecoilValue(expenseAttributeQuery);
};

export const useExpenseCriteriaMutation = (): {
  setExpenseAttributeCriteria: (
    valOrUpdater:
      | ((currVal: ExpenseAttributeCriteria) => ExpenseAttributeCriteria)
      | ExpenseAttributeCriteria
  ) => void;
} => {
  const setExpenseAttributeCriteria = useSetRecoilState(
    expenseAttributeCriteriaState
  );

  return {
    setExpenseAttributeCriteria,
  };
};

export const useExpenseAttributeMutation = (): { refresh: () => void } => {
  const refresh = useRecoilRefresher_UNSTABLE(expenseAttributeQuery);

  return {
    refresh,
  };
};
