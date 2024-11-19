const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');  // Ensure proper destructuring

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

// Function to fetch a single user
const getSingle = async (req, res) => {
    try {
        const userId = req.params.id; // Assuming ID is passed as a URL parameter

        // Validate if the ID is a valid ObjectId
        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        // Access the database properly
        const db = mongodb.getDatabase().db();
        const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json(user);
    } catch (err) {
        console.error('Error fetching single user:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
// Function to create a new user
const createUser = async (req, res) => {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    const response = await mongodb.getDatabase().db().collection('users').insertOne(user);
    if (response.acknowledged) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the user');
    }
};

// Function to update a user by ID
const updateUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const user = {
        username: req.body.username,
        email: req.body.email,
        name: req.body.name,
        ipaddress: req.body.ipaddress
    };

    const response = await mongodb.getDatabase().db().collection('users').replaceOne({ _id: userId }, user);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the user');
    }
};

// Function to delete a user by ID
const deleteUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);

    const response = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the user');
    }
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser,
};
