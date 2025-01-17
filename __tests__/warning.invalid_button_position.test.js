const lint = require('../src/lint');
const {
  withoutButtonAndPlaceholder,
  withoutButton,
  withoutPlaceholder,
  buttonAfterPlaceholder,
  buttonBeforePlaceholder
} = require('../mocks/warning.invalid_button_position');
const { WARNING } = require('../src/errors');

/* global test expect describe */
describe('Позиция блока button', () => {
  test('Если нет блоков button и placeholder, то ошибка не возникнет', () => {
    expect(lint(withoutButtonAndPlaceholder)).toHaveLength(0);
  });

  test('Если нет блока button, то ошибка не возникнет', () => {
    expect(lint(withoutButton)).toHaveLength(0);
  });

  test('Если нет блока placeholder, то ошибка не возникнет', () => {
    expect(lint(withoutPlaceholder)).toHaveLength(0);
  });

  test('Если блок button находится после блока placeholder, то ошибка не возникнет', () => {
    expect(lint(buttonAfterPlaceholder)).toHaveLength(0);
  });

  test('Если блок button находится перед блоком placeholder, то возникнет ошибка', () => {
    const expected = [{
      ...WARNING.INVALID_BUTTON_POSITION,
      location: {
        start: {
          column: 9,
          line: 14
        },
        end: {
          column: 10,
          line: 19
        }
      }
    }];

    expect(lint(buttonBeforePlaceholder)).toHaveLength(1);
    expect(lint(buttonBeforePlaceholder)).toEqual(expected);
  });
});
