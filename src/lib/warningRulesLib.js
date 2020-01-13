const { isCurrentOrMixedBlock } = require('../lib');

/**
 * Проверить, является ли блок блоком warning
 * @param {Object} data блок, который необходимо проверить
 */
const isWarning = (data) => isCurrentOrMixedBlock(data, 'warning');

/**
 * Сравнить размер блока с эталонным
 * @param {String} size текущий размер блока
 * @param {String} ethalon эталонный размер блока
 */
const sizeIsNotEthalon = (size, ethalon) => !size || size !== ethalon;

/**
 * Обнулить состояние проверки эталонного размера для блока warning
 * @param {Object} data текущий блок
 * @param {Object} state состояние
 */
const checkWarningSize = (data, state) => {
  // чтобы лишний раз не вычислять эталонный размер в разных правилах
  // для одного и того же блока warning
  if (isWarning(data) && state.warningEthalonSizeIsChecked) {
    state.warningEthalonSizeIsChecked = false;
  }
};

module.exports = {
  isWarning,
  sizeIsNotEthalon,
  checkWarningSize
};
