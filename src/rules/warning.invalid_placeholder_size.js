const {
  findBlocks,
  isCurrentOrMixedBlock,
  getModsValue
} = require('../lib');
const { WARNING } = require('../errors');

const validPlaceholderSizes = ['s', 'm', 'l'];

module.exports = (data, ast, errors) => {
  const isWarning = isCurrentOrMixedBlock(data, 'warning');
  if (!isWarning) return errors;
  const placeholders = findBlocks(data, ast, ['placeholder']);
  if (!placeholders.length) return errors;

  return placeholders.reduce((acc, block) => {
    const isValidPlaceholder = validPlaceholderSizes.includes(getModsValue(block, 'size'));
    const err = {
      ...WARNING.INVALID_PLACEHOLDER_SIZE,
      location: {
        ...block.location
      }
    };

    return isValidPlaceholder ? acc : [...acc, err];
  }, errors);
};
