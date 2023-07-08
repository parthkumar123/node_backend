// Import the mssql module
const sql = require('mssql');

// Function to connect to the database
async function connectToDatabase() {
    try {
        // Create a new connection pool
        const pool = new sql.ConnectionPool({
            server: 'PARTH\\SQLEXPRESS',
            user: 'PARTH\\shiya',
            password: '',
            database: 'parthdb',
            options: {
                trustServerCertificate: true, // Change to true for local dev / self-signed certs
                encrypt: false // Use this option if you're connecting to Azure
            }
        })

        // Try to connect
        await pool.connect().then((pool) => {
            console.log("pool", pool);
        }).catch((err) => {
            console.log("err", err)
        })

        console.log('Connected to the database');

        // Close the connection when finished
        await pool.close();
    } catch (error) {
        // ... error checks
        console.error('Error connecting to the database:', error);
    }
}

// Export the function that runs the query
module.exports = connectToDatabase;
