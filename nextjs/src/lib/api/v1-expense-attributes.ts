import { NetworkError } from "@/lib/error";
import { http } from "@/lib/http";

type GetRequest = {
  category: string;
  page: number;
  perPage: number;
};

type GetResponse = {
  total_number: number;
  page: number;
  expense_attributes: [
    {
      id: string;
      name: string;
      category: string;
    }
  ];
};

const get = async ({
  category,
  page,
  perPage,
}: GetRequest): Promise<GetResponse> => {
  const queryParam = new URLSearchParams({
    category,
    page: page.toString(),
    "per-page": perPage.toString(),
  }).toString();
  const { get } = http;
  const response = await get<GetResponse>({
    url: `http://127.0.0.1:8081/v1/expense-attributes?${queryParam}`,
  });
  switch (response.type) {
    case "success":
      return response.body;
    default:
      throw new NetworkError(response.code, "network error");
  }
};

type PostRequest = {
  name: string;
  category: string;
};

const post = async ({ name, category }: PostRequest): Promise<void> => {
  const { postNoBody } = http;
  const response = await postNoBody<PostRequest>({
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

export const expenseAttributesApi = {
  get,
  post,
};
