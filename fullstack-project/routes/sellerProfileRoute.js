'use strict';

const { Router } = require('express');
const router = Router();

const Seller = require('../models/seller');
const Image = require('../models/image');
const checkLogin = require('../controller/checkLogin');

//-------------------Get seller profile -----------------------------------

router.get('/seller-profile', checkLogin, (req, res, next) => {
    const sellerId = req.session.user._id;
    // const sellerId = req.params.id;
    Seller.findById(sellerId)
    .then(seller =>{
        res.render('sellerProfile', {seller: seller});
    })
    .catch(error => next(error));
});


//----------------Edit seller profile ------------------------------------
//----------------Edit seller profile ------------------------------------

router.post('/seller-profile', (req, res, next) => {
    const sellerId = req.session.user._id;
    const name = req.body.name;
    const email = req.body.email;
    Seller.findByIdAndUpdate(sellerId,{ name, email})
    .then(() =>{
      res.redirect('/seller-profile');
  });
});

//--------------- Delete seller profile--------------------------------
//--------------- Delete seller profile--------------------------------

router.get('/seller-profile/delete', (req, res, next) => {
    const sellerId = req.session.user._id;
    Seller.findByIdAndDelete(sellerId)
    .then(() => {
        Image.findById(sellerId)
    .then(() => {
        req.session.destroy();
          res.redirect('/');
        });
  });
});


// router.get('/product/:id', checkLogin, (req, res, next) => {
//     const productId = req.params.id;
//     Image.findById(productId)
//       .then(oneProduct => {
//         const sellerId = oneProduct.sellerId;
//         Seller.findById(sellerId)
//           .then(oneSeller => {
//             console.log("the seller's name", oneSeller.name);
//             res.render('order', {
//               oneProduct,
//               oneSeller
//             });
  
//           });
//       })
//       .catch(error => next(error));
//   });



module.exports = router;