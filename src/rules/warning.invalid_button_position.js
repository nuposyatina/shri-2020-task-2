module.exports = (data, state, errors) => {
  const isWarning = data.block === 'warning' && !data.elem;
  if (!isWarning) return errors;
  const nodesCount = {
    button: 0,
    placeholder: 0
  };
  const blocks = findBlocks(data, ['button', 'placeholder']);
  if (!blocks.length) return errors;
  const errorInfo = {
    code: 'WARNING.INVALID_BUTTON_POSITION',
    error: 'Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности'
  }
  //placeholder должен быть всегда перед блоком button
  //значит количество блоков placeholder не должно превышать количество блоков button
  const newErrors = blocks.reduce((acc, block) => {
    nodesCount[block.name] += 1;
    if (nodesCount.placeholder > nodesCount.button) {
      const error = {
        ...errorInfo,
        location: ''
      }
      return [ ...acc, error ];
    }
    return acc;
  }, errors);

  return newErrors;
}