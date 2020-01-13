const { findBlocks, isCurrentOrMixedBlock } = require('../lib');
const { isWarning } = require('../lib/warningRulesLib');
const { WARNING } = require('../errors');

/**
 * Проверить, является ли блок кнопкой
 * @param {Object} data проверяемый блок
 */
const isButton = (data) => isCurrentOrMixedBlock(data, 'button');

/**
 * Проверить, является ли блок блоком placeholder
 * @param {Object} data проверяемый блок
 */
const isPlaceholder = (data) => isCurrentOrMixedBlock(data, 'placeholder');

/**
 * Проверить соблюдение правила и получить ошибки
 * @param {Array} blocks блоки, у которых необходимо проверить соблюдение правила
 * @param {Array} errors массив ошибок
 */
const getErrors = (blocks, errors) => {
  let info = null;
  return blocks.reduce((acc, block) => {
    if (isButton(block)) {
      info = block;
    }

    if (isPlaceholder(block) && info) {
      const err = {
        ...WARNING.INVALID_BUTTON_POSITION,
        location: info.location
      };
      return [...acc, err];
    }

    return acc;
  }, errors);
};

module.exports = (data, ast, errors) => {
  if (!isWarning(data)) return errors;
  const blocks = findBlocks(data, ast, ['button', 'placeholder']);
  if (!blocks.length) return errors;

  return getErrors(blocks, errors);
};
