const mongoose = require('mongoose');

// Define the MongoDB connection URL
const mongooseConnection = 'mongodb://localhost:27017/hotels';

// Set up MongoDB connection
mongoose.connect(mongooseConnection);

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
