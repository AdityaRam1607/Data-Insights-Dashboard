const express = require('express');
const axios = require('axios');
const https = require('https'); // Import the 'https' module
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const port = 8080; // port fornExpress server
app.use(cors());


const mongoURI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.incuskc.mongodb.net/<Assignment>?retryWrites=true&w=majority`;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const DataSchema = new mongoose.Schema({
  end_year: String,
  intensity: Number,
  sector: String,
  topic: String,
  insight: String,
  url: String,
  region: String,
  start_year: String,
  impact: String,
  added: String,
  published: String,
  country: String,
  relevance: Number,
  pestle: String,
  source: String,
  title: String,
  likelihood: Number
});

const DataModel = mongoose.model('Data', DataSchema);

// Insert JSON data into MongoDB collection
const jsonData = require('./data.json'); // Load your JSON data
jsonData.forEach((data) => {
  const newData = new DataModel(data);
  newData.save();
});

// API endpoint to get data
app.get('/api/data', async (req, res) => {
  try {
    const data = await DataModel.find({});
    res.json(data);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});
// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
