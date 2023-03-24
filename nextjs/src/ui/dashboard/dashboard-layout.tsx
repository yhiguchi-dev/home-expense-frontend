import React, { type PropsWithChildren } from "react";

import SideBar from "@/ui/dashboard/side-bar";
import Box from "@/ui/parts/box";
import HStack from "@/ui/parts/h-stack";

const DashboardLayout = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <div className="none:container mx-auto h-screen w-screen bg-gray-100">
      <Box padding="2">
        <HStack spacing="2">
          <div className="container mx-auto h-full w-1/4">
            <Box padding="2">
              <SideBar title="Dashboard" />
            </Box>
          </div>
          <div className="container mx-auto h-full w-full">
            <Box padding="2">{children}</Box>
          </div>
        </HStack>
      </Box>
    </div>
  );
};
export default DashboardLayout;
