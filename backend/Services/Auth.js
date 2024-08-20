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

    res.status(200).json({ user, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const authenticated = async (req, res) => {
  try {
    console.log("Checking authentication for email:", req.email);

    const user = req.email && await User.findOne({ email: req.email });
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User does not exist" });
    }

    user.password = undefined;  // Exclude password
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error in authentication:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
