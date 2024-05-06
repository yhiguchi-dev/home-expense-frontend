"use client";
import { useRouter } from "next/navigation";
import React, {
  ChangeEvent,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from "react";

import { Expenses } from "@/lib/expense";
import {
  ExpenseAttributeCategory,
  ExpenseAttributes,
  isExpenseAttributeCategory,
} from "@/lib/expense-attribute";
import { Pagination } from "@/lib/pagination/pagination";
import style from "@/ui/parts/expense-form.module.css";
import ExpenseTable from "@/ui/parts/expense-table";
import PaginationComponent from "@/ui/parts/pagination-component";

interface Props {
  expenses: Expenses;
  pagination: Pagination;
  year?: number;
  month?: number;
  category?: ExpenseAttributeCategory;
  expenseAttributes: ExpenseAttributes;
  attributeId?: string;
}

const generateYearArray = () => {
  const years: number[] = [];
  for (let i = 2000; i <= 2100; i++) {
    years.push(i);
  }
  return years;
};

const generateMonthArray = () => {
  const months = [];
  for (let i = 1; i <= 12; i++) {
    months.push(i);
  }
  return months;
};

const Expense = ({
  expenses,
  pagination,
  year,
  month,
  category,
  expenseAttributes,
  attributeId,
}: Props): ReactElement => {
  const router = useRouter();

  const [queryParam, setQueryParam] = useState({
    ...(year && { year: year.toString() }),
    ...(month && { month: month.toString() }),
    ...(category && { category }),
    ...(attributeId && { attributeId }),
  });

  useEffect(() => {
    router.refresh();
  }, [router]);

  const cleanUpObject = (obj: object) => {
    return Object.entries(obj)
      .filter((value) => {
        const [, v] = value;
        return v !== undefined;
      })
      .reduce((previousValue, currentValue) => {
        const [k, v] = currentValue;
        return {
          ...previousValue,
          [k]: v,
        };
      }, {});
  };

  const handleYearChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const year = event.currentTarget.value;
      const _query = {
        ...queryParam,
        year,
        page: undefined,
        per_page: undefined,
      };
      setQueryParam(cleanUpObject(_query));
      const searchParams = new URLSearchParams({
        ...cleanUpObject(_query),
      }).toString();
      router.push(`/expense?${searchParams}`);
    },
    [router, queryParam],
  );

  const handleMonthChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const month = event.currentTarget.value;
      const _query = cleanUpObject({
        ...queryParam,
        ...(month !== "" ? { month } : { month: undefined }),
        page: undefined,
        per_page: undefined,
      });
      setQueryParam(_query);
      const searchParams = new URLSearchParams({
        ..._query,
      }).toString();
      router.push(`/expense?${searchParams}`);
    },
    [router, queryParam],
  );

  const handleCategoryChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const _category = event.currentTarget.value;
      if (isExpenseAttributeCategory(_category)) {
        const _query = cleanUpObject({
          ...queryParam,
          category: _category,
          page: undefined,
          per_page: undefined,
        });
        const searchParams = new URLSearchParams(_query).toString();
        setQueryParam(_query);
        router.push(`/expense?${searchParams}`);
        return;
      }
      const _query = cleanUpObject({
        ...queryParam,
        category: undefined,
        attributeId: undefined,
        page: undefined,
        per_page: undefined,
      });
      const searchParams = new URLSearchParams(_query).toString();
      router.push(`/expense?${searchParams}`);
    },
    [router, queryParam],
  );

  const handleAttributeIdChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const attributeId = event.currentTarget.value;
      const _query = cleanUpObject({
        ...queryParam,
        ...(attributeId !== "" ? { attributeId } : { attributeId: undefined }),
        page: undefined,
        per_page: undefined,
      });
      const searchParams = new URLSearchParams({
        ..._query,
      }).toString();
      setQueryParam(_query);
      router.push(`/expense?${searchParams}`);
    },
    [router, queryParam],
  );

  const handleMovePrevious = useCallback(
    (page: number, perPage: number) => {
      const _query = {
        ...queryParam,
        page: page.toString(),
        per_page: perPage.toString(),
      };
      const searchParams = new URLSearchParams(_query);
      setQueryParam(_query);
      router.push(`/expense?${searchParams.toString()}`);
    },
    [router, queryParam],
  );

  const handleMoveNext = useCallback(
    (page: number, perPage: number) => {
      const _query = {
        ...queryParam,
        page: page.toString(),
        per_page: perPage.toString(),
      };
      const searchParams = new URLSearchParams(_query);
      setQueryParam(_query);
      router.push(`/expense?${searchParams.toString()}`);
    },
    [router, queryParam],
  );

  const handleMovePage = useCallback(
    (page: number, perPage: number) => {
      const _query = {
        ...queryParam,
        page: page.toString(),
        per_page: perPage.toString(),
      };
      const searchParams = new URLSearchParams(_query);
      setQueryParam(_query);
      router.push(`/expense?${searchParams.toString()}`);
    },
    [router, queryParam],
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

  const yearOptions = generateYearArray().map((value, index) => {
    return (
      <option key={index} value={value}>
        {value}
      </option>
    );
  });

  const monthOptions = generateMonthArray().map((value, index) => {
    return (
      <option key={index + 1} value={value}>
        {value}
      </option>
    );
  });

  const expenseAttributesOptions = expenseAttributes.map((value, index) => {
    const { id, name } = value;
    console.log(id);
    return (
      <option key={index + 1} value={id}>
        {name}
      </option>
    );
  });

  return (
    <div>
      <div className="foo">
        <select name="year" value={queryParam.year} onChange={handleYearChange}>
          {yearOptions}
        </select>
        <label>年</label>
        <select
          name="month"
          value={queryParam.month}
          onChange={handleMonthChange}
        >
          <option value="" />
          {monthOptions}
        </select>
        <label>月</label>
        <div className={style.editStyle}>
          <label>分類</label>
          <select
            name="category"
            defaultValue={queryParam.category}
            onChange={handleCategoryChange}
          >
            <option value="" />
            <option value="固定費">固定費</option>
            <option value="変動費">変動費</option>
          </select>
          <label>属性名</label>
          <select
            name="attributeId"
            defaultValue={queryParam.attributeId}
            onChange={handleAttributeIdChange}
          >
            <option value="" />
            {expenseAttributesOptions}
          </select>
        </div>
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
