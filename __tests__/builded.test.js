/* global jest describe test expect */
describe('Собранный файл', () => {
  test('Подключается, и экспортирует `lint`', () => {
    jest.resetModules();
    const lint = require('../build/linter');
    expect(lint).toBeInstanceOf(Function);
  });

  test('Подключается в глобальную область видимости ноды', () => {
    jest.resetModules();
    require('../build/linter');
    expect(global.lint).toBeInstanceOf(Function);
  });

  test('Подключается в глобальную область видимости браузера', () => {
    jest.resetModules();
    require('../build/linter');
    expect(window.lint).toBeInstanceOf(Function);
  });

  test('Подключается и работает', () => {
    jest.resetModules();
    const lint = require('../build/linter');
    const json = `{
      "block": "warning",
      "content": [
        { "block": "text", "mods": { "size": "l", "type": "h1" } },
        { "block": "text", "mods": { "size": "l" } }
      ]
    }`;
    expect(lint(json)).toBeInstanceOf(Array);
    expect(lint(json)).toHaveLength(0);
  });
});
