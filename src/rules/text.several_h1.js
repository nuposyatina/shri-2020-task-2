const {
  isCurrentOrMixedBlock,
  getModsValue,
  getBlockLocation
} = require('../lib');
const { TEXT } = require('../errors');

module.exports = (data, ast, errors, state) => {
  const isH1 = isCurrentOrMixedBlock(data, 'text') && getModsValue(data, 'type') === 'h1';

  if (isH1) {
    state.h1Count += 1;
  }

  if (isH1 && state.h1Count > 1) {
    const err = {
      ...TEXT.SEVERAL_H1,
      location: getBlockLocation(ast)
    };
    return [...errors, err];
  }

  return errors;
};
