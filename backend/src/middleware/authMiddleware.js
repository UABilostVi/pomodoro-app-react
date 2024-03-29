require('dotenv').config();
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const {
    authorization,
  } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Please, provide authorization header' });
  }

  const [, token] = authorization.split(' ');

  if (!token) {
    return res.status(401).json({ message: 'Please, include token to request' });
  }

  try {
    const tokenPayload = jwt.verify(token, process.env.SECURE_PASS);
    req.user = {
      userId: tokenPayload.userId,
      username: tokenPayload.username,
    };
    return next();
  } catch (err) {
    return res.status(401).json({ message: `${err.message} authMiddle` });
  }
};

module.exports = {
  authMiddleware,
};
