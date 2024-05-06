import { ReactElement } from "react";

import style from "./expense-form.module.css";
import { Income } from "@/lib/income";
import { IncomeAttributes } from "@/lib/income-attribute";

interface Props {
  income?: Income | Record<string, never>;
  incomeAttributes: IncomeAttributes;
  onSubmit: (formData: FormData) => void;
  buttonTitle: string;
}
const IncomeForm = ({
  income = {},
  incomeAttributes,
  onSubmit,
  buttonTitle,
}: Props): ReactElement => {
  const { id, description, amount, receiveDate, attributeId } = income;
  const selectorOptions = incomeAttributes.map((value, index) => {
    const { id, name } = value;
    console.log(id);
    return (
      <option key={index} value={id}>
        {name}
      </option>
    );
  });
  return (
    <form action={onSubmit} className={style.formStyle}>
      <input type="hidden" name="incomeId" value={id} />
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
          name="amount"
          inputMode="numeric"
          defaultValue={amount}
          required
        />
      </div>
      <div className={style.editStyle}>
        <label>支払日</label>
        <input
          type="date"
          name="receiveDate"
          defaultValue={receiveDate}
          required
        />
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

export default IncomeForm;
