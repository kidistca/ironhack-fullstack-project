'use strict';

const bcrypt = require('bcryptjs');


module.exports = function(email, password) {
  const Model = this;

  let auxiliaryUser;

  return Model.findByEmail(email)
    .then(user => {
      if (!user) {
        console.error('USER_NOT_FOUND');
        throw new Error('WRONG_EMAIL_OR_PASSWORD');
      } else {
        auxiliaryUser = user;
        return bcrypt.compare(password, user.passwordHash);
      }
    })
    .then(matches => {
      if (!matches) {
        console.error('PASSWORD_DOESNT_MATCH');
        throw new Error('WRONG_EMAIL_OR_PASSWORD');
      } else {
        return Promise.resolve(auxiliaryUser);
      }
    })
    .catch(error => {
      console.log('There was an error signing up the user', error);
      return Promise.reject(error);
    });
};