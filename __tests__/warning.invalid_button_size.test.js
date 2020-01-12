const lint = require('../src');

const {
  withoutButtons,
  withCorrectButton,
  withWrongButtons,
  withWrongButtonsOnDifferentBlocks
} = require('../mocks/warning.invalid_button_position');

const ERROR_INFO = {
  code: 'WARNING.INVALID_BUTTON_SIZE',
  error: 'Размер кнопки блока warning должен быть на 1 шаг больше эталонного'
};

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
      },
      {
        ...ERROR_INFO,
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
      },
      {
        ...ERROR_INFO,
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
    expect(lint(withWrongButtonsOnDifferentBlocks)).toHaveLength(3);
    expect(lint(withWrongButtonsOnDifferentBlocks)).toEqual(expected);
  });
});
