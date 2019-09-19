'use strict';

const {
  Router
} = require('express');
const router = Router();

const Image = require('../models/image');
const Seller = require('./../models/seller');
const checkBuyerLogin = require('../controller/checkBuyerLogin');

//--------------------Get all products -----------------------

router.get('/product', checkBuyerLogin, (req, res, next) => {
  console.log('Trying to get products');
  Image.find({})
    // .limit(20)
    // .sort({ createdAt: -1 })
    // .exec()
    .then(products => {
      // console.log("This are products", products);
      res.render('product', {
        products
      });
    })

    .catch(error => next(error));
});


// router.get('/product/:id', (req, res, next) => {
//   const id = req.params.id;
//   // const sellerId = Seller._id;
//   Promise.all([Image.findById(id), Seller.findById("sellerId")])
//      .then(result => {
//        const data = {
//          ImageResult: result[0],
//          sellerResult: result[1]
//        };
//      res.render('order', data);
//   })
//   .catch(error => next(error));
// });

//-------------------Get a selected product and the seller information ----------------
//-------------------Get a selected product and the seller information ----------------
//-------------------Get a selected product and the seller information ----------------

router.get('/product/:id', (req, res, next) => {
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