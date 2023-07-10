"use strict";
const dbController = require("../database/mssql/mssql");

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
                STATUS: "OK",
                RESPONSE: {
                    TEXT: "SUCCESS",
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

};
