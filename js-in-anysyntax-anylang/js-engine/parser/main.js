import { createAst } from "../ast/main.js";

function Parse(tokens) {
  const ast = createAst(tokens);

  return ast;
}

export { Parse };
