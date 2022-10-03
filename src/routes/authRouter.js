'use strict';

// ***************** DEPENDENCIES ********************
const express = require('express');
const router = express.Router();

const basicAuth = require('../auth/middleware/basic-auth');
const bearerAuth = require('../auth/middleware/bearer-auth');
const permission = require('../auth/middleware/access-control');
const { users } = require('../models/index');


router.post('/signup', async (req, res, next) => {
  try {
    console.log('sign up function');
    // console.log(req.body);
    // console.log(users);
    let response = await users.create(req.body);
    // console.log('i am here');
    const output = {
      username: response,
      token: response.token,
    }
    // console.log(`output ${output}`);
    res.status(201).json(output);
  } catch (e) {
    next(e.message);
  }
});

router.post('/signin', basicAuth, async (req, res, next) => {
  try {
    console.log('sign in function');
    const user = {
      username: req.user,
      token: req.user.token,
    }
    res.status(201).send(user);
  } catch (e) {
    next(`Oops... Login Error ${e}`);
  }
});

router.get('/users', bearerAuth, permission('delete'), async (req, res, next) => {
  try {
    const response = await users.findAll({});
    const list = response.map(user => user.username);
    res.status(200).send(list);
  } catch (e) {
    next(`Oops... Login Error ${e}`);
  }
})

module.exports = router;