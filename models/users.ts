//Users.js
import mongoose, { Schema } from 'mongoose';

// const isEmail = require('validator');

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    lowercase: true,
    // validate: [isEmail, 'invalid email'],
  },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date },
});

export default mongoose.model('User', userSchema);

