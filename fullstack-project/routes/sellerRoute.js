'use strict';

const { Router } = require('express');
const router = Router();

const Image = require('../models/image');
const upload = require('../config/cloudinary');


//---------------------Seller Page - Upload Images/products --------------------------
//---------------------Seller Page - Upload Images/products --------------------------
//---------------------Seller Page - Upload Images/products --------------------------
//---------------------Seller Page - Upload Images/products --------------------------


router.get('/sellerPage', (req, res, next) => {
    const id = req.session.user._id;
    console.log("seller id?", id);
      Image.find({sellerId: id})
        .limit(20)
        .sort({ createdAt: -1 })
        .exec()
      .then(images => {
        // console.log(images);
        res.render('sellerPage', { images });
      })
      .catch(error => next(error));
  });


  //---------------------Seller Page - Delete Images/products --------------------------



  router.get('/sellerPage/delete/:_id', (req, res, next) => {
    const sellerId = req.params._id;

    // const body = req.body;
    // find and delete - then redirect
    Image.findByIdAndDelete(sellerId)
    .then(() => {
    res.redirect('/sellerPage');
    
  });
});


  



//---------------------Seller Page - Update Images/products --------------------------
  router.get('/sellerPage/edit/:_id', (req, res, next) => {
    const sellerId = req.params._id;
  
    
    Image.findByIdAndUpdate(sellerId)
    .then(product => {
        const data ={ 
            product
        }
      console.log(data)
    res.render('edit-product', data);
    
  });
  });

//   router.post('/sellerPage/edit/:_id', (req, res, next) => {
//     const sellerId = req.params._id;
//     const description = req.body.description,
//     const title = req.body.title
//     const price = req.body.price
//     Image.findByIdAndUpdate(sellerId, title, description, price)
//     .then(() => {


//     res.redirect('/sellerPage');
    
//   });
// });







//  --------------- UPLOAD FILE ROUTE ---------------
  router.post('/sellerPage', upload.single('file'), (req, res, next) => {
    Image.create({
      sellerId: req.session.user._id,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      originalName: req.file.originalname,
      url: req.file.url
    })
      .then(file => {
        console.log(file);
        res.redirect('/sellerPage');
      })
      .catch(error => next(error));
    });
    


module.exports = router;
