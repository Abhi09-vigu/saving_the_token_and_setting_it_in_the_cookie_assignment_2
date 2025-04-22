const jwt = require('jsonwebtoken');

const encrypt = (payload, secret) => {
  // Set token to expire in 1 hour
  const token = jwt.sign(payload, secret, { expiresIn: '1h' });
  return token;
};

module.exports = encrypt;
