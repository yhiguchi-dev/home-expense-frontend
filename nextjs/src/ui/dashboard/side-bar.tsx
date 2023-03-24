import {
  CreditCardIcon,
  HomeIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import React from "react";

import SideBarListItem from "@/ui/dashboard/side-bar-list-item";
import Box from "@/ui/parts/box";
import VStack from "@/ui/parts/v-stack";

type Props = {
  title: string;
};

const SideBar = ({ title }: Props): JSX.Element => {
  return (
    <div className="container mx-auto h-full w-full rounded-lg bg-white shadow">
      <Box padding="2">
        <VStack spacing="3">
          <h2 className="text-xl font-bold">{title}</h2>
          <ul>
            <VStack spacing="3">
              <SideBarListItem href="/home" title="Home">
                <HomeIcon className="h-6" />
              </SideBarListItem>
              <SideBarListItem href="/home/attribute" title="経費属性">
                <PencilSquareIcon className="h-6" />
              </SideBarListItem>
              <SideBarListItem href="/home/purchase" title="経費">
                <CreditCardIcon className="h-6" />
              </SideBarListItem>
            </VStack>
          </ul>
        </VStack>
      </Box>
    </div>
  );
};
export default SideBar;
