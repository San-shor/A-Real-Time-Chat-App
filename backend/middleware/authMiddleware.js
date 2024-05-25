const jwt = require('jsonwebtoken');
const { User } = require('../models/register.model');
const SECRET_KEY = process.env.SECRET_KEY || 'Whatever';

const authenticateToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .send({ errorMessage: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = await User.findById(decoded._id).select('-password');
    next();
  } catch (error) {
    res.status(400).send({ errorMessage: 'Invalid token.' });
  }
};

module.exports = authenticateToken;
