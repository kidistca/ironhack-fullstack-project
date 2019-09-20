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
                    const message = `<p>Hi ${buyerName}, ${image.sellerId.name} has received your order.
                                    </br>
                                    </br>
                                    </br>
                                    </br> 
                                    <p>Below is seller information.</p>
                                    </br>
                                    </br>
                                    <p>Seller name: ${image.sellerId.name} </p>
                                    <p>Pickup location: ${image.sellerId.postalcode}, ${image.sellerId.city}, ${image.sellerId.country}</p>
                                    <p>Email address: ${image.sellerId.email}</p>
                                    <p>Phone number: ${image.sellerId.phonenumber}</p>
                                    <p>Thank you!</p>
                                    `;
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