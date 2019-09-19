'use strict';

const mongoose = require('mongoose');
// const ObjectId = mongoose.Schema.Types.ObjectId;

const imageSchema = new mongoose.Schema({
  productcategory: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  delivery: {
    type: String,
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
  sellerId:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Seller"
    },
  sellerName: {
    type: String
  },
  path: {
    type: String,
    trim: true
  }
}, {
});



const cloudinary = require('cloudinary');

imageSchema.virtual('resizedUrl').get(function() {
  const image = this;
  const path = image.url.split(`http://res.cloudinary.com/${ process.env.CLOUDINARY_API_NAME }/image/upload/`)[1];
   console.log(path);
  return cloudinary.url(path, { width: 400 });
});

module.exports = mongoose.model('Image', imageSchema);