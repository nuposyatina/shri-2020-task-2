const lint = require('../src');
const {
  withoutPlaceholders,
  withCorrectPlaceholder,
  withWrongPlaceholders,
  withWrongPlaceholdersOnDifferentBlocks
} = require('../mocks/warning.invalid_placeholder_size');

const ERROR_INFO = {
  code: 'WARNING.INVALID_PLACEHOLDER_SIZE',
  error: 'Допустимые размеры для блока placeholder в блоке warning (значение модификатора size): s, m, l'
};

describe('Размер блока placeholder', () => {
  test('Если нет блоков placeholder, то ошибка не возникнет', () => {
    expect(lint(withoutPlaceholders)).toHaveLength(0);
  });

  test('Если размер блока placeholder s, m или l, то ошибка не возникнет', () => {
    expect(lint(withCorrectPlaceholder)).toHaveLength(0);
  });

  test('Если есть блоки placeholder с неправильным размером, то возникнут ошибки', () => {
    const expected = [
      {
        ...ERROR_INFO,
        location: {
          start: {
            column: 9,
            line: 7
          },
          end: {
            column: 10,
            line: 12
          }
        }
      }
    ];

    expect(lint(withWrongPlaceholders)).toHaveLength(1);
    expect(lint(withWrongPlaceholders)).toEqual(expected);
  });

  test('Если есть блоки placeholder с неправильным размером на разных уровнях вложенности, то возникнут ошибки', () => {
    const expected = [
      {
        ...ERROR_INFO,
        location: {
          start: {
            column: 9,
            line: 13
          },
          end: {
            column: 10,
            line: 18
          }
        }
      },
      {
        ...ERROR_INFO,
        location: {
          start: {
            column: 9,
            line: 42
          },
          end: {
            column: 10,
            line: 47
          }
        }
      }
    ];
    
    expect(lint(withWrongPlaceholdersOnDifferentBlocks)).toHaveLength(2);
    expect(lint(withWrongPlaceholdersOnDifferentBlocks)).toEqual(expected);
  });
});
