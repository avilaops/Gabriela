const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'professional', 'viewer'],
        default: 'professional'
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    collection: 'users'
});

userSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('User', userSchema);
