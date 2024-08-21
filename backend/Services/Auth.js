import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../Models/User.js'; 

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    const userDetails = {
      firstName: user.firstName,
      lastName: user.lastName,
      organizationName: user.organizationName,
      organizationRole: user.organizationRole,
      email: user.email,
      contact: user.contact,
    };

    console.log("User logged in:", userDetails); // Log user details on login

    res.status(200).json({ user: userDetails, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const authenticated = async (req, res) => {
  try {
    console.log("Checking authentication for email:", req.user.email);

    const user = req.user.email && await User.findOne({ email: req.user.email });
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User does not exist" });
    }

    console.log("Authenticated user details:", user); // Log user details on successful authentication

    user.password = undefined;  // Exclude password
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error in authentication:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Fetched User Details:", user); 

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
