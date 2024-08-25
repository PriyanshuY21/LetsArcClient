const express = require('express'); 
const mongoose = require('mongoose'); 
const cors = require('cors'); 
require('dotenv').config(); 

const app = express(); // Creates an instance of Express application
app.use(cors()); // Enable CORS to allow requests from different origins
app.use(express.json()); // Parses incoming JSON requests

// Connects to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, // Uses new URL parser
  useUnifiedTopology: true // Uses new Server Discover and Monitoring engine
});

// Gets database connection
const db = mongoose.connection;

// Handles database connection errors
db.on('error', (error) => console.error('Database connection error:', error));

// Confirms successful database connection
db.once('open', () => console.log('Connected to Database'));

// Imports and use routes for projects resource
const projectsRouter = require('./routes/projects');
app.use('/projects', projectsRouter);

// Define port for server to listen on
const PORT = process.env.PORT || 5002;

// Starts server and log port it's running on
app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
