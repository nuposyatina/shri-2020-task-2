const jsonToAst = require('json-to-ast');
const testData = require('./testData.json');

const rules = [
  require('./rules/text.several_h1'),
  require('./rules/text.invalid_h2_position'),
  require('./rules/text.invalid_h3_position'),
  require('./rules/grid.too_much_marketing_blocks'),
  require('./rules/warning.text_sizes_should_be_equal')
]


const iter = (tree, errors, state) => {
  //данные могут быть представлены в виде массива
  if (tree instanceof Array) {
    return tree.reduce((acc, el) => {
      return iter(el, acc, state);
    }, errors);
  }
  //перебираем правила и применяем их для текущей ноды, получаем новый массив ошибок
  const newErrors = rules.reduce((acc, rule) => rule(tree, state, acc), errors);
  const { content } = tree;

  //если детей несколько, перебираем их и запускаем функцию с каждым ребенком
  if (content && content instanceof Array) {
    return content.reduce((acc, el) => {
      return iter(el, acc, state);
    }, newErrors);
  }

  //если ребенок один, запускаем рекурсивно функцию iter
  if (content && content instanceof Object) {
    return iter(content, newErrors, state);
  }
  
  //у ноды нет детей, можно возвращать массив ошибок
  console.log(newErrors)
  return newErrors;
};

const lint = (data) => {
  const initialState = {
    h1Count: 0
  }
  return iter(JSON.parse(data), [], initialState);
};

lint(testData);

module.exports = lint;
