const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const bodyParser = require('body-parser'); 

const app = express(); 

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Middleware to parse JSON request bodies

// Connects to MongoDB using mongoose
mongoose.connect('mongodb+srv://LetsArcMedia:ck2BRsv5h0FvCwcm@letsarcmediadb.nhwlq0u.mongodb.net/?retryWrites=true&w=majority&appName=LetsArcMediaDB', {
  useNewUrlParser: true, // Use new MongoDB connection string parser
  useUnifiedTopology: true // Use new Server Discover and Monitoring engine
}).then(() => {
  console.log('Connected to MongoDB'); // Logs success message if connection is established
}).catch(err => {
  console.error('Error connecting to MongoDB', err); // Logs error message connection fails
});

// Import and use user routes
const userRoutes = require('./Routes/user');
app.use('/api/users', userRoutes); // Sets base route for user-related endpoints

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Logs message when server starts
});
