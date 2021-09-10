import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema({
  postedBy: { type: Schema.Types.ObjectId, ref: 'users' },
  caption: { type: String, required: false },
  photoPath: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const postModel = mongoose.model('Post', postSchema);