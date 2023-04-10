"use client";
import React from "react";

import DashboardLayout from "@/ui/dashboard/dashboard-layout";

const HomeLayout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return <DashboardLayout>{children}</DashboardLayout>;
};
export default HomeLayout;
