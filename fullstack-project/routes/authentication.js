'use strict';

const { Router } = require('express');
const router = Router();

const Buyer = require('../models/buyer');
const Seller = require('./../models/seller');
const checkBuyerLogin = require('../controller/checkBuyerLogin');

//-------------- User authentication -----------------------
//-------------- User authentication -----------------------
//-------------- User authentication -----------------------
//-------------- User authentication -----------------------

router.get('/signup', (req, res, next) => {
  res.render('authentication/usersignup');
});

router.post('/signup', (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const passwordHash = req.body.password;
  Buyer.signUp(name, email, passwordHash)
    .then(buyer => {
      req.session.user = {
        _id: buyer._id,
        email: buyer.email,
        name: buyer.name
      };
      res.render('authentication/usersignin');
    })
    .catch(error => {
      console.log(error);
    });
});

router.get('/signin', (req, res, next) => {
  res.render('authentication/usersignin');
});

router.post('/signin', (req, res, next) => {
  const email = req.body.email;
  const passwordHash= req.body.password;
  Buyer.signIn(email, passwordHash)
    .then(buyer => {
      req.session.user = {
        _id: buyer._id,
        email: buyer.email,
        name: buyer.name
      };
      res.redirect('/product');
    })
    .catch(error => {
      console.log(error);
    });
});

//--------------Seller authentication -----------------------
//--------------Seller authentication -----------------------
//--------------Seller authentication -----------------------
//--------------Seller authentication -----------------------

router.get('/sellersignup', (req, res, next) => {
  res.render('authentication/sellersignup');
});

router.post('/sellersignup', (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const passwordHash = req.body.password;
  Seller.signUp(name, email, passwordHash)
    .then(seller => {
      req.session.user = {
        type: "Seller",
        _id: seller._id
      };
      res.render('authentication/sellersignin');
    })
    .catch(error => {
      console.log(error);
    });
});



router.get('/sellersignin', (req, res, next) => {
  res.render('authentication/sellersignin');
});


router.post('/sellersignin', (req, res, next) => {
  const email = req.body.email;
  const passwordHash = req.body.password;
  Seller.signIn(email, passwordHash)
    .then(seller => {
      req.session.user = {
        type: "Seller",
        _id: seller._id
      };
      res.redirect('/sellerPage');
    })
    .catch(error => {
      console.log(error);
    });
});

//------Logout - destroy session ----no access to session -----


router.post('/', (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect('/');
  });
});



module.exports = router;