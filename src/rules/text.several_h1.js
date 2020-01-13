const {
  getBlockLocation,
  isHeader
} = require('../lib');
const { TEXT } = require('../errors');

module.exports = (data, ast, errors, state) => {
  if (isHeader(data, 'h1')) {
    state.h1Count += 1;
  }

  if (isHeader(data, 'h1') && state.h1Count > 1) {
    const err = {
      ...TEXT.SEVERAL_H1,
      location: getBlockLocation(ast)
    };
    return [...errors, err];
  }

  return errors;
};
