import * as process from "process";

import { http } from "@/lib/http";
import { JTD } from "@/lib/json/type";
import { Pagination, parseLinkHeader } from "@/lib/pagination/pagination";

const getSummaryResponse = {
  properties: {
    incomes: {
      elements: {
        properties: {
          id: { type: "string" },
          description: { type: "string" },
          amount: {
            type: "int32",
          },
          receive_date: { type: "string" },
          income_attribute: {
            properties: {
              id: { type: "string" },
              name: { type: "string" },
            },
          },
        },
      },
    },
  },
} as const;

type GetSummaryResponse = JTD<typeof getSummaryResponse>;

const getResponse = {
  properties: {
    id: { type: "string" },
    description: { type: "string" },
    amount: {
      type: "int32",
    },
    receive_date: { type: "string" },
    income_attribute: {
      properties: {
        id: { type: "string" },
        name: { type: "string" },
      },
    },
  },
} as const;

type GetResponse = JTD<typeof getResponse>;

const postRequest = {
  properties: {
    description: {
      type: "string",
    },
    attribute_id: {
      type: "string",
    },
    amount: {
      type: "int32",
    },
    receive_date: { type: "string" },
  },
} as const;

type PostRequest = JTD<typeof postRequest>;

const putRequest = {
  properties: {
    description: {
      type: "string",
    },
    attribute_id: {
      type: "string",
    },
    amount: {
      type: "int32",
    },
    receive_date: { type: "string" },
  },
} as const;

type PutRequest = JTD<typeof putRequest>;

const _getSummary = async ({
  page,
  perPage,
  year,
  extension,
}: {
  page: number;
  perPage: number;
  year: number;
  extension: object;
}): Promise<{ pagination: Pagination; response: GetSummaryResponse }> => {
  const response = await http.get({
    url: process.env.BACKEND_URL,
    path: "/v1/incomes",
    queries: {
      page: page.toString(),
      per_page: perPage.toString(),
      year: year.toString(),
    },
    extension,
  });
  switch (response.type) {
    case "success": {
      const { headers } = response;
      if (headers) {
        const pagination = parseLinkHeader(headers);
        console.log(pagination);
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
    path: `/v1/incomes/${id}`,
    extension,
  });
  switch (response.type) {
    case "success":
      return await response.body<GetResponse>(getResponse);
    case "failure":
      throw response.error;
  }
};

const _post = async ({
  description,
  attribute_id,
  amount,
  receive_date,
}: PostRequest): Promise<void> => {
  const data = {
    description,
    attribute_id,
    amount,
    receive_date,
  };
  const response = await http.post({
    url: process.env.BACKEND_URL,
    path: "/v1/incomes",
    requestBody: {
      schema: postRequest,
      data,
    },
  });
  console.log("POST /v1/incomes");
  switch (response.type) {
    case "success":
      return;
    case "failure":
      throw response.error;
  }
};

const _put = async ({
  id,
  description,
  attribute_id,
  amount,
  receive_date,
}: { id: string } & PutRequest): Promise<void> => {
  const data = {
    description,
    attribute_id,
    amount,
    receive_date,
  };
  const response = await http.put({
    url: process.env.BACKEND_URL,
    path: `/v1/incomes/${id}`,
    requestBody: {
      schema: postRequest,
      data,
    },
  });
  console.log("PUT /v1/incomes");
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
    path: `/v1/incomes/${id}`,
  });
  switch (response.type) {
    case "success":
      return;
    case "failure":
      throw response.error;
  }
};

export const incomesApi = {
  get: _get,
  getSummary: _getSummary,
  post: _post,
  put: _put,
  delete: _delete,
};
