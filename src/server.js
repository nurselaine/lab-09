'use strict';

// ************* Dependencies *****************
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const logger = require('./auth/middleware/logger');
const authRoutes = require('./routes/authRouter');
const quotesRoutes = require('./routes/quotesRouter');
const serverError = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3002;

app.use(logger);

// ************* Routes *****************
app.use('/', () => {console.log('Welcome to my server - Jokes & Affirmations, please view my front-end app!')});
app.use(authRoutes);
app.use(quotesRoutes);

app.use('*', serverError);
app.use(errorHandler);

// ************* other *****************

function start(){
  app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
}

module.exports = {
  start,
  app,
}