const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./mongo/config');
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');

dotenv.config();
const port = process.env.PORT;

const app = express();
connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use('/products', productRoutes);
app.use('/auth', authRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});