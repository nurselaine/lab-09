'use strict'; 

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Affirmation', {
    affirmation: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
  });
};


/*
https://www.affirmations.dev/
{"affirmation":"You got this"}
*/ 
