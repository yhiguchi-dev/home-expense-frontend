import React from "react";

import AttributeEdit from "@/ui/dashboard/attribute-edit";

type Props = {
  params: {
    id: string;
  };
};

const AttributeEditPage = ({ params }: Props): JSX.Element => {
  return <AttributeEdit id={params.id} />;
};
export default AttributeEditPage;
