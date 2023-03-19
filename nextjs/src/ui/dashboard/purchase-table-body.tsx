import {
  type ExpenseAttributeSummary,
  getCategoryName,
} from "@/lib/type/expense-attribute";
import Box from "@/ui/parts/box";

type Props = {
  type: ExpenseAttributeSummary;
};
const PurchaseTableBody = ({ type }: Props): JSX.Element => {
  const { expenseAttributes } = type;
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
  return <>{rows}</>;
};
export default PurchaseTableBody;
