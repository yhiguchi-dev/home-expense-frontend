import { JTDSchema } from "@/lib/json/type";

type Method = "GET" | "POST" | "PUT" | "DELETE";
type Mode = RequestMode;
type Cache = RequestCache;
type Credentials = RequestCredentials;

export interface HttpRequest {
  url: string;
  path: string;
  queries?: Record<string, string | undefined>;
  method: Method;
  headers?: Record<string, string>;
  requestBody?: RequestBody;
  mode?: Mode;
  cache?: Cache;
  credentials?: Credentials;
  timeout?: number;
  extension?: object;
}

export interface RequestBody {
  schema: JTDSchema;
  data: unknown;
}

interface Success {
  type: "success";
  code: number;
  headers?: Record<string, string>;
  body: <T>(schema: JTDSchema) => Promise<T>;
}

interface Failure {
  type: "failure";
  error: Error;
}

export type HttpResponse = Readonly<Success> | Readonly<Failure>;
