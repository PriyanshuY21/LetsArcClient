import express from "express";
import { auth } from "../Middleware/auth.js"; // Custom authentication middleware
import {
  login,
  authenticated,
  getUserDetails,
} from "../Services/Auth.js"; // Importing authentication-related service functions
import {
  createVideo,
  deleteVideo,
  getAllVideos,
  getVideos,
  updateVideo,
  updateVideoStatus,
} from "../Services/video.js"; // Importing video-related service functions

const router = express.Router();

// Route for user login
// This route handles user login requests and uses 'login' function from Auth service
router.post("/login", login);

// Route to check if a user is authenticated
// This route uses 'auth' middleware to protect route and calls 'authenticated' function
router.get("/auth", auth, authenticated);

// Route to get user details
// This route uses 'auth' middleware to protect route and calls 'getUserDetails' function
router.get("/user-details", auth, getUserDetails);

// Route to create a new video
// This route allows for creation of a new video and uses 'createVideo' function
router.post("/create-video", createVideo);

// Route to get videos for authenticated users
// This route uses 'auth' middleware and calls 'getVideos' function to return videos for authenticated user
router.get("/get-videos", auth, getVideos);

// Route to get all videos (unprotected route)
// This route returns all videos using 'getAllVideos' function and does not require authentication
router.get("/get-all-videos", getAllVideos);

// Route to update a video
// This route allows for updating video details using 'updateVideo' function
router.patch("/update-video", updateVideo);

// Route to update status of a video
// This route allows for updating status of video using 'updateVideoStatus' function
router.patch("/update-video-status", updateVideoStatus);

// Route to delete video
// This route uses 'auth' middleware and allows deletion of video using 'deleteVideo' function
router.delete("/delete-video", auth, deleteVideo);

export default router;
