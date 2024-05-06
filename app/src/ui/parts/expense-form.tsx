import { ChangeEvent, ReactElement } from "react";

import style from "./expense-form.module.css";
import { Expense } from "@/lib/expense";
import { ExpenseAttributes } from "@/lib/expense-attribute";

interface Props {
  expense?: Expense | Record<string, never>;
  expenseAttributes: ExpenseAttributes;
  onCategoryChange: (category: string) => void;
  onSubmit: (formData: FormData) => void;
  buttonTitle: string;
}
const ExpenseForm = ({
  expense = {},
  expenseAttributes,
  onCategoryChange,
  onSubmit,
  buttonTitle,
}: Props): ReactElement => {
  const { id, description, category, price, paymentDate, attributeId } =
    expense;
  const selectorOptions = expenseAttributes.map((value, index) => {
    const { id, name } = value;
    console.log(id);
    return (
      <option key={index} value={id}>
        {name}
      </option>
    );
  });
  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onCategoryChange(event.currentTarget.value);
  };
  return (
    <form action={onSubmit} className={style.formStyle}>
      <input type="hidden" name="expenseId" value={id} />
      <div className={style.editStyle}>
        <label>説明</label>
        <input
          type="text"
          name="description"
          defaultValue={description}
          required
        />
      </div>
      <div className={style.editStyle}>
        <label>金額</label>
        <input
          type="text"
          name="price"
          inputMode="numeric"
          defaultValue={price}
          required
        />
      </div>
      <div className={style.editStyle}>
        <label>支払日</label>
        <input
          type="date"
          name="paymentDate"
          defaultValue={paymentDate}
          required
        />
      </div>
      <div className={style.editStyle}>
        <label>分類</label>
        <select
          name="category"
          defaultValue={category}
          onChange={handleCategoryChange}
        >
          <option value="固定費">固定費</option>
          <option value="変動費">変動費</option>
        </select>
      </div>
      <div className={style.editStyle}>
        <label>属性名</label>
        <select name="attributeId" defaultValue={attributeId}>
          {selectorOptions}
        </select>
      </div>
      <button type="submit">{buttonTitle}</button>
    </form>
  );
};

export default ExpenseForm;
