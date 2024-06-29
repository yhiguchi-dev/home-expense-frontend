import type React from "react";
import { type ReactElement, useState } from "react";

import type { Expenses } from "@/lib/expense";
import { useDialog } from "@/lib/hooks/dialog";
import type { Pagination } from "@/lib/pagination/pagination";
import { deleteExpense } from "@/service/expense-service";
import Dialog from "@/ui/parts/dialog";
import style from "./expense-table.module.css";

interface Props {
  expenses: Expenses;
  pagination: Pagination;
  onEdit: (id: string) => void;
}

const ExpenseTable = ({
  expenses,
  pagination,
  onEdit,
}: Props): ReactElement => {
  const { ref, onOpen, onClose } = useDialog();
  const [expenseId, setExpenseId] = useState("");
  const rows = expenses.map((value, index) => {
    const {
      id,
      description,
      price,
      // attributeId,
      attributeName,
      paymentDate,
      category,
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
        setExpenseId(id);
        onOpen();
      }
    };
    const formattedPrice = new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
    }).format(price);
    return (
      <tr key={index}>
        <td className={style.no}>{indexValue}</td>
        <td className={style.description}>{description}</td>
        <td className={style.price}>{formattedPrice}</td>
        <td className={style.paymentDate}>{paymentDate}</td>
        <td className={style.attribute}>{attributeName}</td>
        <td className={style.category}>{category}</td>
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
            <th className={style.paymentDateHeader}>支払日</th>
            <th className={style.attributeHeader}>属性名</th>
            <th className={style.categoryHeader}>分類</th>
            <th className={style.editHeader}></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
      <Dialog ref={ref} onClick={onClose}>
        {}
        <form action={deleteExpense}>
          <h2>経費の削除</h2>
          <p>削除したデータは復元できません。削除しますか？</p>
          <input type="hidden" name="expenseId" value={expenseId} />
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
export default ExpenseTable;
