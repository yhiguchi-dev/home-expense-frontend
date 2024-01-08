"use server";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import { incomesApi } from "@/lib/api/v1-incomes";
import { Income, Incomes } from "@/lib/income";
import { Pagination } from "@/lib/pagination/pagination";
import { isString } from "@/lib/type-guard";

export const getIncomeSummary = async ({
  page,
  perPage,
  year,
  tag,
}: {
  page: number;
  perPage: number;
  year: number;
  tag: string;
}): Promise<{
  incomes: Incomes;
  pagination: Pagination;
}> => {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  const { pagination, response } = await incomesApi.getSummary({
    page,
    perPage,
    year,
    extension: {
      next: { tags: [tag] },
    },
  });
  const { incomes } = response;
  const _incomes: Incomes = incomes.map((value) => {
    const {
      id,
      description,
      income_attribute: incomeAttribute,
      amount,
      receive_date: receiveDate,
    } = value;
    const { id: attributeId, name } = incomeAttribute;
    const income: Income = {
      id,
      description,
      amount,
      receiveDate,
      attributeId,
      attributeName: name,
    };
    return income;
  });
  return {
    incomes: _incomes,
    pagination,
  };
};

export const getIncome = async ({
  id,
  tag,
}: {
  id: string;
  tag: string;
}): Promise<Income> => {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  const response = await incomesApi.get({
    id,
    extension: {
      next: { tags: [tag] },
    },
  });
  const {
    description,
    income_attribute: incomeAttribute,
    amount,
    receive_date: receiveDate,
  } = response;
  const { id: attributeId, name } = incomeAttribute;
  return {
    id,
    description,
    amount,
    receiveDate,
    attributeId,
    attributeName: name,
  };
};

export const registerIncome = async (formData: FormData): Promise<void> => {
  const id = formData.get("incomeId");
  const description = formData.get("description");
  const attributeId = formData.get("attributeId");
  const amount = formData.get("amount");
  const receiveDate = formData.get("receiveDate");
  if (
    isString(id) &&
    isString(description) &&
    isString(attributeId) &&
    isString(amount) &&
    isString(receiveDate)
  ) {
    await incomesApi.post({
      description,
      attribute_id: attributeId,
      amount: parseInt(amount),
      receive_date: receiveDate,
    });
    redirect("/income");
  }
};

export const updateIncome = async (formData: FormData): Promise<void> => {
  const id = formData.get("incomeId");
  const description = formData.get("description");
  const attributeId = formData.get("attributeId");
  const amount = formData.get("amount");
  const receiveDate = formData.get("receiveDate");
  console.log(description);
  if (
    isString(id) &&
    isString(description) &&
    isString(attributeId) &&
    isString(amount) &&
    isString(receiveDate)
  ) {
    console.log(description);
    await incomesApi.put({
      id,
      description,
      attribute_id: attributeId,
      amount: parseInt(amount),
      receive_date: receiveDate,
    });
    redirect("/income");
  }
};

export const deleteIncome = async (formData: FormData): Promise<void> => {
  const incomeId = formData.get("incomeId");
  if (isString(incomeId)) {
    await incomesApi.delete({ id: incomeId });
    revalidateTag("income");
  }
};
