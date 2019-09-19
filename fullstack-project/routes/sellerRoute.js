'use strict';

const { Router } = require('express');
const router = Router();

const Image = require('../models/image');
const Seller = require('../models/seller');
const upload = require('../config/cloudinary');
const checkLogin = require('../controller/checkLogin');


//---------------------Seller Page - Upload Images/products --------------------------
//---------------------Seller Page - Upload Images/products --------------------------
//---------------------Seller Page - Upload Images/products --------------------------
//---------------------Seller Page - Upload Images/products --------------------------


router.get('/sellerPage', checkLogin, (req, res, next) => {
    const id = req.session.user._id;
    console.log("seller id?", id);
      Image.find({sellerId: id})
        .limit(20)
        .sort({ createdAt: -1 })
        .exec()
      .then(images => {
        res.render('sellerPage', { images });
      })
      .catch(error => next(error));
  });

  router.post('/sellerPage', checkLogin, upload.single('file'), (req, res, next) => {
    Image.create({
      sellerId: req.session.user._id,
      sellerName: req.session.user.name,
      productcategory: req.body.productcategory,
      description: req.body.description,
      delivery: req.body.delivery,
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


  
//---------------------Seller Page - Edit product detail --------------------------
//---------------------Seller Page - Edit product detail --------------------------

  router.get('/sellerPage/edit/:_id', (req, res) => {
    const sellerId = req.params._id;
    Image.findById(sellerId)
    .then(product => {
        const data ={
            product
        };
      console.log(data);
    res.render('editSellerProduct', data);
    
  });
  });

  router.post('/sellerPage/edit/:_id', (req, res) => {
    const productId = req.params._id;
    const productcategory = req.body.productcategory;
    const description = req.body.description;
    const price = req.body.price;
    const delivery = req.body.delivery;

    Image.findByIdAndUpdate(productId,{ 
      productcategory,
      description,
      price,
      delivery
     })
    .then(data => {
      res.redirect('/sellerPage');
    });
  });



  //---------------------Seller Page - Delete product --------------------------
  //---------------------Seller Page - Delete product --------------------------

  router.get('/sellerPage/delete/:_id', (req, res) => {
    const sellerId = req.params._id;
    Image.findByIdAndDelete(sellerId)
    .then(() => {
    res.redirect('/sellerPage');
  });
});

module.exports = router;
