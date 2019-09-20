'use strict';

const {
  Router
} = require('express');
const router = Router();

const Image = require('../models/image');
const Seller = require('./../models/seller');
const checkLogin = require('../controller/checkLogin');

//---------------------Get product by category ----------------------------
//---------------------Get product by category ----------------------------
//---------------------Get product by category ----------------------------

router.get('/product', (req, res, next) => {
  Image.find({})
    // .limit(20)
    // .sort({ createdAt: -1 })
    // .exec()
    .then(products => {
      res.render('product', {
        products
      });
    })

    .catch(error => next(error));
});

//----------------- 

//-------------------Get a selected product and the seller information ----------------
//-------------------Get a selected product and the seller information ----------------
//-------------------Get a selected product and the seller information ----------------


router.get('/product/:id', checkLogin, (req, res, next) => {
  const productId = req.params.id;
  Image.findById(productId)
    .then(oneProduct => {
      const sellerId = oneProduct.sellerId;
      Seller.findById(sellerId)
        .then(oneSeller => {
          console.log("the seller's name", oneSeller.name);
          res.render('order', {
            oneProduct,
            oneSeller
          });

        });
    })
    .catch(error => next(error));
});

//---------------------Filter product by category --------------------------------
//---------------------Filter product by category --------------------------------
//---------------------Filter product by category --------------------------------

router.get("/products/CustomCategory", (req, res, next) => {
  Image.find({productcategory: "Custom"})
    .then(products => {
      res.render('product', {
        products
      });
    })
    .catch(error => next(error));
});

router.get("/products/FoodCategory", (req, res, next) => {
  Image.find({productcategory: "Food & Drink"})
    .then(products => {
      res.render('product', {
        products
      });
    })
    .catch(error => next(error));
});

router.get("/products/PaintingCategory", (req, res, next) => {
  Image.find({productcategory: "Painting"})
    .then(products => {
      res.render('product', {
        products
      });
    })
    .catch(error => next(error));
});

router.get("/products/PotteryCategory", (req, res, next) => {
  Image.find({productcategory: "Pottery"})
    .then(products => {
      res.render('product', {
        products
      });
    })
    .catch(error => next(error));
});


router.get('/ordersuccessful', (req, res) => {
  res.render('orderSuccessful');
});


module.exports = router;