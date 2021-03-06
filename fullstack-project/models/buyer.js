'use strict';

const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
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

const buyerSignupStatic = require('./buyerSignup-static');
const buyerSigninStatic = require('./signin-static');
const findByEmailStatic = require('./findByEmail');

buyerSchema.statics.signIn = buyerSigninStatic;
buyerSchema.statics.buyerSignUp  = buyerSignupStatic;
buyerSchema.statics.findByEmail = findByEmailStatic;

module.exports = mongoose.model('Buyer', buyerSchema);
