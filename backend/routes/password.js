const express = require('express');
const CryptoJS = require('crypto-js');
const Password = require('../models/Password');

const router = express.Router();
const secretKey = process.env.SECRET_KEY;

// Add a new password
router.post('/add', async (req, res) => {
  const { name, password, userId } = req.body;
  const encryptedPassword = CryptoJS.AES.encrypt(password, secretKey).toString();

  const newPassword = new Password({ name, encryptedPassword, userId });
  await newPassword.save();
  res.json({ message: 'Password saved successfully' });
});

// Get all passwords for a user
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  const passwords = await Password.find({ userId });

  // Decrypt passwords before sending
  const decryptedPasswords = passwords.map(password => ({
    name: password.name,
    password: CryptoJS.AES.decrypt(password.encryptedPassword, secretKey).toString(CryptoJS.enc.Utf8)
  }));

  res.json(decryptedPasswords);
});

module.exports = router;
