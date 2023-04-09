import { Select } from "@chakra-ui/react";
import React from "react";

import { useExpense } from "@/hooks/store/expense";
import { useExpenseAttributeSummary } from "@/hooks/store/expense-attribute";

type Props = {
  defaultValue?: string;
} & React.ComponentProps<"select">;

const AttributeSelector = React.forwardRef<HTMLSelectElement, Props>(
  ({ onChange, defaultValue }, ref): JSX.Element => {
    const expenseAttributeSummary = useExpenseAttributeSummary();
    const { attributeId } = useExpense();
    const { expenseAttributes } = expenseAttributeSummary;
    console.log(attributeId);
    const selectorOptions = expenseAttributes.map((value, index) => {
      const { id, name } = value;
      console.log(id);
      return (
        <option key={index} value={id}>
          {name}
        </option>
      );
    });
    return (
      <Select defaultValue={defaultValue} onChange={onChange} ref={ref}>
        {selectorOptions}
      </Select>
    );
  }
);
AttributeSelector.displayName = "AttributeSelector";
export default AttributeSelector;
