import Link from "next/link";
import React, { ReactElement, ReactNode } from "react";

import style from "./dashboard-layout.module.css";

const DashboardLayout = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  return (
    <div className={style.dashboard}>
      <div>
        <div className="background">
          <div className="sideBar">
            <ul className="barText">
              <li>
                <Link href="/home">Home</Link>
              </li>
              <li>
                <Link href="/expense-attribute">経費属性</Link>
              </li>
              <li>
                <Link href="/expense">経費</Link>
              </li>
            </ul>
          </div>
          <div className="margin">
            <div className={style.topBar}>
              <text className="topbarText">家庭用</text>
            </div>
            <div className="expenseTableBackground">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardLayout;
