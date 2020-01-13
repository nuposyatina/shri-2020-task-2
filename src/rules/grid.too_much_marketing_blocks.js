const {
  isCurrentOrMixedBlock,
  getModsValue,
  getBlockLocation,
  getFractionCount
} = require('../lib');
const { GRID } = require('../errors');

const MARKETING_BLOCKS = ['commercial', 'offer'];

module.exports = (data, ast, errors) => {
  const isGrid = isCurrentOrMixedBlock(data, 'grid');
  if (!isGrid) return errors;
  const columnsCount = +getModsValue(data, 'm-columns');
  const { content } = data;
  const marketingSize = getFractionCount(content, MARKETING_BLOCKS);

  if (marketingSize > columnsCount / 2) {
    const err = {
      ...GRID.TOO_MUCH_MARKETING_BLOCKS,
      location: getBlockLocation(ast)
    };
    return [...errors, err];
  }
  return errors;
};
