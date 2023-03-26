const get = async <T>({
  url,
  headers,
}: {
  url: string;
  headers?: Headers;
}): Promise<HttpResponse<T>> => {
  const response = await send({ url, method: "GET", headers });
  return await resolve(response);
};

const post = async <T, R>({
  url,
  headers,
  requestBody,
}: {
  url: string;
  headers?: Headers;
  requestBody?: T;
}): Promise<HttpResponse<R>> => {
  const response = await send({ url, method: "POST", headers, requestBody });
  return await resolve(response);
};

const postNoBody = async <T>({
  url,
  headers,
  requestBody,
}: {
  url: string;
  headers?: Headers;
  requestBody?: T;
}): Promise<HttpResponse<void>> => {
  const response = await send({ url, method: "POST", headers, requestBody });
  return await resolveNoBody(response);
};

const put = async <T>({
  url,
  headers,
  requestBody,
}: {
  url: string;
  headers?: Headers;
  requestBody?: T;
}): Promise<HttpResponse<void>> => {
  const response = await send({ url, method: "PUT", headers, requestBody });
  return await resolveNoBody(response);
};

const send = async <T>({
  url,
  method,
  headers,
  requestBody,
}: {
  url: string;
  method: Method;
  headers?: Headers;
  requestBody?: T;
}): Promise<Response> => {
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
  return await resolveError(response);
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
  return await resolveError(response);
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

type Method = "GET" | "POST" | "PUT";

export type Headers = Record<string, string>;

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

export type HttpResponse<T> =
  | Readonly<Success<T>>
  | Readonly<ClientError>
  | Readonly<ServerError>;

export const http = {
  get,
  post,
  postNoBody,
  put,
};
