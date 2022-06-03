const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")('sk_test_51Kvx4tD3nFL35a2rsjTCnUhUHLuKW82tEHWwU9uvEY3QDBx8sC5yJTiR033t0FsGzyrahfWdC9TbCBIAplX9WzYL00pIsQl71F')

// Api 
// - App config
const app = express();
// -  Middleware
app.use(conRequest({ origin: true }));
app.use(express.json());

// - api routes
app.get("/", (request, response) =>
    response.status(200).send('hello world '));
    app.post('./payment/create' ,async (request ,response) =>{
        const total = request.query.total;
        console.log('payment request receivedl', total);
        const paymentIntent  = await stripe.paymentIntent.create({
            amount:total,
            currency :"usd", 
        });
        // ok -creating something
        response.status(201).send({
            clientSecret:paymentIntent.client_secret,
        })
    })
// - listen  command 
exports.api = functions.https.onRequest(app)
