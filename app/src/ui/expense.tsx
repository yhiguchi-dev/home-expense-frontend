"use client";
import { useRouter } from "next/navigation";
import React, { ReactElement, useCallback } from "react";

import { Expenses } from "@/lib/expense";
import { Pagination } from "@/lib/pagination/pagination";
import ExpenseTable from "@/ui/parts/expense-table";
import PaginationComponent from "@/ui/parts/pagination-component";

interface Props {
  expenses: Expenses;
  pagination: Pagination;
}

const Expense = ({ expenses, pagination }: Props): ReactElement => {
  const router = useRouter();
  const handlePreviousClick = useCallback(
    (page: number, perPage: number) => {
      const searchParams = new URLSearchParams({
        page: page.toString(),
        per_page: perPage.toString(),
      });
      router.push(`/expense?${searchParams.toString()}`);
    },
    [router],
  );

  const handleNextClick = useCallback(
    (page: number, perPage: number) => {
      const searchParams = new URLSearchParams({
        page: page.toString(),
        per_page: perPage.toString(),
      });
      router.push(`/expense?${searchParams.toString()}`);
    },
    [router],
  );

  const handlePageClick = useCallback(
    (page: number, perPage: number) => {
      const searchParams = new URLSearchParams({
        page: page.toString(),
        per_page: perPage.toString(),
      });
      router.push(`/expense?${searchParams.toString()}`);
    },
    [router],
  );

  const handleRegistrationClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>): void => {
      console.log(event);
      router.push("/expense/registration");
    },
    [router],
  );

  const handleEditClick = useCallback(
    (id: string) => {
      router.push(`/expense/${id}`);
    },
    [router],
  );

  return (
    <div>
      <div>
        <div>
          <ExpenseTable
            expenses={expenses}
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
export default Expense;
