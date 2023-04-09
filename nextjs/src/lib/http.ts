const _get = async <T>({
  url,
  queries,
  headers,
}: {
  url: string;
  queries?: Queries;
  headers?: Headers;
}): Promise<HttpResponse<T>> => {
  const response = await send({ url, queries, method: "GET", headers });
  return await resolve(response);
};

const _post = async <T, R>({
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

const _postNoBody = async <T>({
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

const _put = async <T>({
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

const _delete = async ({
  url,
  headers,
}: {
  url: string;
  headers?: Headers;
}): Promise<HttpResponse<void>> => {
  const response = await send({ url, method: "DELETE", headers });
  return await resolveNoBody(response);
};

const send = async <T>({
  url,
  queries,
  method,
  headers,
  requestBody,
}: {
  url: string;
  queries?: Queries;
  method: Method;
  headers?: Headers;
  requestBody?: T;
}): Promise<Response> => {
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, 3000);
  try {
    const urlValue = new URL(url);
    if (queries !== undefined) {
      const _queries = Object.entries(queries)
        .filter((value) => {
          const [, v] = value;
          return v !== undefined;
        })
        .reduce((previousValue, currentValue) => {
          const [k, v] = currentValue;
          return {
            ...previousValue,
            [k]: v,
          };
        }, {});
      console.log(new URLSearchParams(_queries).toString());
      urlValue.search = new URLSearchParams(_queries).toString();
    }
    return await fetch(urlValue, {
      method,
      headers: {
        ...headers,
        "content-type": "application/json",
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
      mode: "cors",
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

type Method = "GET" | "POST" | "PUT" | "DELETE";

type Headers = Record<string, string>;

type Queries = Record<string, string | undefined>;

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

export const http = {
  get: _get,
  post: _post,
  postNoBody: _postNoBody,
  put: _put,
  delete: _delete,
};
