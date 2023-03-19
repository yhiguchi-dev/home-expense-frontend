import React from "react";

import SideBarListItem from "@/ui/dashboard/side-bar-list-item";
import EditAttributeIcon from "@/ui/icon/edit-attribute-icon";
import HomeIcon from "@/ui/icon/home-icon";
import PaymentIcon from "@/ui/icon/payment-icon";
import Box from "@/ui/parts/box";
import VStack from "@/ui/parts/v-stack";

type Props = {
  title: string;
};

const SideBar = ({ title }: Props): JSX.Element => {
  return (
    <div className="none:container mx-auto h-full w-full rounded-lg bg-white shadow">
      <Box padding="2">
        <VStack spacing="3">
          <h2 className="text-xl font-bold">{title}</h2>
          <ul className="text-sm">
            <VStack spacing="3">
              <SideBarListItem href="/home" title="Home">
                <HomeIcon height="7" />
              </SideBarListItem>
              <SideBarListItem href="/home/attribute" title="経費属性">
                <EditAttributeIcon height="7" />
              </SideBarListItem>
              <SideBarListItem
                href="/home/purchase?category=fixed"
                title="経費"
              >
                <PaymentIcon height="7" />
              </SideBarListItem>
            </VStack>
          </ul>
        </VStack>
      </Box>
    </div>
  );
};
export default SideBar;
