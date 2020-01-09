const withoutButtonAndPlaceholder = `{
  "block": "page",
  "content": [
    {
      "block": "payment",
      "content": {
        "block": "text"
      }
    },
    {
      "block": "warning",
      "content": [
        {
          "block": "text"
        },
        {
          "block": "text"
        }
      ]
    }
  ]
}`;

const withoutButton = `{
  "block": "page",
  "content": [
    {
      "block": "warning",
      "content": {
        "block": "placeholder",
        "mods": {
          "size": "s"
        }
      }
    },
    {
      "block": "warning",
      "content": [
        {
          "block": "placeholder",
          "mods": {
            "size": "m"
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

const wintoutPlaceholder = `{
  "block": "page",
  "content": [
    {
      "block": "payment",
      "content": {
        "block": "payment",
        "elem": "content"
      }
    },
    {
      "block": "warning",
      "content": [
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
        }
      ]
    }
  ]
}`;

const buttonAfterPlaceholder = `{
  "block": "page",
  "content": [
    {
      "block": "payment",
      "content": {
        "block": "payment",
        "elem": "content"
      }
    },
    {
      "block": "warning",
      "content": [
        {
          "block": "placeholder",
          "mods": {
            "size": l
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

const buttonBeforePlaceholder = `{
  "block": "page",
  "content": [
    {
      "block": "payment",
      "content": {
        "block": "payment",
        "elem": "content"
      }
    },
    {
      "block": "warning",
      "content": [
        {
          "block": "button",
          "mods": {
            "size": l
          }
        },
        {
          "block": "text",
          "mods": {
            "size": "m"
          }
        },
        {
          "block": "placeholder",
          "mods": {
            "size": "m"
          }
        }
      ]
    }
  ]
}`;