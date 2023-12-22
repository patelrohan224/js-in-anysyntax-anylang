"use client";
import { Memory } from "../core/memory.js";
import {
  parseVariableDeclaration,
  parsePrintStatement,
  parseFunctionExpression,
  parseFunctionCall,
} from "./handlers.js";

function createAst(tokens, config) {
  //Step 1: init AST
  let ast = []; //array of nodes

  //Step 2:iterate through tokens

  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];

    //Step 3: Identifying the token

    //there are two type of tokens so far
    //a. Variables decl, assignement
    //b. Print keyword

    switch (token) {
      //figuring out variables in our tokens
      case config["let"]:
      case config["const"]:
      case config["var"]:
        //handle Variables here

        let { variableNode, newindex } = parseVariableDeclaration(
          tokens,
          i,
          token
        );

        ast.push(variableNode);

        //1st phase memory
        Memory.write(variableNode.metaData, "", config);

        //2nd phase: Memory will have assignments

        i = newindex - 1;
        break;

      case config["print"]:
        const { node: nodePrint, newIndex: newIndexPrint } =
          parsePrintStatement(i, tokens);
        ast.push(nodePrint);
        i = newIndexPrint - 1;

        break;

      case config["function"]:
        let { node: nodeFunc, newIndex: newIndexFunc } =
          parseFunctionExpression(tokens, i);

        ast.push(nodeFunc);

        //we need to convert functionbody tokens into functionbody AST

        let functionBodyTokens = nodeFunc.metaData.body;

        //if we feed tokens to it, it will output AST
        let functionBodyNode = createAst(functionBodyTokens, config);

        //designed for memory
        let functionNode = {
          name: nodeFunc.metaData.functionName,
          value: functionBodyNode,
          type: "function",
        };

        Memory.write(functionNode, "", config);

        i = newIndexFunc;

      default:
        if (tokens[i + 1] === "(" && tokens[i + 2] === ")") {
          let { node: nodeFuncCall, newIndex: newIndexFuncCall } =
            parseFunctionCall(tokens, i);

          ast.push(nodeFuncCall);
          i = newIndexFuncCall;
        }

        break;
    }
  }

  return ast;
}

export { createAst };
