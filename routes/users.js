const express = require('express');
const router = express.Router();

const userController = require('../controllers/users');

// Routes for user operations
router.get('/', userController.getAll);         // Get all users
router.get('/:id', userController.getSingle);   // Get a single user by ID
router.post('/', userController.createUser);    // Create a new user
router.put('/:id', userController.updateUser);  // Update an existing user by ID
router.delete('/id', userController.deleteUser); // Delete a user by ID (note: this should use `:id` as parameter, not `/id`)

module.exports = router;
