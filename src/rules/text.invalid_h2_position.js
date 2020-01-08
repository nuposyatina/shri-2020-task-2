module.exports = (data, ast, errors, state) => {
  const isH2 = data.block === 'text' && data.mods && data.mods.type === 'h2';
  const isH1 = data.block === 'text' && data.mods && data.mods.type === 'h1';
  if (isH2) {
    const { loc } = ast;
    state.hasH2 = true;
    const h2Location = {
      start: {
        column: loc.start.column,
        line: loc.start.line
      },
      end: {
        column: loc.end.column,
        line: loc.end.line
      }
    };
    state.h2Locations = [...state.h2Locations, h2Location];
  }
  if (isH1 && state.hasH2) {
    const errorInfo = {
      code: 'TEXT.INVALID_H2_POSITION',
      error: 'Заголовок второго уровня (блок text с модификатором type h2) не может находиться перед заголовком первого уровня на том же или более глубоком уровне вложенности.'
    };
    const h2PositionErrors = state.h2Locations.map(loc => {
      return {
        ...errorInfo,
        location: {
          ...loc
        }
      } 
    });
    return [...errors, ...h2PositionErrors];
  }
  return errors;
}
