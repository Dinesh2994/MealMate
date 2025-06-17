import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import FoodItem from '../models/FoodItem.js'; 
import Login from '../../frontend/src/components/login.jsx';

const router = express.Router();

// Signup route
router.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    // Ensure all required fields are provided
    if (!name || !email || !password) {
      return res.status(400).send({ message: 'Please provide all required fields: name, email, password' });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = { name, email, password: hashedPassword, address: address || '' };

    const user = await User.create(newUser);

    // Remove password from the response
    const { password: _, ...userData } = user.toObject();

    return res.status(201).send(userData);
  } catch (error) {
    console.log('Signup error:', error);
    res.status(500).send({ message: error.message });
  }
});

// Login route
router.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }
    dotenv.config();

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET, // Access the secret from the environment variable
      { expiresIn: '1h' }
    );
    res.status(200).send({
      token,
      username: user.name,
      email: user.email,
      address: user.address,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Server error' });
  }
});


// Endpoint to fetch food items by category
router.get('/food-options', async (req, res) => {
  const { category } = req.query; // Get category from the query parameter

  try {
    let foodItems;

    if (category) {
      // Fetch food items filtered by category
      foodItems = await FoodItem.find({ category });
    } else {
      // Fetch all food items if no category is provided
      foodItems = await FoodItem.find();
    }

    // Return food items in JSON format
    res.json(foodItems);
  } catch (err) {
    console.error('Error fetching food items:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Export the router to use in the main app file
export default router;
