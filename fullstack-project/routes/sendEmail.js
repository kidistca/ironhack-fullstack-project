'use strict';
const Image = require('../models/image');

const {
    Router
} = require('express');
const router = Router();

const nodemailer = require('nodemailer');

router.post('/orderSuccessful/:id', (req, res, next) => {
    const imageId = req.params.id;
    const buyerEmail = req.session.user.email;
    const buyerName = req.session.user.name;
            Image.findById(imageId)
                .populate("sellerId")
                .then(image => {
                    console.log("IMAGE POPULATED", image)
                    const transporter = nodemailer.createTransport({
                        service: 'Gmail',
                        auth: {
                            user: 'localsartisan@gmail.com',
                            pass: 'artisan_21'
                        }
                    }); 
        
                    const to = buyerEmail;
                    const subject = 'Order';
                    const message = `Hi ${buyerName}, ${image.sellerId.name} have received your order.
                                    Below is pickup and contact information. 
                                    ${image.sellerId.postalcode} 
                                    ${image.sellerId.city} 
                                    ${image.sellerId.country} 
                                    ${image.sellerId.email} 
                                    ${image.sellerId.phone}`;
                    transporter.sendMail({
                            from: '"From Artisan!" <localsartisan@gmail.com>',
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
                })

            module.exports = router;