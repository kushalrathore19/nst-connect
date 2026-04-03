const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Get the token from the header
  const token = req.header('Authorization');

  // If no token, kick them out
  if (!token) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  // Verify the token is real
  try {
    const verified = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.user = verified;
    next(); // Pass the check, allow the route to run
  } catch (err) {
    res.status(400).json({ message: "Invalid Token." });
  }
};