"use client";
import { useRouter } from "next/navigation";
import type React from "react";
import {
  type ChangeEvent,
  type ReactElement,
  useCallback,
  useState,
} from "react";

import type { Incomes } from "@/lib/income";
import type { Pagination } from "@/lib/pagination/pagination";
import IncomeTable from "@/ui/parts/income-table";
import PaginationComponent from "@/ui/parts/pagination-component";

interface Props {
  incomes: Incomes;
  pagination: Pagination;
  year: number;
}

const Income = ({ incomes, pagination, year }: Props): ReactElement => {
  const router = useRouter();
  const formattedYear = year.toString();
  const [displayYear, setDisplayYear] = useState(formattedYear);
  const handleYearChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const date = new Date(event.currentTarget.value);
      const year = date.getFullYear().toString();
      const searchParams = new URLSearchParams({
        year: year,
      }).toString();
      setDisplayYear(year);
      router.push(`/income?${searchParams}`);
    },
    [router],
  );
  const handleMovePrevious = useCallback(
    (page: number, perPage: number) => {
      const date = new Date(displayYear);
      const searchParams = new URLSearchParams({
        page: page.toString(),
        per_page: perPage.toString(),
        year: date.getFullYear().toString(),
      });
      router.push(`/income?${searchParams.toString()}`);
    },
    [router, displayYear],
  );

  const handleMoveNext = useCallback(
    (page: number, perPage: number) => {
      const date = new Date(displayYear);
      const searchParams = new URLSearchParams({
        page: page.toString(),
        per_page: perPage.toString(),
        year: date.getFullYear().toString(),
      });
      router.push(`/income?${searchParams.toString()}`);
    },
    [router, displayYear],
  );

  const handleMovePage = useCallback(
    (page: number, perPage: number) => {
      const date = new Date(displayYear);
      const searchParams = new URLSearchParams({
        page: page.toString(),
        per_page: perPage.toString(),
        year: date.getFullYear().toString(),
      });
      router.push(`/income?${searchParams.toString()}`);
    },
    [router, displayYear],
  );

  const handleRegistrationClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>): void => {
      console.log(event);
      router.push("/income/registration");
    },
    [router],
  );

  const handleEdit = useCallback(
    (id: string) => {
      router.push(`/income/${id}`);
    },
    [router],
  );

  return (
    <div>
      <div className="foo">
        <input
          className="category-box"
          type="number"
          min="1900"
          max="2099"
          step="1"
          value={displayYear}
          onChange={handleYearChange}
        />
        <div className="foo2">
          <IncomeTable
            incomes={incomes}
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
export default Income;
