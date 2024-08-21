import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  try {
    console.log("Verifying token");

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      console.log("No token provided");
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = { id: decoded.id, email: decoded.email };
    console.log("Decoded user details:", req.user); 
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ error: "Invalid Token" });
  }
};
