const { findBlocks, isCurrentOrMixedBlock } = require('../lib');
const { WARNING } = require('../errors');

module.exports = (data, ast, errors) => {
  const isWarning = isCurrentOrMixedBlock(data, 'warning');
  if (!isWarning) return errors;
  const blocks = findBlocks(data, ast, ['button', 'placeholder']);
  if (!blocks.length) return errors;
  let buttonInfo = null;

  const newErrors = blocks.reduce((acc, block) => {
    const isButton = isCurrentOrMixedBlock(block, 'button');
    const isPlaceholder = isCurrentOrMixedBlock(block, 'placeholder');

    if (isButton) {
      buttonInfo = block;
    }

    if (isPlaceholder && buttonInfo) {
      const err = {
        ...WARNING.INVALID_BUTTON_POSITION,
        location: buttonInfo.location
      };
      return [...acc, err];
    }

    return acc;
  }, errors);

  return newErrors;
};
