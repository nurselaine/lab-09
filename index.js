'use strict';

const { start } = require('./src/server');
const { sequelize } = require('./src/models/index');
// const inquirer = require('inquirer');

// import inquirer from '../lib/inquirer.js';
  // eslint-disable-next-line node/no-missing-import

sequelize.sync()
  .then(async () => {
    await sequelize.authenticate();
    console.log('Successfully connected to Database!');
    start();
  })
  .catch((e) => console.log(`unable to connect to db`));
  
  // const questions = [
  //   {
  //     type: 'input',
  //     name: 'Sign up',
  //     message: "would you like to join jokes & affirmations today? (y/n) ",
  //     default() {
  //       return 'Y'
  //     }
  //   },
  //   {
  //     type: 'input',
  //     name: 'Username',
  //     message: "Add a username: ",
  //     default() {
  //       return 'Doe';
  //     },
  //   },
  //   {
  //     type: 'input',
  //     name: 'Password',
  //     message: "Add a oassword: ",
  //   },
  //   {
  //     type: 'list',
  //     name: 'role',
  //     message: "Add a role: ",
  //     choices: ['user', 'writer', 'editpr', 'admin'],
  //     default: 'user',
  //   },
  //   // {
  //   //   type: 'input',
  //   //   name: 'fav_color',
  //   //   message: "What's your favorite color",
  //   //   transformer(color, answers, flags) {
  //   //     const text = chalkPipe(color)(color);
  //   //     if (flags.isFinal) {
  //   //       return text + '!';
  //   //     }
  
  //   //     return text;
  //   //   },
  //   // },
  //   {
  //     type: 'input',
  //     name: 'phone',
  //     message: "What's your phone number",
  //     validate(value) {
  //       const pass = value.match(
  //         /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
  //       );
  //       if (pass) {
  //         return true;
  //       }
  
  //       return 'Please enter a valid phone number';
  //     },
  //   },
  // ];
  
  // inquirer.prompt(questions).then((answers) => {
  //   console.log(JSON.stringify(answers, null, '  '));
  // });