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

const withoutH1 = `{
  "block": "page",
  "content": [
    {
      "block": "text",
      "mods": {
        "type": "h2"
      }
    },
    {
      "block": "text",
      "mods": {
        "type": "h2"
      }
    },
    {
      "block": "text"
    }
  ]
}`;

const withoutH2 = `{
  "block": "page",
  "content": [
    {
      "block": "text"
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

const h2AfterH1 = `{
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
        "type": "h2"
      }
    },
    {
      "block": "text"
    }
  ]
}`;

const h2BeforeH1 = `{
  "block": "page",
  "content": [
    {
      "block": "text",
      "mods": {
        "type": "h2"
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

const h2BeforeH1OnDifferentLevels = `{
  "block": "page",
  "content": [
    {
      "block": "header",
      "content": {
        "block": "text",
        "mods": {
          "type": "h2"
        }
      }
    },
    {
      "block": "main",
      "content": {
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
      }
    },
    {
      "block": "text"
    }
  ]
}`

const someH2BeforeH1 = `{
  "block": "page",
  "content": [
    {
      "block": "header",
      "content": {
        "block": "text",
        "mods": {
          "type": "h2"
        }
      }
    },
    {
      "block": "main",
      "content": {
        "block": "form",
        "content": [
          {
            "block": "text",
            "mods": {
              "type": "h2"
            }
          },
          {
            "block": "text",
            "mods": {
              "type": "h1"
            }
          }
        ]
      }
    },
    {
      "block": "text"
    }
  ]
}`;

module.exports = {
  withoutHeaders,
  withoutH1,
  withoutH2,
  h2AfterH1,
  h2BeforeH1,
  h2BeforeH1OnDifferentLevels,
  someH2BeforeH1
}