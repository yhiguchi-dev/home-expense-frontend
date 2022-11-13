import { Button } from "@mui/material";
import { NextPage } from "next";
import { Suspense, useState } from "react";

import GitHubUser from "@/components/atoms/GitHubUser";
import Loading from "@/components/atoms/Loading";
import { ErrorBoundary } from "@/components/organisms/ErrorBoundary";
import ErrorComponent from "@/components/organisms/ErrorComponent";
import Portal from "@/components/organisms/Portal";
import { useGetGitHubUser, useResetGitHubUser } from "@/hooks/stores/test";

const RootPage: NextPage = () => {
  const [isModalShowing, setIsModalShowing] = useState(false);
  const resetGitHubUser = useResetGitHubUser();
  const handleCancel = (): void => {
    // abortController.abort();
    console.log("abort");
  };
  const User = (): JSX.Element => {
    const getGitHubUser = useGetGitHubUser();
    return <GitHubUser gitHubUser={getGitHubUser} />;
  };
  const handleError = (error: Error): void => {
    console.log(error);
    setIsModalShowing(true);
  };

  const handleReset = (): void => {
    resetGitHubUser();
    console.log("reset");
  };

  return (
    <>
      <ErrorBoundary
        fallback={ErrorComponent}
        onReset={handleReset}
        onError={handleError}
      >
        <Suspense fallback={<Loading />}>
          <User />
        </Suspense>
      </ErrorBoundary>
      <Button variant="contained" onClick={handleCancel}>
        Hello World
      </Button>
      <Button variant="contained" onClick={handleCancel}>
        Hello World
      </Button>
      {isModalShowing && (
        <Portal>
          <div>hoge</div>
        </Portal>
      )}
    </>
  );
};

export default RootPage;
