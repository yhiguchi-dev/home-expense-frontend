"use client";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useCallback, useRef, useState } from "react";

import { useDoubleClickPrevention } from "@/hooks/double-click-prevention";
import {
  useExpenseAttributeMutation,
  useExpenseAttributeSummary,
} from "@/hooks/store/expense-attribute";
import { expenseAttributeService } from "@/lib/service/expense-attribute-service";
import Form from "@/ui/parts/form";

type Props = {
  id: string;
};
const AttributeEdit = ({ id }: Props): JSX.Element => {
  const nameRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const { refresh } = useExpenseAttributeMutation();
  const { expenseAttributes } = useExpenseAttributeSummary();
  const expenseAttribute = expenseAttributes.find((value) => {
    return value.id === id;
  });
  const router = useRouter();
  const handleAttributeNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setIsError(!event.currentTarget.checkValidity());
    },
    []
  );
  const handleAttributeCategoryChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setIsError(!event.currentTarget.checkValidity());
    },
    []
  );
  const [isError, setIsError] = useState(false);
  const { fn: handleSubmit } = useDoubleClickPrevention(
    async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (nameRef.current !== null && categoryRef.current !== null) {
        console.log(nameRef.current.value);
        console.log(categoryRef.current.value);
        await expenseAttributeService.update({
          id,
          name: nameRef.current.value,
          category: categoryRef.current.value,
        });
        refresh();
        router.push("/home/attribute");
      }
      console.log(event);
    }
  );
  const handleFormInvalid = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      if (!event.currentTarget.checkValidity()) {
        setIsError(true);
        return;
      }
      setIsError(false);
    },
    []
  );
  if (expenseAttribute === undefined) {
    return <></>;
  }
  return (
    <Box
      bg="white"
      rounded="2xl"
      shadow="base"
      width="auto"
      height="auto"
      overflow="hidden"
    >
      <Box padding={4}>
        <Form onSubmit={handleSubmit} onFormInvalid={handleFormInvalid}>
          <FormControl isInvalid={isError}>
            <FormLabel>属性名</FormLabel>
            <Input
              type="text"
              onChange={handleAttributeNameChange}
              ref={nameRef}
              defaultValue={expenseAttribute.name}
              required
            />
            {isError && <FormErrorMessage>必須入力です。</FormErrorMessage>}
            <FormLabel>分類</FormLabel>
            <Select
              defaultValue={expenseAttribute.category}
              onChange={handleAttributeCategoryChange}
              ref={categoryRef}
            >
              <option value="固定費">固定費</option>
              <option value="変動費">変動費</option>
            </Select>
            <Box paddingY={8}>
              <Button type="submit" width="full">
                更新
              </Button>
            </Box>
          </FormControl>
        </Form>
      </Box>
    </Box>
  );
};
export default AttributeEdit;
