module.exports = (data, state, errors) => {
  const isGrid = data.block === 'grid' && data.mods && data.mods['m-columns'];
  if (!isGrid) return errors;
  const columnsCount = +data.mods['m-columns'];
  const { content } = data;
  const marketingBlocks = ['commercial, offer'];
  const marketingSize = content.reduce((acc, el) => {
    const fractionCount = +el.elemMods['m-col'];
    if (marketingBlocks.includes(el.content[0].block)) {
      return acc + fractionCount;
    }
    return acc;
  }, 0);
  if (marketingSize > columnsCount / 2) {
    const err = {
      code: 'GRID.TOO_MUCH_MARKETING_BLOCKS',
      error: 'Маркетинговые блоки должны занимать не больше половины от всех колонок блока grid.',
      //TODO: добавить location
      location: ''
    }
    return [ ...errors, err ];
  }
  return errors;
}