import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactElement, ReactNode } from "react";

import DashboardLayout from "@/ui/dashboard-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const RootLayout = ({ children }: { children: ReactNode }): ReactElement => {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  );
};

export default RootLayout;
