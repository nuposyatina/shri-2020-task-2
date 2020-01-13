const {
  isCurrentOrMixedBlock,
  getModsValue,
  getBlockLocation,
} = require('../lib');
const { GRID } = require('../errors');

const MARKETING_BLOCKS = ['commercial', 'offer'];

/**
 * Посчитать количество колонок, отданных под контент определенного типа
 * @param {Array} content контент блока
 */
const getFractionCount = (content) => (
  content.reduce((acc, el) => {
    const fractionCount = +getModsValue(el, 'm-col');
    const isMarketing = MARKETING_BLOCKS.find(
      (block) => isCurrentOrMixedBlock(el, block)
    );
    if (isMarketing) {
      return acc + fractionCount;
    }
    return acc;
  }, 0)
);

module.exports = (data, ast, errors) => {
  if (!isCurrentOrMixedBlock(data, 'grid')) return errors;
  const columnsCount = +getModsValue(data, 'm-columns');
  const { content } = data;
  const marketingSize = getFractionCount(content);

  if (marketingSize > columnsCount / 2) {
    const err = {
      ...GRID.TOO_MUCH_MARKETING_BLOCKS,
      location: getBlockLocation(ast)
    };
    return [...errors, err];
  }
  return errors;
};
