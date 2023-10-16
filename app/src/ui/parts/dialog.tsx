import React, { forwardRef, ReactElement } from "react";

type Props = React.ComponentProps<"dialog">;

const Dialog = forwardRef<HTMLDialogElement, Props>(
  ({ children }, ref): ReactElement => {
    return <dialog ref={ref}>{children}</dialog>;
  },
);
Dialog.displayName = "Dialog";
export default Dialog;
