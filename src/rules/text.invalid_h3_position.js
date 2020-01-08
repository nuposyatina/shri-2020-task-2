module.exports = (data, ast, errors, state) => {
  const isH2 = data.block === 'text' && data.mods && data.mods.type === 'h2';
  const isH3 = data.block === 'text' && data.mods && data.mods.type === 'h3';
  if (isH3) {
    state.hasH3 = true;
  }
  if (isH2 && state.hasH3) {
    const { loc } = ast;
    const err = {
      code: 'TEXT.INVALID_H3_POSITION',
      error: 'Заголовок второго уровня (блок text с модификатором type h3) не может находиться перед заголовком первого уровня на том же или более глубоком уровне вложенности.',
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
}
