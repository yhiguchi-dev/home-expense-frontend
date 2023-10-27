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
          <div className="side-bar">
            <ul className="bar-text">
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
              <text className="topbar-text">家庭用</text>
            </div>
            <div className="expense-table-background">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardLayout;
