import React, { ReactElement } from "react";

import { ExpenseAttribute } from "@/lib/expense-attribute";

interface Props {
  expenseAttribute?: ExpenseAttribute | Record<string, never>;
  onSubmit: (formData: FormData) => void;
  buttonTitle: string;
}
const ExpenseAttributeForm = ({
  expenseAttribute = {},
  onSubmit,
  buttonTitle,
}: Props): ReactElement => {
  const { id, name, category } = expenseAttribute;
  return (
    <form action={onSubmit}>
      <input type="hidden" name="expenseAttributeId" value={id} />
      <label className="form-edit-label">属性名</label>
      <input type="text" name="name" defaultValue={name} required />
      <label className="form-edit-label">分類</label>
      <select name="category" defaultValue={category}>
        <option value="固定費">固定費</option>
        <option value="変動費">変動費</option>
      </select>
      <button type="submit">{buttonTitle}</button>
    </form>
  );
};

export default ExpenseAttributeForm;
