const lint = require('../src/lint');
const {
  withoutPlaceholders,
  withCorrectPlaceholder,
  withWrongPlaceholders,
  withWrongPlaceholdersOnDifferentBlocks
} = require('../mocks/warning.invalid_placeholder_size');
const { WARNING } = require('../src/errors');

/* global test expect describe */
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
        ...WARNING.INVALID_PLACEHOLDER_SIZE,
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
        ...WARNING.INVALID_PLACEHOLDER_SIZE,
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
        ...WARNING.INVALID_PLACEHOLDER_SIZE,
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
