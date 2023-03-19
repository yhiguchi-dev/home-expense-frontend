import React from "react";

const Home = (): JSX.Element => {
  return (
    <>
      <div className="container mx-auto mt-12">
        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="w-full rounded-lg bg-white px-4 py-5 shadow">
            <div className="truncate text-sm font-medium text-gray-500">
              Total users
            </div>
            <div className="mt-1 text-3xl font-semibold text-gray-900">
              12,00
            </div>
          </div>
          <div className="w-full rounded-lg bg-white px-4 py-5 shadow">
            <div className="truncate text-sm font-medium text-gray-500">
              Total Profit
            </div>
            <div className="mt-1 text-3xl font-semibold text-gray-900">
              $ 450k
            </div>
          </div>
          <div className="w-full rounded-lg bg-white px-4 py-5 shadow">
            <div className="truncate text-sm font-medium text-gray-500">
              Total Orders
            </div>
            <div className="mt-1 text-3xl font-semibold text-gray-900">20k</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
