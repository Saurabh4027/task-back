const mongoose = require('mongoose');
require('dotenv').config();

const mongoConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = mongoConnection;