const Book = require('../model/booksModel');

// Simple get function without pagination
// const get = () => {
//     return Book.find({}, { __v: 0 });  // returnes a promise which is used in booksCtrl file
// };

// get function with pagination
const get = (pageSize, page) => {
    const recordsToSkip = (page - 1) * pageSize;
    return Book.find({}, { __v: 0 }).skip(recordsToSkip).limit(pageSize);
};


const add = (payload) => {
    const book = new Book(payload);  // book is a promise and the data of req.body(in ctrl file) gets stored in payload
    console.log(book);
    return book.save();   // inserts the data into database
};

const remove = (id) => {
    return Book.findByIdAndRemove(id);
};

// const getById = function (id) {
//     return Book.findById(id, { __v: 0 });
// };
const getById = (id) => {
    testId = Book.findById(id, { __v: 0 });
    return testId;
    // console.log(testId);
};

const update = (id, payload) => {
    return Book.findByIdAndUpdate(id, payload);
}


module.exports = {
    get,
    add,
    remove,
    getById,
    update,
}