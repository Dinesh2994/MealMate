// backend/routes/orderRoutes.js

import express from 'express';
import Order from '../models/Order.js'; // Assuming you have an Order model
import User from '../models/User.js';   // Assuming you have a User model

const router = express.Router();

router.post('/place-order', async (req, res) => {
  const { userId, items, totalAmount } = req.body;

  if (!userId || !items || !totalAmount) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  try {
    // Assuming you have an Order model
    const newOrder = new Order({
      user: userId,
      items,
      totalAmount,
      datePlaced: new Date(),
    });

    const savedOrder = await newOrder.save();

    // Optionally, you can update the user's order history
    await User.findByIdAndUpdate(userId, {
      $push: { orderHistory: savedOrder._id },
    });

    return res.status(200).json(savedOrder); // Sending back the order details

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;
