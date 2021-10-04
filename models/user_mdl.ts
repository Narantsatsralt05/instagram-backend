import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import { IUser } from '../interfaces';

const userSchema = new Schema<IUser>({
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
  lastLogin: { type: Date },

});

export const User =  mongoose.model('User', userSchema);
