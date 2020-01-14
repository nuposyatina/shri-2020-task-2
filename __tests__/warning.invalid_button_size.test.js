const lint = require('../src/lint');
const {
  withoutButtons,
  withCorrectButton,
  withWrongButtons,
  withWrongButtonsOnDifferentBlocks
} = require('../mocks/warning.invalid_button_size');
const { WARNING } = require('../src/errors');

/* global test expect describe */
describe('Размер блока button', () => {
  test('Если нет блоков button, то ошибка не возникнет', () => {
    expect(lint(withoutButtons)).toHaveLength(0);
  });

  test('Если размер блока button на один шаг больше эталонного, то ошибка не возникнет', () => {
    expect(lint(withCorrectButton)).toHaveLength(0);
  });

  test('Если есть кнопки с неправильным размером, то возникнут ошибки', () => {
    const expected = [
      {
        ...WARNING.INVALID_BUTTON_SIZE,
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
      },
      {
        ...WARNING.INVALID_BUTTON_SIZE,
        location: {
          start: {
            column: 9,
            line: 31
          },
          end: {
            column: 10,
            line: 36
          }
        }
      }
    ];

    expect(lint(withWrongButtons)).toHaveLength(2);
    expect(lint(withWrongButtons)).toEqual(expected);
  });

  test('Если есть кнопки с неправильным размером на разных уровнях вложенности, то возникнут ошибки', () => {
    const expected = [
      {
        ...WARNING.INVALID_BUTTON_SIZE,
        location: {
          start: {
            column: 9,
            line: 25
          },
          end: {
            column: 10,
            line: 30
          }
        }
      },
      {
        ...WARNING.INVALID_BUTTON_SIZE,
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

    expect(lint(withWrongButtonsOnDifferentBlocks)).toHaveLength(2);
    expect(lint(withWrongButtonsOnDifferentBlocks)).toEqual(expected);
  });
});
