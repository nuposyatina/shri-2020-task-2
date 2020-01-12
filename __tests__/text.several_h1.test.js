const lint = require('../src');
const { 
  withoutHeaders, 
  withOneHeader, 
  someHeadersOnSameLevel, 
  someHeadersOnDifferentLevels 
} = require('../mocks/text.several_h1');

const ERROR_INFO = {
  code: 'TEXT.SEVERAL_H1',
  error: 'Заголовок первого уровня (блок text с модификатором type h1) на странице должен быть единственным'
};

describe('Количество заголовков первого уровня', () => {
  test('Если нет заголовка, то ошибок не будет', () => {
    expect(lint(withoutHeaders)).toHaveLength(0);
  });

  test('Если заголовок один, то ошибок не будет', () => {
    expect(lint(withOneHeader)).toHaveLength(0);
  });

  test('Если на одном уровне больше одного заголовка, то будет ошибка', () => {
    const expected = [
      {
        ...ERROR_INFO,
        location: {
          start: {
            column: 5,
            line: 10
          },
          end: {
            column: 6,
            line: 15
          }
        }
      }
    ];

    expect(lint(someHeadersOnSameLevel)).toHaveLength(1);
    expect(lint(someHeadersOnSameLevel)).toEqual(expected);
  });

  test('Если есть несколько заголовков на разных уровнях вложенности, то будет несколько ошибок', () => {
    const expected = [
      {
        ...ERROR_INFO,
        location: {
          start: {
            column: 13,
            line: 22
          },
          end: {
            column: 14,
            line: 27
          }
        }
      },
      {
        ...ERROR_INFO,
        location: {
          start: {
            column: 22,
            line: 32
          },
          end: {
            column: 12,
            line: 37
          }
        }
      }
    ];

    expect(lint(someHeadersOnDifferentLevels)).toHaveLength(2);
    expect(lint(someHeadersOnDifferentLevels)).toEqual(expected);
  });
});
