//Users.js
import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

// import isEmail from 'validator';

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    lowercase: true,
    validate: (value: any) => {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid email address.');
      }
    }
  },
  password: {
    type: String,
    minlength: 8,
  },
  fullName:{
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date },

});
userSchema.pre('save', function (next) {
  const saltRounds = 10;
  // Check if the password has been modified
  if (this.modifiedPaths().includes('password')) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});


export const userModel =  mongoose.model('User', userSchema);
