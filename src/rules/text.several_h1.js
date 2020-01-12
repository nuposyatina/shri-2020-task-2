const {
  isCurrentOrMixedBlock,
  getModsValue,
  getBlockLocation
} = require('../lib');

const ERROR_INFO = {
  code: "TEXT.SEVERAL_H1",
  error: "Заголовок первого уровня (блок text с модификатором type h1) на странице должен быть единственным"
};

module.exports = (data, ast, errors, state) => {
  const isH1 = isCurrentOrMixedBlock(data, 'text') && getModsValue(data, 'type') === 'h1';

  if (isH1) {
    state.h1Count += 1;
  }

  if (isH1 && state.h1Count > 1) {
    const err = {
      ...ERROR_INFO,
      location: getBlockLocation(ast)
    };
    return [...errors, err];
  }
  
  return errors;
};
