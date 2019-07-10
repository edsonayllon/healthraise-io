const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  address: { type: String, required: true, unique: true },
  nonce: { type: int, default: () => Math.floor(Math.random() * 1000000) },
  description: { type: String, default: '' }
});
