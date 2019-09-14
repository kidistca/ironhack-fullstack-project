'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  }, 
  passwordHash: {
    type: String,
    required: true
  }
});

const userSignupStatic = require('./user-signup-static');
const userSigninStatic = require('./user-signin-static');
const findByEmailStatic = require('./findByEmail');

userSchema.statics.signIn = userSigninStatic;
userSchema.statics.signUp  = userSignupStatic;
userSchema.statics.findByEmail = findByEmailStatic;

module.exports = mongoose.model('User', userSchema);
