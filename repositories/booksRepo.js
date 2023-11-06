const Book = require('../model/book');

// Simple get function without pagination
// const get = () => {
//     return Book.find({}, { __v: 0 });  // returnes a promise which is used in booksCtrl file
// };

const count = (search) => {
    const filter = {
        $or: [
            { bookName: new RegExp(search, 'i') },
            { genre: new RegExp(search, 'i') },
            { authorName: new RegExp(search, 'i') },
         
        ]
    };
    return Book.count(filter);
}

const getSortBy = (sortBy) => {
    // switch (sortBy.toLowerCase()) {
    //     case 'bookName':
    //         return sortBy.toLowerCase();
    //     case 'genre':
    //         return sortBy.toLowerCase();
    //     case 'authorName':
    //         return sortBy.toLowerCase();
    //     case 'bestseller':
    //         return sortBy.toLowerCase();
    //     default:
    //         return 'bookName';
    //console.log(sortBy);
    switch (sortBy.toLowerCase()) {
        case 'bookname':
            return 'bookName';
        case 'genre':
            return sortBy.toLowerCase();
        case 'authorname':
            return 'authorName';
        case 'bestseller':
            return sortBy.toLowerCase();
        case 'authorid':
            return 'authorId'
        default:
            return 'bestseller';

    }
};

const getSortDirection = function (sortDir) {
    switch (sortDir.toLowerCase()) {
        case 'asc':
            return 1;
        case 'dsc':
            return -1;
        default:
            return 1;
    }
};



// get function with pagination
const get = (pageSize, page, sortBy, sortDir, search) => {

    const recordsToSkip = (page - 1) * pageSize;
    const sortField = getSortBy(sortBy);   // sortField must mach the actual key name in the model schema
    const sortDirField = getSortDirection(sortDir);
    const filter = {
        $or: [
            { bookName: new RegExp(search, 'i') },
            { genre: new RegExp(search, 'i') },
            { authorName: new RegExp(search, 'i') },
        
        ]
    };
    //console.log(sortDirField);
    return Book.find(filter, { __v: 0 })
        .sort({ [sortField]: sortDirField })  // we need bracket notation as sortField is variable not an actual value in the object
        .skip(recordsToSkip)
        .limit(pageSize);
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
};

const patch = (id, payload) => {
    const updateReq = { $set: {} };
    delete payload._id;

    for (let key in payload) {
        updateReq.$set[key] = payload[key];
    }

    return Book.findByIdAndUpdate(id, updateReq);
};


module.exports = {
    get,
    add,
    remove,
    getById,
    update,
    patch,
    count,
}