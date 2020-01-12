const findBlocks = (tree, astTree, blockNames) => {
  const iter = (node, ast, acc) => {
    const { loc } = ast;
    const nodeWithLocation = {
      ...node,
      location: {
        start: {
          column: loc.start.column,
          line: loc.start.line
        },
        end: {
          column: loc.end.column,
          line: loc.end.line
        }
      }
    }
    const newAcc = blockNames.includes(node.block) && !node.elem ? [ ...acc, nodeWithLocation ] : acc;
    const { content } = node;
    const astContentProperty = ast.children.find(el => el.key.value === 'content');

    if (astContentProperty && astContentProperty.value.type === 'Array') {
      const { children } = astContentProperty.value;
      return content.reduce((iAcc, el, index) => iter(el, children[index], iAcc), newAcc);
    }
    if (astContentProperty && astContentProperty.value.type === 'Object') {
      return iter(content, astContentProperty.value, newAcc);
    }
    return newAcc;
  }

  return iter(tree, astTree, []);
};

const getEthalonSize = (texts) => {
  return texts[0].mods && texts[0].mods.size;
}

module.exports = {
  findBlocks,
  getEthalonSize
};
