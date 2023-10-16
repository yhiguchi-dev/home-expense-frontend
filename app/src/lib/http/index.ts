import { HttpRequest, HttpResponse, RequestBody } from "@/lib/http/type";
import { json } from "@/lib/json";
import { JTDSchema } from "@/lib/json/type";

const _get = async (
  params: Omit<HttpRequest, "method">,
): Promise<HttpResponse> => {
  const response = await send({ ...params, method: "GET" });
  console.log(response);
  return resolve(response);
};

const _post = async (
  params: Omit<HttpRequest, "method">,
): Promise<HttpResponse> => {
  const response = await send({
    ...params,
    method: "POST",
  });
  return resolve(response);
};

const _put = async (
  params: Omit<HttpRequest, "method">,
): Promise<HttpResponse> => {
  const response = await send({
    ...params,
    method: "PUT",
  });
  return resolve(response);
};

const _delete = async (
  params: Omit<HttpRequest, "method">,
): Promise<HttpResponse> => {
  const response = await send({ ...params, method: "DELETE" });
  return resolve(response);
};

const send = async ({
  url,
  path,
  queries,
  method,
  headers,
  requestBody,
  mode = "cors",
  cache = "no-store",
  credentials = "same-origin",
  timeout = 3000,
  extension = {},
}: HttpRequest): Promise<Response> => {
  const controller = new AbortController();
  const _timeout = setTimeout(() => {
    controller.abort();
  }, timeout);
  try {
    const urlValue = new URL(path, url);
    if (queries) {
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
    const body = serializeRequestBody(requestBody);
    console.log(urlValue);
    return await fetch(urlValue, {
      method,
      headers: {
        ...headers,
        "content-type": "application/json",
      },
      body,
      signal: controller.signal,
      mode,
      cache,
      credentials,
      ...extension,
    });
  } finally {
    clearTimeout(_timeout);
  }
};

const serializeRequestBody = (requestBody?: RequestBody) => {
  if (requestBody) {
    const { serialize } = json;
    return serialize(requestBody.schema, requestBody.data);
  }
  return undefined;
};

const resolve = (response: Response): HttpResponse => {
  const body = async <T>(schema: JTDSchema): Promise<T> => {
    const { parse } = json;
    const responseJson: unknown = await response.json();
    return parse<T>(schema, JSON.stringify(responseJson));
  };
  console.log(response.status);
  const headers: Record<string, string> = {};
  response.headers.forEach((value, key) => {
    console.log(key, value);
    headers[key] = value;
  });
  console.log(headers);
  if (response.ok) {
    return {
      type: "success",
      code: response.status,
      headers,
      body,
    };
  }
  const code = response.status;
  if (code >= 400 && code <= 499) {
    return {
      type: "clientError",
      code,
      headers,
      body,
    };
  }
  if (code >= 500 && code <= 599) {
    return {
      type: "serverError",
      code,
      headers,
      body,
    };
  }
  throw UnknownHttpStatusError(code, `unknown http status code:${code}`);
};

export const http = {
  get: _get,
  post: _post,
  put: _put,
  delete: _delete,
};
