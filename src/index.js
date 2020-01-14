const lint = require('./lint');

if (window) {
  window.lint = lint;
} else if (global) {
  global.lint = lint;
}
