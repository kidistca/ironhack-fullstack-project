'use strict';

const { Router } = require('express');
const router = Router();

const Seller = require('../models/seller');
const Image = require('../models/image');
const checkLogin = require('../controller/checkLogin');

//-------------------Get seller profile -----------------------------------

router.get('/seller-profile', (req, res, next) => {
    const sellerId = req.session.user._id;
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
  const p1 = Image.deleteMany({ sellerId });
  const p2 = Seller.findByIdAndDelete(sellerId);
  Promise.all([p1, p2])
    .then((r1, r2) => {
      req.session.destroy();
      res.redirect('/');
    });
});




module.exports = router;