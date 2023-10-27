const mongoose = require('mongoose');

const structure = new mongoose.Schema({
    bookName: String,
    genre: String,
    authorName: String,
    authorId: Number,
    bestseller: Boolean,
});

module.exports = mongoose.model('Book', structure);