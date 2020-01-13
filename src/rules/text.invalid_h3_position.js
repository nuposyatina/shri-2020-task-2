const {
  isCurrentOrMixedBlock,
  getModsValue,
  getBlockLocation
} = require('../lib');
const { TEXT } = require('../errors');

module.exports = (data, ast, errors, state) => {
  const isH2 = isCurrentOrMixedBlock(data, 'text') && getModsValue(data, 'type') === 'h2';
  const isH3 = isCurrentOrMixedBlock(data, 'text') && getModsValue(data, 'type') === 'h3';

  if (isH3) {
    state.hasH3 = true;
    const h3Location = getBlockLocation(ast);
    state.h3Locations = [...state.h3Locations, h3Location];
  }

  if (isH2 && state.hasH3) {
    const h3PositionErrors = state.h3Locations.map((loc) => (
      {
        ...TEXT.INVALID_H3_POSITION,
        location: {
          ...loc
        }
      }
    ));
    return [...errors, ...h3PositionErrors];
  }

  return errors;
};
