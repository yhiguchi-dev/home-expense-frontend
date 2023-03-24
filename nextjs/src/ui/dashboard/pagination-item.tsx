import React, { type MouseEventHandler, type PropsWithChildren } from "react";

import Box from "@/ui/parts/box";

type Props = {
  key: number;
  onClick: MouseEventHandler<HTMLButtonElement>;
};
const PaginationItem = ({
  key,
  onClick,
  children,
}: PropsWithChildren<Props>): JSX.Element => {
  return (
    <li key={key} className="page-item">
      <button
        className="page-link relative block rounded rounded border-0 bg-transparent text-gray-800 outline-none transition-all duration-300 hover:bg-gray-200 hover:text-gray-800 focus:shadow-none"
        onClick={onClick}
      >
        <Box paddingX="3" paddingY="1.5">
          {children}
        </Box>
      </button>
    </li>
  );
};
export default PaginationItem;
