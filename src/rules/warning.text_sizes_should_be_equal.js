const findBlocks = (tree, blockName) => {
  const iter = (node, acc) => {
    const newAcc = node.block === blockName && !node.elem ? [ ...acc, node ] : acc;
    console.log(node, newAcc)
    const { content } = node;
    if (content instanceof Array) {
      return content.reduce((iAcc, el) => iter(el, iAcc), newAcc);
    }
    if (content instanceof Object) {
      return iter(content, newAcc);
    }
    return newAcc;
  }

  return iter(tree, []);
}

module.exports = (data, state, errors) => {
  const isWarning = data.block === 'warning' && !data.elem;
  if (!isWarning) return errors;
  const warningTexts = findBlocks(data, 'text');
  const hasNoTextSizeError = {
    code: 'WARNING.HAS_NOT_TEXT_SIZE',
    error: 'Размер текста должен быть определен',
    location: ''
  };

  const textSizesEqualError = {
    code: 'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL',
    error: 'Все тексты (блоки text) в блоке warning должны быть одного размера',
    location: ''
  }
  if (!warningTexts.length) return [ ...errors, hasNoTextSizeError ];
  console.log(warningTexts)
  const ethalonSize = warningTexts[0] && warningTexts[0].mods && warningTexts[0].mods.size;
  if (!ethalonSize) return [ ...errors, hasNoTextSizeError ];
  for (let text of warningTexts) {
    const hasSize = text.mods && text.mods.size;
    if (!hasSize || text.mods.size !== ethalonSize) return [ ...errors, textSizesEqualError ];
  }
  return errors;
}