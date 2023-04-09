import env from "@/lib/env";
import { NetworkError } from "@/lib/error";
import { http } from "@/lib/http";

type GetResponse = {
  total_number: number;
  page: number;
  per_page: number;
  expense_attributes: [
    {
      id: string;
      name: string;
      category: string;
    }
  ];
};

type PostRequest = {
  name: string;
  category: string;
};

type PutRequest = {
  name: string;
  category: string;
};

const _get = async ({
  category,
  page,
  perPage,
}: {
  category?: string;
  page: number;
  perPage: number;
}): Promise<GetResponse> => {
  const response = await http.get<GetResponse>({
    url: `${env.backendUrl}/v1/expense-attributes`,
    queries: {
      category,
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

const _post = async ({ name, category }: PostRequest): Promise<void> => {
  const response = await http.postNoBody<PostRequest>({
    url: `${env.backendUrl}/v1/expense-attributes`,
    requestBody: {
      name,
      category,
    },
  });
  console.log("POST /v1/expense-attributes");
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
  name,
  category,
}: { id: string } & PutRequest): Promise<void> => {
  const response = await http.put<PutRequest>({
    url: `${env.backendUrl}/v1/expense-attributes/${id}`,
    requestBody: {
      name,
      category,
    },
  });
  console.log("PUT /v1/expense-attributes");
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
    url: `${env.backendUrl}/v1/expense-attributes/${id}`,
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

export const expenseAttributesApi = {
  get: _get,
  post: _post,
  put: _put,
  delete: _delete,
};
