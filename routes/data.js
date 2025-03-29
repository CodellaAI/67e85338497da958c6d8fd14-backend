
const express = require('express');
const router = express.Router();
const Data = require('../models/Data');

// GET all data
router.get('/', async (req, res) => {
  try {
    // Check if we have a MongoDB connection
    if (mongoose.connection.readyState === 1) {
      const items = await Data.find().sort({ createdAt: -1 });
      return res.json({ items });
    } else {
      // If no MongoDB connection, return dummy data
      return res.json({
        items: getDummyData()
      });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return res.status(500).json({ message: 'Error fetching data', error: error.message });
  }
});

// POST new data
router.post('/', async (req, res) => {
  try {
    const newData = new Data(req.body);
    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(400).json({ message: 'Error creating data', error: error.message });
  }
});

// Helper function to generate dummy data when no DB is available
function getDummyData() {
  return [
    {
      _id: '5f9d88b3e3a8d20017b5f111',
      title: 'Welcome to Simple Web Connector',
      description: 'This is a sample item showing data retrieved from the backend.',
      category: 'Information',
      status: 'Active',
      createdAt: new Date().toISOString()
    },
    {
      _id: '5f9d88b3e3a8d20017b5f222',
      title: 'How It Works',
      description: 'The frontend makes API requests to the backend, which then retrieves data from MongoDB.',
      category: 'Documentation',
      status: 'Active',
      createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
    },
    {
      _id: '5f9d88b3e3a8d20017b5f333',
      title: 'Customization Options',
      description: 'You can customize this application by modifying the frontend components and backend routes.',
      category: 'Tips',
      status: 'Active',
      createdAt: new Date(Date.now() - 172800000).toISOString() // 2 days ago
    }
  ];
}

const mongoose = require('mongoose');
module.exports = router;
