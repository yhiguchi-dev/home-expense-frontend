import * as process from "process";

import { http } from "@/lib/http";
import { JTD } from "@/lib/json/type";
import { Pagination, parseLinkHeader } from "@/lib/pagination/pagination";

const getSummaryResponse = {
  properties: {
    expenses: {
      elements: {
        properties: {
          id: { type: "string" },
          description: { type: "string" },
          price: {
            type: "int32",
          },
          payment_date: { type: "string" },
          expense_attribute: {
            properties: {
              id: { type: "string" },
              name: { type: "string" },
              category: { enum: ["固定費", "変動費"] },
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
    price: {
      type: "int32",
    },
    payment_date: { type: "string" },
    expense_attribute: {
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        category: { enum: ["固定費", "変動費"] },
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
    price: {
      type: "int32",
    },
    payment_date: { type: "string" },
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
    price: {
      type: "int32",
    },
    payment_date: { type: "string" },
  },
} as const;

type PutRequest = JTD<typeof putRequest>;

const _getSummary = async ({
  page,
  perPage,
  year,
  month,
  extension,
}: {
  page: number;
  perPage: number;
  year: number;
  month: number;
  extension: object;
}): Promise<{ pagination: Pagination; response: GetSummaryResponse }> => {
  const response = await http.get({
    url: process.env.BACKEND_URL,
    path: "/v1/expenses",
    queries: {
      page: page.toString(),
      per_page: perPage.toString(),
      year: year.toString(),
      month: month.toString(),
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
    path: `/v1/expenses/${id}`,
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
  price,
  payment_date,
}: PostRequest): Promise<void> => {
  const data = {
    description,
    attribute_id,
    price,
    payment_date,
  };
  const response = await http.post({
    url: process.env.BACKEND_URL,
    path: "/v1/expenses",
    requestBody: {
      schema: postRequest,
      data,
    },
  });
  console.log("POST /v1/expenses");
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
  price,
  payment_date,
}: { id: string } & PutRequest): Promise<void> => {
  const data = {
    description,
    attribute_id,
    price,
    payment_date,
  };
  const response = await http.put({
    url: process.env.BACKEND_URL,
    path: `/v1/expenses/${id}`,
    requestBody: {
      schema: postRequest,
      data,
    },
  });
  console.log("PUT /v1/expenses");
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
    path: `/v1/expenses/${id}`,
  });
  switch (response.type) {
    case "success":
      return;
    case "failure":
      throw response.error;
  }
};

export const expensesApi = {
  get: _get,
  getSummary: _getSummary,
  post: _post,
  put: _put,
  delete: _delete,
};
