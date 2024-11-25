const express = require('express');
const router = express.Router();

const productController = require('../controllers/products');

// Routes for user operations
router.get('/', productController.getAll);         // Get all users
router.get('/:id', productController.getSingle);   // Get a single user by ID
router.post('/', productController.createProduct);    // Create a new user
router.put('/:id', productController.updateProduct);  // Update an existing user by ID
router.delete('/id', productController.deleteProduct); // Delete a user by ID (note: this should use `:id` as parameter, not `/id`)

module.exports = router;
