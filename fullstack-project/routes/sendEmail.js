'use strict';

const {
    Router
} = require('express');
const router = Router();

const nodemailer = require('nodemailer');

router.post('/ordersuccessful', (req, res, next) => {
            const buyerEmail = req.session.user.email;
            const buyerName = req.session.user.name;
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'localsartisan@gmail.com',
                    pass: 'artisan_21'
                }
            });

            const to = buyerEmail;
            const subject = 'Order';
            const message = `Hi ${buyerName}, we have recieved your order.`;
            // ${buyerName},
            transporter.sendMail({
                    from: '"From artisan!" <localsartisan@gmail.com>',
                    to,
                    subject,
                    html: `<strong>${ message }</strong>`,
                    text: message
                    
                })
                .then(result => {
                    console.log(result);
                    res.redirect('/orderSuccessful');
                })
                .catch(error => console.log(error));

            });


            module.exports = router;