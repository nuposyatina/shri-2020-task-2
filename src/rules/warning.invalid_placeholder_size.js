const {
  findBlocks,
  getModsValue
} = require('../lib');
const { isWarning } = require('../lib/warningRulesLib');
const { WARNING } = require('../errors');

const VALID_PLACEHOLDER_SIZES = ['s', 'm', 'l'];

/**
 * Проверить, является ли размер блока допустимым
 * @param {Object} block блок, который нужно проверить
 */
const validPlaceholderChecker = (block) => VALID_PLACEHOLDER_SIZES.includes(getModsValue(block, 'size'));

/**
 * Проверить соблюдение правила и получить массив ошибок
 * @param {Array} placeholders массив блоков, которые нужно проверить
 * @param {Array} errors массив ошибок
 */
const getErrors = (placeholders, errors) => (
  placeholders.reduce((acc, block) => {
    const err = {
      ...WARNING.INVALID_PLACEHOLDER_SIZE,
      location: {
        ...block.location
      }
    };

    return validPlaceholderChecker(block) ? acc : [...acc, err];
  }, errors)
);

module.exports = (data, ast, errors) => {
  if (!isWarning(data)) return errors;
  const placeholders = findBlocks(data, ast, ['placeholder']);
  if (!placeholders.length) return errors;

  return getErrors(placeholders, errors);
};
