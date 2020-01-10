const lint = require('../src/index.js');
const {
  withoutHeaders,
  withoutH1,
  withoutH2,
  h2AfterH1,
  h2BeforeH1,
  h2BeforeH1OnDifferentLevels,
  someH2BeforeH1
} = require('../mocks/text.invalid_h2_position');

const ERROR_INFO = {
  code: 'TEXT.INVALID_H2_POSITION',
  error: 'Заголовок второго уровня (блок text с модификатором type h2) не может находиться перед заголовком первого уровня на том же или более глубоком уровне вложенности.'
}

describe('Позиция заголовка второго уровня', () => {
  test('Если нет заголовков, то ошибок не будет', () => {
    expect(lint(withoutHeaders)).toHaveLength(0);
  });

  test('Если нет заголовка 1 уровня, то ошибок не будет', () => {
    expect(lint(withoutH1)).toHaveLength(0);
  });

  test('Если нет заголовка 2 уровня, то ошибок не будет', () => {
    expect(lint(withoutH2)).toHaveLength(0);
  });

  test('Если заголовок 2 уровня идет после заголовка 1 уровня, то ошибок не будет', () => {
    expect(lint(h2AfterH1)).toHaveLength(0);
  });

  test('Если заголовок 2 уровня идет перед заголовком 1 уровня на одном уровне вложенности, то будет ошибка', () => {
    const expected = [
      {
        ...ERROR_INFO,
        location: {
          start: {
            column: 5,
            line: 4
          },
          end: {
            column: 6,
            line: 9
          }
        }
      }
    ];

    expect(lint(h2BeforeH1)).toHaveLength(1);
    expect(lint(h2BeforeH1)).toEqual(expected);
  });

  test('Если заголовок 2 уровня идет перед заголовком 1 уровня на разных уровнях вложенности, то будет ошибка', () => {
    const expected = [
      {
        ...ERROR_INFO,
        location: {
          start: {
            column: 18,
            line: 6
          },
          end: {
            column: 8,
            line: 11
          }
        }
      }
    ];
    expect(lint(h2BeforeH1OnDifferentLevels)).toHaveLength(1);
    expect(lint(h2BeforeH1OnDifferentLevels)).toEqual(expected);
  });

  test('Если несколько заголовков 2 уровня идут перед заголовком 1 уровня, то будет несколько ошибок', () => {
    const expected = [
      {
        ...ERROR_INFO,
        location: {
          start: {
            column: 18,
            line: 6
          },
          end: {
            column: 8,
            line: 11
          }
        }
      },
      {
        ...ERROR_INFO,
        location: {
          start: {
            column: 11,
            line: 18
          },
          end: {
            column: 12,
            line: 23
          }
        }
      }
    ]
    expect(lint(someH2BeforeH1)).toHaveLength(2);
    expect(lint(someH2BeforeH1)).toEqual(expected);
  });
});
