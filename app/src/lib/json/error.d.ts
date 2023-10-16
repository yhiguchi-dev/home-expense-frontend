interface JSONParseError extends Error {
  name: "JSONParseError";
}

interface JSONParseErrorConstructor extends ErrorConstructor {
  new (message?: string): JSONParseError;
  (message?: string): JSONParseError;
  readonly prototype: JSONParseError;
}

declare const JSONParseError: JSONParseErrorConstructor;

interface JSONSerializeError extends Error {
  name: "JSONSerializeError";
}

interface JSONSerializeErrorConstructor extends ErrorConstructor {
  new (message?: string): JSONSerializeError;
  (message?: string): JSONSerializeError;
  readonly prototype: JSONSerializeError;
}

declare const JSONSerializeError: JSONSerializeErrorConstructor;
