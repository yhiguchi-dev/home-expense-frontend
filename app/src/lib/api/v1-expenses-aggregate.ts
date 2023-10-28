import * as process from "process";

import { http } from "@/lib/http";
import { JTD } from "@/lib/json/type";

const getAggregateResponse = {
  properties: {
    total_amount: {
      type: "int32",
    },
    fixed_expense_detail: {
      properties: {
        total_amount: {
          type: "int32",
        },
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
    },
    variable_expense_detail: {
      properties: {
        total_amount: {
          type: "int32",
        },
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
    },
  },
} as const;

type GetAggregateResponse = JTD<typeof getAggregateResponse>;

const _get = async ({
  year,
  month,
  extension,
}: {
  year: number;
  month: number;
  extension: object;
}): Promise<GetAggregateResponse> => {
  const response = await http.get({
    url: process.env.BACKEND_URL,
    path: "/v1/expenses/aggregate",
    queries: {
      year: year.toString(),
      month: month.toString(),
    },
    extension,
  });
  switch (response.type) {
    case "success":
      return await response.body<GetAggregateResponse>(getAggregateResponse);
    case "failure":
      throw response.error;
  }
};

export const expensesAggregateApi = {
  get: _get,
};
