const express = require('express');

const dotenv = require('dotenv');

dotenv.config();

const connectDB = require('./mongo/config');

const app = express();
const port = process.env.PORT;
let db = connectDB();

app.use(express.urlencoded({ extended: false }));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});