'use strict';

const { Router } = require('express');
const router = Router();

const Buyer = require('../models/buyer');
const Seller = require('./../models/seller');
const checkLogin = require('../controller/checkLogin');

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
  Buyer.buyerSignUp({name, email, passwordHash})
    .then(buyer => {
      req.session.user = {
        _id: buyer._id,
        email: buyer.email,
        name: buyer.name
      };
      res.render('authentication/usersignin');
    })
    .catch(error => {
      // console.log(error);
      res.render('authentication/usersignup', {error });
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
      res.render('authentication/usersignin', {error: error });
      // console.log(error);
      // next(error);
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
  const city = req.body.city;
  const postalcode = req.body.postalcode;
  const country = req.body.country;
  const phonenumber = req.body.phonenumber;
  const passwordHash = req.body.password;
  
  Seller.signUp({name, email, city, postalcode, country, phonenumber, passwordHash})
    .then(seller => {
      req.session.user = {
        type: "Seller",
        _id: seller._id,
        name: seller.name
      };
      res.render('authentication/sellersignin');
    })
    .catch(error => {
      // console.log(error);
      res.render('authentication/sellersignup', { error });
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
        _id: seller._id,
        name: seller.name
      };
      res.redirect('/sellerPage');
    })
    .catch(error => {
      res.render('authentication/sellersignin', { error });
      // console.log(error);
    });
});

//---------Logout - destroy session ----no access to session -----


router.post('/', (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect('/');
  });
});



module.exports = router;