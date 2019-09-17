'use strict';

const { Router } = require('express');
const router = Router();

const Image = require('../models/image');
const upload = require('../config/cloudinary');


//---------------------Seller Page - Upload Images --------------------------
//---------------------Seller Page - Upload Images --------------------------
//---------------------Seller Page - Upload Images --------------------------
//---------------------Seller Page - Upload Images --------------------------


router.get('/sellerPage', (req, res, next) => {
    const id = req.session.user._id;
    console.log("seller id?", id);
      Image.find({sellerId: id})
        .limit(20)
        .sort({ createdAt: -1 })
        .exec()
      .then(images => {
        // console.log(images);
        res.render('sellerPage', { images });
      })
      .catch(error => next(error));
  });
  
  router.post('/sellerPage', upload.single('file'), (req, res, next) => {
    Image.create({
      sellerId: req.session.user._id,
      description: req.body.description,
      price: req.body.price,
      originalName: req.file.originalname,
      url: req.file.url
    })
      .then(file => {
        console.log(file);
        res.redirect('/sellerPage');
      })
      .catch(error => next(error));
  });

module.exports = router;
