"use client";
import { updateConsumerState } from "@/Provider";
import React, { useState } from "react";

const Editor = ({ update }) => {
  const [text, settext] = useState("");
  const runCode = () => {
    update({ editorText: text });
  };
  return (
    <div className="w-2/4">
      <div className="w-full">
        <div className="flex flex-row items-center justify-between">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Write your code here...
          </label>
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={runCode}
            disabled={!text}
          >
            Run Code
          </button>
        </div>
        <textarea
          id="message"
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your code here..."
          onChange={(e) => settext(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
};

export default Editor;
