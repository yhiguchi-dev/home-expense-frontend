"use client";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, ReactElement, useCallback, useState } from "react";

import { Expenses } from "@/lib/expense";
import { Pagination } from "@/lib/pagination/pagination";
import ExpenseTable from "@/ui/parts/expense-table";
import PaginationComponent from "@/ui/parts/pagination-component";

interface Props {
  expenses: Expenses;
  pagination: Pagination;
  year: number;
  month: number;
}

const Expense = ({
  expenses,
  pagination,
  year,
  month,
}: Props): ReactElement => {
  const router = useRouter();
  const formattedYear = year.toString().padStart(2, "0");
  const formattedMonth = month.toString().padStart(2, "0");
  const [yearMonth, setYearMonth] = useState(
    `${formattedYear}-${formattedMonth}`,
  );
  const handleYearMonthChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const date = new Date(event.currentTarget.value);
      const year = date.getFullYear().toString();
      const month = (date.getMonth() + 1).toString();
      const searchParams = new URLSearchParams({
        year: year,
        month: month,
      }).toString();
      setYearMonth(`${year.padStart(2, "0")}-${month.padStart(2, "0")}`);
      router.push(`/expense?${searchParams}`);
    },
    [router],
  );
  const handleMovePrevious = useCallback(
    (page: number, perPage: number) => {
      const date = new Date(yearMonth);
      const searchParams = new URLSearchParams({
        page: page.toString(),
        per_page: perPage.toString(),
        year: date.getFullYear().toString(),
        month: (date.getMonth() + 1).toString(),
      });
      router.push(`/expense?${searchParams.toString()}`);
    },
    [router, yearMonth],
  );

  const handleMoveNext = useCallback(
    (page: number, perPage: number) => {
      const date = new Date(yearMonth);
      const searchParams = new URLSearchParams({
        page: page.toString(),
        per_page: perPage.toString(),
        year: date.getFullYear().toString(),
        month: (date.getMonth() + 1).toString(),
      });
      router.push(`/expense?${searchParams.toString()}`);
    },
    [router, yearMonth],
  );

  const handleMovePage = useCallback(
    (page: number, perPage: number) => {
      const date = new Date(yearMonth);
      const searchParams = new URLSearchParams({
        page: page.toString(),
        per_page: perPage.toString(),
        year: date.getFullYear().toString(),
        month: (date.getMonth() + 1).toString(),
      });
      router.push(`/expense?${searchParams.toString()}`);
    },
    [router, yearMonth],
  );

  const handleRegistrationClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>): void => {
      console.log(event);
      router.push("/expense/registration");
    },
    [router],
  );

  const handleEdit = useCallback(
    (id: string) => {
      router.push(`/expense/${id}`);
    },
    [router],
  );

  return (
    <div>
      <div className="foo">
        <input
          className="category-box"
          type="month"
          value={yearMonth}
          onChange={handleYearMonthChange}
        />
        <div className="foo2">
          <ExpenseTable
            expenses={expenses}
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
export default Expense;
