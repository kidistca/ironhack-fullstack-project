'use strict';

const { Router } = require('express');
const router = Router();

const Image = require('../models/image');
const upload = require('../config/cloudinary');
const checkBuyerLogin = require('../controller/checkBuyerLogin');


//---------------------Seller Page - Upload Images/products --------------------------
//---------------------Seller Page - Upload Images/products --------------------------
//---------------------Seller Page - Upload Images/products --------------------------
//---------------------Seller Page - Upload Images/products --------------------------


router.get('/sellerPage', checkBuyerLogin, (req, res, next) => {
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

  router.post('/sellerPage', checkBuyerLogin, upload.single('file'), (req, res, next) => {
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

  //---------------------Seller Page - Delete product --------------------------
  //---------------------Seller Page - Delete product --------------------------

  router.get('/sellerPage/delete/:_id', (req, res) => {
    const sellerId = req.params._id;
    Image.findByIdAndDelete(sellerId)
    .then(() => {
    res.redirect('/sellerPage');
    
  });
});


  
//---------------------Seller Page - product detail --------------------------
//---------------------Seller Page - product detail --------------------------

  router.get('/sellerPage/edit/:_id', (req, res) => {
    const sellerId = req.params._id;
    Image.findById(sellerId)
    .then(product => {
        const data ={
            product
        };
      console.log(data);
    res.render('edit-product', data);
    
  });
  });

  router.post('/sellerPage/edit/:_id', (req, res) => {
    const productId = req.params._id;
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;

    Image.findByIdAndUpdate(productId,{ 
      title: title, 
      price: price,
      description: description
     } )
    .then(data => {
      res.redirect('/sellerPage');
    });
  });

  

module.exports = router;
