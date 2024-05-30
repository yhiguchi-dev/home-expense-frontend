"use client";
import { useRouter } from "next/navigation";
import type React from "react";
import { type ReactElement, useCallback } from "react";

import type { IncomeAttributes } from "@/lib/income-attribute";
import type { Pagination } from "@/lib/pagination/pagination";
import IncomeAttributeTable from "@/ui/parts/income-attribute-table";
import PaginationComponent from "@/ui/parts/pagination-component";

interface Props {
  incomeAttributes: IncomeAttributes;
  pagination: Pagination;
}

const IncomeAttribute = ({
  incomeAttributes,
  pagination,
}: Props): ReactElement => {
  const router = useRouter();
  const handleMovePrevious = useCallback(
    (page: number, perPage: number) => {
      const searchParams = new URLSearchParams({
        page: page.toString(),
        per_page: perPage.toString(),
      });
      router.push(`/income-attribute?${searchParams.toString()}`);
    },
    [router],
  );

  const handleMoveNext = useCallback(
    (page: number, perPage: number) => {
      const searchParams = new URLSearchParams({
        page: page.toString(),
        per_page: perPage.toString(),
      });
      router.push(`/income-attribute?${searchParams.toString()}`);
    },
    [router],
  );

  const handleMovePage = useCallback(
    (page: number, perPage: number) => {
      const searchParams = new URLSearchParams({
        page: page.toString(),
        per_page: perPage.toString(),
      });
      router.push(`/income-attribute?${searchParams.toString()}`);
    },
    [router],
  );

  const handleRegistrationClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>): void => {
      console.log(event);
      router.push("/income-attribute/registration");
    },
    [router],
  );

  const handleEdit = useCallback(
    (id: string) => {
      router.push(`/income-attribute/${id}`);
    },
    [router],
  );
  return (
    <div>
      <div className="foo">
        <div className="foo2">
          <IncomeAttributeTable
            incomeAttributes={incomeAttributes}
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
export default IncomeAttribute;
