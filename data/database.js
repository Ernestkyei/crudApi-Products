const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;

const initDb = (callback) => { 
    if (database) {
        console.log('Database is already initialized');
        return callback(null, database);
    }

    MongoClient.connect(process.env.MONGODB_URL)
        .then((client) => {
            database = client.db(); // Ensure we get the database object here
            console.log('Database connected successfully');
            callback(null, database);
        })
        .catch((err) => {
            console.error('Database connection failed:', err);
            callback(err);
        });
}

const getDatabase = () => {
    if (!database) {
        throw new Error('Database not initialized. Please initialize it before using.');
    }
    return database;
}

module.exports = {
    initDb,
    getDatabase
};
