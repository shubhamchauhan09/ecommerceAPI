const mongoose = require('mongoose');

const connectDB = async function() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (e) {
        console.error(e.message);
        process.exit(1);
    }
};

module.exports = connectDB;