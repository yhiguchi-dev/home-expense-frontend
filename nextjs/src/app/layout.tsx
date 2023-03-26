"use client";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React from "react";
import { RecoilRoot } from "recoil";

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-inter",
// });

const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const CSR = dynamic(async () => await import("@/ui/csr"), {
    ssr: false,
  });
  return (
    <html lang="ja">
      <head />
      <body>
        <RecoilRoot>
          <CacheProvider>
            <ChakraProvider>
              <CSR>{children}</CSR>
            </ChakraProvider>
          </CacheProvider>
        </RecoilRoot>
      </body>
    </html>
  );
};
export default RootLayout;
