const validPlaceholderSizes = ['s', 'm', 'l'];

module.exports = (data, ast, errors) => {
  const isWarning = data.block === 'warning' && !data.elem;
  if (!isWarning) return errors;
  const placeholders = findBlocks(data, ast, ['placeholder']);
  if (!placeholders.length) return errors;
  const errorInfo = {
    code: 'WARNING.INVALID_PLACEHOLDER_SIZE',
    error: 'Допустимые размеры для блока placeholder в блоке warning (значение модификатора size): s, m, l.'
  }
  return placeholders.reduce((acc, block) => {
    const isValidPlaceholder = block.mods && block.mods.size && validPlaceholderSizes.includes(block.mods.size);
    const err = {
      ...errorInfo,
      location: {
        ...block.location
      }
    }
    return isValidPlaceholder ? acc : [...acc, err]
  }, errors);
}