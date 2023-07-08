"use strict";
const connectDB = require("../database/mssql/mssql");

module.exports = async (app) => {

    app.get("/data", async (request, response) => {
        try {
            // Connect to the database
            await connectDB();

            // Success handling
            response.status(200).send({
                STATUS: "OK",
                RESPONSE: {
                    TEXT: "SUCCESS",
                },
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
};
