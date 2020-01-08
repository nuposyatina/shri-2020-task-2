module.exports = (data, ast, errors, state) => {
  const isH1 = data.block === 'text' && data.mods && data.mods.type === 'h1';
  if (isH1) {
    state.h1Count += 1;
  }
  if (isH1 && state.h1Count > 1) {
    console.log(ast)
    const { loc } = ast;
    const err = {
      code: "TEXT.SEVERAL_H1",
      error: "Заголовок первого уровня (блок text с модификатором type h1) на странице должен быть единственным.",
      location: {
        start: {
          column: loc.start.column,
          line: loc.start.line
        },
        end: {
          column: loc.end.column,
          line: loc.end.line
        }
      }
    };
    return [...errors, err];
  }
  return errors;
};