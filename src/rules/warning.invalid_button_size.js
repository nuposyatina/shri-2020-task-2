const {
  findBlocks,
  getEthalonSize,
  getModsValue
} = require('../lib');
const { isWarning, sizeIsNotEthalon } = require('../lib/warningRulesLib');
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

/**
 * Проверить, что эталонный размер не был найден
 * @param {Object} state состояние, необходимое для проверки
 */
const hasNotEthalonSize = (state) => !state.warningEthalonSize && state.warningEthalonSizeIsChecked;

/**
 * Получить индекс эталонного размера в массиве допустимых размеров
 * @param {Object} state состояние, необходимое для проверки
 */
const getEthalonSizeIndex = (state) => SIZES.findIndex((size) => size === state.warningEthalonSize);

/**
 * Проверить соблюдение правила и получить массив ошибок
 * @param {Array} buttons блоки, которые нужно проверить
 * @param {Array} errors массив ошибок
 * @param {Number} ethalonSizeIndex индекс эталонного размера в массиве допустимых размеров
 */
const getErrors = (buttons, errors, ethalonSizeIndex) => (
  buttons.reduce((acc, button) => {
    const buttonSize = getModsValue(button, 'size');
    const buttonEthalonSize = SIZES[ethalonSizeIndex + 1];

    if (sizeIsNotEthalon(buttonSize, buttonEthalonSize)) {
      const err = {
        ...WARNING.INVALID_BUTTON_SIZE,
        location: {
          ...button.location
        }
      };
      return [...acc, err];
    }

    return acc;
  }, errors)
);

module.exports = (data, ast, errors, state) => {
  if (!isWarning(data)) return errors;
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
  if (hasNotEthalonSize(state)) return errors;
  const ethalonSizeIndex = getEthalonSizeIndex(state);
  if (ethalonSizeIndex === -1) return errors;

  return getErrors(buttons, errors, ethalonSizeIndex);
};
