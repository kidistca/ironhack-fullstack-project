'use strict';

const bcrypt = require('bcryptjs');


module.exports = function({name, email,city, 
    postalcode, 
    country, 
    phonenumber, passwordHash}) {
    const Model = this;
    return Model.findByEmail(email)
        .then(user => {
        if (user) {
            // throw new Error('User_already_exits');
            throw new Error('USER_ALREADY_EXISTS');
        } else {
            return bcrypt.hash(passwordHash, 10);
        }   
        })
        .then(hash => {
           return Model.create({
            name, 
            email, 
            city, 
            postalcode, 
            country, 
            phonenumber, 
            passwordHash: hash
            });
        })
        .then(user => {
            return Promise.resolve(user);
        })
        .catch(error => {
            console.log('There was an error in the sign up process.', error);
            return Promise.reject(error);
        });
};
