'use strict';

const { Router } = require('express');
const router = Router();

const Buyer = require('../models/buyer');
const Seller = require('./../models/seller');
const Image = require('./../models/image');


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
  const passwordHash= req.body.password;
  Buyer.signIn(email, passwordHash)
    .then(user => {
      req.session.user = {
        _id: user.id
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

// let auxiSellerEmail;

router.post('/sellersignin', (req, res, next) => {
  // const sellerId = req.params.sellerId;
  const email = req.body.email;
  // auxiSellerEmail = email;
  const passwordHash = req.body.password;
  Seller.signIn(email, passwordHash)
    .then(seller => {
      req.session.user = {
        type: "Seller",
        _id: seller._id
      };
      res.redirect('/SellerPage');
    })
    .catch(error => {
      console.log(error);
    });
});


router.get("/", (req, res, next) => {
  req.session.destroy((err) => {
    // console.log("No session" + req.session.user._id);
    res.redirect("/");
  });
});



module.exports = router;