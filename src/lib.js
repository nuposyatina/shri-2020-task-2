/**
 * Проверить, является ли блок тем, что мы ищем
 * @param {Object} data проверяемый блок
 * @param {String} blockName имя блока, с которым сверяемся
 */
const isCurrentBlock = (data, blockName) => data.block === blockName && !data.elem;

const checkMix = (mix, blockName) => (
  mix === blockName || mix.block === blockName ? mix : null
);

/**
 * Получить примиксованную сущность с нужным именем, если она есть
 * @param {Object} data проверяемый блок
 * @param {String} blockName искомое имя блока
 */
const getMixedBlock = (data, blockName) => {
  const { mix } = data;
  if (!mix) return null;

  if (Array.isArray(mix)) {
    return mix.find((el) => isCurrentBlock(el, blockName));
  }

  // Если mix представлен в виде строки или объекта
  return checkMix(mix, blockName);
};

/**
 * Проверить, есть ли у блока примиксованная сущность с нужным именем
 * @param {Object} data проверяемый блок
 * @param {String} blockName искомое имя блока
 */
const isMixedBlock = (data, blockName) => !!getMixedBlock(data, blockName);


/**
 * Проверить, является ли текущий блок тем, который мы ищем
 * @param {Object} data проверяемый блок
 * @param {String} blockName имя искомого блока
 */
const isCurrentOrMixedBlock = (data, blockName) => (
  isCurrentBlock(data, blockName) || isMixedBlock(data, blockName)
);

/**
 * Получить объект с местоположением блока в JSON
 * @param {Object} blockAst ast-дерево проверяемого блока
 */
const getBlockLocation = (blockAst) => {
  const { start, end } = blockAst.loc;
  return {
    start: {
      column: start.column,
      line: start.line
    },
    end: {
      column: end.column,
      line: end.line
    }
  };
};

const iterateChildren = (f, iterable, ast, acc, params = []) => (
  iterable.reduce((iAcc, el, index) => f(el, ast[index], iAcc, ...params), acc)
);

const checkNodeName = (names, node) => (
  names.find((name) => isCurrentOrMixedBlock(node, name))
);

const checkAstType = (property, type) => (
  property && property.value.type === type
);

/**
 * Найти в блоке дочерние блоки с определенными именами на любом уровне вложенности
 * @param {Object} tree блок, в котором ищем дочерние блоки по именам
 * @param {Object} astTree ast-дерево, с помощью которого получаем
 * информацию о положении искомых блоков
 * @param {Array} blockNames массив имен искомых блоков
 */
const findBlocks = (tree, astTree, blockNames) => {
  const iter = (node, ast, acc) => {
    const nodeWithLocation = {
      ...node,
      location: getBlockLocation(ast)
    };
    const newAcc = checkNodeName(blockNames, node) ? [...acc, nodeWithLocation] : acc;

    const { content } = node;
    const astContentProperty = ast.children.find((el) => el.key.value === 'content');

    if (checkAstType(astContentProperty, 'Array')) {
      const { children } = astContentProperty.value;
      return iterateChildren(iter, content, children, newAcc);
    }

    if (checkAstType(astContentProperty, 'Object')) {
      return iter(content, astContentProperty.value, newAcc);
    }

    return newAcc;
  };

  return iter(tree, astTree, []);
};

/**
 * Получить значение модификатора блока или элемента, если оно есть
 * @param {Object} data блок, из которого получаем значение модификатора
 * @param {String} modName название модификатора
 */
const getModsValue = (data, modName) => {
  if (data.mods) {
    return data.mods[modName];
  }
  if (data.elemMods) {
    return data.elemMods[modName];
  }
  return null;
};

/**
 * Получить эталонное значение размера текста в блоке
 * @param {Array} texts массив текстов
 */
const getEthalonSize = (texts) => {
  if (!texts.length) return null;
  return getModsValue(texts[0], 'size');
};

const checkWarningSize = (data, state) => {
  const isWarning = isCurrentOrMixedBlock(data, 'warning');
  // чтобы лишний раз не вычислять эталонный размер в разных правилах
  // для одного и того же блока warning
  if (isWarning && state.warningEthalonSizeIsChecked) {
    state.warningEthalonSizeIsChecked = false;
  }
};

module.exports = {
  findBlocks,
  getEthalonSize,
  isCurrentOrMixedBlock,
  getModsValue,
  getBlockLocation,
  checkWarningSize,
  iterateChildren,
  checkAstType
};
