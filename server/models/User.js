const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please add a username'],
        unique: true,
        minlength: 3,
        maxlength: 12,
    },
    email: {
        type: String,
        required: [true, 'Please add a username'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please fill out your password'],
        minlength: 6,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpiration: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('user', UserSchema);