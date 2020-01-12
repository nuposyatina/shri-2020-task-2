/**
 * Проверить, является ли блок тем, что мы ищем
 * @param {Object} data проверяемый блок
 * @param {String} blockName имя блока, с которым сверяемся
 */
const isCurrentBlock = (data, blockName) => data.block === blockName && !data.elem;

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

  //Если mix представлен в виде строки или объекта
  return mix === blockName || mix.block === blockName ? mix : null;
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
const isCurrentOrMixedBlock = (data, blockName) => {
  return isCurrentBlock(data, blockName) || isMixedBlock(data, blockName);
};

/**
 * Получить объект с местоположением блока в JSON
 * @param {Object} blockAst ast-дерево проверяемого блока
 */
const getBlockLocation = (blockAst) => {
  const { loc } = blockAst;
  return {
    start: {
      column: loc.start.column,
      line: loc.start.line
    },
    end: {
      column: loc.end.column,
      line: loc.end.line
    }
  };
};

/**
 * Найти в блоке дочерние блоки с определенными именами
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
    const newAcc = blockNames.find(blockName => isCurrentOrMixedBlock(node, blockName)) ? [ ...acc, nodeWithLocation ] : acc;

    const { content } = node;
    const astContentProperty = ast.children.find(el => el.key.value === 'content');

    if (astContentProperty && astContentProperty.value.type === 'Array') {
      const { children } = astContentProperty.value;
      return content.reduce((iAcc, el, index) => iter(el, children[index], iAcc), newAcc);
    }

    if (astContentProperty && astContentProperty.value.type === 'Object') {
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

module.exports = {
  findBlocks,
  getEthalonSize,
  isCurrentOrMixedBlock,
  getModsValue,
  getBlockLocation
};
