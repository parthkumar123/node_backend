const sql = require('mssql');

async function connectToDatabase() {
    try {
        await sql.connect({
            server: 'PARTH\\SQLEXPRESS',
            user: 'PARTH\\shiya',
            password: '',
            database: 'parthdb',
            options: {
                encrypt: true // Use this option if you're connecting to Azure
            }
        });

        console.log('Connected to the database');

        // Perform your database operations here

        // Close the connection when finished
        sql.close();
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

module.exports = connectToDatabase();
