module.exports = (data, state, errors) => {
  const isH1 = data.block === 'text' && data.mods && data.mods.type === 'h1';
  if (isH1) {
    state.h1Count += 1;
  }
  if (isH1 && state.h1Count > 1) {
    const err = {
      code: "TEXT.SEVERAL_H1",
      error: "Заголовок первого уровня (блок text с модификатором type h1) на странице должен быть единственным.",
      //TODO: добавить location
      location: ''
    };
    return [ ...errors, err];
  }
  return errors;
};