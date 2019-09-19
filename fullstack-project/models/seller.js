'use strict';

const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  }, 
  city: {
    type: String,
    required: true
  },
  postalcode: {
    type: Number,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  phonenumber: {
    type: Number
  },
  passwordHash: {
    type: String,
    required: true
  },
  sellerId:{
    type: mongoose.Schema.Types.ObjectId
  }
});

const findByEmailStatic = require('./findByEmail');
const sellerSignupStatic = require('./signup-static');
const sellerSigninStatic = require('./signin-static');


sellerSchema.statics.signIn = sellerSigninStatic;
sellerSchema.statics.signUp  = sellerSignupStatic;
sellerSchema.statics.findByEmail = findByEmailStatic;

module.exports = mongoose.model('Seller', sellerSchema);
