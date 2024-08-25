import bcrypt from 'bcrypt'; // Importing bcrypt for password hashing and comparison
import jwt from 'jsonwebtoken'; // Importing JSON Web Token for creating and verifying tokens
import User from '../Models/User.js'; 

export const login = async (req, res) => {
  const { email, password } = req.body; // Extracting email and password from the request body

  try {
    // Finding the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User does not exist" }); // If user not found, return a 404 error
    }

    // Compares provided password with hashed password stored in database
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" }); // If password is incorrect, returns 400 error
    }

    // Creates JWT token with the user's email and ID, and setting it to expire in 1 day
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    // Creating a user details object to exclude sensitive information
    const userDetails = {
      firstName: user.firstName,
      lastName: user.lastName,
      organizationName: user.organizationName,
      organizationRole: user.organizationRole,
      email: user.email,
      contact: user.contact,
    };

    console.log("User logged in:", userDetails); // Logs user details upon successful login

    // Returns user details and token in response
    res.status(200).json({ user: userDetails, token });
  } catch (error) {
    console.error("Login error:", error); // Log any errors during login process
    res.status(500).json({ message: "Something went wrong" }); // Return 500 status for internal server errors
  }
};

export const authenticated = async (req, res) => {
  try {
    console.log("Checking authentication for email:", req.user.email); // Log email of user being authenticated

    // Finds user in database using email from token
    const user = req.user.email && await User.findOne({ email: req.user.email });
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User does not exist" }); // Return 404 if user is not found
    }

    console.log("Authenticated user details:", user); // Log details of authenticated user

    user.password = undefined;  // Removes password from user object before returning
    res.status(200).json({ user }); // Returns user details in response
  } catch (error) {
    console.error("Error in authentication:", error); // Log any errors during authentication process
    res.status(500).json({ message: "Internal Server Error" }); // Returns 500 status for internal server errors
  }
};

export const getUserDetails = async (req, res) => {
  try {
    // Finds user by their ID (which is available in the token) and exclude password from returned data
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: "User not found" }); // Return 404 if user is not found
    }

    console.log("Fetched User Details:", user); // Log details of user being fetched

    res.status(200).json({ user }); // Return user details in response
  } catch (error) {
    console.error("Error fetching user details:", error); // Log any errors during process of fetching user details
    res.status(500).json({ message: "Internal Server Error" }); // Return a 500 status for internal server errors
  }
};
