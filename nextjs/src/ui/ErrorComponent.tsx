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
      <button onClick={handleClick}>Hoge</button>
    </>
  );
};
export default ErrorComponent;
