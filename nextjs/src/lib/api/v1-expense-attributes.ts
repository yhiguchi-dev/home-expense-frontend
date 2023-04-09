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
    url: "http://127.0.0.1:8081/v1/expense-attributes",
    queries: {
      category,
      page: page.toString(),
      per_page: perPage.toString(),
    },
  });
  switch (response.type) {
    case "success":
      return response.body;
    default:
      throw new NetworkError(response.code, "network error");
  }
};

const _post = async ({ name, category }: PostRequest): Promise<void> => {
  const response = await http.postNoBody<PostRequest>({
    url: "http://127.0.0.1:8081/v1/expense-attributes",
    requestBody: {
      name,
      category,
    },
  });
  switch (response.type) {
    case "success":
      return;
    default:
      throw new NetworkError(response.code, "network error");
  }
};

const _put = async ({
  id,
  name,
  category,
}: { id: string } & PutRequest): Promise<void> => {
  const response = await http.put<PutRequest>({
    url: `http://127.0.0.1:8081/v1/expense-attributes/${id}`,
    requestBody: {
      name,
      category,
    },
  });
  switch (response.type) {
    case "success":
      return;
    default:
      throw new NetworkError(response.code, "network error");
  }
};

const _delete = async ({ id }: { id: string }): Promise<void> => {
  const response = await http.delete({
    url: `http://127.0.0.1:8081/v1/expense-attributes/${id}`,
  });
  switch (response.type) {
    case "success":
      return;
    default:
      throw new NetworkError(response.code, "network error");
  }
};

export const expenseAttributesApi = {
  get: _get,
  post: _post,
  put: _put,
  delete: _delete,
};
