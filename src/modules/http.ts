export const get = async <T>(param: {
  url: string;
  headers?: Headers;
}): Promise<HttpResponse<T>> => {
  const { url, headers } = param;
  const response = await send(url, "GET", headers);
  return resolve(response);
};

export const post = async <T, R>(param: {
  url: string;
  headers?: Headers;
  requestBody?: T;
}): Promise<HttpResponse<R>> => {
  const { url, headers, requestBody } = param;
  const response = await send(url, "POST", headers, requestBody);
  return resolve(response);
};

export const postNoBody = async <T>(param: {
  url: string;
  headers?: Headers;
  requestBody?: T;
}): Promise<HttpResponse<void>> => {
  const { url, headers, requestBody } = param;
  const response = await send(url, "POST", headers, requestBody);
  return resolveNoBody(response);
};

const send = async <T>(
  url: string,
  method: Method,
  headers?: Headers,
  requestBody?: T
): Promise<Response> => {
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, 3000);
  try {
    return await fetch(url, {
      method,
      headers: {
        ...headers,
        "content-type": "application/json",
      },
      body: JSON.stringify(requestBody),
      mode: "cors",
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
};

const resolve = async <T>(response: Response): Promise<HttpResponse<T>> => {
  if (response.ok) {
    const body = (await response.json()) as T;
    return {
      type: "success",
      code: response.status,
      body,
    };
  }
  return resolveError(response);
};

const resolveNoBody = async (
  response: Response
): Promise<HttpResponse<void>> => {
  if (response.ok) {
    return {
      type: "success",
      code: response.status,
      body: undefined,
    };
  }
  return resolveError(response);
};

const resolveError = async <R>(
  response: Response
): Promise<HttpResponse<R>> => {
  const code = response.status;
  if (code >= 400 && code <= 499) {
    const body = await response.text();
    return {
      type: "clientError",
      code,
      body,
    };
  }
  if (code >= 500 && code <= 599) {
    const body = await response.text();
    return {
      type: "serverError",
      code,
      body,
    };
  }
  throw new Error("unknown http status");
};

type Method = "GET" | "POST";

export type Headers = {
  [header: string]: string;
};

type Success<T> = {
  type: "success";
  code: number;
  body: T;
};

type ClientError = {
  type: "clientError";
  code: number;
  body: string;
};

type ServerError = {
  type: "serverError";
  code: number;
  body: string;
};

type HttpResponse<T> =
  | Readonly<Success<T>>
  | Readonly<ClientError>
  | Readonly<ServerError>;
