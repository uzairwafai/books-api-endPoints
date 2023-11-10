const mongoose = require('mongoose');
const structure = new mongoose.Schema({

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        //maxLength: 10,
    },
    firstName: {
        type: String,
        required: [true, 'First Name is required'],
    },

    lastName: {
        type: String,
        required: [true, 'Last Name is required'],
    },
    createdDate: {
        type: Date,
        required: true,
    },
    role: {
        type: String,
        default: 'User'
    },

    updatedDate: {
        type: Date,
        default: Date.now,
    }


});


module.exports = mongoose.model('users', structure);