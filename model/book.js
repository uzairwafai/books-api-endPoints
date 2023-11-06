const mongoose = require('mongoose');

const structure = new mongoose.Schema({
    bookName: String,
    genre: String,
    authorName: String,
    authorId: Number,
    bestseller: Boolean,
    createdDate: Date,
    // updatedDate: {
    //     type: Date,
    //     default: Date.now
    // },
    updatedDate: Date
});

module.exports = mongoose.model('Book', structure);