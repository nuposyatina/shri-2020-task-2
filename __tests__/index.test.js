const lint = require('../src/index.js');

test('should works', () => {
  const json1 = ``;
  const json2 = `{
    "block": "warning",
    "content": [
      { "block": "text", "mods": { "size": "l", "type": "h1 } },
      { "block": "text", "mods": { "size": "l" } },
      { "block": "text", "mods": { "size": "l" } },
      { "block": "button", "mods": { "size": "xl" } }
    ]
  }`;
  const expected = [];
  expect(lint(json1)).toEqual(expected);
  expect(lint(json2)).toEqual(expected);
});