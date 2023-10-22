import { JTDSchema } from "@/lib/json/type";

interface ClientError extends Error {
  name: "ClientError";
  code: number;
  headers?: Record<string, string>;
  body: <T>(schema: JTDSchema) => Promise<T>;
}

interface ClientErrorConstructor extends ErrorConstructor {
  new (
    code: number,
    headers?: Record<string, string>,
    body: <T>(schema: JTDSchema) => Promise<T>,
    message?: string,
  ): ClientError;
  (
    code: number,
    headers?: Record<string, string>,
    body: <T>(schema: JTDSchema) => Promise<T>,
    message?: string,
  ): ClientError;
  readonly prototype: ClientError;
}

declare const ClientError: ClientErrorConstructor;

interface ServerError extends Error {
  name: "ServerError";
  code: number;
  headers?: Record<string, string>;
  body: <T>(schema: JTDSchema) => Promise<T>;
}

interface ServerErrorConstructor extends ErrorConstructor {
  new (
    code: number,
    headers?: Record<string, string>,
    body: <T>(schema: JTDSchema) => Promise<T>,
    message?: string,
  ): ServerError;
  (
    code: number,
    headers?: Record<string, string>,
    body: <T>(schema: JTDSchema) => Promise<T>,
    message?: string,
  ): ServerError;
  readonly prototype: ServerError;
}

declare const ServerError: ServerErrorConstructor;

interface UnknownHttpStatusError extends Error {
  name: "UnknownHttpStatusError";
  code: number;
  headers?: Record<string, string>;
  body: <T>(schema: JTDSchema) => Promise<T>;
}

interface UnknownHttpStatusErrorConstructor extends ErrorConstructor {
  new (
    code: number,
    headers?: Record<string, string>,
    body: <T>(schema: JTDSchema) => Promise<T>,
    message?: string,
  ): UnknownHttpStatusError;
  (
    code: number,
    headers?: Record<string, string>,
    body: <T>(schema: JTDSchema) => Promise<T>,
    message?: string,
  ): UnknownHttpStatusError;
  readonly prototype: UnknownHttpStatusError;
}

declare const UnknownHttpStatusError: UnknownHttpStatusErrorConstructor;
