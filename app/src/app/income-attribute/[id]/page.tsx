import type { ReactElement } from "react";

import { getIncomeAttribute } from "@/service/income-attribute-service";
import IncomeAttributeEdit from "@/ui/income-attribute-edit";

interface Props {
  params: {
    id: string;
  };
}

const IncomeAttributeEditPage = async ({
  params,
}: Props): Promise<ReactElement> => {
  const { id } = params;
  const incomeAttribute = await getIncomeAttribute({
    id,
    tag: `income-attribute-${id}`,
  });
  return <IncomeAttributeEdit incomeAttribute={incomeAttribute} />;
};
export default IncomeAttributeEditPage;
