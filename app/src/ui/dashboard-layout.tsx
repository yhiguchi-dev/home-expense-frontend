import React, { ReactElement, ReactNode } from "react";

const DashboardLayout = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  return (
    <div>
      <div>
        <div>
          <div>
            <ul>
              <li>
                <a href="/home">Home</a>
              </li>
              <li>
                <a href="/expense-attribute">経費属性</a>
              </li>
              <li>
                <a href="/expense">経費</a>
              </li>
            </ul>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};
export default DashboardLayout;
