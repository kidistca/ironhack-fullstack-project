'use strict';

const { Router } = require('express');
const router = Router();

const User = require('./../models/user');
const Seller = require('./../models/seller');
const bcrypt = require('bcrypt');

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
  User.signUp(name, email, passwordHash)
    .then(user => {
      req.session.user = {
        _id: user._id
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
  const passwordHash = req.body.password;
  User.signIn(email, passwordHash)
    .then(() => {
      res.render('product');
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
    .then(user => {
      req.session.user = {
        _id: user._id
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
    .then(() => {
      res.render('SellerPage');
    })
    .catch(error => {
      console.log(error);
    });
});


module.exports = router;