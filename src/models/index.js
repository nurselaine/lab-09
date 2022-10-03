'use strict';

// ***************** Dependencies *****************

const { Sequelize, DataTypes } = require('sequelize');
const userSchema = require('./usersModel');
const jokeSchema = require('./jokeModel');
const affirmSchema = require('./affirmModel');
const Interface = require('./Model-Interface');

const DATABASE_URL = process.env.NODE_ENV === 'test' 
  ? 'sqlite::memory:' 
  : process.env.DATABASE_URL;

// ***************** instantiate *****************

const options = {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
};

const sequelize = new Sequelize(DATABASE_URL, options);
const users = userSchema(sequelize, DataTypes);
const jokes = jokeSchema(sequelize, DataTypes);
const affirmations = affirmSchema(sequelize, DataTypes);
// console.log(`affirmations ${affirmations}`);
// console.log('boolean ', users === sequelize.model.User); // testing if user model is in sequelize db

// ***************** other *****************

module.exports = {
  sequelize,
  DataTypes,
  // users,
  users,
  jokes: new Interface(jokes),
  affirmations: new Interface(affirmations),
}