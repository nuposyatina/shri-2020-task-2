const lint = require('../src');
const {
  withoutTexts,
  textWithoutMods,
  withCorrectTextSizes,
  withCorrectTextSizesInDifferentBlocks,
  withWrongTextSizes
} = require('../mocks/warning.text_sizes_should_be_equal');
const { WARNING } = require('../src/errors');

/* global test expect describe */
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
        ...WARNING.HAS_NOT_TEXT_SIZE,
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
        ...WARNING.HAS_NOT_TEXT_SIZE,
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
        ...WARNING.TEXT_SIZES_SHOULD_BE_EQUAL,
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
        ...WARNING.TEXT_SIZES_SHOULD_BE_EQUAL,
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
