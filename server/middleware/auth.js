const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if header exists and is in correct format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(" ")[1];

  try {
    // 🔥 IMPORTANT: no fallback secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: decoded.id };
    next();
  } catch (err) {
    console.error("JWT Error:", err.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
};