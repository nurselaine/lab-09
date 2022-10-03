// 'use strict';

// const express = require('express');
// const inquirer = require('inquirer');
// const axios = require('axios');
// const cors = require('cors');
// require('dotenv').config();
// const { signinHandler } = require('./signInInquirer');

// const app = express();
// app.use(cors());
// app.use(express.urlencoded({ extended: true }));

// const questions = [
//   {
//     type: 'input',
//     name: 'Signup',
//     message: "Do you have an account with us? (y/n)",
//     default() {
//       return 'n'
//     }
//   },
//   {
//     type: 'input',
//     name: 'Username',
//     message: "Please sign up for account - Create a username: ",
//     default() {
//       return 'User';
//     },
//   },
//   {
//     type: 'input',
//     name: 'Password',
//     message: "Please sign up for account - Create a password: ",
//     default() {
//       return '1234';
//     },
//   },
//   {
//     type: 'list',
//     name: 'role',
//     message: "Add a role: ",
//     choices: ['user', 'writer', 'editor', 'admin'],
//     default: 'user',
//   },
//   // {
//   //   type: 'input',
//   //   name: 'signinUsername',
//   //   message: "Please validate account and sign in. Username:  ",
//   // },
//   // {
//   //   type: 'input',
//   //   name: 'signinPassword',
//   //   message: "Please validate account and sign in. Password:  ",
//   // },
//   // {
//   //   type: 'list',
//   //   name: 'fetch',
//   //   message: "You are now logged in! What would you like to do?",
//   //   choices: ['laugh', 'unsure', 'admin'],
//   //   default: 'user',
//   // },
//   // {
//   //   type: 'input',
//   //   name: 'fetch',
//   //   message: "You are now logged in! How are you feeling?",
//   //   choices: ['sad', 'unsure', 'admin'],
//   //   default: 'user',
//   // },
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
//   // {
//   //   type: 'input',
//   //   name: 'phone',
//   //   message: "What's your phone number",
//   //   validate(value) {
//   //     const pass = value.match(
//   //       /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
//   //     );
//   //     if (pass) {
//   //       return true;
//   //     }

//   //     return 'Please enter a valid phone number';
//   //   },
//   // },
// ];

// const signupHandler = async (answers, req, res, next) => {
//   try {
//     let response = await axios.post(`${process.env.SERVER_URL}/signup`, {
//       username: answers.Username,
//       password: answers.Password,
//       role: answers.role,
//     });
//     console.log(response.data);
//     return response.data;
//   } catch {
//     console.log('something went wrong');
//   }
// }

// inquirer.prompt(questions)
//   .then((answers) => {
//     console.log(`Signup ${answers.Signup}`);
//     if (answers.Signup.toLowerCase() === 'n' || answers.Signup.toLowerCase() === 'no') {
//       const userData = signupHandler(answers);
//       if(userData){

//         signinHandler(userData.token);
//       } else {
//         console.log('Username must be unique')
//       }
//     }
//   });


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

// inquirer.prompt(signInQuestions)
//   .then((answers) => {
//       let token;
//       let response;
//       try {
//         console.log('hello');
//         response = axios.post(`${process.env.SERVER_URL}/signup`, {
//           username: answers.Username,
//           password: answers.Password,
//           role: answers.role,
//         });
//         token = response.token;
//         console.log(token);
//       } catch (e) {
//         console.log('Something went wrong :/');
//       }
//   });