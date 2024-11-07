const mongoose = require('mongoose');
 require('dotenv').config();

// Define the MongoDB connection URL
// const mongooseConnection = 'mongodb://localhost:27017/hotels';
const mongoURL = process.env.MONGODB_URL;

// Local Db Connection url
// const mongoURLLOCAL = process.env.MONGODB_URL_LOCAL;

// Set up MongoDB connection for Server Connection
mongoose.connect(mongoURL);
// Set up MongoDB connection for Local Connection

// mongoose.connect(mongoURLLOCAL);


// Get the default connection object
const db = mongoose.connection;

// Define event listeners for DB connection
db.on('connected', () => {
    console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
    console.log('MongoDB connection error:', err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// Export the database connection
module.exports = db;
