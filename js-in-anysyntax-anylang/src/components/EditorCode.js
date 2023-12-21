"use client";
import { updateConsumerState } from "@/Provider";
import Editor from "@monaco-editor/react";
import React, { useState } from "react";
import InterpretJs from "../../js-engine/interpretor/main";

const defaultCode = `

showValues()
print(num)

let num = 00000
const arr = [1,2,3,4]
let name = 'test'

print(666)
print(arr)
print(name)

 function showValues()
 {

 print('Hello')

print(arr)
print(name)
    
 }    
`;

const EditorCode = ({ update }) => {
  const [text, settext] = useState(defaultCode);
  const runCode = () => {
    const outPut = InterpretJs(text);
    console.log("🚀 ~ file: EditorCode.js:40 ~ runCode ~ outPut:", outPut);
    update({ editorText: outPut?.join("\n") });
  };
  const handleEditorChange = (value, event) => {
    console.log(
      "🚀 ~ file: EditorCode.js:12 ~ handleEditorChange ~ value:",
      value
    );
    settext(value);
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
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Config your syntax in any language
          </label>
          <div>
            <button
              data-modal-target="static-modal"
              data-modal-toggle="static-modal"
              className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
              onClick={() => {
                update({ modal: true });
              }}
            >
              Config
            </button>
          </div>
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={runCode}
            disabled={!text}
          >
            Run Code
          </button>
        </div>
        {/* <textarea
          id="message"
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your code here..."
          onChange={(e) => settext(e.target.value)}
        ></textarea> */}

        <Editor
          height={"90vh"}
          defaultLanguage="javascript"
          defaultValue={defaultCode}
          onChange={handleEditorChange}
          theme="vs-dark"
        />
      </div>
    </div>
  );
};

export default EditorCode;
