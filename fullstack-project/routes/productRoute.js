'use strict';

const {
  Router
} = require('express');
const router = Router();

const Image = require('../models/image');
const Seller = require('./../models/seller');
const checkLogin = require('../controller/checkLogin');

//--------------------Get all products -----------------------

router.get('/product', checkLogin, (req, res, next) => {
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


router.get('/ordersuccessful', (req, res, next) => {
  res.render('orderSuccessful');
});


module.exports = router;