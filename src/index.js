const jsonToAst = require('json-to-ast');
const testData = require('./testData.json');
const { getState, getErrors } = require('./rules/text.several_h1');


const iter = (tree, errors, state) => {
  //данные могут быть представлены в виде массива
  if (tree instanceof Array) {
    return tree.reduce((acc, el) => {
      return iter(el, acc, state);
    }, errors);
  }
  getState(tree, state);
  const newErrors = getErrors(tree, state, errors);
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
