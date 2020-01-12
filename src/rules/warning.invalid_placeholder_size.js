const {
  findBlocks,
  isCurrentOrMixedBlock,
  getModsValue
} = require('../lib');

const validPlaceholderSizes = ['s', 'm', 'l'];
const ERROR_INFO = {
  code: 'WARNING.INVALID_PLACEHOLDER_SIZE',
  error: 'Допустимые размеры для блока placeholder в блоке warning (значение модификатора size): s, m, l'
};

module.exports = (data, ast, errors) => {
  const isWarning = isCurrentOrMixedBlock(data, 'warning');
  if (!isWarning) return errors;
  const placeholders = findBlocks(data, ast, ['placeholder']);
  if (!placeholders.length) return errors;
  
  return placeholders.reduce((acc, block) => {
    const isValidPlaceholder = validPlaceholderSizes.includes(getModsValue(block, 'size'));
    const err = {
      ...ERROR_INFO,
      location: {
        ...block.location
      }
    };
    
    return isValidPlaceholder ? acc : [...acc, err];
  }, errors);
};
