const withoutTexts = `{
  "block": "page",
  "content": [
    {
      "block": "warning",
      "content": [
        {
          "block": "image",
        }
      ]
    }
  ]
}`;

const textWithoutMods = `{
  "block": "page",
  "content": [
    {
      "block": "warning",
      "content": [
        {
          "block": "text",
        }
      ]
    }
  ]
}`;

const withCorrectTextSizes = `{
  "block": "page",
  "content": [
    {
      "block": "warning",
      "content": [
        {
          "block": "text",
          "mods": {
            "size": "s"
          }
        },
        {
          "block": "text",
          "mods": {
            "size": "s"
          }
        },
        {
          "block": "text",
          "mods": {
            "size": "s"
          }
        }
      ]
    }
  ]
}`;

const withCorrectTextSizesInDifferentBlocks = `{
  "block": "page",
  "content": [
    {
      "block": "warning",
      "content": [
        {
          "block": "text",
          "mods": {
            "size": "s"
          }
        },
        {
          "block": "text",
          "mods": {
            "size": "s"
          }
        },
      ]
    },
    {
      "block": "warning",
      "content": [
        {
          "block": "text",
          "mods": {
            "size": "l"
          }
        },
        {
          "block": "text",
          "mods": {
            "size": "l"
          }
        },
        {
          "block": "text",
          "mods": {
            "size": "l"
          }
        }
      ]
    }
  ]
}`;

const withWrongTextSizes = `{
  "block": "page",
  "content": [
    {
      "block": "warning",
      "content": [
        {
          "block": "text",
          "mods": {
            "size": "s"
          }
        },
        {
          "block": "text",
          "mods": {
            "size": "m"
          }
        },
      ]
    },
    {
      "block": "warning",
      "content": [
        {
          "block": "text",
          "mods": {
            "size": "m"
          }
        },
        {
          "block": "text",
          "mods": {
            "size": "l"
          }
        },
        {
          "block": "text",
          "mods": {
            "size": "m"
          }
        }
      ]
    }
  ]
}`;

module.exports = {
  withoutTexts,
  textWithoutMods,
  withCorrectTextSizes,
  withCorrectTextSizesInDifferentBlocks,
  withWrongTextSizes
};
