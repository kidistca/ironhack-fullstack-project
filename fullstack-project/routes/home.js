'use strict';

const { Router } = require('express');
const router = Router();

router.get('/', (req, res, next) => {
  res.render('home');
});



module.exports = router;
