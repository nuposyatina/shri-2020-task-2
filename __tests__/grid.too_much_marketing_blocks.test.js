const lint = require('../src/index.js');

const {
  withoutMarketingBlocks,
  withOneMarketingBlock,
  marketingBlocksIsHalf,
  marketingBlocksMoreThanHalf
} = require('../mocks/grid.too_much_marketing_blocks');

const ERROR_INFO = {
  code: 'GRID.TOO_MUCH_MARKETING_BLOCKS',
  error: 'Маркетинговые блоки занимают не больше половины от всех колонок блока grid'
};

describe('Количество маркетинговых блоков', () => {
  test('Если маркетинговых блоков нет, то ошибок не будет', () => {
    expect(lint(withoutMarketingBlocks).toHaveLength(0));
  });

  test('Если маркетинговые блоки занимают меньше половины колонок, то ошибок не будет', () => {
    expect(lint(withOneMarketingBlock).toHaveLength(0));
  });

  test('Если маркетинговых блоков половина от количества колонок, то ошибок не будет', () => {
    expect(lint(marketingBlocksIsHalf).toHaveLength(0));
  });

  test('Если маркетинговых блоков больше половины от количества колоно, то ошибок возникнут ошибки', () => {
    const expected = [{
      ...ERROR_INFO,
      location: {
        start: {
          column: 14,
          line: 3
        },
        end: {
          column: 4,
          line: 50
        }
      }
    }];
    expect(lint(marketingBlocksMoreThanHalf).toHaveLength(1));
    expect(lint(marketingBlocksMoreThanHalf)).toEqual(expected);
  });
});
