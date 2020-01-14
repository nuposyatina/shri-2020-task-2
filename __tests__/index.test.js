const lint = require('../src/lint');
/* global test expect */
test('should works', () => {
  const json = `{
    "block": "warning",
    "content": [
      { "block": "text", "mods": { "size": "l", "type": "h1" } },
      { "block": "text", "mods": { "size": "l" } },
      { "block": "text", "mods": { "size": "l" } },
      { "block": "button", "mods": { "size": "xl" } }
    ]
  }`;

  expect(lint(json)).toBeInstanceOf(Array);
  expect(lint(json)).toEqual([]);
});
