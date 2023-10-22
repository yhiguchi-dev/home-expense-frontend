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
        <ul>
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
      <div>{children}</div>
    </div>
  );
};
export default DashboardLayout;
