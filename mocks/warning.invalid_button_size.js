const withoutButtons = `{
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
        }
      ]
    }
  ]
}`;

const withCorrectButton = `{
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
          "block": "button",
          "mods": {
            "size": "m"
          }
        }
      ]
    }
  ]
}`;

const withWrongButtons = `{
  "block": "page",
  "content": [
    {
      "block": "warning",
      "content": [
        {
          "block": "button",
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
            "size": "l"
          }
        }
      ]
    }
  ]
}`;

const withWrongButtonsOnDifferentBlocks = `{
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
            "size": "l"
          }
        }
      ]
    },
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
          "block": "button",
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

module.exports = {
  withoutButtons,
  withCorrectButton,
  withWrongButtons,
  withWrongButtonsOnDifferentBlocks
};
