"use client";
import "@/styles/globals.css";
import dynamic from "next/dynamic";
import React, { type PropsWithChildren } from "react";
import { RecoilRoot } from "recoil";

const RootLayout = ({ children }: PropsWithChildren): JSX.Element => {
  const CSR = dynamic(async () => import("@/ui/csr"), {
    ssr: false,
  });
  return (
    <html lang="ja">
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
