import * as process from "process";

import { http } from "@/lib/http";
import { JTD } from "@/lib/json/type";

const getAggregateResponse = {
  properties: {
    income_total_amount: {
      type: "int32",
    },
    disposal_income_amount: {
      type: "int32",
    },
    total_amount: {
      type: "int32",
    },
    fixed_expense_detail: {
      properties: {
        total_amount: {
          type: "int32",
        },
        attribute_aggregates: {
          elements: {
            properties: {
              attribute_id: { type: "string" },
              attribute_name: { type: "string" },
              total_amount: {
                type: "int32",
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
        attribute_aggregates: {
          elements: {
            properties: {
              attribute_id: { type: "string" },
              attribute_name: { type: "string" },
              total_amount: {
                type: "int32",
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
