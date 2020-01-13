const {
  isHeader,
  getBlockLocation
} = require('../lib');
const { TEXT } = require('../errors');

/**
 * Получить информацию о всех дочерних заголовках, стоящих перед родительскими
 * @param {String} type тип блока
 * @param {Object} ast ast-представление блока
 * @param {Array} errors массив ошибок
 * @param {Object} state состояние, необходимое для проверок
 */
const processChildHeader = (type, ast, errors, state) => {
  const location = getBlockLocation(ast);

  if (!state[type]) state[type] = [];
  state[type].push(location);

  return errors;
};

/**
 * Получить код и текст ошибки
 * @param {String} type тип заголовка
 */
const getError = (type) => (
  TEXT[`INVALID_${type.toUpperCase()}_POSITION`]
);

/**
 * Перебрать все ошибочные блоки, получить ошибки и
 * добавить их в текущий массив ошибок
 * @param {String} type тип заголовка
 * @param {Array} errors массив ошибок
 * @param {Object} state состояние, необходимое для проверок
 */
const processParentHeader = (type, errors, state) => {
  const positionErrors = state[type].map((loc) => ({
    ...getError(type),
    location: {
      ...loc
    }
  }));

  return errors.concat(positionErrors);
};

/**
 * В зависимости от типа переданного заголовка вызвать функцию нахождения ошибок
 * @param {String} parent тип родительского заголовка
 * @param {String} child тип дочернего заголовка
 */
const createHeaderPositionRule = (parent, child) => (
  (data, ast, errors, state) => {
    if (isHeader(data, child)) {
      return processChildHeader(child, ast, errors, state);
    }

    if (isHeader(data, parent) && state[child]) {
      return processParentHeader(child, errors, state);
    }

    return errors;
  }
);

module.exports = createHeaderPositionRule;
