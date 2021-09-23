import mongoose, { Schema } from 'mongoose';


const confirmationTokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    token: String,
});

export const ConfirmationTokenModel = mongoose.model(
    'ConfirmationToken',
    confirmationTokenSchema
)