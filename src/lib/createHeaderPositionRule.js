const {
  isHeader,
  getBlockLocation
} = require('../lib');
const { TEXT } = require('../errors');

const processChildHeader = (type, ast, errors, state) => {
  const location = getBlockLocation(ast);

  if (!state[type]) state[type] = [];
  state[type].push(location);

  return errors;
};

const getError = (type) => (
  TEXT[`INVALID_${type.toUpperCase()}_POSITION`]
);

const processParentHeader = (type, errors, state) => {
  const positionErrors = state[type].map((loc) => ({
    ...getError(type),
    location: {
      ...loc
    }
  }));

  return errors.concat(positionErrors);
};

const createHeaderPositionRule = (parent, child) => (
  (data, ast, errors, state) => {
    if (isHeader(data, child)) {
      return processChildHeader(child, ast, errors, state);
    }

    if (isHeader(data, parent) && state[child]) {
      return processParentHeader(child, errors, state);
    }

    return errors;
  }
);

module.exports = createHeaderPositionRule;
