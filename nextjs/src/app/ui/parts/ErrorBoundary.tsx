"use client";
import React from "react";

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error;
};
type FallbackProps = {
  error: Error;
  reset: () => void;
};
type ErrorBoundaryProps = {
  fallback: React.ComponentType<FallbackProps>;
  onReset: () => void;
  onError: (error: Error) => void;
};

const initialState = { hasError: false, error: new Error() };

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<ErrorBoundaryProps>,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = initialState;
  }

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    if (error instanceof Error) {
      return { hasError: true, error };
    }
    return { hasError: true, error: new Error(String(error)) };
  }

  reset(): void {
    this.props.onReset();
    this.setState(initialState);
  }

  componentDidMount(): void {
    window.addEventListener("unhandledrejection", this.onUnhandledRejection);
  }

  componentWillUnmount(): void {
    window.removeEventListener("unhandledrejection", this.onUnhandledRejection);
  }

  onUnhandledRejection = (event: PromiseRejectionEvent): void => {
    event.promise.catch((reason) => {
      this.setState(ErrorBoundary.getDerivedStateFromError(reason));
    });
  };

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log("Unexpected error", error, errorInfo);
  }

  render(): React.ReactNode {
    const { hasError, error } = this.state;
    if (hasError) {
      const Fallback = this.props.fallback;
      const reset = (): void => {
        this.reset();
      };
      const props = {
        error,
        reset,
      };
      this.props.onError(error);
      return <Fallback {...props} />;
    }
    return <>{this.props.children}</>;
  }
}
