// controllers/productsController.js
const Product = require('../models/products');

// create product api , getting name and quantity from request
exports.createProduct = async(req, res, next) => {
    try {
        const { name, quantity } = req.body;
        const product = await Product.create({ name, quantity });
        res.status(201).json({ product });
    } catch (err) {
        next(err);
    }
};

// get all the list of products from db
exports.listProducts = async(req, res, next) => {
    try {
        const products = await Product.find();
        res.json({ products });
    } catch (err) {
        next(err);
    }
};

// delete a product by getting id as params in request
exports.deleteProduct = async(req, res, next) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.json({ message: 'Product deleted' });
    } catch (err) {
        next(err);
    }
};

// update a product by getting id and number to be updated to from params and query in request
exports.updateProductQuantity = async(req, res, next) => {
    try {
        const { id } = req.params;
        const { number } = req.query;
        const product = await Product.findByIdAndUpdate(
            id, { $set: { quantity: parseInt(number) } }, { new: true }
        );
        res.json({ product, message: 'Updated successfully' });
    } catch (err) {
        next(err);
    }
};