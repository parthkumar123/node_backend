"use strict";
const dbController = require("../database/mssql/mssql");
const closeDB = require("../database/mssql/mssql");
const paypal = require('paypal-rest-sdk');

// Set up PayPal SDK configuration
paypal.configure({
    mode: process.env.PAYPAL_MODE, // 'sandbox' for local or 'live' for production
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET
});

module.exports = async (app) => {

    app.get("/data", async (request, response) => {
        try {
            // Connect to the database
            const dbConnection = await dbController.connectToDatabase();

            // Run the query
            await dbController.runQuery(dbConnection, "select * from test");

            // Close the database connection
            await dbController.closeDB(dbConnection);

            // Success handling
            response.status(200).send({
                STATUS: "SUCCESS"
            });
        } catch (err) {
            // Error handling
            response.status(400).send({
                STATUS: "ERROR",
                RESPONSE: {
                    TEXT: err.message,
                },
            });
        }
    });

    // payment API route
    app.get("/payment", async (request, response) => {
        try {
            // Create a checkout session
            paypal.payment.create({
                intent: 'sale',
                payer: {
                    payment_method: 'paypal'
                },
                redirect_urls: {
                    return_url: 'http://localhost:5000/success',
                    cancel_url: 'http://localhost:5000/cancel'
                },
                transactions: [{
                    amount: {
                        total: '10.00',
                        currency: 'USD'
                    },
                    description: 'Sample description'
                }]
            }, function (error, payment) {
                if (error) {
                    // Error handling
                    throw error;
                } else {
                    // Extract the approval URL and redirect the user to PayPal
                    const approvalUrl = payment.links.find(link => link.rel === 'approval_url').href;

                    // Success handling
                    response.redirect(approvalUrl);
                }
            });
        } catch (err) {
            // Error handling
            response.status(400).send({
                STATUS: "ERROR",
                RESPONSE: {
                    TEXT: err.message,
                },
            });
        }
    });

    // success payment route
    app.get("/success", async (request, response) => {
        try {
            // Fetch the payer ID from the request query
            const payerId = request.query.PayerID;
            // Fetch the payment ID from the request query
            const paymentId = request.query.paymentId;

            // Create the execute payment JSON object
            const execute_payment_json = {
                "payer_id": payerId
            };

            // const execute_payment_json = {
            //     "payer_id": payerId,
            //     "transactions": [{
            //         "amount": {
            //             "currency": "USD",
            //             "total": "25.00"
            //         }
            //     }]
            // };

            // Execute the payment
            paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
                if (error) {
                    // Error handling
                    throw error;
                } else {
                    // Success handling
                    response.status(200).send(payment);
                }
            });
        } catch (err) {
            // Error handling
            response.status(400).send({
                STATUS: "ERROR",
                RESPONSE: {
                    TEXT: err.message,
                },
            });
        }
    });

    // cancel payment route
    app.get("/cancel", async (request, response) => {
        try {
            // Success handling
            response.status(200).send("Failed");
        } catch (err) {
            // Error handling
            response.status(400).send({
                STATUS: "ERROR",
                RESPONSE: {
                    TEXT: err.message,
                },
            });
        }
    });

};
