const mongoose = require('mongoose');

const structure = new mongoose.Schema({
    bookName: {
        type: String,
        required: [true, 'Book name is required'],
        minLength: [3, 'Name must be more than 3 characters'],
        maxLength: [30, 'Name must be less than 30 characters'],
    },
    genre: {
        type: String,
        required: [true, 'Genre is required'],
        validate: {                                     // custom validation
            validator: function (val) {
                console.log(val);
                if (val.charAt(0) === 'a') {
                    return false;
                }
                else {
                    return
                }
            },
            message: 'Genre must not start with letter \'a\''
        },
    },
    authorName: {
        type: String,
        required: [true, 'Author name is required'],
    },
    authorId: {
        type: Number,
        // required: [true, 'Author id is required'],
        min: [0, 'Author id can\'t be negative'],
        max: [1000, 'Author id can\'t be > 1000'],
    },
    bestseller: Boolean,
    image: {
        type: String,
    },
    createdDate: Date,
    // updatedDate: {
    //     type: Date,
    //     default: Date.now
    // },
    updatedDate: Date
});

module.exports = mongoose.model('Book', structure);