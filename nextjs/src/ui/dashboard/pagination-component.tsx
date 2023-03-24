import React from "react";

import { useExpenseCriteriaMutation } from "@/hooks/store/expense-attribute";
import { paginate, type Pagination } from "@/lib/pagination";
import PaginationItem from "@/ui/dashboard/pagination-item";
import Box from "@/ui/parts/box";

type Props = {
  pagination: Pagination;
};

const PaginationComponent = ({ pagination }: Props): JSX.Element => {
  const { items } = paginate(pagination);
  const { setExpenseAttributeCriteria } = useExpenseCriteriaMutation();

  const handlePreviousClick = (): void => {
    setExpenseAttributeCriteria((currVal) => {
      const page = currVal.page === 1 ? currVal.page : currVal.page - 1;
      return {
        ...currVal,
        page,
      };
    });
  };

  const handleNextClick = (): void => {
    setExpenseAttributeCriteria((currVal) => {
      console.log(currVal.page, currVal.perPage);
      const page =
        currVal.page === items.length ? currVal.page : currVal.page + 1;
      return {
        ...currVal,
        page,
      };
    });
  };

  const paginationItem = items.map((value, index) => {
    const { perPage } = pagination;
    const param = {
      page: index + 1,
      perPage: perPage * index + 1,
    };
    const handleClick = (): void => {
      setExpenseAttributeCriteria((currVal) => {
        return {
          ...currVal,
          page: param.page,
        };
      });
    };
    return (
      <PaginationItem key={index} onClick={handleClick}>
        {param.page}
      </PaginationItem>
    );
  });
  return (
    <div className="flex justify-center">
      <nav aria-label="Page navigation example">
        <ul className="list-style-none flex">
          <li className="page-item">
            <button
              className="page-link relative block rounded rounded border-0 bg-transparent text-gray-800 outline-none transition-all duration-300 hover:bg-gray-200 hover:text-gray-800 focus:shadow-none"
              onClick={handlePreviousClick}
            >
              <Box paddingX="3" paddingY="1.5">
                Previous
              </Box>
            </button>
          </li>
          {paginationItem}
          <li className="page-item">
            <button
              className="page-link relative block rounded rounded border-0 bg-transparent text-gray-800 outline-none transition-all duration-300 hover:bg-gray-200 hover:text-gray-800 focus:shadow-none"
              onClick={handleNextClick}
            >
              <Box paddingX="3" paddingY="1.5">
                Next
              </Box>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default PaginationComponent;
