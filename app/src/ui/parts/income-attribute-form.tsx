import React, { ReactElement } from "react";

import style from "./expense-attribute-form.module.css";
import { IncomeAttribute } from "@/lib/income-attribute";

interface Props {
  incomeAttribute?: IncomeAttribute | Record<string, never>;
  onSubmit: (formData: FormData) => void;
  buttonTitle: string;
}
const IncomeAttributeForm = ({
  incomeAttribute = {},
  onSubmit,
  buttonTitle,
}: Props): ReactElement => {
  const { id, name } = incomeAttribute;
  return (
    <form action={onSubmit} className={style.formStyle}>
      <input type="hidden" name="incomeAttributeId" value={id} />
      <div className={style.editStyle}>
        <label className={style.editLabel}>属性名</label>
        <input type="text" name="name" defaultValue={name} required />
      </div>
      <button type="submit">{buttonTitle}</button>
    </form>
  );
};

export default IncomeAttributeForm;
