"use client";
import "@/styles/globals.css";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import React, { type PropsWithChildren } from "react";
import { RecoilRoot } from "recoil";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const RootLayout = ({ children }: PropsWithChildren): JSX.Element => {
  const CSR = dynamic(async () => import("@/ui/csr"), {
    ssr: false,
  });
  return (
    <html lang="ja" className={`${inter.variable} font-sans`}>
      <head />
      <body>
        <RecoilRoot>
          <CSR>{children}</CSR>
        </RecoilRoot>
      </body>
    </html>
  );
};
export default RootLayout;
