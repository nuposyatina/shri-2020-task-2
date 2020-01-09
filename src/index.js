const jsonToAst = require('json-to-ast');
const testData = require('./testData.js');

const rules = [
  require('./rules/text.several_h1'),
  require('./rules/text.invalid_h2_position'),
  require('./rules/text.invalid_h3_position'),
  // require('./rules/grid.too_much_marketing_blocks'),
  // require('./rules/warning.text_sizes_should_be_equal')
]


const iter = (tree, ast, errors, state) => {
  
  const isWarning = tree.block === 'warning' && !tree.elem;
  if (isWarning) {
    state.warningHasPlaceholder = false;
  }
  //чтобы лишний раз не вычислять эталонный размер для одного и того же блока warning
  if (isWarning && state.warningEthalonSizeIsChecked) {
    state.warningEthalonSizeIsChecked = false;
  }
  //данные могут быть представлены в виде массива
  if (ast.type === 'Array') {
    const { children } = ast;
    return tree.reduce((acc, el, index) => {
      //ast
      return iter(el, children[index], acc, state);
    }, errors);
  }
  //перебираем правила и применяем их для текущей ноды, получаем новый массив ошибок
  //FIXME: убрать проверку rules.length
  const newErrors = rules.length ? rules.reduce((acc, rule) => rule(tree, ast, acc, state), errors) : [];
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

  //если ребенок один, запускаем рекурсивно функцию iter
  if (astContentProperty && astContentProperty.value.type === 'Object') {
    return iter(content, astContentProperty.value, newErrors, state);
  }
  
  //у ноды нет детей, можно возвращать массив ошибок
  (newErrors)
  return newErrors;
};

const lint = (data) => {
  const initialState = {
    h1Count: 0,
    warningEthalonSizeIsChecked: false,
    h2Locations: [],
    h3Locations: []
  }
  const ast = jsonToAst(data);
  const tree = JSON.parse(data);
  return iter(tree, ast, [], initialState);
};

module.exports = lint;
