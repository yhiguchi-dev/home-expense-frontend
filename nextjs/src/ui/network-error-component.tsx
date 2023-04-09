import { NetworkError } from "@/lib/error";

type ErrorComponentProps = {
  error: Error;
};

const NetworkErrorComponent = (props: ErrorComponentProps): JSX.Element => {
  const { error } = props;
  if (error instanceof NetworkError) {
    return <div>network error:{error.message}</div>;
  }
  throw error;
};
export default NetworkErrorComponent;
