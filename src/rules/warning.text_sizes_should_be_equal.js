const { findBlocks, getEthalonSize } = require('../lib');

module.exports = (data, ast, errors, state) => {
  const isWarning = data.block === 'warning' && !data.elem;
  if (!isWarning) return errors;
  const warningTexts = findBlocks(data, ast, ['text']);
  const { loc } = ast;
  const hasNoTextSizeError = {
    code: 'WARNING.HAS_NOT_TEXT_SIZE',
    error: 'Размер текста должен быть определен',
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

  const textSizesEqualError = {
    code: 'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL',
    error: 'Все тексты (блоки text) в блоке warning должны быть одного размера',
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
  }
  if (!warningTexts.length) return [ ...errors, hasNoTextSizeError ];
  const ethalonSize = getEthalonSize(warningTexts);
  state.warningEthalonSize = ethalonSize;
  if (!ethalonSize) return [ ...errors, hasNoTextSizeError ];
  for (let text of warningTexts) {
    const hasSize = text.mods && text.mods.size;
    if (!hasSize || text.mods.size !== ethalonSize) return [ ...errors, textSizesEqualError ];
  }
  return errors;
}
