"use client";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, ReactElement, useCallback } from "react";

import { ExpenseAttributes } from "@/lib/expense-attribute";
import { Pagination } from "@/lib/pagination/pagination";
import ExpenseAttributeTable from "@/ui/parts/expense-attribute-table";
import PaginationComponent from "@/ui/parts/pagination-component";

interface Props {
  category: string;
  expenseAttributes: ExpenseAttributes;
  pagination: Pagination;
}

const ExpenseAttribute = ({
  category,
  expenseAttributes,
  pagination,
}: Props): ReactElement => {
  const router = useRouter();
  const handleMovePrevious = useCallback(
    (page: number, perPage: number) => {
      const searchParams = new URLSearchParams({
        category,
        page: page.toString(),
        per_page: perPage.toString(),
      });
      router.push(`/expense-attribute?${searchParams.toString()}`);
    },
    [category, router],
  );

  const handleMoveNext = useCallback(
    (page: number, perPage: number) => {
      const searchParams = new URLSearchParams({
        category,
        page: page.toString(),
        per_page: perPage.toString(),
      });
      router.push(`/expense-attribute?${searchParams.toString()}`);
    },
    [category, router],
  );

  const handleMovePage = useCallback(
    (page: number, perPage: number) => {
      const searchParams = new URLSearchParams({
        category,
        page: page.toString(),
        per_page: perPage.toString(),
      });
      router.push(`/expense-attribute?${searchParams.toString()}`);
    },
    [category, router],
  );

  const handleRegistrationClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>): void => {
      console.log(event);
      router.push("/expense-attribute/registration");
    },
    [router],
  );

  const handleEdit = useCallback(
    (id: string) => {
      router.push(`/expense-attribute/${id}`);
    },
    [router],
  );

  const handleCategoryChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const searchParams = new URLSearchParams({
        category: event.currentTarget.value,
      }).toString();
      router.push(`/expense-attribute?${searchParams}`);
    },
    [router],
  );
  return (
    <div>
      <select
        className="category-box"
        name="category"
        defaultValue={category}
        onChange={handleCategoryChange}
      >
        <option value="固定費">固定費</option>
        <option value="変動費">変動費</option>
      </select>
      <div className="foo">
        <div className="foo2">
          <ExpenseAttributeTable
            expenseAttributes={expenseAttributes}
            pagination={pagination}
            onEdit={handleEdit}
          />
        </div>
        <PaginationComponent
          pagination={pagination}
          onMovePrevious={handleMovePrevious}
          onMoveNext={handleMoveNext}
          onMovePage={handleMovePage}
        />
        <div className="add">
          <button onClick={handleRegistrationClick}>追加</button>
        </div>
      </div>
    </div>
  );
};
export default ExpenseAttribute;
