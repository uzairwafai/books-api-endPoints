const booksRepo = require('../repositories/booksRepo');

const get = async (req, res) => {
    // const books = await booksRepo.get();
    var p = booksRepo.get();
    p.then(function (books) {   // p is a promise from booksRepo and then takes its resolved value as argument
        res.status(200);
        res.json(books);
    })
        .catch(function (err) {   // catch takes the rejected value as an argument
            res.status(500);
            res.send('Internal Server Error');
        });
};

const post = async (req, res) => {
    try {
        await booksRepo.add(req.body);
        res.status(200);
        res.send('Book data added succesfully');
    }
    catch {
        res.status(500);
        res.send('Internal Server Error');
    }
}








module.exports = {
    get,
    post,
}