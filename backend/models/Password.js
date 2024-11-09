const mongoose = require('mongoose');

const passwordSchema = new mongoose.Schema({
  name: { type: String, required: true },
  encryptedPassword: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Password', passwordSchema);
