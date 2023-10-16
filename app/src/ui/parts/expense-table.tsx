import React, { ReactElement, useState } from "react";

import { Expenses } from "@/lib/expense";
import { useDialog } from "@/lib/hooks/dialog";
import { Pagination } from "@/lib/pagination/pagination";
import { deleteExpense } from "@/service/expense-service";
import Dialog from "@/ui/parts/dialog";

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
        <td>{indexValue}</td>
        <td>{description}</td>
        <td>{formattedPrice}</td>
        <td>{paymentDate}</td>
        <td>{attributeName}</td>
        <td>{category}</td>
        <td>
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
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>説明</th>
            <th>金額</th>
            <th>支払日</th>
            <th>属性名</th>
            <th>分類</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
      <Dialog ref={ref} onClick={onClose}>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
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
