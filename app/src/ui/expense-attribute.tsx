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
  const handlePreviousClick = useCallback(
    (page: number, perPage: number) => {
      const searchParams = new URLSearchParams({
        page: page.toString(),
        per_page: perPage.toString(),
      });
      router.push(`/expense-attribute?${searchParams.toString()}`);
    },
    [router],
  );

  const handleNextClick = useCallback(
    (page: number, perPage: number) => {
      const searchParams = new URLSearchParams({
        page: page.toString(),
        per_page: perPage.toString(),
      });
      router.push(`/expense-attribute?${searchParams.toString()}`);
    },
    [router],
  );

  const handlePageClick = useCallback(
    (page: number, perPage: number) => {
      const searchParams = new URLSearchParams({
        page: page.toString(),
        per_page: perPage.toString(),
      });
      router.push(`/expense-attribute?${searchParams.toString()}`);
    },
    [router],
  );

  const handleRegistrationClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>): void => {
      console.log(event);
      router.push("/expense-attribute/registration");
    },
    [router],
  );

  const handleEditClick = useCallback(
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
        name="category"
        defaultValue={category}
        onChange={handleCategoryChange}
      >
        <option value="固定費">固定費</option>
        <option value="変動費">変動費</option>
      </select>
      <div>
        <div>
          <ExpenseAttributeTable
            expenseAttributes={expenseAttributes}
            pagination={pagination}
            onEdit={handleEditClick}
          />
        </div>
        <div>
          <PaginationComponent
            pagination={pagination}
            onMovePrevious={handlePreviousClick}
            onMoveNext={handleNextClick}
            onMovePage={handlePageClick}
          />
          <div>
            <button onClick={handleRegistrationClick}>追加</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ExpenseAttribute;
