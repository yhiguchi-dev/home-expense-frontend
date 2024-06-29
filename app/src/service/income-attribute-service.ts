"use server";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import { incomeAttributesApi } from "@/lib/api/v1-income-attributes";
import type { IncomeAttribute, IncomeAttributes } from "@/lib/income-attribute";
import type { Pagination } from "@/lib/pagination/pagination";
import { isString } from "@/lib/type-guard";

export const getIncomeAttributeSummary = async ({
  category,
  page,
  perPage,
  tag,
}: {
  category?: string;
  page: number;
  perPage: number;
  tag: string;
}): Promise<{
  incomeAttributes: IncomeAttributes;
  pagination: Pagination;
}> => {
  const { pagination, response } = await incomeAttributesApi.getSummary({
    category,
    page,
    perPage,
    extension: {
      next: { tags: [tag] },
    },
  });
  const { income_attributes: incomeAttributes } = response;
  const _incomeAttributes: IncomeAttributes = incomeAttributes.map((value) => {
    const { id, name } = value;
    const incomeAttribute: IncomeAttribute = {
      id,
      name,
    };
    return incomeAttribute;
  });
  return {
    incomeAttributes: _incomeAttributes,
    pagination,
  };
};

export const getIncomeAttribute = async ({
  id,
  tag,
}: {
  id: string;
  tag: string;
}): Promise<IncomeAttribute> => {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  const response = await incomeAttributesApi.get({
    id,
    extension: {
      next: { tags: [tag] },
    },
  });
  const { id: attributeId, name } = response;
  return {
    id: attributeId,
    name,
  };
};

export const registerIncomeAttribute = async (
  formData: FormData,
): Promise<void> => {
  const name = formData.get("name");
  if (isString(name)) {
    await incomeAttributesApi.post({ name });
    redirect("/income-attribute");
  }
};

export const updateIncomeAttribute = async (
  formData: FormData,
): Promise<void> => {
  const id = formData.get("incomeAttributeId");
  const name = formData.get("name");
  if (isString(id) && isString(name)) {
    await incomeAttributesApi.put({ id, name });
    redirect("/income-attribute");
  }
};

export const deleteIncomeAttribute = async (
  formData: FormData,
): Promise<void> => {
  const id = formData.get("incomeAttributeId");
  if (isString(id)) {
    await incomeAttributesApi.delete({ id });
    revalidateTag("income-attribute");
  }
};
