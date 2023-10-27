import { JTDSchema } from "@/lib/json/type";

interface ClientError extends Error {
  name: "ClientError";
  code: number;
  headers?: Record<string, string>;
  body?: <T>(schema: JTDSchema) => Promise<T>;
}

interface ClientErrorConstructor extends ErrorConstructor {
  new (
    code: number,
    headers?: Record<string, string>,
    body?: <T>(schema: JTDSchema) => Promise<T>,
    message?: string,
    options?: ErrorOptions,
  ): ClientError;
  (
    code: number,
    headers?: Record<string, string>,
    body?: <T>(schema: JTDSchema) => Promise<T>,
    message?: string,
    options?: ErrorOptions,
  ): ClientError;
  readonly prototype: ClientError;
}

export declare const ClientError: ClientErrorConstructor;

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
    body?: <T>(schema: JTDSchema) => Promise<T>,
    message?: string,
    options?: ErrorOptions,
  ): ServerError;
  (
    code: number,
    headers?: Record<string, string>,
    body?: <T>(schema: JTDSchema) => Promise<T>,
    message?: string,
    options?: ErrorOptions,
  ): ServerError;
  readonly prototype: ServerError;
}

export declare const ServerError: ServerErrorConstructor;

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
    body?: <T>(schema: JTDSchema) => Promise<T>,
    message?: string,
    options?: ErrorOptions,
  ): UnknownHttpStatusError;
  (
    code: number,
    headers?: Record<string, string>,
    body?: <T>(schema: JTDSchema) => Promise<T>,
    message?: string,
    options?: ErrorOptions,
  ): UnknownHttpStatusError;
  readonly prototype: UnknownHttpStatusError;
}

export declare const UnknownHttpStatusError: UnknownHttpStatusErrorConstructor;
