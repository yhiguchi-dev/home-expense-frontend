"use client";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";

import { useDoubleClickPrevention } from "@/hooks/double-click-prevention";
import { useExpenseMutation } from "@/hooks/store/expense";
import {
  useExpenseAttributeCriteriaMutation,
  useExpenseAttributeMutation,
} from "@/hooks/store/expense-attribute";
import { delay } from "@/lib/promise";
import { expenseService } from "@/lib/service/expense-service";
import { type Expenses } from "@/lib/type/expense";
import { type Pagination } from "@/lib/type/pagination";
import Form from "@/ui/parts/form";

type Props = {
  expenses: Expenses;
  pagination: Pagination;
};

const ExpenseTable = ({ expenses, pagination }: Props): JSX.Element => {
  const router = useRouter();
  const idRef = useRef("");
  const { setExpense } = useExpenseMutation();
  const { refresh } = useExpenseAttributeMutation();
  const { refresh: refreshExpense } = useExpenseMutation();
  const { setExpenseAttributeCriteria } = useExpenseAttributeCriteriaMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { fn: handleSubmit } = useDoubleClickPrevention(
    async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
      await delay(1000);
      console.log(event, "asdf");
      await expenseService.delete({
        id: idRef.current,
      });
      refreshExpense();
    }
  );
  const cancelRef = useRef<HTMLButtonElement>(null);
  const rows = expenses.map((value, index) => {
    const {
      id,
      description,
      price,
      attributeId,
      attributeName,
      paymentDate,
      category,
    } = value;
    const { page, perPage } = pagination;
    const indexValue = index + 1 + (page - 1) * perPage;
    const handleEditClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ): void => {
      console.log(event);
      setExpense((currVal) => {
        return {
          ...currVal,
          id,
          description,
          price,
          paymentDate,
          attributeId,
          attributeName,
          category,
        };
      });
      setExpenseAttributeCriteria((currVal) => {
        return {
          ...currVal,
          category,
          page: 1,
          perPage: 100,
        };
      });
      refresh();
      router.push(`/home/expense/edit`);
    };
    const handleTrashClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ): void => {
      console.log(event);
      if (id !== undefined) {
        idRef.current = id;
        onOpen();
      }
    };
    return (
      <Tr key={index}>
        <Td>{indexValue}</Td>
        <Td>{description}</Td>
        <Td>{price}</Td>
        <Td>{paymentDate}</Td>
        <Td>{attributeName}</Td>
        <Td>{category}</Td>
        <Td>
          <Stack spacing={2} direction="row">
            <IconButton
              aria-label={`edit-button-${index}`}
              size="xs"
              bg="white"
              onClick={handleEditClick}
              as={PencilIcon}
            />
            <IconButton
              aria-label={`delete-button-${index}`}
              size="xs"
              bg="white"
              onClick={handleTrashClick}
              as={TrashIcon}
            />
          </Stack>
        </Td>
      </Tr>
    );
  });

  return (
    <>
      <TableContainer overflowX="unset" overflowY="unset">
        <Table variant="simple">
          <Thead position="sticky" top={0} zIndex="docked" bg="gray.50">
            <Tr>
              <Th>#</Th>
              <Th>説明</Th>
              <Th>金額</Th>
              <Th>支払日</Th>
              <Th>属性名</Th>
              <Th>分類</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>{rows}</Tbody>
        </Table>
      </TableContainer>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <Form onSubmit={handleSubmit}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                属性の削除
              </AlertDialogHeader>

              <AlertDialogBody>
                削除したデータは復元できません。削除しますか？
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  キャンセル
                </Button>
                <Button
                  type="submit"
                  colorScheme="red"
                  onClick={onClose}
                  ml={3}
                >
                  削除
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </Form>
      </AlertDialog>
    </>
  );
};
export default ExpenseTable;
