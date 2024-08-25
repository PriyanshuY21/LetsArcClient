import jwt from 'jsonwebtoken';

// Authentication middleware function
export const auth = (req, res, next) => {
  try {
    console.log("Verifying token");

    // Extracting token from 'Authorization' header
    // The token is expected to be in format: "Bearer <token>"
    const token = req.headers.authorization?.split(" ")[1];

    // If no token is provided, returns "Unauthorized" response
    if (!token) {
      console.log("No token provided");
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Verifying token using secret key stored in environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Adding decoded user information to request object
    // This information can be accessed in subsequent middleware or route handlers
    req.user = { id: decoded.id, email: decoded.email };

    // Logging decoded user details for debugging purposes
    console.log("Decoded user details:", req.user);

    // Proceed to next middleware or route handler
    next();
  } catch (error) {
    // If token verification fails, log error and returns "Invalid Token" response
    console.error("Token verification error:", error);
    res.status(401).json({ error: "Invalid Token" });
  }
};
