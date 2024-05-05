import React, { ReactElement, useState } from "react";

import style from "./expense-table.module.css";
import { useDialog } from "@/lib/hooks/dialog";
import { Incomes } from "@/lib/income";
import { Pagination } from "@/lib/pagination/pagination";
import { deleteIncome } from "@/service/income-service";
import Dialog from "@/ui/parts/dialog";

interface Props {
  incomes: Incomes;
  pagination: Pagination;
  onEdit: (id: string) => void;
}

const IncomeTable = ({ incomes, pagination, onEdit }: Props): ReactElement => {
  const { ref, onOpen, onClose } = useDialog();
  const [incomeId, setIncomeId] = useState("");
  const rows = incomes.map((value, index) => {
    const {
      id,
      description,
      amount,
      // attributeId,
      attributeName,
      receiveDate,
    } = value;
    const { page, perPage } = pagination.current;
    const indexValue = index + 1 + (page - 1) * perPage;
    const handleEditClick = (
      event: React.MouseEvent<HTMLButtonElement>,
    ): void => {
      console.log(event);
      if (id) {
        onEdit(id);
      }
    };
    const handleTrashClick = (
      event: React.MouseEvent<HTMLButtonElement>,
    ): void => {
      console.log(event);
      if (id) {
        setIncomeId(id);
        onOpen();
      }
    };
    const formattedPrice = new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
    }).format(amount);
    return (
      <tr key={index}>
        <td className={style.no}>{indexValue}</td>
        <td className={style.description}>{description}</td>
        <td className={style.price}>{formattedPrice}</td>
        <td className={style.paymentDate}>{receiveDate}</td>
        <td className={style.attribute}>{attributeName}</td>
        <td className={style.edit}>
          <div>
            <button onClick={handleEditClick}>edit</button>
            <button onClick={handleTrashClick}>delete</button>
          </div>
        </td>
      </tr>
    );
  });

  const handleCancelClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ): void => {
    console.log(event);
    onClose();
  };
  const handleDeleteClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ): void => {
    console.log(event);
    onClose();
  };
  return (
    <>
      <table className={style.expenseTable}>
        <thead>
          <tr>
            <th className={style.noHeader}>#</th>
            <th className={style.descriptionHeader}>説明</th>
            <th className={style.priceHeader}>金額</th>
            <th className={style.paymentDateHeader}>受取日</th>
            <th className={style.attributeHeader}>属性名</th>
            <th className={style.editHeader}></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
      <Dialog ref={ref} onClick={onClose}>
        {}
        <form action={deleteIncome}>
          <h2>収入の削除</h2>
          <p>削除したデータは復元できません。削除しますか？</p>
          <input type="hidden" name="incomeId" value={incomeId} />
          <button type="button" onClick={handleCancelClick}>
            キャンセル
          </button>
          <button type="submit" onClick={handleDeleteClick}>
            削除
          </button>
        </form>
      </Dialog>
    </>
  );
};
export default IncomeTable;
