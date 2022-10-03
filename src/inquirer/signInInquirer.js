// 'use strict';

// const express = require('express');
// const inquirer = require('inquirer');
// const axios = require('axios');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// app.use(cors());
// app.use(express.urlencoded({ extended: true }));

// const signInQuestions = [
//  {
//     type: 'input',
//     name: 'signinUsername',
//     message: "Please validate account and sign in. Username:  ",
//   },
//   {
//     type: 'input',
//     name: 'signinPassword',
//     message: "Please validate account and sign in. Password:  ",
//   },
// ];

// const signinHandler = async (answers, token, req, res, next) => {
//   try {
//     response = await axios.post(`${process.env.SERVER_URL}/signup`, {
//       username: answers.Username,
//       password: answers.Password,
//       role: answers.role,
//     });
//     token = response.token;
//     console.log(token);
//   } catch (e) {
//     console.log('Something went wrong :/');
//   }
// }


// inquirer.prompt(signInQuestions)
//   .then((answers) => {
//       let response = signinHandler(answers, token);
//       console.log(`response ${response.body}`);
//   });

//   module.exports = { signinHandler };