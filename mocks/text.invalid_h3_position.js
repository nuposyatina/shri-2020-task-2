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

const withoutH2 = `{
  "block": "page",
  "content": [
    {
      "block": "text",
      "mods": {
        "type": "h3"
      }
    },
    {
      "block": "text",
      "mods": {
        "type": "h3"
      }
    },
    {
      "block": "text"
    }
  ]
}`;

const withoutH3 = `{
  "block": "page",
  "content": [
    {
      "block": "text"
    },
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
    }
  ]
}`;

const h3AfterH2 = `{
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
        "type": "h3"
      }
    },
    {
      "block": "text"
    }
  ]
}`;

const h3BeforeH2 = `{
  "block": "page",
  "content": [
    {
      "block": "text",
      "mods": {
        "type": "h3"
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

const h3BeforeH2OnDifferentLevels = `{
  "block": "page",
  "content": [
    {
      "block": "header",
      "content": {
        "block": "text",
        "mods": {
          "type": "h3"
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
              "type": "h2"
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

const someH3BeforeH2 = `{
  "block": "page",
  "content": [
    {
      "block": "header",
      "content": {
        "block": "text",
        "mods": {
          "type": "h3"
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
              "type": "h3"
            }
          },
          {
            "block": "text",
            "mods": {
              "type": "h2"
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
  withoutH2,
  withoutH3,
  h3AfterH2,
  h3BeforeH2,
  h3BeforeH2OnDifferentLevels,
  someH3BeforeH2
};
