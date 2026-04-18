const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'portfolio_jwt_secret_youba_2024';

function signToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: '7d' });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}

function getTokenFromRequest(req) {
  // Check Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }
  // Check cookie
  const cookies = req.headers.cookie || '';
  const match = cookies.match(/token=([^;]+)/);
  return match ? match[1] : null;
}

function requireAuth(handler) {
  return async (req, res) => {
    const token = getTokenFromRequest(req);
    if (!token) {
      return res.status(401).json({ message: 'Non authentifié. Veuillez vous connecter.' });
    }
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: 'Token invalide ou expiré.' });
    }
    req.user = decoded;
    return handler(req, res);
  };
}

module.exports = { signToken, verifyToken, getTokenFromRequest, requireAuth };
