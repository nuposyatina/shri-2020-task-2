const withoutMarketingBlocks = `{
  "block": "page",
  "content": {
    "block": "grid",
    "mods": {
      "m-columns": "12"
    }
    "content": [
      {
        "block": "grid",
        "elem": "fraction",
        "elemMods": {
          "m-col": "5"
        },
        "mix": {
          "block": "payment"
        }
      },
      {
        "block": "grid",
        "elem": "fraction",
        "elemMods": {
          "m-col": "7"
        },
        "mix": {
          "block": "cover"
        }
      }
    ]
  }
}`;

const withOneMarketingBlock = `{
  "block": "page",
  "content": {
    "block": "grid",
    "mods": {
      "m-columns": "10"
    },
    "content": [
      {
        "block": "grid",
        "elem": "fraction",
        "elemMods": {
          "m-col": "2"
        },
        "mix": {
          "block": "payment"
        }
      },
      {
        "block": "grid",
        "elem": "fraction",
        "elemMods": {
          "m-col": "2"
        },
        "mix": {
          "block": "warning"
        }
      },
      {
        "block": "grid",
        "elem": "fraction",
        "elemMods": {
          "m-col": "2"
        },
        "mix": {
          "block": "cover"
        }
      },
      {
        "block": "grid",
        "elem": "fraction",
        "elemMods": {
          "m-col": "4"
        },
        "mix": {
          "block": "offer"
        }
      },
    ]
  }
}`;

const marketingBlocksIsHalf = `{
  "block": "page",
  "content": {
    "block": "grid",
    "mods": {
      "m-columns": "8"
    },
    "content": [
      {
        "block": "grid",
        "elem": "fraction",
        "elemMods": {
          "m-col": "2"
        },
        "mix": {
          "block": "payment"
        }
      },
      {
        "block": "grid",
        "elem": "fraction",
        "elemMods": {
          "m-col": "2"
        },
        "mix": {
          "block": "commercial"
        }
      },
      {
        "block": "grid",
        "elem": "fraction",
        "elemMods": {
          "m-col": "2"
        },
        "mix": {
          "block": "cover"
        }
      },
      {
        "block": "grid",
        "elem": "fraction",
        "elemMods": {
          "m-col": "2"
        },
        "mix": {
          "block": "offer"
        }
      },
    ]
  }
}`;

const marketingBlocksMoreThanHalf = `{
  "block": "page",
  "content": {
    "block": "grid",
    "mods": {
      "m-columns": "12"
    },
    "content": [
      {
        "block": "grid",
        "elem": "fraction",
        "elemMods": {
          "m-col": "2"
        },
        "mix": {
          "block": "payment"
        }
      },
      {
        "block": "grid",
        "elem": "fraction",
        "elemMods": {
          "m-col": "4"
        },
        "mix": {
          "block": "commercial"
        }
      },
      {
        "block": "grid",
        "elem": "fraction",
        "elemMods": {
          "m-col": "2"
        },
        "mix": {
          "block": "cover"
        }
      },
      {
        "block": "grid",
        "elem": "fraction",
        "elemMods": {
          "m-col": "4"
        },
        "mix": {
          "block": "offer"
        }
      }
    ]
  }
}`;

module.exports = {
  withoutMarketingBlocks,
  withOneMarketingBlock,
  marketingBlocksIsHalf,
  marketingBlocksMoreThanHalf
};
