import React, { ReactElement } from "react";

import style from "./expense-attribute-form.module.css";
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
    <form action={onSubmit} className={style.formStyle}>
      <input type="hidden" name="expenseAttributeId" value={id} />
      <div className={style.editStyle}>
        <label className={style.editLabel}>属性名</label>
        <input type="text" name="name" defaultValue={name} required />
      </div>
      <div className={style.editStyle}>
        <label className={style.editLabel}>分類</label>
        <select name="category" defaultValue={category}>
          <option value="固定費">固定費</option>
          <option value="変動費">変動費</option>
        </select>
      </div>
      <button type="submit">{buttonTitle}</button>
    </form>
  );
};

export default ExpenseAttributeForm;
