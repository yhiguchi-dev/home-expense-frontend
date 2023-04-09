"use client";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { Suspense, useCallback, useRef, useState } from "react";

import { useDoubleClickPrevention } from "@/hooks/double-click-prevention";
import { useExpense, useExpenseMutation } from "@/hooks/store/expense";
import { useExpenseAttributeCriteriaMutation } from "@/hooks/store/expense-attribute";
import { delay } from "@/lib/promise";
import { expenseService } from "@/lib/service/expense-service";
import AttributeSelector from "@/ui/dashboard/attribute-selector";
import Form from "@/ui/parts/form";

const ExpenseEdit = (): JSX.Element => {
  const descriptionRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const paymentDateRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const attributeIdRef = useRef<HTMLSelectElement>(null);
  const { id, description, price, paymentDate, attributeId, category } =
    useExpense();
  const { setExpenseAttributeCriteria } = useExpenseAttributeCriteriaMutation();
  const { refresh } = useExpenseMutation();
  const router = useRouter();
  const handleDescriptionChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setIsError(!event.currentTarget.checkValidity());
    },
    []
  );
  const handlePriceChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setIsError(!event.currentTarget.checkValidity());
    },
    []
  );
  const handlePaymentDateChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setIsError(!event.currentTarget.checkValidity());
    },
    []
  );
  const handleAttributeCategoryChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      console.log(event.currentTarget.value);
      setExpenseAttributeCriteria((currVal) => {
        return {
          ...currVal,
          category: event.currentTarget.value,
          page: 1,
          perPage: 100,
        };
      });
      setIsError(!event.currentTarget.checkValidity());
    },
    [setExpenseAttributeCriteria]
  );
  const handleAttributeIdChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setIsError(!event.currentTarget.checkValidity());
    },
    []
  );
  const [isError, setIsError] = useState(false);
  const { fn: handleSubmit } = useDoubleClickPrevention(
    async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
      await delay(1000);
      console.log(attributeIdRef.current);
      if (
        id !== undefined &&
        descriptionRef.current !== null &&
        attributeIdRef.current !== null &&
        priceRef.current !== null &&
        paymentDateRef.current !== null &&
        categoryRef.current !== null
      ) {
        await expenseService.update({
          id,
          description: descriptionRef.current.value,
          attributeId: attributeIdRef.current.value,
          price: parseInt(priceRef.current.value, 10),
          paymentDate: paymentDateRef.current.value,
        });
        // TODO
        setExpenseAttributeCriteria((currVal) => {
          return {
            ...currVal,
            category: undefined,
            page: 1,
            perPage: 20,
          };
        });
        refresh();
        router.push("/home/expense");
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
            <FormLabel>説明</FormLabel>
            <Input
              type="text"
              onChange={handleDescriptionChange}
              ref={descriptionRef}
              defaultValue={description}
              required
            />
            {isError && <FormErrorMessage>必須入力です。</FormErrorMessage>}
            <FormLabel>金額</FormLabel>
            <Input
              type="number"
              onChange={handlePriceChange}
              ref={priceRef}
              defaultValue={price}
              required
            />
            <FormLabel>支払日</FormLabel>
            <Input
              type="date"
              onChange={handlePaymentDateChange}
              ref={paymentDateRef}
              defaultValue={paymentDate}
              required
            />
            <FormLabel>分類</FormLabel>
            <Select
              defaultValue={category}
              onChange={handleAttributeCategoryChange}
              ref={categoryRef}
            >
              <option value="固定費">固定費</option>
              <option value="変動費">変動費</option>
            </Select>
            <FormLabel>属性名</FormLabel>
            <Suspense fallback={<CircularProgress isIndeterminate />}>
              <AttributeSelector
                onChange={handleAttributeIdChange}
                ref={attributeIdRef}
                defaultValue={attributeId}
              />
            </Suspense>

            <Box paddingY={8}>
              <Button type="submit" width="full">
                追加
              </Button>
            </Box>
          </FormControl>
        </Form>
      </Box>
    </Box>
  );
};

export default ExpenseEdit;
