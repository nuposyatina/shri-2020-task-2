module.exports = (data, ast, errors, state) => {
  const isWarning = data.block === 'warning' && !data.elem;
  if (!isWarning) return errors;
  const blocks = findBlocks(data, ast, ['button', 'placeholder']);
  if (!blocks.length) return errors;
  const errorInfo = {
    code: 'WARNING.INVALID_BUTTON_POSITION',
    error: 'Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности'
  }
  const newErrors = blocks.reduce((acc, block) => {
    const isButton = block.block === 'button';
    const isPlaceholder = block.block === 'placeholder';
    if (isButton && !state.warningHasPlaceholder) {
      const err = {
        ...errorInfo,
        location: {
          ...block.location
        }
      };
      return [...acc, err];
    }
    if (isPlaceholder) {
      state.warningHasPlaceholder = true;
    }
    return acc;
  }, errors);

  return newErrors;
}