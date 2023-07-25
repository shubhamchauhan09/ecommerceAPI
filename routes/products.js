// routes/products.js
const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const authenticateToken = require('../middlewares/auth')

router.post('/create', authenticateToken, productsController.createProduct);
router.get('/', authenticateToken, productsController.listProducts);
router.delete('/:id', authenticateToken, productsController.deleteProduct);
router.post('/:id/update_quantity', authenticateToken, productsController.updateProductQuantity);

module.exports = router;