import env from "@/lib/env";
import { NetworkError } from "@/lib/error";
import { http } from "@/lib/http";

type GetResponse = {
  total_number: number;
  page: number;
  per_page: number;
  expenses: [
    {
      id: string;
      description: string;
      price: number;
      payment_date: string;
      expense_attribute: {
        id: string;
        name: string;
        category: string;
      };
    }
  ];
};

type PostRequest = {
  description: string;
  attribute_id: string;
  price: number;
  payment_date: string;
};

type PutRequest = {
  description: string;
  attribute_id: string;
  price: number;
  payment_date: string;
};

const _get = async ({
  page,
  perPage,
}: {
  page: number;
  perPage: number;
}): Promise<GetResponse> => {
  const response = await http.get<GetResponse>({
    url: `${env.backendUrl}/v1/expenses`,
    queries: {
      page: page.toString(),
      per_page: perPage.toString(),
    },
  });
  switch (response.type) {
    case "success":
      return response.body;
    case "clientError":
    case "serverError":
      throw new NetworkError(response.code, "network error");
    case "unknownError":
      // TODO
      throw new Error("");
  }
};

const _post = async ({
  description,
  attribute_id: attributeId,
  price,
  payment_date: paymentDate,
}: PostRequest): Promise<void> => {
  const response = await http.postNoBody<PostRequest>({
    url: `${env.backendUrl}/v1/expenses`,
    requestBody: {
      description,
      attribute_id: attributeId,
      price,
      payment_date: paymentDate,
    },
  });
  switch (response.type) {
    case "success":
      return;
    case "clientError":
    case "serverError":
      throw new NetworkError(response.code, "network error");
    case "unknownError":
      // TODO
      throw new Error("");
  }
};

const _put = async ({
  id,
  description,
  attribute_id: attributeId,
  price,
  payment_date: paymentDate,
}: { id: string } & PutRequest): Promise<void> => {
  const response = await http.put<PostRequest>({
    url: `${env.backendUrl}/v1/expenses/${id}`,
    requestBody: {
      description,
      attribute_id: attributeId,
      price,
      payment_date: paymentDate,
    },
  });
  switch (response.type) {
    case "success":
      return;
    case "clientError":
    case "serverError":
      throw new NetworkError(response.code, "network error");
    case "unknownError":
      // TODO
      throw new Error("");
  }
};

const _delete = async ({ id }: { id: string }): Promise<void> => {
  const response = await http.delete({
    url: `${env.backendUrl}/v1/expenses/${id}`,
  });
  switch (response.type) {
    case "success":
      return;
    case "clientError":
    case "serverError":
      throw new NetworkError(response.code, "network error");
    case "unknownError":
      // TODO
      throw new Error("");
  }
};

export const expensesApi = {
  get: _get,
  post: _post,
  put: _put,
  delete: _delete,
};
