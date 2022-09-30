'use strict';

// ************* Dependencies *****************
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3002;



// ************* Routes *****************

app.use('*', () => {console.log(`this is my catch all FOR NOW : D`)});

// ************* other *****************

function start(PORT){
  console.log(`listening on port ${3001}`);
}

module.exports = {
  start,
  app,
}