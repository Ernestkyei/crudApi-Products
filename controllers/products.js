const mongodb = require('../data/database');
const { ObjectId } = require('mongodb'); // To validate ObjectId format

const productsController = {
    // Get all products
    getAll: async (req, res) => {
        try {
            const result = await mongodb.getDatabase().db().collection('products').find();
            const products = await result.toArray();
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(products);
        } catch (err) {
            console.error('Error fetching all products:', err);
            res.status(500).json({ message: 'Failed to retrieve products' });
        }
    },

    // Get a single product by ID
    getSingle: async (req, res) => {
        try {
            const productId = req.params.id;
            if (!ObjectId.isValid(productId)) {
                return res.status(400).json({ error: 'Invalid ID format' });
            }
            const db = mongodb.getDatabase().db();
            const product = await db.collection('products').findOne({ _id: new ObjectId(productId) });
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            return res.status(200).json(product);
        } catch (err) {
            console.error('Error fetching single product:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Create a new product
    createProduct: async (req, res) => {
        try {
            const product = {
                name: req.body.name,
                price: req.body.price,
                category: req.body.category,
                description: req.body.description,
                stockQuantity: req.body.stockQuantity,
            };
            const response = await mongodb.getDatabase().db().collection('products').insertOne(product);
            if (response.acknowledged) {
                res.status(201).json({ message: 'Product created successfully', id: response.insertedId });
            } else {
                res.status(500).json({ message: 'Error creating product' });
            }
        } catch (err) {
            console.error('Error creating product:', err);
            res.status(500).json({ message: 'Failed to create product' });
        }
    },

    // Update a product by ID
    updateProduct: async (req, res) => {
        try {
            const productId = new ObjectId(req.params.id);
            const updatedProduct = {
                name: req.body.name,
                price: req.body.price,
                category: req.body.category,
                description: req.body.description,
                stockQuantity: req.body.stockQuantity,
            };

            const response = await mongodb.getDatabase().db().collection('products').replaceOne({ _id: productId }, updatedProduct);

            if (response.matchedCount > 0) {
                res.status(204).send(); // No content, update was successful
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (err) {
            console.error('Error updating product:', err);
            res.status(500).json({ message: 'Failed to update product' });
        }
    },

    // Delete a product by ID
    deleteProduct: async (req, res) => {
        try {
            const productId = new ObjectId(req.params.id);

            const response = await mongodb.getDatabase().db().collection('products').deleteOne({ _id: productId });

            if (response.deletedCount > 0) {
                res.status(204).send(); // No content, deletion was successful
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (err) {
            console.error('Error deleting product:', err);
            res.status(500).json({ message: 'Failed to delete product' });
        }
    },
};

module.exports = productsController;