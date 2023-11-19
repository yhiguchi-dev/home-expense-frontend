import React, { ReactElement, ReactNode } from "react";

import LinkComponent from "@/ui/link-component";
import Box from "@/ui/parts/layout/Box";
import SideBar from "@/ui/parts/side-bar";
import TopBar from "@/ui/parts/top-bar";

import style from "./dashboard-layout.module.css";

const DashboardLayout = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
    const attributes = [
        {
            title: "Home",
            path: "/home"
        },
        {
            title: "経費属性",
            path: "/expense-attribute"
        },
        {
            title: "経費",
            path: "/expense"
        }
    ]
  return (
      <div className={style.parent}>
        <SideBar linkComponent={LinkComponent} attributes={attributes} />
        <Box width="100%" height="100%">
          <TopBar />
          <div className={style.expenseTableBackground}>{children}</div>
        </Box>
      </div>
  );
};
export default DashboardLayout;
