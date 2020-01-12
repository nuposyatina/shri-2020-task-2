const {
  findBlocks,
  getEthalonSize,
  isCurrentOrMixedBlock,
  getBlockLocation,
  getModsValue
} = require('../lib');

const HAS_NOT_TEXT_SIZE_ERROR = {
  code: 'WARNING.HAS_NOT_TEXT_SIZE',
  error: 'Размер текста должен быть определен'
};
const TEXT_SIZES_EQUALS_ERROR = {
  code: 'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL',
  error: 'Все тексты (блоки text) в блоке warning должны быть одного размера'
};

module.exports = (data, ast, errors, state) => {
  const isWarning = isCurrentOrMixedBlock(data, 'warning');
  if (!isWarning) return errors;
  const warningTexts = findBlocks(data, ast, ['text']);
  const ethalonSize = getEthalonSize(warningTexts);
  state.warningEthalonSize = ethalonSize;
  const warningLocation = getBlockLocation(ast);

  if (!ethalonSize) {
    const err = {
      ...HAS_NOT_TEXT_SIZE_ERROR,
      location: warningLocation
    };
    return [...errors, err];
  };

  for (let text of warningTexts) {
    const textSize = getModsValue(text, 'size');
    if (!textSize || textSize !== ethalonSize) {
      const err = {
        ...TEXT_SIZES_EQUALS_ERROR,
        location: warningLocation
      };
      return [...errors, err];
    }
  }
  
  return errors;
};
