import React, { type PropsWithChildren } from "react";

import HStack from "@/ui/parts/h-stack";

type Props = {
  title: string;
  href?: string;
};

const SideBarListItem = ({
  title,
  href,
  children,
}: PropsWithChildren<Props>): JSX.Element => {
  return (
    <li>
      <a className="hover:opacity-75" href={href}>
        <HStack spacing="3">
          {children}
          <span className="text-sm">{title}</span>
        </HStack>
      </a>
    </li>
  );
};
export default SideBarListItem;
