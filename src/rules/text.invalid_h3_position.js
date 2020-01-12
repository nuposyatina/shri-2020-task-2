module.exports = (data, ast, errors, state) => {
  const isH2 = data.block === 'text' && data.mods && data.mods.type === 'h2';
  const isH3 = data.block === 'text' && data.mods && data.mods.type === 'h3';
  if (isH3) {
    const { loc } = ast;
    state.hasH3 = true;
    const h3Location = {
      start: {
        column: loc.start.column,
        line: loc.start.line
      },
      end: {
        column: loc.end.column,
        line: loc.end.line
      }
    };
    state.h3Locations = [...state.h3Locations, h3Location];
  }
  if (isH2 && state.hasH3) {
    const errorInfo = {
      code: 'TEXT.INVALID_H3_POSITION',
      error: 'Заголовок третьего уровня (блок text с модификатором type h3) не может находиться перед заголовком второго уровня на том же или более глубоком уровне вложенности'
    };
    const h3PositionErrors = state.h3Locations.map(loc => {
      return {
        ...errorInfo,
        location: {
          ...loc
        }
      } 
    });
    return [...errors, ...h3PositionErrors];
  }
  return errors;
}
