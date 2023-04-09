import { Box, Stack } from "@chakra-ui/react";
import React, { useRef } from "react";

import { paginate } from "@/lib/pagination";
import { type Pagination } from "@/lib/type/pagination";

type Props = {
  pagination: Pagination;
  onPreviousClick: (nextPage: number) => void;
  onNextClick: (nextPage: number) => void;
  onItemClick: (nextPage: number) => void;
};

const PaginationComponent = ({
  pagination,
  onPreviousClick,
  onNextClick,
  onItemClick,
}: Props): JSX.Element => {
  const items = paginate(pagination);
  const page = useRef(1);

  const handlePreviousClick = (): void => {
    const currentPage = page.current;
    if (currentPage === 1) {
      return;
    }
    page.current = currentPage - 1;
    onPreviousClick(page.current);
  };

  const handleNextClick = (): void => {
    const currentPage = page.current;
    if (currentPage === items.length) {
      return;
    }
    page.current = currentPage + 1;
    onNextClick(page.current);
  };

  const paginationItem = items.map((value, index) => {
    if (typeof value === "string") {
      return <Box key={index}>{value}</Box>;
    }
    const handleClick = (): void => {
      const currentPage = page.current;
      if (currentPage === value) {
        return;
      }
      page.current = value;
      onItemClick(page.current);
    };
    return (
      <Box
        key={index}
        onClick={handleClick}
        _hover={{
          background: "white",
          color: "teal.500",
        }}
      >
        {value}
      </Box>
    );
  });
  return (
    <Stack direction="row">
      <Box
        onClick={handlePreviousClick}
        _hover={{
          background: "white",
          color: "teal.500",
        }}
      >
        Previous
      </Box>
      {paginationItem}
      <Box
        onClick={handleNextClick}
        _hover={{
          background: "white",
          color: "teal.500",
        }}
      >
        Next
      </Box>
    </Stack>
  );
};
export default PaginationComponent;
