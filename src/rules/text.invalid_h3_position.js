const {
  isCurrentOrMixedBlock,
  getModsValue,
  getBlockLocation
} = require('../lib');

const ERROR_INFO = {
  code: 'TEXT.INVALID_H3_POSITION',
  error: 'Заголовок третьего уровня (блок text с модификатором type h3) не может находиться перед заголовком второго уровня на том же или более глубоком уровне вложенности'
};

module.exports = (data, ast, errors, state) => {
  const isH2 = isCurrentOrMixedBlock(data, 'text') && getModsValue(data, 'type') === 'h2';
  const isH3 = isCurrentOrMixedBlock(data, 'text') && getModsValue(data, 'type') === 'h3';

  if (isH3) {
    state.hasH3 = true;
    const h3Location = getBlockLocation(ast);
    state.h3Locations = [...state.h3Locations, h3Location];
  }

  if (isH2 && state.hasH3) {
    const h3PositionErrors = state.h3Locations.map(loc => {
      return {
        ...ERROR_INFO,
        location: {
          ...loc
        }
      } 
    });
    return [...errors, ...h3PositionErrors];
  }
  
  return errors;
};
