const lint = require('../src');

const {
  withoutTexts,
  textWithoutMods,
  withCorrectTextSizes,
  withCorrectTextSizesInDifferentBlocks,
  withWrongTextSizes
} = require('../mocks/warning.invalid_placeholder_size');

const HAS_NO_TEXT_SIZE_ERROR = {
  code: 'WARNING.HAS_NOT_TEXT_SIZE',
  error: 'Размер текста должен быть определен'
};

const TEXT_SIZES_EQUALS_ERROR = {
  code: 'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL',
  error: 'Все тексты (блоки text) в блоке warning должны быть одного размера'
}

describe('Размер текстов в блоке warning', () => {
  test('Если все тексты в блоке одного размера, то ошибка не возникнет', () => {
    expect(lint(withCorrectTextSizes)).toHaveLength(0);
  });

  test('Если тесты в разных блоках равны эталонному размеру, то ошибка не возникнет', () => {
    expect(lint(withCorrectTextSizesInDifferentBlocks)).toHaveLength(0);
  });

  test('Если текстов в блоке нет, то возникнет ошибка, так как эталонный размер должен быть определен', () => {
    const expected = [
      {
        ...HAS_NO_TEXT_SIZE_ERROR,
        location: {
          start: {
            column: 5,
            line: 4
          },
          end: {
            column: 6,
            line: 11
          }
        }
      }
    ];
    expect(lint(withoutTexts)).toHaveLength(1);
    expect(lint(withoutTexts)).toEqual(expected);
  });

  test('Если эталонный блок text не имеет модификатора size, то возникнут ошибки', () => {
    const expected = [
      {
        ...HAS_NO_TEXT_SIZE_ERROR,
        location: {
          start: {
            column: 5,
            line: 4
          },
          end: {
            column: 6,
            line: 11
          }
        }
      }
    ];
    expect(lint(textWithoutMods)).toHaveLength(1);
    expect(lint(textWithoutMods)).toEqual(expected);
  });

  test('Если размер блоков text не соответствует эталонному, то возникнут ошибки', () => {
    const expected = [
      {
        ...TEXT_SIZES_EQUALS_ERROR,
        location: {
          start: {
            column: 5,
            line: 4
          },
          end: {
            column: 6,
            line: 20
          }
        }
      },
      {
        ...TEXT_SIZES_EQUALS_ERROR,
        location: {
          start: {
            column: 5,
            line: 21
          },
          end: {
            column: 6,
            line: 43
          }
        }
      }
    ];
    expect(lint(withWrongTextSizes)).toHaveLength(2);
    expect(lint(withWrongTextSizes)).toEqual(expected);
  });
});
