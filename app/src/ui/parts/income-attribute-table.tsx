import type React from "react";
import { type ReactElement, useState } from "react";

import { useDialog } from "@/lib/hooks/dialog";
import type { IncomeAttributes } from "@/lib/income-attribute";
import type { Pagination } from "@/lib/pagination/pagination";
import { deleteIncomeAttribute } from "@/service/income-attribute-service";
import Dialog from "@/ui/parts/dialog";
import style from "./expense-attribute-table.module.css";

interface Props {
  incomeAttributes: IncomeAttributes;
  pagination: Pagination;
  onEdit: (id: string) => void;
}

const IncomeAttributeTable = ({
  incomeAttributes,
  pagination,
  onEdit,
}: Props): ReactElement => {
  const { ref, onOpen, onClose } = useDialog();
  const [incomeAttributeId, setIncomeAttributeId] = useState("");
  const rows = incomeAttributes.map((value, index) => {
    const { id, name } = value;
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
        setIncomeAttributeId(id);
        onOpen();
      }
    };
    return (
      <tr key={index}>
        <td className={style.no}>{indexValue}</td>
        <td className={style.attribute}>{name}</td>
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
      <table className={style.expenseAttributeTable}>
        <thead>
          <tr>
            <th className={style.noHeader}>No.</th>
            <th className={style.attributeHeader}>属性名</th>
            <th className={style.editHeader}>編集</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
      <Dialog ref={ref} onClick={onClose}>
        {}
        <form action={deleteIncomeAttribute}>
          <h2>収入属性の削除</h2>
          <p>削除したデータは復元できません。削除しますか？</p>
          <input
            type="hidden"
            name="incomeAttributeId"
            value={incomeAttributeId}
          />
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
export default IncomeAttributeTable;
