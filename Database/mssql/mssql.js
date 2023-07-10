// Import the mssql module
const mssql = require('mssql');

const sql = {

    // Function to connect to the database
    connectToDatabase: async function () {
        try {
            // Configure connection string
            const dbString = {
                server: "Parth\\SQLEXPRESS",
                user: 'parth',
                password: 'parthrs',
                database: 'parthdb',
                pool: {
                    max: 10,
                    min: 0,
                    idleTimeoutMillis: 50000
                },
                options: {
                    encrypt: false, // for azure
                    trustServerCertificate: false, // change to true for local dev / self-signed certs
                    // Set this parameter when response will get to longer time than 15000ms
                    requestTimeout: 0, // 0 to disable
                }
            };
            // Connect to the database
            await mssql.connect(dbString);
            console.log('Connected to the database');

            // Return the mssql object
            return mssql;
        } catch (error) {
            console.error('Error connecting to the database:', error);
            // Return the error object
            return error;
        }
    },

    // Function to connect to the database
    closeDB: async function (mssql) {
        try {
            // Connect to the database
            await mssql.connect(dbString);
        } catch (error) {
            // Return the error object
            return error;
        }
    },

    // Function to run the query
    runQuery: async function (mssql, query) {
        try {
            // Run the query
            const result = await mssql.query(query);

            // Return the query results
            return result;
        } catch (error) {
            // Return the error object
            return error;
        }
    }

}


// Export the function that runs the query
module.exports = sql;
