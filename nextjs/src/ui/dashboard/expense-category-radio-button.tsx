import React, { useState } from "react";

import { isHTMLInputElement } from "@/lib/type/event";
import {
  type ExpenseAttributeCategory,
  getCategoryName,
} from "@/lib/type/expense-attribute";
import Box from "@/ui/parts/box";
import HStack from "@/ui/parts/h-stack";

const ExpenseCategoryRadioButton = (): JSX.Element => {
  const [category, setCategory] = useState("fixed");
  const handleClick = (event: React.MouseEvent<HTMLInputElement>): void => {
    if (isHTMLInputElement(event.target)) {
      const { value } = event.target;
      setCategory(value);
    }
  };
  const array: ExpenseAttributeCategory[] = ["fixed", "variable"];
  const items = array.map((value, index) => {
    const categoryName = getCategoryName(value);
    return (
      <div key={index} className="form-check flex items-center">
        <input
          className="form-check-input float-left h-4 w-4 cursor-pointer appearance-none rounded-full border border-gray-300 bg-white bg-contain bg-center bg-no-repeat align-top transition duration-200 checked:border-blue-600 checked:bg-blue-600 focus:outline-none"
          type="radio"
          value={value}
          name="expenseCategoryRadio"
          id={index.toString()}
          onClick={handleClick}
          checked={value === category}
        />
        <label
          className="form-check-label inline-block text-gray-800"
          htmlFor={index.toString()}
        >
          <Box marginX="2">{categoryName}</Box>
        </label>
      </div>
    );
  });
  return (
    <div className="flex justify-center">
      <HStack spacing="2">{items}</HStack>
    </div>
  );
};
export default ExpenseCategoryRadioButton;
