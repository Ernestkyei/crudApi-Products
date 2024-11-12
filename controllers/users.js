const mongodb = require('../data/database');
const { ObjectId } = require('mongodb'); // Ensure proper destructuring

// Function to get all users
const getAll = async (req, res) => {      
    const result = await mongodb.getDatabase().db().collection('users').find();
    result.toArray().then((users) => { 
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    }).catch((err) => {
        console.error('Error fetching all users:', err);
        res.status(500).json({ message: 'Failed to retrieve users' });
    });
};

// Function to get a single user by ID
const getSingle = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id); // Correct usage of ObjectId
        const result = await mongodb.getDatabase().db().collection('users').findOne({ _id: userId });

        if (result) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error('Error fetching single user:', err);
        res.status(400).json({ message: 'Invalid user ID format' });
    }
};

module.exports = {
    getAll,
    getSingle
};
