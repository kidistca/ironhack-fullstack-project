'use strict';

const { Router } = require('express');
const router = Router();

const User = require('./../models/user');
const bcrypt = require('bcryptjs');



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
      res.render('index');
    })
    .catch(error => {
      console.log(error);
    });
});


// router.post('/signup', (req, res, next) => {
//   const name = req.body.name;
//   const email = req.body.email;
//   const passwordHash = req.body.password;

//   return bcrypt.hash(passwordHash, 10)
//   .then(hash => {
//     console.log('User created');
//      return User.create({
//           name, 
//           email,
//           passwordHash: hash
//       });
//   })
//   .then(user => {
//       req.session.user = {
//         _id: user._id
//       };
//       res.render('authentication/usersignin');
//   })
//   .catch(error => {
//       console.log(error);
//   });
// });



module.exports = router;