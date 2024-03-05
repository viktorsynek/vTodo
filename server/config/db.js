const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
    const conn = await mongoose.connect(
      process.env.MONGO_URI,
    );

    console.log(`Database is connected: ${conn.connection.host}`.cyan);
}

module.exports = connectDB;