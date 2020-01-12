const { isCurrentOrMixedBlock, getModsValue, getBlockLocation } = require('../lib');

const MARKETING_BLOCKS = ['commercial', 'offer'];
const ERROR_INFO = {
  code: 'GRID.TOO_MUCH_MARKETING_BLOCKS',
  error: 'Маркетинговые блоки должны занимать не больше половины от всех колонок блока grid'
};

module.exports = (data, ast, errors) => {
  const isGrid = isCurrentOrMixedBlock(data, 'grid');
  if (!isGrid) return errors;
  const columnsCount = +getModsValue(data, 'm-columns');
  const { content } = data;

  const marketingSize = content.reduce((acc, el) => {
    const fractionCount = +getModsValue(el, 'm-col');
    const isMarketing = MARKETING_BLOCKS.find(
      block => isCurrentOrMixedBlock(el, block)
    );
    if (isMarketing) {
      return acc + fractionCount;
    }
    return acc;
  }, 0);
  
  if (marketingSize > columnsCount / 2) {
    const err = {
      ...ERROR_INFO,
      location: getBlockLocation(ast)
    }
    return [...errors, err];
  }
  return errors;
};
