const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true, // Ensures email is unique
        },
        password: {
            type: String,
            required: function () {
                return !this.googleId; // Password is required only if googleId is not present
            },
        },
        username: {
            type: String,
            required: function () {
                return !this.googleId; // Username is required only if googleId is not present
            },
        },
        role: {
            type: String,
            enum: ['user', 'admin', 'manager', 'operator'],
            default: 'user',
        },
        googleId: {
            type: String,
            sparse: true, // Allows Google users to exist without a password
        },
        resetCode: {
            type: Number,
            default: null, // Stores the reset code sent to the user
        },
        resetCodeExpires: {
            type: Date,
            default: null, // Expiry timestamp for the reset code
        },
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
