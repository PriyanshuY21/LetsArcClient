import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import router from "./Routes/routes.js";

dotenv.config(); // Load environment variables from .env file

const app = express(); 

// Middleware to log each request method and URL
app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next(); // Continue to next middleware
});

// Enable Cross-Origin Resource Sharing (CORS) for all routes
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Define port to run server on
const PORT = process.env.PORT || 8000;

// Connect to MongoDB using connection string from .env
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get default MongoDB connection
const db = mongoose.connection;

// Log MongoDB connection errors
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Log successful MongoDB connection
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Use router for all routes starting with /backend/
app.use("/backend/", router);

// Simple route for testing server
app.get("/backend", (req, res) => {
  res.send("Hello World");
});

// Starts server and listen on specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Generic error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Logs error stack trace
  res.status(500).send('Something broke!'); // Respond with a 500 status
});

export default app; // Exports app for potential use in other modules