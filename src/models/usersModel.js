'use strict';

// ************* dependencies **************
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SECRET = process.env.SECRET || 'thisismysecret';

// ************* User Class - schema  **************
const userModel = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    username: {
      type: DataTypes.STRING, 
      allowNull: false, 
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: { type: DataTypes.ENUM('user', 'writer', 'editor', 'admin'), required: true, defaultValue: 'user'},
    token: {
      type: DataTypes.VIRTUAL,
      get(){
        return jwt.sign({username: this.username}, SECRET);
      },
      set(tokenObj){
        let token = jwt.sign(tokenObj, SECRET);
        return token;
      }
    },
    capabilities: {
      type: DataTypes.VIRTUAL,
      get(){
        const acl = {
          user: ['read'],
          writer: ['read', 'create'],
          editor: ['read', 'create', 'update'],
          admin: ['read', 'create', 'update', 'delete'],
        }
        return acl[this.role];
      }
    }
  });

  user.beforeCreate(async (user) => {
    // this stores a hashed password in the database using bcrypt
      let hashedPass = await bcrypt.hash(user.password, 10);
      user.password = hashedPass;
  });
  
  user.authenticateBasic = async function (username, password) {
    // Question - why is it using this - what is this referring to on this file?
    try{
      const user = await this.findOne({where: { username }});
      const valid = await bcrypt.compare(password, user.password);
      if(valid){
        return user;
      } else {
        return `User Not Found`;
      }
    } catch (e) {
      console.log(`authentication function error: ${e}`);
    }
  };
  
  user.authenticateTokenasync = async function (token){
    try {
      const parsedToken = jwt.verify(token, SECRET);
      const user = await this.findOne({where: { username: parsedToken.username}});
      if(user){
        return user;
      } else {
        return `User Not Found`;
      }
    } catch (e) {
      console.log(`authenticate token error: ${e}`);
    }
  };

}

module.exports = userModel;