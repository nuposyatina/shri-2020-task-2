const lint = require('../src');
const {
  withoutHeaders,
  withoutH2,
  withoutH3,
  h3AfterH2,
  h3BeforeH2,
  h3BeforeH2OnDifferentLevels,
  someH3BeforeH2
} = require('../mocks/text.invalid_h3_position');

const ERROR_INFO = {
  code: 'TEXT.INVALID_H3_POSITION',
  error: 'Заголовок третьего уровня (блок text с модификатором type h3) не может находиться перед заголовком второго уровня на том же или более глубоком уровне вложенности'
};

/* global test expect describe */
describe('Позиция заголовка третьего уровня', () => {
  test('Если нет заголовков, то ошибок не будет', () => {
    expect(lint(withoutHeaders)).toHaveLength(0);
  });

  test('Если нет заголовка 2 уровня, то ошибок не будет', () => {
    expect(lint(withoutH2)).toHaveLength(0);
  });

  test('Если нет заголовка 3 уровня, то ошибок не будет', () => {
    expect(lint(withoutH3)).toHaveLength(0);
  });

  test('Если заголовок 3 уровня идет после заголовка 2 уровня, то ошибок не будет', () => {
    expect(lint(h3AfterH2)).toHaveLength(0);
  });

  test('Если заголовок 3 уровня идет перед заголовком 2 уровня на одном уровне вложенности, то будет ошибка', () => {
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

    expect(lint(h3BeforeH2)).toHaveLength(1);
    expect(lint(h3BeforeH2)).toEqual(expected);
  });

  test('Если заголовок 3 уровня идет перед заголовком 2 уровня на разных уровнях вложенности, то будет ошибка', () => {
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

    expect(lint(h3BeforeH2OnDifferentLevels)).toHaveLength(1);
    expect(lint(h3BeforeH2OnDifferentLevels)).toEqual(expected);
  });

  test('Если несколько заголовков 3 уровня идут перед заголовком 2 уровня, то будет несколько ошибок', () => {
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
    ];

    expect(lint(someH3BeforeH2)).toHaveLength(2);
    expect(lint(someH3BeforeH2)).toEqual(expected);
  });
});
