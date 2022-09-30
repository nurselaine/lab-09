'use strict';

// ***************** Dependencies *****************

const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('./usersModel');

const DATABASE_URL = process.env.NODE_ENV === 'test' 
  ? 'sqlite::memory' 
  : process.env.DATABASE_URL;

// ***************** instantiate *****************

const sequelize = new Sequelize(DATABASE_URL, {logging: false});
const users = userModel(sequelize, DataTypes);

// ***************** other *****************

module.exports = {
  sequelize,
  DataTypes,
  users,
}