import { ReactElement, ReactNode } from "react";

import style from "./dashboard-layout.module.css";
import LinkComponent from "@/ui/link-component";
import SideBar from "@/ui/parts/side-bar";
import TopBar from "@/ui/parts/top-bar";

const DashboardLayout = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const now = new Date(Date.now());
  const searchParams = new URLSearchParams({
    year: now.getFullYear().toString(),
    month: (now.getMonth() + 1).toString(),
  }).toString();
  const attributes = [
    {
      title: "Home",
      path: "/home",
    },
    {
      title: "収入属性",
      path: "/income-attribute",
    },
    {
      title: "経費属性",
      path: "/expense-attribute",
    },
    {
      title: "収入",
      path: "/income",
    },
    {
      title: "経費",
      path: `/expense?${searchParams}`,
    },
  ];
  return (
    <div className={style.parent}>
      <SideBar linkComponent={LinkComponent} attributes={attributes} />
      <div>
        <TopBar />
        <div className={style.expenseTableBackground}>{children}</div>
      </div>
    </div>
  );
};
export default DashboardLayout;
