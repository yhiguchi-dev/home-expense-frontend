"use client";
import { Box, Center, Flex, IconButton } from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import React, { Suspense, useCallback } from "react";

import { useDoubleClickPrevention } from "@/hooks/double-click-prevention";
import {
  useExpenseCriteriaMutation,
  useExpenseSummary,
} from "@/hooks/store/expense";
import { useExpenseAttributeCriteriaMutation } from "@/hooks/store/expense-attribute";
import ExpenseTable from "@/ui/dashboard/expense-table";
import PaginationComponent from "@/ui/dashboard/pagination-component";

const Expense = (): JSX.Element => {
  const { expenses, pagination } = useExpenseSummary();
  const { setExpenseCriteria } = useExpenseCriteriaMutation();
  const { setExpenseAttributeCriteria } = useExpenseAttributeCriteriaMutation();
  const router = useRouter();
  const { fn: handlePreviousClick } = useDoubleClickPrevention(
    async (nextPage: number): Promise<void> => {
      setExpenseCriteria((currVal) => {
        return {
          ...currVal,
          page: nextPage,
        };
      });
    }
  );
  const { fn: handleNextClick } = useDoubleClickPrevention(
    async (nextPage: number): Promise<void> => {
      setExpenseCriteria((currVal) => {
        return {
          ...currVal,
          page: nextPage,
        };
      });
    }
  );
  const { fn: handleItemClick } = useDoubleClickPrevention(
    async (nextPage: number): Promise<void> => {
      setExpenseCriteria((currVal) => {
        return {
          ...currVal,
          page: nextPage,
        };
      });
    }
  );

  const handleRegistrationClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>): void => {
      console.log(event);
      setExpenseAttributeCriteria((currVal) => {
        return {
          ...currVal,
          category: "固定費",
          page: 1,
          perPage: 100,
        };
      });
      router.push("/home/expense/registration");
    },
    [router, setExpenseAttributeCriteria]
  );

  return (
    <Box
      bg="white"
      rounded="2xl"
      shadow="base"
      width="2xl"
      height="xl"
      overflow="hidden"
    >
      <Suspense fallback={<div>loading</div>}>
        <Flex
          direction="column"
          height="inherit"
          justifyContent="space-between"
        >
          <Box overflowY="scroll">
            <ExpenseTable expenses={expenses} pagination={pagination} />
          </Box>
          <Center position="relative" padding={4}>
            <PaginationComponent
              pagination={pagination}
              onPreviousClick={handlePreviousClick}
              onNextClick={handleNextClick}
              onItemClick={handleItemClick}
            />
            <Box position="absolute" right={2}>
              <IconButton
                aria-label="registration"
                rounded="full"
                as={PlusIcon}
                onClick={handleRegistrationClick}
              />
            </Box>
          </Center>
        </Flex>
      </Suspense>
    </Box>
  );
};
export default Expense;
