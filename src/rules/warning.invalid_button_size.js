const {
  findBlocks,
  getEthalonSize,
  isCurrentOrMixedBlock,
  getModsValue
} = require('../lib');
const { WARNING } = require('../errors');

const SIZES = [
  'xxs',
  'xs',
  's',
  'm',
  'l',
  'xl',
  'xxl',
  'xxxl',
  'xxxl'
];

module.exports = (data, ast, errors, state) => {
  const isWarning = isCurrentOrMixedBlock(data, 'warning');
  if (!isWarning) return errors;
  const buttons = findBlocks(data, ast, ['button']);
  if (!buttons.length) return errors;

  // чтобы правила лишний раз не искать эталонный размер для блока,
  // если он найден, но и чтобы правила не зависели друг от друга
  if (!state.warningEthalonSizeIsChecked) {
    state.warningEthalonSize = getEthalonSize(findBlocks(data, ast, ['text']));
    state.warningEthalonSizeIsChecked = true;
  }

  // если эталонный размер не может быть найден, значит не проводим проверку дальше,
  // этой ошибкой займется правило text_sizes_should_be_equal
  if (!state.warningEthalonSize && state.warningEthalonSizeIsChecked) return errors;
  const ethalonSizeIndex = SIZES.findIndex((size) => size === state.warningEthalonSize);
  if (!ethalonSizeIndex) return errors;

  return buttons.reduce((acc, button) => {
    const buttonSize = getModsValue(button, 'size');
    const buttonEthalonSize = SIZES[ethalonSizeIndex + 1];

    if (!buttonSize || buttonSize !== buttonEthalonSize) {
      const err = {
        ...WARNING.INVALID_BUTTON_SIZE,
        location: {
          ...button.location
        }
      };
      return [...acc, err];
    }

    return acc;
  }, errors);
};
