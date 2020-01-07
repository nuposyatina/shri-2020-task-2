const validPlaceholderSizes = ['s', 'm', 'l'];

module.exports = (data, state, errors) => {
  const isWarning = data.block === 'warning' && !data.elem;
  if (!isWarning) return errors;
  const placeholders = findBlocks(data, ['placeholder']);
  if (!placeholders.length) return errors;
  const errorInfo = {
    code: 'WARNING.INVALID_PLACEHOLDER_SIZE',
    error: 'Допустимые размеры для блока placeholder в блоке warning (значение модификатора size): s, m, l.'
  }
  return placeholders.reduce((acc, block) => {
    const isValidPlaceholder = block.mods && block.mods.size && validPlaceholderSizes.includes(block.mods.size);
    return isValidPlaceholder ? acc : [ ...acc, { ...errorInfo, location: '' } ]
  }, errors);
}