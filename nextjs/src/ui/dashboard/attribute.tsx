"use client";
import React, { Suspense, useId, useRef, useState } from "react";

import { useDoubleClickPrevention } from "@/hooks/double-click-prevention";
import { useExpenseAttributeSummary } from "@/hooks/store/expense-attribute";
import { expenseAttributeService } from "@/lib/service/expense-attribute-service";
import AttributeTable from "@/ui/dashboard/attribute-table";
import PaginationComponent from "@/ui/dashboard/pagination-component";
import AddIcon from "@/ui/icon/add-icon";
import Box from "@/ui/parts/box";

const Attribute = (): JSX.Element => {
  const { expenseAttributes, pagination } = useExpenseAttributeSummary();
  const [isModalShowing, setIsModalShowing] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const nameId = useId();
  const categoryId = useId();
  const { fn: handleClick } = useDoubleClickPrevention(
    async (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): Promise<void> => {
      console.log(event);
      setIsModalShowing(true);
    }
  );

  const { fn: handleSubmit } = useDoubleClickPrevention(
    async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const name = nameRef.current;
      const category = categoryRef.current;
      if (name !== null && category !== null) {
        console.log(name.value);
        console.log(category.value);
        await expenseAttributeService.register({
          name: name.value,
          category: category.value,
        });
      }
      console.log(event);
    }
  );

  return (
    <div className="none:container mx-auto h-1/2 w-full rounded-lg bg-white shadow">
      <Box padding="2">
        <Suspense fallback={<div>loading</div>}>
          <div className="h-3/4 w-full overflow-y-scroll">
            <AttributeTable expenseAttributes={expenseAttributes} />
          </div>
          <div className="relative">
            <Box padding="1">
              <PaginationComponent pagination={pagination} />
              <div className="absolute bottom-0 right-0">
                <button
                  className="rounded-full border border-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-200"
                  onClick={handleClick}
                >
                  <Box padding="2">
                    <AddIcon />
                  </Box>
                </button>
              </div>
            </Box>
          </div>
        </Suspense>
      </Box>
      {isModalShowing ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-auto max-w-3xl">
              <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
                  <h3 className="text-3xl font-semibold">属性追加</h3>
                </div>
                <Box padding="3">
                  <form noValidate onSubmit={handleSubmit}>
                    <label
                      htmlFor={nameId}
                      className="mb-2 block text-sm font-medium text-gray-900"
                    >
                      属性名
                    </label>
                    <input
                      id={nameId}
                      type="text"
                      ref={nameRef}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />

                    <label
                      htmlFor={categoryId}
                      className="mb-2 block text-sm font-medium text-gray-900"
                    >
                      分類
                    </label>
                    <input
                      id={categoryId}
                      type="text"
                      ref={categoryRef}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                    <div className="relative inline-block text-left"></div>
                    <div className="relative flex-auto p-6"></div>
                    <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
                      <button
                        className="background-transparent mr-1 mb-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                        type="button"
                        onClick={() => {
                          setIsModalShowing(false);
                        }}
                      >
                        Close
                      </button>
                      <button
                        className="mr-1 mb-1 rounded bg-emerald-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                        type="submit"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </Box>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </div>
  );
};
export default Attribute;
