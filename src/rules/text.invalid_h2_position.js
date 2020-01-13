const {
  isCurrentOrMixedBlock,
  getModsValue,
  getBlockLocation
} = require('../lib');
const { TEXT } = require('../errors');

module.exports = (data, ast, errors, state) => {
  const isH2 = isCurrentOrMixedBlock(data, 'text') && getModsValue(data, 'type') === 'h2';
  const isH1 = isCurrentOrMixedBlock(data, 'text') && getModsValue(data, 'type') === 'h1';

  if (isH2) {
    state.hasH2 = true;
    const h2Location = getBlockLocation(ast);
    state.h2Locations = [...state.h2Locations, h2Location];
  }

  if (isH1 && state.hasH2) {
    const h2PositionErrors = state.h2Locations.map((loc) => (
      {
        ...TEXT.INVALID_H2_POSITION,
        location: {
          ...loc
        }
      }
    ));
    return [...errors, ...h2PositionErrors];
  }

  return errors;
};
