const jsonToAst = require('json-to-ast');
const { checkWarningSize, iterateChildren, checkAstType } = require('./lib');

const rules = [
  require('./rules/warning.text_sizes_should_be_equal'),
  require('./rules/warning.invalid_button_size'),
  require('./rules/warning.invalid_button_position'),
  require('./rules/warning.invalid_placeholder_size'),
  require('./rules/text.several_h1'),
  require('./rules/text.invalid_h2_position'),
  require('./rules/text.invalid_h3_position'),
  require('./rules/grid.too_much_marketing_blocks')
];

/**
 * Проверить текущий блок на соответствие правилам,
 * Функция также рекурсивно проверяет дочерние блоки,
 * когда все дочерние блоки проверены вернет массив ошибок или пустой массив.
 * @param {Object|Array} tree объект с блоками интерфейса
 * @param {Object} ast ast-дерево, сформированное из объекта с блоками интерфейса
 * @param {Array} errors массив ошибок
 * @param {Object} state состояние, необходимое для разных проверок
 */
const iter = (tree, ast, errors, state) => {
  // данные могут быть представлены в виде массива
  if (ast.type === 'Array') {
    const { children } = ast;
    return iterateChildren(iter, tree, children, errors, [state]);
  }
  // обнуляем значение проверки эталонного размера для разных блоков warning
  checkWarningSize(tree, state);
  // перебираем правила и применяем их для текущей ноды,
  // получаем новый массив ошибок
  const newErrors = rules.reduce((acc, rule) => rule(tree, ast, acc, state), errors);
  const { content } = tree;
  const astContentProperty = ast.children.find((el) => el.key.value === 'content');

  // если детей несколько, перебираем их и запускаем функцию с каждым ребенком
  // Проверяем тип контента у ast-дерева вместо самого дерева,
  // так как instanceof Object для массива тоже дает true
  if (checkAstType(astContentProperty, 'Array')) {
    const { children } = astContentProperty.value;
    return iterateChildren(iter, content, children, newErrors, [state]);
  }

  // если ребенок один, запускаем рекурсивно функцию iter для него
  if (checkAstType(astContentProperty, 'Object')) {
    return iter(content, astContentProperty.value, newErrors, state);
  }

  // если у ноды нет детей, можно возвращать массив ошибок
  return newErrors;
};

/**
 * Проверить БЭМ дерево
 * Функция преобразует полученные данные в удобные для перебора,
 * инициализирует состояние и рекурсивно проверяет БЭМ дерево
 * на соответсвие правилам
 * @param {String} data строка с данными в формате JSON
 */
const lint = (data) => {
  // Начальный стейт необходим для "глобальных переменных" всего дерева
  const initialState = {
    h1Count: 0,
    warningEthalonSizeIsChecked: false,
    h2Locations: [],
    h3Locations: []
  };
  const ast = jsonToAst(data);
  const tree = JSON.parse(data);

  return iter(tree, ast, [], initialState);
};

module.exports = lint;
