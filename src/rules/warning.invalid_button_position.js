const { findBlocks } = require('../lib');

module.exports = (data, ast, errors) => {
  const isWarning = data.block === 'warning' && !data.elem;
  if (!isWarning) return errors;
  const blocks = findBlocks(data, ast, ['button', 'placeholder']);
  if (!blocks.length) return errors;
  const errorInfo = {
    code: 'WARNING.INVALID_BUTTON_POSITION',
    error: 'Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности'
  }
  let buttonInfo = null;
  const newErrors = blocks.reduce((acc, block) => {
    const isButton = block.block === 'button';
    const isPlaceholder = block.block === 'placeholder';
    if (isButton) {
      buttonInfo = block;
    }
    if (isPlaceholder && buttonInfo) {
      const err = {
        ...errorInfo,
        location: buttonInfo.location
      }
      return [...acc, err];
    }

    return acc;
  }, errors);

  return newErrors;
}