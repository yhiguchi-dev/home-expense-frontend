"use client";
import { Box, Center, Flex, IconButton } from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import React, { Suspense, useCallback } from "react";

import { useDoubleClickPrevention } from "@/hooks/double-click-prevention";
import {
  useExpenseAttributeSummary,
  useExpenseAttributeCriteriaMutation,
} from "@/hooks/store/expense-attribute";
import AttributeTable from "@/ui/dashboard/attribute-table";
import PaginationComponent from "@/ui/dashboard/pagination-component";

const Attribute = (): JSX.Element => {
  const { expenseAttributes, pagination } = useExpenseAttributeSummary();
  const { setExpenseAttributeCriteria } = useExpenseAttributeCriteriaMutation();
  const router = useRouter();
  const { fn: handlePreviousClick } = useDoubleClickPrevention(
    async (nextPage: number): Promise<void> => {
      setExpenseAttributeCriteria((currVal) => {
        return {
          ...currVal,
          page: nextPage,
        };
      });
    }
  );
  const { fn: handleNextClick } = useDoubleClickPrevention(
    async (nextPage: number): Promise<void> => {
      setExpenseAttributeCriteria((currVal) => {
        return {
          ...currVal,
          page: nextPage,
        };
      });
    }
  );
  const { fn: handleItemClick } = useDoubleClickPrevention(
    async (nextPage: number): Promise<void> => {
      setExpenseAttributeCriteria((currVal) => {
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
      router.push("/home/attribute/registration");
    },
    [router]
  );

  return (
    <Box
      bg="white"
      rounded="2xl"
      shadow="base"
      width="2xl"
      height="xs"
      overflow="hidden"
    >
      <Suspense fallback={<div>loading</div>}>
        <Flex
          direction="column"
          height="inherit"
          justifyContent="space-between"
        >
          <Box overflowY="scroll">
            <AttributeTable
              expenseAttributes={expenseAttributes}
              pagination={pagination}
            />
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
export default Attribute;
