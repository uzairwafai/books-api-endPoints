const Book = require('../model/booksModel');

const get = () => {
    return Book.find({});  // returnes a promise which is used in booksCtrl file
};

const add = (payload) => {
    const book = new Book(payload);
    return book.save();
}




module.exports = {
    get,
    add,

}