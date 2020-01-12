const {
  isCurrentOrMixedBlock,
  getModsValue,
  getBlockLocation
} = require('../lib');

const ERROR_INFO = {
  code: 'TEXT.INVALID_H2_POSITION',
  error: 'Заголовок второго уровня (блок text с модификатором type h2) не может находиться перед заголовком первого уровня на том же или более глубоком уровне вложенности'
};

module.exports = (data, ast, errors, state) => {
  const isH2 = isCurrentOrMixedBlock(data, 'text') && getModsValue(data, 'type') === 'h2';
  const isH1 = isCurrentOrMixedBlock(data, 'text') && getModsValue(data, 'type') === 'h1';

  if (isH2) {
    state.hasH2 = true;
    const h2Location = getBlockLocation(ast);
    state.h2Locations = [...state.h2Locations, h2Location];
  }

  if (isH1 && state.hasH2) {
    const h2PositionErrors = state.h2Locations.map(loc => {
      return {
        ...ERROR_INFO,
        location: {
          ...loc
        }
      } 
    });
    return [...errors, ...h2PositionErrors];
  }

  return errors;
};
