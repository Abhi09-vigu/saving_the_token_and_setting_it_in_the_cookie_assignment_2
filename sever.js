const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

const SECRET_KEY = 'yourSecretKey123'; // Use a secure key in production

app.get('/generate-token', (req, res) => {
  const payload = {
    username: 'testuser',
    role: 'admin',
  };

 
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }); 

  res.json({ token });
});

app.get('/protected', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // "Bearer <token>"
  
    if (!token) return res.status(401).json({ message: 'No token provided' });
  
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Token is invalid or expired' });
      }
  
      res.json({ message: 'Access granted', user: decoded });
    });
  });
  