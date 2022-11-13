import { Button } from "@mui/material";
import React from "react";

type ErrorComponentProps = {
  error: Error;
  reset: () => void;
};

const ErrorComponent = (props: ErrorComponentProps): JSX.Element => {
  const { error, reset } = props;
  const handleClick = (): void => {
    reset();
  };
  return (
    <>
      <div>root error:{error.message}</div>
      <Button variant="contained" onClick={handleClick}>
        Hoge
      </Button>
    </>
  );
};
export default ErrorComponent;
