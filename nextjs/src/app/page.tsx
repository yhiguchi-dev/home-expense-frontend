"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Root = (): JSX.Element => {
  const router = useRouter();
  useEffect(() => {
    router.replace("/home");
  }, [router]);
  return <></>;
};
export default Root;
