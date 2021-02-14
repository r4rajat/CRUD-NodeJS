const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    purchased: {
        type: Boolean,
        required: true,
        default: false
    }
}, {timestamps: true})



module.exports = mongoose.model('User', userSchema)