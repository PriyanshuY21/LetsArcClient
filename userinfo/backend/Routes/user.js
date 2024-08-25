const express = require('express');
const User = require('../Models/User'); 
const router = express.Router();

// POST request to create new user
router.post('/', async (req, res) => {
  try {
    // Creates new User instance with data from request body
    const newUser = new User(req.body);
    // Save new user to database
    const savedUser = await newUser.save();
    // Send a 201 response with saved user data
    res.status(201).json(savedUser);
  } catch (err) {
    // Handle any errors and send a 400 response with error message
    res.status(400).json({ error: err.message });
  }
});

// GET request to fetch all users
router.get('/', async (req, res) => {
  try {
    // Retrieve all users from database
    const users = await User.find();
    // Send a 200 response with list of users
    res.status(200).json(users);
  } catch (err) {
    // Handle any errors and send a 400 response with error message
    res.status(400).json({ error: err.message });
  }
});

// PUT request to update a user by ID
router.put('/:id', async (req, res) => {
  try {
    // Finds user by ID and update with data from request body
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    // Sends 200 response with updated user data
    res.status(200).json(updatedUser);
  } catch (err) {
    // Handle any errors and send a 400 response with error message
    res.status(400).json({ error: err.message });
  }
});

module.exports = router; 
