"use client";
import React from "react";

const InsideView = ({ state, update }) => {
  console.log("state", state);
  return (
    <div className="flex flex-col">
      Ast
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Node Type
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Data Type
              </th>
              <th scope="col" className="px-6 py-3">
                Value
              </th>
              <th scope="col" className="px-6 py-3">
                Kind
              </th>
            </tr>
          </thead>
          <tbody>
            {state?.ast?.map((item, key) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={key}
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.nodeType}
                </td>
                <td className="px-6 py-4">
                  {item.metaData.name || item.metaData.functionName || "-"}
                </td>
                <td className="px-6 py-4">{item.metaData.dataType || "-"}</td>
                <td className="px-6 py-4">
                  {item.metaData.value ||
                    item?.metaData?.toPrint ||
                    item?.metaData?.body ||
                    "-"}
                </td>
                <td className="px-6 py-4">{item.metaData.kind || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      Stack, Heap Memory
      <div>
        <div className="flex flex-col md:flex-row md:w-full md:justify-around md:gap-5">
          <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              {state?.stack?.map((item, key) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={key}
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.Name}
                  </td>
                  <td className="px-6 py-4">{item.Value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              {state?.heap?.map((item, key) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={key}
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.Address}
                  </td>
                  <td className="px-6 py-4">
                    {typeof item?.Value === "string"
                      ? item?.Value
                      : `${typeof item?.Value} if you want see object See console log`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      Stack, Heap Memory - after assigment
      <div>
        <div className="flex flex-col md:flex-row md:w-full md:justify-around md:gap-5">
          <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              {state?.endStack?.map((item, key) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={key}
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.Name}
                  </td>
                  <td className="px-6 py-4">{item.Value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              {state?.endHeap?.map((item, key) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={key}
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.Address}
                  </td>
                  <td className="px-6 py-4">
                    {typeof item?.Value === "string"
                      ? item?.Value
                      : `${typeof item?.Value} if you want see object See console log`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InsideView;
