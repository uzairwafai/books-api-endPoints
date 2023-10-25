const Book = require('../model/booksModel');

const get = () => {
    return Book.find({});  // returnes a promise which is used in booksCtrl file
};

const add = (payload) => {
    const book = new Book(payload);  // book is a promise and the data of req.body(in ctrl file) gets stored in payload
    console.log(book);
    return book.save();   // inserts the data into database
}




module.exports = {
    get,
    add,

}