const jsonToAst = require('json-to-ast');
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
const { isCurrentOrMixedBlock } = require('./lib');

/**
 * Проверить текущий блок на соответствие правилам,
 * запустить проверку для дочерних блоков,
 * если их нет, вернуть полученный массив ошибок
 * @param {Object} tree объект с данными
 * @param {Object} ast ast-дерево, сформированное из объекта
 * @param {Array} errors массив ошибок, по умолчанию пустой
 * @param {Object} state глобальные переменные
 */
const iter = (tree, ast, errors, state) => {
  //данные могут быть представлены в виде массива
  if (ast.type === 'Array') {
    const { children } = ast;
    return tree.reduce((acc, el, index) => {
      return iter(el, children[index], acc, state);
    }, errors);
  }

  const isWarning = isCurrentOrMixedBlock(tree, 'warning');
  //чтобы лишний раз не вычислять эталонный размер в разных правилах для одного и того же блока warning
  if (isWarning && state.warningEthalonSizeIsChecked) {
    state.warningEthalonSizeIsChecked = false;
  }
  //перебираем правила и применяем их для текущей ноды, получаем новый массив ошибок
  const newErrors = rules.reduce((acc, rule) => rule(tree, ast, acc, state), errors);
  const { content } = tree;
  const astContentProperty = ast.children.find(el => el.key.value === 'content');

  //если детей несколько, перебираем их и запускаем функцию с каждым ребенком
  //Проверяем тип контента у ast-дерева вместо самого дерева, так как instanceof Object для массива тоже дает true
  if (astContentProperty && astContentProperty.value.type === 'Array') {
    const { children } = astContentProperty.value;
    return content.reduce((acc, el, index) => {
      return iter(el, children[index], acc, state);
    }, newErrors);
  }

  //если ребенок один, запускаем рекурсивно функцию iter для него
  if (astContentProperty && astContentProperty.value.type === 'Object') {
    return iter(content, astContentProperty.value, newErrors, state);
  }
  
  //если у ноды нет детей, можно возвращать массив ошибок
  return newErrors;
};

/**
 * Преобразовать полученные данные в удобные для перебора, 
 * проинициализировать стейт, необходимый для глобальной проверки
 * и запустить функцию проверки с преобразованными данными
 * @param {String} data строка с данными в формате JSON
 */
const lint = (data) => {
  //Начальный стейт необходим для "глобальных переменных" всего дерева
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
