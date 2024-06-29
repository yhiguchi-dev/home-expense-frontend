import process from "process";

import { http } from "@/lib/http";
import type { JTD } from "@/lib/json/type";
import { type Pagination, parseLinkHeader } from "@/lib/pagination/pagination";

const getSummaryResponse = {
  properties: {
    income_attributes: {
      elements: {
        properties: {
          id: { type: "string" },
          name: { type: "string" },
        },
      },
    },
  },
} as const;

type GetSummaryResponse = JTD<typeof getSummaryResponse>;

const getResponse = {
  properties: {
    id: { type: "string" },
    name: { type: "string" },
  },
} as const;

type GetResponse = JTD<typeof getResponse>;

const postRequest = {
  properties: {
    name: {
      type: "string",
    },
  },
} as const;

type PostRequest = JTD<typeof postRequest>;

const putRequest = {
  properties: {
    name: {
      type: "string",
    },
  },
} as const;

type PutRequest = JTD<typeof putRequest>;

const _getSummary = async ({
  category,
  page,
  perPage,
  extension,
}: {
  category?: string;
  page: number;
  perPage: number;
  extension: object;
}): Promise<{ pagination: Pagination; response: GetSummaryResponse }> => {
  const response = await http.get({
    url: process.env.BACKEND_URL,
    path: "/v1/income-attributes",
    queries: {
      category,
      page: page.toString(),
      per_page: perPage.toString(),
    },
    extension,
  });
  switch (response.type) {
    case "success": {
      const { headers } = response;
      if (headers) {
        const pagination = parseLinkHeader(headers);
        const responseBody =
          await response.body<GetSummaryResponse>(getSummaryResponse);
        return {
          pagination,
          response: responseBody,
        };
      }

      throw new Error("");
    }
    case "failure":
      throw response.error;
  }
};

const _get = async ({
  id,
  extension,
}: {
  id: string;
  extension: object;
}): Promise<GetResponse> => {
  const response = await http.get({
    url: process.env.BACKEND_URL,
    path: `/v1/income-attributes/${id}`,
    extension,
  });
  switch (response.type) {
    case "success":
      return await response.body<GetResponse>(getResponse);
    case "failure":
      throw response.error;
  }
};

const _post = async ({ name }: PostRequest): Promise<void> => {
  const data = {
    name,
  };
  const response = await http.post({
    url: process.env.BACKEND_URL,
    path: "/v1/income-attributes",
    requestBody: {
      schema: postRequest,
      data,
    },
  });
  console.log("POST /v1/income-attributes");
  switch (response.type) {
    case "success":
      return;
    case "failure":
      throw response.error;
  }
};

const _put = async ({
  id,
  name,
}: { id: string } & PutRequest): Promise<void> => {
  const data = {
    name,
  };
  const response = await http.put({
    url: process.env.BACKEND_URL,
    path: `/v1/income-attributes/${id}`,
    requestBody: {
      schema: putRequest,
      data,
    },
  });
  console.log("PUT /v1/income-attributes");
  switch (response.type) {
    case "success":
      return;
    case "failure":
      throw response.error;
  }
};

const _delete = async ({ id }: { id: string }): Promise<void> => {
  const response = await http.delete({
    url: process.env.BACKEND_URL,
    path: `/v1/income-attributes/${id}`,
  });
  switch (response.type) {
    case "success":
      return;
    case "failure":
      throw response.error;
  }
};

export const incomeAttributesApi = {
  getSummary: _getSummary,
  get: _get,
  post: _post,
  put: _put,
  delete: _delete,
};
