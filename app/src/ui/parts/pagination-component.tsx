import React, { ReactElement } from "react";

import { paginate, Pagination } from "@/lib/pagination/pagination";

interface Props {
  pagination: Pagination;
  onMovePrevious: (page: number, perPage: number) => void;
  onMoveNext: (page: number, perPage: number) => void;
  onMovePage: (page: number, perPage: number) => void;
}

const PaginationComponent = ({
  pagination,
  onMovePrevious,
  onMoveNext,
  onMovePage,
}: Props): ReactElement => {
  console.log(pagination);
  const items = paginate(pagination);
  console.log(items);
  const { previous, next, current } = pagination;
  const handlePreviousClick = (): void => {
    if (previous) {
      console.log(previous);
      const { page, perPage } = previous;
      onMovePrevious(page, perPage);
    }
  };

  const handleNextClick = (): void => {
    if (next) {
      console.log(next);
      const { page, perPage } = next;
      onMoveNext(page, perPage);
    }
  };

  const paginationItem = items.map((value, index) => {
    if (typeof value === "string") {
      return (
        <div className="pagenation-text" key={index}>
          {value}
        </div>
      );
    }
    const { page } = value;
    const handleClick = (): void => {
      if (current.page !== page) {
        console.log(value);
        const { page, perPage } = value;
        onMovePage(page, perPage);
      }
    };
    return (
      <div className="pagenation-text" key={index} onClick={handleClick}>
        {page}
      </div>
    );
  });
  return (
    <div className="pagenation">
      <div className="pagenation-text" onClick={handlePreviousClick}>
        Previous
      </div>
      {paginationItem}
      <div className="pagenation-text" onClick={handleNextClick}>
        Next
      </div>
    </div>
  );
};
export default PaginationComponent;
