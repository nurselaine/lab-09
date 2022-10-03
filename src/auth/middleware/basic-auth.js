'use strict';

// this is used to validate login information
const base64 = require('base-64');
const { users } = require('../../models');

module.exports = async (req, res, next) => {
  console.log('basic auth function');
  console.log(`auth - ${JSON.stringify(req.headers.authorization)}`)
  if(!req.headers.authorization){ return next('invalid login') };
  console.log('valid login');
  let basic = req.headers.authorization.split(' ').pop();
  console.log(`basic ${basic}`);
  try {
    console.log('attempt to decode' , base64.decode(basic));
    let [ username, password ] = base64.decode(basic).split(':');
    console.log(`username ${username} password ${password}`);
    req.user = await users.authenticateBasic(username, password);
    console.log(req.user);
    next();
  } catch (e) {
    next('invalid login');
  }
};
