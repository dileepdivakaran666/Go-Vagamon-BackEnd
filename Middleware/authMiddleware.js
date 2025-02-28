const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.cookies['go-vaga-token']

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = decoded; // Attach user ID to request
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token.", error: error.message });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Access denied. Admin only.' });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };

// const token1 = req.header('Authorization');
// Correctly remove the "Bearer " prefix from the token
// const decoded = jwt.verify(token.replace('Bearer ', ''), 'zoopletech');