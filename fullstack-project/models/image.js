'use strict';

const mongoose = require('mongoose');
// const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new mongoose.Schema({
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  originalName: {
    type: String,
    trim: true
  },
  url: {
    type: String,
    trim: true
  },
  sellerEmail: {
    type: String
  },
  owner:{
      type: mongoose.Schema.Types.ObjectId
    },
  path: {
    type: String,
    trim: true
  }
}, {
  // THESE ARE SCHEMA OPTIONS
  // NOT DOCUMENT FIELDS
//   timestamps: true,
//   toObject: {
//     virtuals: true
//   },
//   toJSON: {
//     virtuals: true 
//   }
});

const cloudinary = require('cloudinary');

schema.virtual('resizedUrl').get(function() {
  const image = this;
  const path = image.url.split(`http://res.cloudinary.com/${ process.env.CLOUDINARY_API_NAME }/image/upload/`)[1];
   console.log(path);
  return cloudinary.url(path, { width: 400 });
});

module.exports = mongoose.model('Image', schema);