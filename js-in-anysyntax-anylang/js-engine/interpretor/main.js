import chalk from "chalk";
import { tokenize } from "../lexer/tokenizer.js";
import { codeCleaner } from "../lexer/cleaners.js";
import { Parse } from "../parser/main.js";
import { logMemory } from "../core/helpers.js";

import { Memory } from "../core/memory.js";

import { stringSanitizeforFinalOutput } from "../interpretor/helpers.js";
function InterpretJs(sourcecode) {
  //Step 1: Read Sourcecode using node fs module

  //Step 2: Cleaning the Sourcecode
  let result = codeCleaner(sourcecode);
  //Step 3: Tokenise source code

  //ideal tokens array = [let, x, =, 10, const, y , = ,20]
  let tokens = tokenize(sourcecode);
  console.log("tokens:", tokens);
  //Step 4: Parser(tokens) -> AST

  let AST = Parse(tokens);
  console.log("AST:", AST);

  let output = [];
  logMemory();

  //loop over each ast node and interpret

  console.log(chalk.red("Execution phase : Interpretation starts"));

  function InterpretAST(AST) {
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
          Memory.write(currrentNodeMetaData, result);

          break;

        case "PrintStatement":
          //interpret print statements here

          switch (currrentNodeMetaData.printType) {
            case "variable":
              // Give the variable name, get back the value from Heap
              result = Memory.read(currrentNodeMetaData.toPrint[0]); //arr, name, str

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
          console.log(chalk.cyan("We are execution a function Now"));

          //we need to execute function body

          let functionName = currrentNodeMetaData.functionName;
          console.log("functionName:", functionName);

          //how do we read value from memory?

          let functionBody = Memory.read(functionName);

          InterpretAST(functionBody.value);

        default:
          console.log("Unknown NodeType", currrentNode);
      }
    }
  }

  InterpretAST(AST);

  logMemory();

  return output;
}

export default InterpretJs;
