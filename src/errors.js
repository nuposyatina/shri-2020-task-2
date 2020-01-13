const GRID = {
  TOO_MUCH_MARKETING_BLOCKS: {
    code: 'GRID.TOO_MUCH_MARKETING_BLOCKS',
    error: 'Маркетинговые блоки должны занимать не больше половины от всех колонок блока grid'
  }
};

const TEXT = {
  INVALID_H2_POSITION: {
    code: 'TEXT.INVALID_H2_POSITION',
    error: 'Заголовок второго уровня (блок text с модификатором type h2) не может находиться перед заголовком первого уровня на том же или более глубоком уровне вложенности'
  },
  INVALID_H3_POSITION: {
    code: 'TEXT.INVALID_H3_POSITION',
    error: 'Заголовок третьего уровня (блок text с модификатором type h3) не может находиться перед заголовком второго уровня на том же или более глубоком уровне вложенности'
  },
  SEVERAL_H1: {
    code: 'TEXT.SEVERAL_H1',
    error: 'Заголовок первого уровня (блок text с модификатором type h1) на странице должен быть единственным'
  }
};

const WARNING = {
  INVALID_BUTTON_POSITION: {
    code: 'WARNING.INVALID_BUTTON_POSITION',
    error: 'Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности'
  },
  INVALID_BUTTON_SIZE: {
    code: 'WARNING.INVALID_BUTTON_SIZE',
    error: 'Размер кнопки блока warning должен быть на 1 шаг больше эталонного'
  },
  INVALID_PLACEHOLDER_SIZE: {
    code: 'WARNING.INVALID_PLACEHOLDER_SIZE',
    error: 'Допустимые размеры для блока placeholder в блоке warning (значение модификатора size): s, m, l'
  },
  TEXT_SIZES_SHOULD_BE_EQUAL: {
    code: 'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL',
    error: 'Все тексты (блоки text) в блоке warning должны быть одного размера'
  },
  HAS_NO_TEXT_SIZE: {
    code: 'WARNING.HAS_NOT_TEXT_SIZE',
    error: 'Размер текста должен быть определен'
  }
};

module.exports = {
  GRID,
  TEXT,
  WARNING
};
