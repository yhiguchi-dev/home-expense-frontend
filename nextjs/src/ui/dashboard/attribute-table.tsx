"use client";

import {
  type ExpenseAttributes,
  getCategoryName,
} from "@/lib/type/expense-attribute";
import Box from "@/ui/parts/box";

// type TableColumn = "index" | "attribute" | "price"

type Props = {
  expenseAttributes: ExpenseAttributes;
};

const AttributeTable = ({ expenseAttributes }: Props): JSX.Element => {
  const rows = expenseAttributes.map((value, index) => {
    const { name, category } = value;
    const categoryName = getCategoryName(category);
    return (
      <tr
        key={index}
        className="border-b bg-white transition duration-300 ease-in-out hover:bg-gray-100"
      >
        <td className="whitespace-nowrap text-sm font-medium text-gray-900">
          <Box paddingX="6" paddingY="4">
            {index + 1}
          </Box>
        </td>
        <td className="whitespace-nowrap text-sm font-light text-gray-900">
          <Box paddingX="6" paddingY="4">
            {name}
          </Box>
        </td>
        <td className="whitespace-nowrap text-sm font-light text-gray-900">
          <Box paddingX="6" paddingY="4">
            {categoryName}
          </Box>
        </td>
      </tr>
    );
  });

  return (
    <table className="h-full w-full">
      <thead className="sticky top-0 border-b bg-gray-50">
        <tr>
          <th
            scope="col"
            className="text-left text-sm font-medium text-gray-900"
          >
            <Box paddingX="6" paddingY="4">
              #
            </Box>
          </th>

          <th
            scope="col"
            className="text-left text-sm font-medium text-gray-900"
          >
            <Box paddingX="6" paddingY="4">
              属性名
            </Box>
          </th>

          <th
            scope="col"
            className="text-left text-sm font-medium text-gray-900"
          >
            <Box paddingX="6" paddingY="4">
              分類
            </Box>
          </th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};
export default AttributeTable;
