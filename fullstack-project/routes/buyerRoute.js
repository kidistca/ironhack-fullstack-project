'use strict';

const { Router } = require('express');
const router = Router();

const Buyer = require('../models/buyer');

//-------------------Get buyer profile

router.get('/buyer-profile', (req, res, next) => {
    const buyerId = req.session.user._id;
    // const buyerId = req.params.id;
    Buyer.findById(buyerId)
    .then(buyer =>{
        res.render('buyer', {buyer});
    })
    .catch(error => next(error));
});


//----------------Edit buyer profile ------------------------------------
//----------------Edit buyer profile ------------------------------------

router.post('/buyer-profile', (req, res, next) => {
    const BuyerId = req.session.user._id;
    const name = req.body.name;
    const email = req.body.email;
    Buyer.findByIdAndUpdate(BuyerId,{ name, email})
    .then(() =>{
      res.redirect('/buyer-profile');
  });
});

//--------------- Delete buyer profile--------------------------------
//--------------- Delete buyer profile--------------------------------

router.post('/buyer-profile', (req, res, next) => {
    const buyerId = req.session.user._id;
    Buyer.findByIdAndDelete(buyerId)
    .then(() => {
        req.session.destroy();
          res.redirect('/');
  });
});


module.exports = router;