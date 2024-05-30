"use client";
import type { ReactElement } from "react";

const Error = ({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}): ReactElement => {
  console.log(error);
  return (
    <div>
      <div>予期せぬエラー</div>
      <button
        onClick={(): void => {
          reset();
        }}
      >
        Try again
      </button>
    </div>
  );
};
export default Error;
