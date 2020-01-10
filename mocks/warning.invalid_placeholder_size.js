const withoutPlaceholders = `{
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
        }
      ]
    }
  ]
}`;

const withCorrectPlaceholder = `{
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
          "block": "placeholder",
          "mods": {
            "size": "s"
          }
        },
        {
          "block": "button",
          "mods": {
            "size": "m"
          }
        }
      ]
    }
  ]
}`;

const withWrongPlaceholders= `{
  "block": "page",
  "content": [
    {
      "block": "warning",
      "content": [
        {
          "block": "placeholder",
          "mods": {
            "size": "xs"
          }
        },
        {
          "block": "text",
          "mods": {
            "size": "s"
          }
        },
        {
          "block": "button",
          "mods": {
            "size": "m"
          }
        },
        {
          "block": "text",
          "mods": {
            "size": "s"
          }
        },
        {
          "block": "button",
          "mods": {
            "size": "m"
          }
        }
      ]
    }
  ]
}`;

const withWrongPlaceholdersOnDifferentBlocks = `{
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
          "block": "placeholder",
          "mods": {
            "size": "xl"
          }
        },
        {
          "block": "text",
          "mods": {
            "size": "s"
          }
        },
        {
          "block": "button",
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
          "block": "placeholder",
          "mods": {
            "size": "s"
          }
        },
        {
          "block": "placeholder",
          "mods": {
            "size": "xl"
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

module.exports = {
  withoutPlaceholders,
  withCorrectPlaceholder,
  withWrongPlaceholders,
  withWrongPlaceholdersOnDifferentBlocks
};

