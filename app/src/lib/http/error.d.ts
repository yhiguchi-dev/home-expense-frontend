interface UnknownHttpStatusError extends Error {
  name: "UnknownHttpStatusError";
  code: number;
}

interface UnknownHttpStatusErrorConstructor extends ErrorConstructor {
  new (code: number, message?: string): UnknownHttpStatusError;
  (code: number, message?: string): UnknownHttpStatusError;
  readonly prototype: UnknownHttpStatusError;
}

declare const UnknownHttpStatusError: UnknownHttpStatusErrorConstructor;
