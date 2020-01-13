const {
  findBlocks,
  getEthalonSize,
  isCurrentOrMixedBlock,
  getBlockLocation,
  getModsValue
} = require('../lib');
const { WARNING } = require('../errors');

module.exports = (data, ast, errors, state) => {
  const isWarning = isCurrentOrMixedBlock(data, 'warning');
  if (!isWarning) return errors;
  const warningTexts = findBlocks(data, ast, ['text']);
  const ethalonSize = getEthalonSize(warningTexts);
  state.warningEthalonSize = ethalonSize;
  const warningLocation = getBlockLocation(ast);

  if (!ethalonSize) {
    const err = {
      ...WARNING.HAS_NOT_TEXT_SIZE,
      location: warningLocation
    };
    return [...errors, err];
  }
  // цикл for используется здесь для того, чтобы не перебирать все элементы,
  // а вернуть ошибку при первом же несоответствии размеров элементов
  // eslint-disable-next-line no-restricted-syntax
  for (const text of warningTexts) {
    const textSize = getModsValue(text, 'size');
    if (!textSize || textSize !== ethalonSize) {
      const err = {
        ...WARNING.TEXT_SIZES_SHOULD_BE_EQUAL,
        location: warningLocation
      };
      return [...errors, err];
    }
  }

  return errors;
};
