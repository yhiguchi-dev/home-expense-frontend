import "./globals.css";
import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { ReactElement, ReactNode } from "react";

import DashboardLayout from "@/ui/dashboard-layout";

const noto = Noto_Sans_JP({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const RootLayout = ({ children }: { children: ReactNode }): ReactElement => {
  return (
    <html lang="ja">
      <body className={noto.className}>
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  );
};

export default RootLayout;
