const express = require('express');
const CryptoJS = require('crypto-js');
const Password = require('../models/Password');
const jwt = require('jsonwebtoken');
const router = express.Router();

const secretKey = process.env.JWT_SECRET || 'your_secret_key';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

router.get('/', authenticateToken, async (req, res) => {
  try {
    // Fetch passwords for the authenticated user
    const passwords = await Password.find({ userId: req.user.userId });

    // Decrypt each password before sending it back to the client
    const decryptedPasswords = passwords.map(password => ({
      name: password.name,
      password: CryptoJS.AES.decrypt(password.encryptedPassword, secretKey).toString(CryptoJS.enc.Utf8)
    }));
    res.json(decryptedPasswords);
  } catch (error) {
    console.error('Error fetching passwords:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to add a new password
router.post('/add', authenticateToken, async (req, res) => {
  try {
    const { name, password } = req.body;

    // Encrypt the password using the secretKey
    const encryptedPassword = CryptoJS.AES.encrypt(password, secretKey).toString();

    // Create a new password entry with the userId from the token
    const newPassword = new Password({ name, encryptedPassword, userId: req.user.userId });
    await newPassword.save();

    res.json({ message: 'Password saved successfully' });
  } catch (error) {
    console.error('Error saving password:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
