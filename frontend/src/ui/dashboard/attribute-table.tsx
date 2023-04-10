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
import { useExpenseAttributeMutation } from "@/hooks/store/expense-attribute";
import { delay } from "@/lib/promise";
import { expenseAttributeService } from "@/lib/service/expense-attribute-service";
import { type ExpenseAttributes } from "@/lib/type/expense-attribute";
import { type Pagination } from "@/lib/type/pagination";
import Form from "@/ui/parts/form";

type Props = {
  expenseAttributes: ExpenseAttributes;
  pagination: Pagination;
};

const AttributeTable = ({
  expenseAttributes,
  pagination,
}: Props): JSX.Element => {
  const router = useRouter();
  const idRef = useRef("");
  const { refresh } = useExpenseAttributeMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { fn: handleSubmit } = useDoubleClickPrevention(
    async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
      await delay(1000);
      console.log(event, "asdf");
      await expenseAttributeService.delete({
        id: idRef.current,
      });
      refresh();
    }
  );
  const cancelRef = useRef<HTMLButtonElement>(null);
  const rows = expenseAttributes.map((value, index) => {
    const { id, name, category } = value;
    const { page, perPage } = pagination;
    const indexValue = index + 1 + (page - 1) * perPage;
    const handleEditClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ): void => {
      console.log(event);
      if (id !== undefined) {
        router.push(`/home/attribute/${id}`);
      }
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
        <Td>{name}</Td>
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
export default AttributeTable;
