"use client";

import { tokenize } from "../lexer/tokenizer.js";
import { codeCleaner } from "../lexer/cleaners.js";
import { Parse } from "../parser/main.js";
import { logMemory } from "../core/helpers.js";

import { Memory } from "../core/memory.js";

import { stringSanitizeforFinalOutput } from "../interpretor/helpers.js";
function InterpretJs(sourcecode, config, update) {
  //Step 1: Read Sourcecode using node fs module

  //Step 2: Cleaning the Sourcecode
  let result = codeCleaner(sourcecode);
  //Step 3: Tokenise source code

  //ideal tokens array = [let, x, =, 10, const, y , = ,20]
  let tokens = tokenize(sourcecode);

  //Step 4: Parser(tokens) -> AST

  let AST = Parse(tokens, config);

  let output = [];

  const { stack, heap } = logMemory();

  //loop over each ast node and interpret

  function InterpretAST(AST, config) {
    for (let i = 0; i < AST.length; i++) {
      //Read AST Node Data
      const currrentNode = AST[i];
      const currrentNodeType = currrentNode.nodeType;
      const currrentNodeMetaData = currrentNode.metaData;

      let result;
      switch (currrentNodeType) {
        case "VariableDeclaration":
          //interpret var dec here

          //currrentNodeMetaData = { name: 'num', dataType: 'number', value: '12', kind: 'var' }
          //
          /* Grab the node value found through
           ParseVariableDeclaration() in our Parser */
          result = currrentNodeMetaData.value;

          //2nd phase memory - undefined -> actual value
          Memory.write(currrentNodeMetaData, result, config);

          break;

        case "PrintStatement":
          //interpret print statements here

          switch (currrentNodeMetaData.printType) {
            case "variable":
              // Give the variable name, get back the value from Heap
              result = Memory.read(currrentNodeMetaData.toPrint[0], config); //arr, name, str

              //
              output.push(result.value);

              break;

            case "literal":
              let literalstring = currrentNodeMetaData.toPrint.join(" ");

              result = stringSanitizeforFinalOutput(literalstring);

              output.push(result);
              break;
          }

          break;

        case "FunctionCall":
          //we need to execute function body

          let functionName = currrentNodeMetaData.functionName;

          //how do we read value from memory?

          let functionBody = Memory.read(functionName, config);

          InterpretAST(functionBody.value, config);

        default:
          console.log("Unknown NodeType", currrentNode);
      }
    }
  }

  InterpretAST(AST, config);

  const { endStack, endHeap } = logMemory();

  return { output, tokens, AST, stack, heap, endStack, endHeap };
}

export default InterpretJs;
