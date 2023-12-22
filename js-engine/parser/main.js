import { createAst } from "../ast/main.js";

function Parse(tokens, config) {
  const ast = createAst(tokens, config);

  return ast;
}

export { Parse };
