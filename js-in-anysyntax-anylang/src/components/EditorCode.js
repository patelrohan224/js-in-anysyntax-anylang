"use client";

import Editor from "@monaco-editor/react";
import React, { useEffect, useState } from "react";
import InterpretJs from "../../js-engine/interpretor/main";
import { Memory } from "../../js-engine/core/memory";

const EditorCode = ({ update, state }) => {
  const [render, setrender] = useState(false);

  const { config } = state;

  const defaultCode = `
  runHelloWorldFn()
${config["print"]}(num)
${config["print"]}(hoisted)

${config["let"]} num = 00
${config["const"]} arr = [1,2,3,4,5]
${config["let"]} namegj = "રોહન પટેલ"
${config["let"]} name = "Rohan Patel"
${config["var"]} hoisted = "is it Undefined"

${config["print"]}(666)
${config["print"]}(arr)
${config["print"]}(hoisted)
${config["print"]}(name)
${config["print"]}(namegj)


${config["function"]} runHelloWorldFn() {
${config["print"]}("Hello world")
${config["print"]}(arr)
${config["print"]}(name)
}
`;

  useEffect(() => {
    setrender(!render);
  }, [state.modal]);

  const [text, settext] = useState(defaultCode);
  const saveItems = (val) => {
    console.log("🚀 ~ file: EditorCode.js:46 ~ saveItems ~ val:", val);
    update({ ...val });
  };
  const runCode = () => {
    Memory.resetMemory();
    update({
      tokens: "",
      ast: "",
      stack: "",
      heap: "",
      endStack: "",
      endHeap: "",
    });
    const { output, tokens, AST, stack, heap, endStack, endHeap } = InterpretJs(
      text,
      state?.config,
      saveItems
    );
    update({
      editorText: output?.join("\n"),
      tokens,
      ast: AST,
      stack,
      heap,
      endStack,
      endHeap,
    });
  };
  const handleEditorChange = (value, event) => {
    settext(value);
  };
  return (
    <div className="w-full md:w-2/4">
      <div className="w-full">
        <div className="flex flex-col items-center justify-between md:flex-row">
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
        <div>
          {state.modal && (
            <Editor
              height={"90vh"}
              defaultLanguage="javascript"
              defaultValue={defaultCode}
              onChange={handleEditorChange}
              theme="vs-dark"
              options={{
                cursorStyle: "line",
              }}
              onMount={(editor, monaco) => {
                setTimeout(function () {
                  editor.getAction("editor.action.formatDocument").run();
                }, 300);
              }}
            />
          )}
          {!state.modal && (
            <Editor
              height={"90vh"}
              defaultLanguage="javascript"
              defaultValue={defaultCode}
              onChange={handleEditorChange}
              theme="vs-dark"
              options={{
                cursorStyle: "line",
              }}
              onMount={(editor, monaco) => {
                setTimeout(function () {
                  editor.getAction("editor.action.formatDocument").run();
                }, 300);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditorCode;
