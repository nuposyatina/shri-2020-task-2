const lint = require('./lint');

if (typeof global !== 'undefined') {
  global.lint = lint;
} else if (typeof window !== 'undefined') {
  window.lint = lint;
}

module.exports = lint;
