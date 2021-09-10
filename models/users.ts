//Users.js
import mongoose, { Schema } from 'mongoose';

// import isEmail from 'validator';

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

export const userModel =  mongoose.model('User', userSchema);
