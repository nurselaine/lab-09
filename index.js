'use strict';

const { app, start } = require('./src/server');
const { sequelize } = require('./src/models/index');

sequelize.sync()
  .then(() => {
    console.log('Successfully connected to Database!');

    start();
  })