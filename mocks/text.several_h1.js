const withoutHeaders = `{
  "block": "page",
  "content": [
    {
      "block": "text"
    },
    {
      "block": "text"
    },
    {
      "block": "text"
    }
  ]
}`;

const withOneHeader = `{
  "block": "page",
  "content": [
    {
      "block": "text",
      "mods": {
        "type": "h1"
      }
    },
    {
      "block": "text"
    },
    {
      "block": "text"
    }
  ]
}`;

const someHeadersOnSameLevel = `{
  "block": "page",
  "content": [
    {
      "block": "text",
      "mods": {
        "type": "h1"
      }
    },
    {
      "block": "text",
      "mods": {
        "type": "h1"
      }
    },
    {
      "block": "text"
    }
  ]
}`;

const someHeadersOnDifferentLevels = `{
  "block": "page",
  "content": [
    {
      "block": "header",
      "content": {
        "block": "text",
        "mods": {
          "type": "h1"
        }
      }
    },
    {
      "block": "main",
      "content": [
        {
          "block": "form",
          "content": [
            {
              "block": "text"
            },
            {
              "block": "text",
              "mods": {
                "type": "h1"
              }
            }
          ]
        },
        {
          "block": "payment",
          "content": {
            "block": "text",
            "mods": {
              "type": "h1"
            }
          }
        }
      ]
    }
  ]
}`

module.exports = {
  withoutHeaders,
  withOneHeader,
  someHeadersOnSameLevel,
  someHeadersOnDifferentLevels
}