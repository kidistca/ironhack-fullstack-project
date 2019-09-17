'use strict';

const { Router } = require('express');
const router = Router();

const Image = require('../models/image');


router.get('/product', (req, res, next) => { 
    console.log('Trying to get products'); 
      Image.find({})
        // .limit(20)
        // .sort({ createdAt: -1 })
        // .exec()
      .then(products => {
        console.log("This are products", products);
        res.render('product', { products });
      })
  
      .catch(error => next(error));
  });
  

  module.exports = router;