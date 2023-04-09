export type Result<T, E> = Success<T> | Failure<E>;

type Success<T> = {
  value: T;
  readonly type: "success";
};
type Failure<E> = {
  value: E;
  readonly type: "failure";
};

export const toSuccess = <T>(value: T): Success<T> => {
  return {
    value,
    type: "success",
  };
};

export const toFailure = <E>(value: E): Failure<E> => {
  return {
    value,
    type: "failure",
  };
};
