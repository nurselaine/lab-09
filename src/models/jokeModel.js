'use strict';

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Joke', {
    setup: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    delivery: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  })
}

/*
from joke API 
https://v2.jokeapi.dev/joke/Any

{
    "error": false,
    "category": "Pun",
    "type": "twopart",
    "setup": "What kind of car did Whitney Houston drive?",
    "delivery": "A Hyundaiiiiiiiiiiii",
    "flags": {
        "nsfw": false,
        "religious": false,
        "political": false,
        "racist": false,
        "sexist": false,
        "explicit": false
    },
    "id": 67,
    "safe": true,
    "lang": "en"
}
*/