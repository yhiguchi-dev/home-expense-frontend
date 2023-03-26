"use client";

import {
  Flex,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { PencilIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import React from "react";

import { type ExpenseAttributes } from "@/lib/type/expense-attribute";
import { type Pagination } from "@/lib/type/pagination";

type Props = {
  expenseAttributes: ExpenseAttributes;
  pagination: Pagination;
};

const AttributeTable = ({
  expenseAttributes,
  pagination,
}: Props): JSX.Element => {
  const router = useRouter();
  const rows = expenseAttributes.map((value, index) => {
    const { id, name, category } = value;
    const { page, perPage } = pagination;
    const indexValue = index + 1 + (page - 1) * perPage;
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
      console.log(event);
      if (id !== undefined) {
        router.push(`/home/attribute/${id}`);
      }
    };
    return (
      <Tr key={index}>
        <Td>{indexValue}</Td>
        <Td>{name}</Td>
        <Td>
          <Flex
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            {category}
            <IconButton
              aria-label={`edit-button-${index}`}
              size="xs"
              bg="white"
              onClick={handleClick}
              as={PencilIcon}
            />
          </Flex>
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
            </Tr>
          </Thead>
          <Tbody>{rows}</Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
export default AttributeTable;
