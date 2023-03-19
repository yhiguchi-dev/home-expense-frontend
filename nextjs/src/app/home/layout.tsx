"use client";
import React, { type PropsWithChildren } from "react";

import DashboardLayout from "@/ui/dashboard/dashboard-layout";

const HomeLayout = ({ children }: PropsWithChildren): JSX.Element => {
  return <DashboardLayout>{children}</DashboardLayout>;
};
export default HomeLayout;
