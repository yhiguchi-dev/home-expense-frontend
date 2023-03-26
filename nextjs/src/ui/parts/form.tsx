import React, {
  type FormEventHandler,
  type PropsWithChildren,
  useCallback,
} from "react";

type Props = {
  onSubmit: FormEventHandler<HTMLFormElement>;
  onFormInvalid: FormEventHandler<HTMLFormElement>;
};

const Form = ({
  onSubmit,
  onFormInvalid,
  children,
}: PropsWithChildren<Props>): JSX.Element => {
  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>): void => {
      event.preventDefault();
      if (!event.currentTarget.checkValidity()) {
        event.stopPropagation();
        onFormInvalid(event);
        return;
      }
      onSubmit(event);
    },
    [onFormInvalid, onSubmit]
  );

  return (
    <form onSubmit={handleSubmit} noValidate>
      {children}
    </form>
  );
};
export default Form;
